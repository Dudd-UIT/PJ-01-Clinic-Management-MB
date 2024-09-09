import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {IFNgay} from '../../../component/Layout/TabLayout/InputForm';
import {fetchLSKByIdBnAction} from '../../../redux/action/fetchPhieuKhamAction';
import Fonts from '../../../../assets/fonts/Fonts';
import {BCarefulTheme, style} from '../../../component/Theme';
import {TTKICon} from '../../../component/StatusIcon';
import {compareDates} from '../../../util/appUtil';
import {
  selectItem,
  clearSelectedItem,
} from '../../../redux/slice/selectedItemSlice';
import Icon from 'react-native-vector-icons/Ionicons';

function LichSuKhamScreen({navigation}) {
  const dispatch = useDispatch();
  const lichSuKham = useSelector(state => state.phieuKham?.lskByIdBn) || [];
  const isLoading = useSelector(state => state.phieuKham?.isLoading);
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);
  const [displayLSK, setDisplayLSK] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [trangThaiList, setTrangThaiList] = useState([
    {id: 1, title: 'Chưa thực hiện'},
    {id: 2, title: 'Đang thực hiện'},
    {id: 3, title: 'Đã hoàn thành'},
    {id: 4, title: 'Đã hủy'},
  ]);

  const handleChuyenTrangDSDV = item => {
    dispatch(selectItem(item));
    navigation.navigate('DSDV', {item});
  };

  useEffect(() => {
    if (lichSuKham) {
      let filteredLSK = [...lichSuKham];
      // Lọc theo ngày bắt đầu và ngày kết thúc
      if (startDate && endDate) {
        filteredLSK = filteredLSK.filter(data => {
          const formatedNGAYKHAM = new Date(data.NGAYKHAM);
          return (
            compareDates(startDate, formatedNGAYKHAM) >= 0 &&
            compareDates(formatedNGAYKHAM, endDate) >= 0
          );
        });
      } else if (startDate) {
        // Chỉ có ngày bắt đầu
        filteredLSK = filteredLSK.filter(data => {
          const formatedNGAYKHAM = new Date(data.NGAYKHAM);

          return compareDates(startDate, formatedNGAYKHAM) >= 0;
        });
      } else if (endDate) {
        // Chỉ có ngày kết thúc
        filteredLSK = filteredLSK.filter(data => {
          const formatedNGAYKHAM = new Date(data.NGAYKHAM);

          return compareDates(formatedNGAYKHAM, endDate) >= 0;
        });
      }

      // Lọc theo từ khóa tìm kiếm
      if (searchKeyword) {
        filteredLSK = filteredLSK.filter(
          data => data.TRANGTHAITH === searchKeyword,
        );
      }

      setDisplayLSK(filteredLSK);
    }
  }, [lichSuKham, searchKeyword, startDate, endDate]);

  const trangThaiRenderItem = ({item}) => (
    <View
      style={
        item.title === searchKeyword
          ? styles.listItemActive
          : styles.listItemPassive
      }>
      <TouchableOpacity
        onPress={() => {
          setSearchKeyword(item.title);
        }}>
        <Text
          style={
            item.title === searchKeyword
              ? styles.listItemTextActive
              : styles.listItemTextPassive
          }>
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const phieuKhamRenderItem = ({item}) => (
    <View style={[styles.listItem, {marginVertical: 10}]}>
      <View style={styles.bodyLeft}>
        <View style={styles.chainLeft}></View>
        <View style={styles.chain}></View>
        <View style={styles.chainRight}></View>
      </View>
      <View style={styles.bodyRight}>
        <View style={styles.listItemDateTime}>
          <Text style={style.t2}>{item.NGAYKHAMMIN.split(' - ')[0]}</Text>
          <Text style={style.t2}>{item.NGAYKHAMMIN.split(' - ')[1]}</Text>
          <View>
            <TTKICon value={item.TRANGTHAITH} />
          </View>
        </View>
        <View style={styles.listItemDetail}>
          <TouchableOpacity
            style={styles.detail}
            onPress={() => handleChuyenTrangDSDV(item)}>
            <View style={{flex: 6}}>
              <Text style={style.t2}>MAPK - {item.MAPK}</Text>
              <Text style={style.h6}>{item.TENDV.toUpperCase()}</Text>
            </View>
            <FontistoIcon
              name={'angle-right'}
              style={[styles.icon, {alignSelf: 'center', flex: 1}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    dispatch(fetchLSKByIdBnAction(user.MABN));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} style={styles.iconGoBack} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={style.h4}>Lịch sử khám</Text>
          <Text style={style.h7}>
            {user.HOTEN} (Mã BN - {user.MABN})
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name={'home'} style={styles.iconGoHome} />
        </TouchableOpacity>
      </View>
      <View style={styles.status}>
        <FlatList
          data={trangThaiList}
          renderItem={trangThaiRenderItem}
          horizontal={true}
        />
      </View>
      <View style={styles.date}>
        <Text style={[style.h6, {marginLeft: 10}]}>Chọn ngày</Text>
        <View style={styles.dateRange}>
          <IFNgay
            title={'Từ ngày'}
            onDateChange={value => setStartDate(value)}
          />
          <FontistoIcon name={'arrow-swap'} style={styles.icon} />
          <IFNgay
            title={'Đến ngày'}
            onDateChange={value => setEndDate(value)}
          />
        </View>
      </View>
      {isLoading ? (
        <>
          <View style={styles.body}>
            <ActivityIndicator size="large" />
          </View>
        </>
      ) : (
        <>
          <View style={styles.body}>
            <FlatList data={displayLSK} renderItem={phieuKhamRenderItem} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DED9FA',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: '#000',
  },
  iconGoBack: {
    fontSize: 26,
    color: '#000',
    marginLeft: 10,
  },
  iconGoHome: {
    fontSize: 26,
    color: '#000',
    marginRight: 10,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 2,
    backgroundColor: '#fff',
  },
  date: {
    backgroundColor: '#fff',
    marginTop: 6,
    paddingVertical: 8,
  },
  dateRange: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 6,
  },
  icon: {
    fontSize: 26,
    color: '#999',
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
  },
  scrollView: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemActive: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: BCarefulTheme.colors.primary,
    borderBottomWidth: 4,
  },
  listItemPassive: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  bodyRight: {
    flex: 20,
    paddingVertical: 10,
    paddingRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemDateTime: {
    flex: 3,
    paddingRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemDetail: {
    flex: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  detail: {
    borderWidth: 4,
    borderRadius: 10,
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: BCarefulTheme.colors.primary,
    paddingVertical: 20,
  },
  listItemText: {
    fontSize: 14,
  },
  listItemTextActive: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: BCarefulTheme.colors.primary,
  },
  listItemTextPassive: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#000',
  },
  dateTime: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#000',
  },
  maPhieuKham: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#000',
  },
  tenDichVu: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: '#000',
  },
  chain: {
    borderWidth: 2,
    borderColor: 'red',
    width: 1,
    height: 10,
    flexGrow: 1,
  },
  chainLeft: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    width: 10,
    height: 10,
  },
  chainRight: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    width: 10,
    height: 10,
  },
});

export default LichSuKhamScreen;
