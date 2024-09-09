import {Text, TouchableOpacity, View, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader} from '../../../component/Header';
import {BCarefulTheme, style} from '../../../component/Theme';
import {useNavigation} from '@react-navigation/native';
import {fetchLSKByIdBnAction} from '../../../redux/action/fetchPhieuKhamAction';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import Fonts from '../../../../assets/fonts/Fonts';

function QuanLyThuocScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const lichSuKham = useSelector(state => state.phieuKham?.lskByIdBn) || [];
  console.log('lich su kham: ', lichSuKham);
  const isLoading = useSelector(state => state.phieuKham?.isLoading);
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);

  useEffect(() => {
    dispatch(fetchLSKByIdBnAction(user.MABN));
  }, [dispatch]);

  const handlePress = item => {
    navigation.navigate('DatLichNhacThuoc', {item});
  };

  const renderPrescriptionItem = ({item}) => (
    <TouchableOpacity
      style={styles.prescriptionCard}
      onPress={() => handlePress(item)}>
      <Text style={style.h6}>
        DT{item.MADT} - PK{item.MAPK}
      </Text>
      <View style={styles.row}>
        <Text style={styles.label}>Dịch vụ:</Text>
        <Text style={styles.dichVuValue}>{item.TENDV?.toUpperCase()}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ngày khám:</Text>
        <Text style={styles.timeValue}>{item.NGAYKHAMMIN}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'Quản lý toa thuốc'} />
      <SafeAreaView style={{flex: 1, padding: 16}}>
        {/* <TouchableOpacity
          style={style.btn}
          onPress={() => {
            navigation.navigate('ThemThuoc');
          }}>
          <Text>Thêm thuốc</Text>
        </TouchableOpacity> */}
        <Text style={style.h4}>Danh sách đơn thuốc ({lichSuKham.filter(pk => pk.MADT !== null).length})</Text>
        <FlatList
          data={lichSuKham.filter(pk => pk.MADT !== null)}
          renderItem={renderPrescriptionItem}
          keyExtractor={item => item.MAPK.toString()}
          ListEmptyComponent={<Text>Không có dữ liệu toa thuốc</Text>}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  prescriptionCard: {
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
  specialtyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#000000',
    flex: 1,
    textAlign: 'left',
  },
  timeValue: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: '#000000',
    flex: 2,
    textAlign: 'right',
  },
  dichVuValue: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: '#7864EA',
    flex: 2,
    textAlign: 'right',
  },
});

export default QuanLyThuocScreen;
