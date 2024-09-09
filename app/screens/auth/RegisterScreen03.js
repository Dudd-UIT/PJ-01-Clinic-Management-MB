import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Fonts from '../../../assets/fonts/Fonts';
import {useColorScheme} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {registerUserTK_BN, registerUserTK} from '../../services/userService';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import socket from '../../setup/socket';
import {style} from '../../component/Theme';

// NHAP HO SO DANG KI (PASSWORD, INFO)
const RegisterScreen03 = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const gioiTinh = [{gioiTinh: 'Nam'}, {gioiTinh: 'Nữ'}, {gioiTinh: 'Khác'}];
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const formDataDefault = {
    email: route.params.email ? route.params.email : '',
    password: route.params.password ? route.params.password : '',
    hoTen: '',
    cccd: '',
    gioiTinh: '',
    ngaySinh: '',
    soDienThoai: '',
    diaChi: '',
    tienSuBenh: '',
    diUng: '',
  };

  const [formData, setFormData] = useState(formDataDefault);
  console.log('formData', formData);

  const defaultObjValidInput = {
    isValidHoTen: true,
    isValidCCCD: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleChange = (fieldName, value) => {
    setFormData({...formData, [fieldName]: value});
  };

  const handleRegister = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!formData.hoTen) {
      setObjValidInput({...defaultObjValidInput, isValidHoTen: false});
      return;
    }
    if (!formData.cccd) {
      setObjValidInput({...defaultObjValidInput, isValidCCCD: false});
      return;
    }

    const response = await registerUserTK_BN(formData);

    if (response && response.data && response.data.errcode === 0) {
      Alert.alert('Thành công', `${response.data.message}`);
      socket.emit('send-message', {actionName: 'DSBN'});
      navigation.navigate('Login');
    } else {
      Alert.alert('Lỗi', `${response.data.message}`);
    }
  };

  const handleConfirmDate = date => {
    const formattedDate = date.toLocaleDateString('vi-VN');
    setFormData({...formData, ngaySinh: formattedDate});
    setDatePickerVisibility(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/BackgroundLogin.png')}
        resizeMode="cover"
        style={styles.image}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container01}>
            <Image
              source={require('../../../assets/images/Logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.container02}>
            <View style={styles.container021}>
              <Text style={styles.title}>Tạo hồ sơ bệnh nhân</Text>
            </View>
            <View style={styles.container022}>
              <View>
                <Text style={styles.itemText}>Họ Tên</Text>
                <TextInput
                  style={[
                    style.input,
                    {
                      borderColor: objValidInput.isValidHoTen
                        ? '#7864EA'
                        : 'red',
                    },
                    {
                      color: objValidInput.isValidHoTen ? 'black' : 'red',
                    },
                    {marginBottom: 0},
                  ]}
                  value={formData.hoTen}
                  onChangeText={value => handleChange('hoTen', value)}
                />
                <View style={styles.error}>
                  {!objValidInput.isValidHoTen && (
                    <Text style={styles.errorText}>Chưa nhập họ tên</Text>
                  )}
                </View>
              </View>
              <View>
                <Text style={styles.itemText}>CCCD</Text>
                <TextInput
                  style={[
                    style.input,
                    {
                      borderColor: objValidInput.isValidCCCD
                        ? '#7864EA'
                        : 'red',
                    },
                    {
                      color: objValidInput.isValidCCCD ? 'black' : 'red',
                    },
                    {marginBottom: 0},
                  ]}
                  value={formData.cccd}
                  onChangeText={value => handleChange('cccd', value)}
                />
                <View style={styles.error}>
                  {!objValidInput.isValidCCCD && (
                    <Text style={styles.errorText}>Chưa nhập CCCD</Text>
                  )}
                </View>
              </View>
              <View style={styles.itemGroup}>
                <View>
                  <Text style={styles.itemText}>Giới Tính</Text>
                  <SelectDropdown
                    data={gioiTinh}
                    // defaultValue={formData.gioiTinh}
                    onSelect={selectedItem => {
                      handleChange('gioiTinh', selectedItem.gioiTinh);
                    }}
                    renderButton={(selectedItem, isOpened) => (
                      <View
                        style={[
                          style.input,
                          {width: 130, flexDirection: 'row'},
                        ]}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                          {(selectedItem && selectedItem.gioiTinh) ||
                            formData.gioiTinh ||
                            'Chọn'}
                        </Text>
                        <Icon
                          name={isOpened ? 'chevron-up' : 'chevron-down'}
                          style={styles.dropdownButtonArrowStyle}
                        />
                      </View>
                    )}
                    renderItem={(item, isSelected) => (
                      <View
                        style={{
                          ...styles.dropdownItemStyle,
                          ...(isSelected && {backgroundColor: '#D2D9DF'}),
                        }}>
                        <Text style={styles.dropdownItemTxtStyle}>
                          {item.gioiTinh}
                        </Text>
                      </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />
                </View>

                <View>
                  <Text style={styles.itemText}>Ngày Sinh</Text>
                  <TouchableOpacity
                    onPress={() => setDatePickerVisibility(true)}>
                    <TextInput
                      style={[style.input, {width: 160}]}
                      value={formData.ngaySinh}
                      editable={false}
                    />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={() => setDatePickerVisibility(false)}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.itemText}>Số Điện Thoại</Text>
                <TextInput
                  style={[style.input]}
                  value={formData.soDienThoai}
                  onChangeText={value => handleChange('soDienThoai', value)}
                />
              </View>
              <View>
                <Text style={styles.itemText}>Địa Chỉ</Text>
                <TextInput
                  style={[style.input]}
                  value={formData.diaChi}
                  onChangeText={value => handleChange('diaChi', value)}
                />
              </View>
              <View>
                <Text style={styles.itemText}>Tiền Sử Bệnh</Text>
                <TextInput
                  style={[style.input]}
                  value={formData.tienSuBenh}
                  onChangeText={value => handleChange('tienSuBenh', value)}
                />
              </View>
              <View>
                <Text style={styles.itemText}>Dị Ứng</Text>
                <TextInput
                  style={[style.input]}
                  value={formData.diUng}
                  onChangeText={value => handleChange('diUng', value)}
                />
              </View>
            </View>
            <View style={styles.container023}>
              <TouchableOpacity style={style.btnSub} onPress={handleRegister}>
                <Text style={[style.h4, style.white]}>Đăng Ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  container01: {
    flex: 1,
  },
  container02: {
    flex: 1,
    marginHorizontal: 40,
    marginTop: 10,
  },
  container021: {
    flex: 3,
    borderColor: 'back',
  },
  container022: {
    flex: 7,
    borderColor: 'back',
  },
  container023: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: 'back',
    marginVertical: 30,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  error: {
    height: 20,
  },
  dropdownButtonStyle: {
    backgroundColor: '#E8D5FF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 4,
    borderColor: '#7864EA',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#000',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E8D5FF',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#7864EA',
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#000',
  },
  searchInput: {
    backgroundColor: '#E8D5FF',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#7864EA',
    paddingHorizontal: 12,
    marginTop: 8,
  },
  logo: {
    marginLeft: 40,
    marginTop: 80,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 26,
    color: '#000000',
  },
  itemGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: Fonts.bold,
    marginLeft: 4,
  },
  itemTextInput: {
    fontSize: 16,
    borderWidth: 4,
    color: '#000000',
    borderRadius: 10,
    borderColor: '#7864EA',
    backgroundColor: '#E8D5FF',
    fontFamily: Fonts.regular,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  registerBtn: {
    backgroundColor: '#EA793A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Fonts.bold,
    width: '40%',
  },
  registerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
});

export default RegisterScreen03;
