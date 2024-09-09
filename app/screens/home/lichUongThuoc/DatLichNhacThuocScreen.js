import {Text, TouchableOpacity, View, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader} from '../../../component/Header';
import {BCarefulTheme, style} from '../../../component/Theme';
import {useNavigation} from '@react-navigation/native';
import {fetchCTDTByIdAction} from '../../../redux/action/fetchCTDTById';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState, useMemo} from 'react';
import CustomSwitch from '../../../component/CustomSwitch';
import Fonts from '../../../../assets/fonts/Fonts';

function DatLichNhacThuocScreen({route}) {
  const navigation = useNavigation();
  const maPK = route.params.item.MAPK;
  const tenDV = route.params.item.TENDV;
  console.log('params: ', route.params.item);
  const dispatch = useDispatch();
  const ctdtById = useSelector(state => state.ctdtById.data) || [];
  console.log('ctdtById', ctdtById);
  const isLoading = useSelector(state => state.ctdtById?.isLoading);
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);
  const [selectedTab, setSelectedTab] = useState('Chưa đặt lịch');

  useEffect(() => {
    dispatch(fetchCTDTByIdAction(maPK));
  }, [dispatch]);

  const chuaDatLichCount = ctdtById.filter(
    item => item.TRANGTHAIDATLICH === 'Chưa đặt lịch',
  ).length;
  const daDatLichCount = ctdtById.filter(
    item => item.TRANGTHAIDATLICH === 'Đã đặt lịch',
  ).length;

  const filteredCtdtById = useMemo(() => {
    if (selectedTab === 'Chưa đặt lịch') {
      return ctdtById.filter(item => item.TRANGTHAIDATLICH === 'Chưa đặt lịch');
    } else {
      return ctdtById.filter(item => item.TRANGTHAIDATLICH === 'Đã đặt lịch');
    }
  }, [ctdtById, selectedTab]);

  const onSelectSwitch = selectionMode => {
    setSelectedTab(selectionMode === 1 ? 'Chưa đặt lịch' : 'Đã đặt lịch');
  };

  const renderMedicineItem = ({item}) => (
    <View style={styles.medicineCard}>
      <Text style={styles.medText}>{item.TENTHUOC}</Text>
      <Text style={style.t2}>Lần/ngày: {item.SOLANUONG}</Text>
      <Text style={style.t2}>Số lượng / lần: {item.SOLUONGUONG}</Text>
      <Text style={style.t2}>Cách dùng: {item.GHICHU}</Text>
      <TouchableOpacity
        style={[
          selectedTab === 'Chưa đặt lịch' ? style.btnSub : style.btnSubGreen,
          {marginTop: 10},
        ]}
        onPress={() =>
          navigation.navigate('ThemThuoc', {item: {...item, maPK: maPK}})
        }>
        <Text style={[style.h7, style.white]}>
          {selectedTab === 'Chưa đặt lịch' ? 'Đặt lịch nhắc' : 'Cập nhật lịch'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'Đặt lịch nhắc thuốc'} />
      <SafeAreaView style={{flex: 1, padding: 16}}>
        <CustomSwitch
          selectionMode={1}
          option1={`Chưa đặt lịch (${chuaDatLichCount})`}
          option2={`Ðã đặt lịch (${daDatLichCount})`}
          onSelectSwitch={onSelectSwitch}
          selectionColor={BCarefulTheme.colors.primary}
        />
        <View style={styles.header}>
          <Text style={style.h4}>Toa thuốc: {tenDV}</Text>
        </View>
        <FlatList
          data={filteredCtdtById}
          renderItem={renderMedicineItem}
          keyExtractor={item => item.MATHUOC.toString()}
          ListEmptyComponent={
            <Text style={style.t1}>Tất cả toa thuốc đã được đặt lịch dùng</Text>
          }
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 7,
    marginHorizontal: 5,
  },
  medicineCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  reminderButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#4caf50',
    alignItems: 'center',
  },
  medText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: BCarefulTheme.colors.primary,
  },
});

export default DatLichNhacThuocScreen;
