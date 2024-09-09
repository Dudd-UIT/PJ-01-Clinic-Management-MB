import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Fonts from '../../../assets/fonts/Fonts';
import {useColorScheme} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../services/userService';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {BCarefulTheme, style} from '../../component/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProfileScreen = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const gioiTinh = [{gioiTinh: 'Nam'}, {gioiTinh: 'Nữ'}, {gioiTinh: 'Khác'}];
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const user = useSelector(state => state.auth?.user); // user chứa token, isAuthenticated, account
  let userInfo = {};
  let groupNameUser = '';
  if (user && user.account) {
    if (user.account.userInfo) {
      userInfo = user.account.userInfo[0];
    }
    if (user.account.groupName) {
      groupNameUser = user.account.groupName;
    }
  }

  const formDataDefault = {
    maBN: userInfo.MABN,
    hoTen: userInfo.HOTEN,
    email: userInfo.EMAIL,
    cccd: userInfo.CCCD,
    gioiTinh: userInfo.GIOITINH,
    ngaySinh: userInfo.NGAYSINH
      ? new Date(userInfo.NGAYSINH).toLocaleDateString('vi-VN')
      : '',
    soDienThoai: userInfo.SDT,
    diaChi: userInfo.DIACHI,
    tienSuBenh: userInfo.TIENSUBENH,
    diUng: userInfo.DIUNG,
  };

  const [formData, setFormData] = useState(formDataDefault);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    console.log("USER IN PROFILE >>>>>>>>>>>>", user)
    if (userInfo) {
      setFormData({
        maBN: userInfo.MABN || '',
        hoTen: userInfo.HOTEN || '',
        email: userInfo.EMAIL || '',
        cccd: userInfo.CCCD || '',
        gioiTinh: userInfo.GIOITINH || '',
        ngaySinh: userInfo.NGAYSINH
          ? new Date(userInfo.NGAYSINH).toLocaleDateString('vi-VN')
          : '',
        soDienThoai: userInfo.SDT || '',
        diaChi: userInfo.DIACHI || '',
        tienSuBenh: userInfo.TIENSUBENH || '',
        diUng: userInfo.DIUNG || '',
      });
    }
  }, [userInfo]);

  const defaultObjValidInput = {
    isValidHoTen: true,
    isValidCCCD: true,
    isValidEmail: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleChange = (fieldName, value) => {
    setFormData({...formData, [fieldName]: value});
  };

  const handleSave = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!formData.hoTen) {
      setObjValidInput({...defaultObjValidInput, isValidHoTen: false});
      return;
    }
    if (!formData.email) {
      setObjValidInput({...defaultObjValidInput, isValidEmail: false});
      return;
    }
    if (!formData.cccd) {
      setObjValidInput({...defaultObjValidInput, isValidCCCD: false});
      return;
    }

    const response = await updateUser(formData);

    if (response && response.data && response.data.errcode === 0) {
      Alert.alert('Thành công', `${response.data.message}`);
      navigation.navigate('Home');
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
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container01}>
            <Text style={styles.title}>Tài Khoản</Text>
          </View>
          <View style={styles.container02}>
            <Image
              source={require('../../../assets/images/Avatar.png')}
              style={styles.avatar}
            />
            <View style={{gap: 20}}>
              <View>
                <Text style={style.h4}>Họ Tên</Text>
                <TextInput
                  style={[
                    style.input,
                    {
                      borderColor: objValidInput.isValidHoTen
                        ? BCarefulTheme.colors.primary
                        : BCarefulTheme.colors.red,
                    },
                    {
                      color: objValidInput.isValidHoTen ? 'black' : BCarefulTheme.colors.red,
                    },
                  ]}
                  value={formData.hoTen}
                  onChangeText={value => handleChange('hoTen', value)}
                />
                <View style={styles.error}>
                  {!objValidInput.isValidHoTen && (
                    <Text style={[style.t3, style.danger]}>Chưa nhập họ tên</Text>
                  )}
                </View>
              </View>
              <View>
                <Text style={style.h4}>Email</Text>
                <TextInput
                  style={[
                    style.input,
                    {
                      borderColor: objValidInput.isValidEmail
                        ? BCarefulTheme.colors.primary
                        : BCarefulTheme.colors.red,
                    },
                    {
                      color: objValidInput.isValidEmail ? 'black' : BCarefulTheme.colors.red,
                    },
                  ]}
                  value={formData.email}
                  onChangeText={value => handleChange('email', value)}
                />
                <View style={styles.error}>
                  {!objValidInput.isValidEmail && (
                    <Text style={[style.t3, style.danger]}>Chưa nhập email</Text>
                  )}
                </View>
              </View>
              <View>
                <Text style={style.h4}>CCCD</Text>
                <TextInput
                  style={[
                    style.input,
                    {
                      borderColor: objValidInput.isValidCCCD
                        ? BCarefulTheme.colors.primary
                        : BCarefulTheme.colors.red,
                    },
                    {
                      color: objValidInput.isValidCCCD ? 'black' : BCarefulTheme.colors.red,
                    },
                  ]}
                  value={formData.cccd}
                  onChangeText={value => handleChange('cccd', value)}
                />
                <View style={styles.error}>
                  {!objValidInput.isValidCCCD && (
                    <Text style={[style.t3, style.danger]}>Chưa nhập CCCD</Text>
                  )}
                </View>
              </View>
              <View style={styles.itemGroup}>
                <View>
                  <Text style={style.h4}>Giới Tính</Text>
                  <SelectDropdown
                    data={gioiTinh}
                    // defaultValue={userInfo.gioiTinh}
                    onSelect={selectedItem => {
                      handleChange('gioiTinh', selectedItem.gioiTinh);
                    }}
                    renderButton={(selectedItem, isOpened) => (
                      <View style={[style.input, {width: 130, flexDirection: 'row'}]}>
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
                  <Text style={style.h4}>Ngày Sinh</Text>
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
              {showMore && (
                <>
                  <View>
                    <Text style={style.h4}>Số Điện Thoại</Text>
                    <TextInput
                      style={[style.input]}
                      value={formData.soDienThoai}
                      onChangeText={value => handleChange('soDienThoai', value)}
                    />
                  </View>
                  <View>
                    <Text style={style.h4}>Địa Chỉ</Text>
                    <TextInput
                      style={[style.input]}
                      value={formData.diaChi}
                      onChangeText={value => handleChange('diaChi', value)}
                    />
                  </View>
                  <View>
                    <Text style={style.h4}>Tiền Sử Bệnh</Text>
                    <TextInput
                      style={[style.input]}
                      value={formData.tienSuBenh}
                      onChangeText={value => handleChange('tienSuBenh', value)}
                    />
                  </View>
                  <View>
                    <Text style={style.h4}>Dị Ứng</Text>
                    <TextInput
                      style={[style.input]}
                      value={formData.diUng}
                      onChangeText={value => handleChange('diUng', value)}
                    />
                  </View>
                </>
              )}
              <TouchableOpacity
                style={styles.showMoreBtn}
                onPress={() => setShowMore(!showMore)}>
                <IconAntDesign
                  name={showMore ? 'caretup' : 'caretdown'}
                  style={{color: BCarefulTheme.colors.secondary, fontSize: 24}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.container023}>
              <TouchableOpacity style={style.btn} onPress={handleSave}>
                <Text style={[style.h4, style.white]}>Lưu thông tin</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  container02: {
    flex: 1,
    marginHorizontal: 40,
  },
  avatar: {
    marginHorizontal: 'auto',
    borderRadius: 120,
    width: 120,
    height: 120,
  },
  container023: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: 'back',
    marginVertical: 30,
  },
  errorText: {
    color: BCarefulTheme.colors.red,
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  error: {
    position: 'absolute',
    bottom: -20,
    // height: 20,
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
    borderColor: BCarefulTheme.colors.primary,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#000',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: '#000'
  },
  dropdownMenuStyle: {
    backgroundColor: '#E8D5FF',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: BCarefulTheme.colors.primary,
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
  logo: {
    // marginLeft: 40,
    // marginTop: 80,
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
  saveBtn: {
    backgroundColor: BCarefulTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Fonts.bold,
    width: '50%',
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  showMoreBtn: {
    justifyContent: 'center',
    borderTopWidth: 4,
    borderTopColor: BCarefulTheme.colors.secondary,
    alignItems: 'center',
    paddingHorizontal: 4,
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
});

export default ProfileScreen;