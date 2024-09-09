import {Button} from '@rneui/themed';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import axios from '../../../setup/axios';
import {Linking} from 'react-native';
import {BCarefulTheme} from '../../../component/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import Fonts from '../../../../assets/fonts/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {onDisplayNotification} from '../../../util/appUtil';
import {setNewPKHD} from '../../../redux/slice/selectedItemSlice';

function ThanhToanScreen({navigation, route}) {
  const dispatch = useDispatch();
  const itemThanhToan = route?.params?.item;
  const ctdtById = route?.params?.ctdtById;
  const clsById = route?.params?.clsByIdArray;
  const pkByIdHd = route?.params?.pkByIdHd;

  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);
  const [showSpecialities, setShowSpecialities] = useState(false);
  const specialities = [
    {
      name: 'KHÁM DA LIỄU',
      quantity: '1',
      fee: '150.000đ',
      total: '150.000đ',
    },
    {
      name: 'RỬA VẾT THƯƠNG ĐƠN GIẢN',
      quantity: '1',
      fee: '300.000đ',
      total: '300.000đ',
    },
  ];
  const [chiTietHD, setChiTietHD] = useState(specialities);

  useEffect(() => {
    if (itemThanhToan?.TENLOAIDV === 'Hóa đơn thuốc') {
      const formatCTDT = ctdtById.map(item => {
        return {
          name: item.TENTHUOC?.toUpperCase(),
          quantity: item.SOLUONGTHUOC,
          fee: item.GIABANLUCKE?.toLocaleString('vi-VN') + 'đ',
          total:
            (item.GIABANLUCKE * item.SOLUONGTHUOC).toLocaleString('vi-VN') +
            'đ',
        };
      });
      setChiTietHD(formatCTDT);
    }
    if (itemThanhToan?.TENLOAIDV === 'Cận lâm sàng') {
      const formatDSCLS = clsById.map(item => {
        return {
          name: item.TENDV?.toUpperCase(),
          quantity: 1,
          fee: item.GIADVCLSLUCDK?.toLocaleString('vi-VN') + 'đ',
          total: item.GIADVCLSLUCDK?.toLocaleString('vi-VN') + 'đ',
        };
      });
      setChiTietHD(formatDSCLS);
    }
    if (!itemThanhToan || !itemThanhToan.TENLOAIDV) {
      const formatDSPK = pkByIdHd.map(item => {
        const tenDV = item?.TENDV || item?.tenDichVu;
        const giaDV = item?.GIADVLUCDK || item?.giaDichVu;
        return {
          name: tenDV.toUpperCase(),
          quantity: 1,
          fee: giaDV.toLocaleString('vi-VN') + 'đ',
          total: giaDV.toLocaleString('vi-VN') + 'đ',
        };
      });
      setChiTietHD(formatDSPK);
    }
  }, []);

  const openDeepLink = url => {
    Linking.openURL(url)
      .then(supported => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => {
        console.log('An error occurred', err);
        Alert.alert(
          'Thông báo',
          'Tải về MoMo for Developer để thực thiện tính năng thanh toán.',
          [
            {
              text: 'OK',
              onPress: () =>
                Linking.openURL('https://developers.momo.vn/v3/download/'),
            },
            {
              text: 'Cancle',
              onPress: () =>
                Linking.openURL('https://developers.momo.vn/v3/download/'),
            },
          ],
        );
      });
  };

  const handleThanhToan = async () => {
    if (itemThanhToan.isNew && itemThanhToan.isNew === true) {
      console.log('>>>>>>>> THÊM HÓA ĐƠN, PHIẾU KHÁM');
      dispatch(setNewPKHD({newPKArray: pkByIdHd}));
    }
    if (itemThanhToan.TTTT === 'Chưa thanh toán') {
      const response = await axios.post('hoadon/test-momo', {
        MAHD: itemThanhToan.MAHD || '',
        TENLOAIDV: itemThanhToan.TENLOAIDV,
        THANHTIEN: itemThanhToan.THANHTIEN,
      });
      // const jsonRes = JSON.parse(response.data);
      console.log('DEEPLINK>>>>>', response.data.data.deeplink);
      openDeepLink(response.data.data.deeplink);
    }
  };

  const SpecialityCard = ({speciality}) => {
    return (
      <View style={cthdStyles.card}>
        <View style={cthdStyles.row}>
          <Text style={cthdStyles.label}>Mặt hàng:</Text>
          <Text style={cthdStyles.nameValue}>{speciality.name}</Text>
        </View>
        <View style={cthdStyles.row}>
          <Text style={cthdStyles.label}>Số lượng:</Text>
          <Text style={cthdStyles.value}>{speciality.quantity}</Text>
        </View>
        <View style={cthdStyles.row}>
          <Text style={cthdStyles.label}>Đơn giá:</Text>
          <Text style={cthdStyles.value}>{speciality.fee}</Text>
        </View>
        <View style={cthdStyles.row}>
          <Text style={cthdStyles.label}>Thành tiền:</Text>
          <Text style={cthdStyles.value}>{speciality.total}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hóa Đơn</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Khách hàng</Text>
          <Text style={styles.value}>{user.HOTEN}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Mã hồ sơ</Text>
          <Text style={styles.value}>BN - {user.MABN}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tài khoản thụ hưởng</Text>
          <Text style={styles.value}>Bưởi Company</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Loại hóa đơn</Text>
          <Text style={styles.value}>
            {itemThanhToan?.TENLOAIDV || 'Hóa đơn khám'}
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={cthdStyles.header}>
            Chi tiết hóa đơn ({chiTietHD.length})
          </Text>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowSpecialities(!showSpecialities)}>
            <Icon
              name={
                showSpecialities
                  ? 'caret-up-circle-outline'
                  : 'caret-down-circle-outline'
              }
              size={30}
              color="#7864EA"
            />
          </TouchableOpacity>
        </View>

        {showSpecialities && (
          <ScrollView contentContainerStyle={cthdStyles.container}>
            {chiTietHD.map((speciality, index) => (
              <SpecialityCard key={index} speciality={speciality} />
            ))}
          </ScrollView>
        )}

        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.labelBold}>Tổng hóa đơn</Text>
          <Text style={styles.valueBold}>
            {itemThanhToan?.THANHTIEN?.toLocaleString('vi-VN') + 'đ'}
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Trạng thái thanh toán</Text>
          <Text style={styles.value}>{itemThanhToan?.TTTT}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Thời điểm thanh toán</Text>
          <Text style={styles.value}>{itemThanhToan?.TDTTMIN}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Phương thức thanh toán</Text>
          <TouchableOpacity
            style={styles.linkValue}
            onPress={() =>
              Linking.openURL('https://developers.momo.vn/v3/download/')
            }>
            <Text style={styles.linkValue}>Momo DEV</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={
              itemThanhToan?.TTTT === 'Chưa thanh toán'
                ? styles.button
                : styles.buttonGreen
            }
            onPress={handleThanhToan}>
            <Text style={styles.buttonText}>
              {itemThanhToan?.TTTT === 'Chưa thanh toán'
                ? 'Thanh toán'
                : 'Đã thanh toán'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    backgroundColor: '#7864EA',
    flexGrow: 1,
    height: 111,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 36,
  },
  separator: {
    height: 3,
    backgroundColor: '#7864EA',
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 2,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#6A0DAD',
    flex: 1,
    textAlign: 'left',
  },
  value: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: '#000000',
    flex: 2,
    textAlign: 'right',
  },
  linkValue: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: '#D82D8B',
    flex: 2,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  labelBold: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#6A0DAD',
  },
  valueBold: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#000000',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#EA793A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: 180,
  },
  buttonGreen: {
    backgroundColor: '#A1DD70',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 195,
  },
  buttonText: {
    fontFamily: Fonts.bold,
    color: '#FFFFFF',
    fontSize: 20,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});

const cthdStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 1,
  },
  header: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: '#6A0DAD',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
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
    color: '#333333',
    flex: 1,
    textAlign: 'left',
  },
  value: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: '#000000',
    flex: 2,
    textAlign: 'right',
  },
  nameValue: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: '#7864EA',
    flex: 2,
    textAlign: 'right',
  },
});

export default ThanhToanScreen;
