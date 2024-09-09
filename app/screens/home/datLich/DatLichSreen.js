import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BCarefulTheme, style} from '../../../component/Theme';
import {useEffect, useState} from 'react';
import {DatLichHeader} from '../../../component/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChonThongTinKham from './ChonThongTinKham/ChonThongTinKham';
import XacNhanScreen from './XacNhan/XacNhanScreen';
import ThanhToanScreen from '../quyTrinh/ThanhToanScreen';

function DatLichScreen() {
  const [values, setValues] = useState(0);
  const [formSubmit, setFormSubmit] = useState({});
  const [formDisplay, setFormDisplay] = useState([]);
  console.log('formSubmit', formSubmit);
  console.log('formDisplay', formDisplay);

  const tongPhi = () => {
    const total = formDisplay.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue.giaDichVu);
    }, 0);

    return total;
  };
  useEffect(() => {}, [values]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <DatLichHeader title={'Chọn thông tin khám'} values={values} />
      {values == 0 && (
        <ChonThongTinKham
          setValues={setValues}
          formSubmit={formSubmit}
          formDisplay={formDisplay}
          setFormSubmit={setFormSubmit}
          setFormDisplay={setFormDisplay}
        />
      )}
      {values == 0.5 && (
        <XacNhanScreen
          setValues={setValues}
          formSubmit={formSubmit}
          formDisplay={formDisplay}
        />
      )}
      {/* {values == 1 && (
        <ThanhToanScreen
          formDisplay={formDisplay}
          infoHD={{TDTTMIN: 'Chưa thanh toán', TTTT: 'Chưa thanh toán', THANHTIEN: tongPhi()}}
        />
      )} */}
    </SafeAreaView>
  );
}

export default DatLichScreen;

const styles = StyleSheet.create({
  seperateHorizontal: {
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: BCarefulTheme.colors.primary,
    alignItems: 'center',
    margin: 12,
    marginHorizontal: 8,
  },
});
