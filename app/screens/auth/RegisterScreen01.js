import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Fonts from '../../../assets/fonts/Fonts';
import {verifyUser} from '../../services/userService';
import {fetchAllBenhNhanAction} from '../../redux/action/fetchAllBenhNhanAction';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BCarefulTheme, style} from '../../component/Theme';
import {color} from '@rneui/base';

//NHAP EMAIL VA GUI XAC THUC
const verifyEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const RegisterScreen01 = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayPatients, setDisplayPatients] = useState([]);
  const patients = useSelector(state => state.benhNhan?.data) || [];
  const selectDropdownRef = useRef();
  const [oldPatient, setOldPatient] = useState({});

  useEffect(() => {
    dispatch(fetchAllBenhNhanAction());
  }, []);

  useEffect(() => {
    if (patients) {
      let filteredPatients = [...patients];
      if (email) {
        filteredPatients = filteredPatients.filter(
          data => data.EMAIL === email,
        );
        setDisplayPatients(filteredPatients);
        if (filteredPatients.length === 0) {
          setOldPatient({});
        }
      } else {
        setDisplayPatients([]);
      }
    }
  }, [email]);

  const defaultObjValidInput = {
    isValidEmail: true,
    isEmail: true,
    isRegister: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const openDropdown = () => {
    if (displayPatients.length > 0) {
      selectDropdownRef.current?.openDropdown();
    } else {
      setObjValidInput({...defaultObjValidInput, isRegister: false});
    }
  };

  const handleVerify = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!email) {
      setObjValidInput({...defaultObjValidInput, isValidEmail: false});
      return;
    }
    if (!verifyEmail(email)) {
      setObjValidInput({...defaultObjValidInput, isEmail: false});
      return;
    }

    setIsLoading(true);
    const response = await verifyUser(email);

    if (response && response.data && response.data.errcode === 0) {
      setIsLoading(false);
      navigation.navigate('VerificationForm', {...oldPatient, email});
    }
    if (response && response.data && response.data.errcode !== 0) {
      Alert.alert('Lỗi', `${response.data.message}`);
    }
  };

  const handlePatientSelect = selectedItem => {
    setOldPatient({...selectedItem});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ImageBackground
        source={require('../../../assets/images/BackgroundLogin.png')}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="hanlde">
          <View style={styles.container01}>
            <Image
              source={require('../../../assets/images/Logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.container02}>
            <View style={styles.container021}>
              <Text style={style.h1}>Chào Mừng Đến Với BCarefull!</Text>
              <Text style={style.t1}>Nhập Email Để Tiếp Tục</Text>
            </View>
            <View style={styles.container022}>
              <View>
                <Text style={style.h4}>Email</Text>
                <View style={styles.itemGroup}>
                  <TextInput
                    style={[
                      style.input,
                      {
                        borderColor:
                          objValidInput.isValidEmail && objValidInput.isEmail
                            ? '#7864EA'
                            : 'red',
                      },
                      {
                        color:
                          objValidInput.isValidEmail && objValidInput.isEmail
                            ? 'black'
                            : 'red',
                      },
                      {
                        borderRadius: 0,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        flexGrow: 1,
                      },
                    ]}
                    value={email}
                    onChangeText={value => setEmail(value)}
                  />
                  <TouchableOpacity
                    style={[
                      styles.dropdownButtonStyle,
                      {
                        width: 60,
                        borderWidth: 3,
                        borderRadius: 0,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                      },
                      {
                        borderColor:
                          objValidInput.isValidEmail && objValidInput.isEmail
                            ? '#7864EA'
                            : 'red',
                      },
                      {
                        color:
                          objValidInput.isValidEmail && objValidInput.isEmail
                            ? 'black'
                            : 'red',
                      },
                      {
                        backgroundColor:
                          email && verifyEmail(email)
                            ? BCarefulTheme.colors.secondary
                            : 'grey',
                      },
                    ]}
                    disabled={!(email && verifyEmail(email))}
                    onPress={openDropdown}>
                    <Icon
                      name={'account-search'}
                      style={[
                        styles.iconStyle,
                        {color: email && verifyEmail(email) ? '#fff' : '#000'},
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.error}>
                  {!objValidInput.isValidEmail && (
                    <Text style={[style.t4, style.danger]}>
                      Chưa nhập email.
                    </Text>
                  )}
                  {!objValidInput.isEmail && (
                    <Text style={[style.t4, style.danger]}>
                      Email không đúng định dạng.
                    </Text>
                  )}
                  {!objValidInput.isRegister && (
                    <Text style={[style.t4, style.danger]}>
                      Không tìm thấy hồ sơ tương ứng với email.
                    </Text>
                  )}
                </View>
                <SelectDropdown
                  ref={selectDropdownRef}
                  data={displayPatients}
                  onSelect={selectedItem => handlePatientSelect(selectedItem)}
                  renderItem={(item, index, isSelected) => (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && {backgroundColor: '#D2D9DF'}),
                      }}>
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.HOTEN + ' - ' + item.SDT}
                      </Text>
                      <Icon name={'chevron-right'} style={styles.iconStyle} />
                    </View>
                  )}
                  showsVerticalScrollIndicator={true}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
              </View>
              {oldPatient.HOTEN ? (
                <View style={styles.displayTTBN}>
                  <Text style={styles.itemText}>Thông tin bệnh nhân</Text>
                  <View style={[styles.itemTextInput]}>
                    <View
                      style={[
                        styles.itemGroup,
                        {justifyContent: 'center', alignItems: 'center'},
                      ]}>
                      <Icon
                        name={'information'}
                        style={[styles.iconStyle, {marginRight: 8}]}
                      />
                      <TextInput
                        style={[
                          styles.itemText,
                          {fontFamily: Fonts.regular, flex: 1},
                        ]}
                        value={oldPatient.HOTEN}
                        editable={false}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={[
                          style.spacebtw,
                          style.center,
                          {
                            flex: 1, // Thêm flex: 1 để chia đều không gian
                            marginRight: 4, // Thêm khoảng cách giữa các View con nếu cần
                          },
                        ]}>
                        <Icon
                          name={'barcode'}
                          style={[styles.iconStyle, {marginRight: 8}]}
                        />
                        <TextInput
                          style={[
                            styles.itemText,
                            {fontFamily: Fonts.regular, flex: 1},
                          ]}
                          value={'BN - ' + oldPatient.MABN}
                          editable={false}
                        />
                      </View>
                      <View
                        style={[
                          style.spacebtw,
                          style.center,
                          {
                            flex: 1, // Thêm flex: 1 để chia đều không gian
                          },
                        ]}>
                        <Icon
                          name={'cellphone'}
                          style={[styles.iconStyle, {marginRight: 8}]}
                        />
                        <TextInput
                          style={[
                            styles.itemText,
                            {fontFamily: Fonts.regular, flex: 1},
                          ]}
                          value={oldPatient.SDT}
                          editable={false}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.displayTTBN}></View>
              )}
            </View>
          </View>
          <View style={styles.container03}>
            <View style={styles.container023}>
              <TouchableOpacity style={style.btnSub} onPress={handleVerify}>
                <Text style={[style.h4, style.white]}>Xác thực</Text>
              </TouchableOpacity>
            </View>
            <Text style={style.t4}>Đã có tài khoản?</Text>
            <TouchableOpacity
              style={style.btnOutline}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={style.h4}>Đăng Nhập Tài Khoản</Text>
            </TouchableOpacity>
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
  spinnerTextStyle: {
    color: '#FFF',
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
    borderStartWidth: 0,
    borderColor: '#7864EA',
  },
  iconStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E8D5FF',
    borderRadius: 10,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#7864EA',
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#000',
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
  },
  container03: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    marginLeft: 40,
    marginTop: 80,
  },
  questionText: {
    color: '#606060',
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 26,
    color: '#000000',
  },
  content: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#000000',
    marginTop: -10,
  },
  itemGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  itemTextInput: {
    color: 'black',
    fontSize: 16,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: '#7864EA',
    backgroundColor: '#E8D5FF',
    fontFamily: Fonts.regular,
    paddingLeft: 8,
  },
  displayTTBN: {
    height: 140,
    marginTop: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  error: {
    height: 20,
  },
  verifyBtn: {
    backgroundColor: '#EA793A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Fonts.bold,
    width: '40%',
  },
  verifyText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
  },
  loginBtn: {
    borderColor: '#7864EA',
    borderWidth: 4,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 16,
    fontFamily: Fonts.bold,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginHorizontal: 'auto',
  },
  loginText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: Fonts.bold,
  },
});

export default RegisterScreen01;
