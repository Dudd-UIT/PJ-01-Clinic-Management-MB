import {Button} from '@rneui/themed';
import {Text, View} from 'react-native';
import {ButtonChuyenHuong} from '../../../component/ButtonChuyenHuong';

function QuyTrinhScreen() {
  return (
    <View style={{flex: 1}}>
      <Text>QuyTrinhScreen</Text>
      <ButtonChuyenHuong title={'ChonHoSo'} name={'HoSo'} />
      <ButtonChuyenHuong title={'LichSuKham'} name={'LichSuKham'} />
      <ButtonChuyenHuong title={'ChiDuong'} name={'ChiDuong'} />
      <ButtonChuyenHuong title={'DonThuoc'} name={'DonThuoc'} />
      <ButtonChuyenHuong title={'DSDV'} name={'DSDV'} />
      <ButtonChuyenHuong title={'KetQuaKham'} name={'KetQuaKham'} />
      <ButtonChuyenHuong title={'ThanhToan'} name={'ThanhToan'} />
    </View>
  );
}

export default QuyTrinhScreen;
