import React, {useState} from 'react';
import {Button, ButtonGroup, withTheme} from '@rneui/themed';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  useColorScheme,
  TextInput,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Fonts from '../../../assets/fonts/Fonts';
import {login} from '../../redux/slice/authSlice';
import {useDispatch} from 'react-redux';
import {style} from '../../component/Theme';

const ForgotPassword = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConFirmPassword] = useState('');

  const defaultObjValidInput = {
    isValidPhoneNumber: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleRegister = () => {
    setObjValidInput(defaultObjValidInput);
    if (!phoneNumber) {
      setObjValidInput({...defaultObjValidInput, isValidPhoneNumber: false});
      return;
    }
    if (!password) {
      setObjValidInput({...defaultObjValidInput, isValidPassword: false});
      return;
    }
    if (!confirmPassword) {
      setObjValidInput({
        ...defaultObjValidInput,
        isValidConfirmPassword: false,
      });
      return;
    }
    if (confirmPassword !== password) {
      Alert.alert('Lỗi', 'Mật khẩu không đồng nhất. Vui lòng nhập lại...');
      return;
    }
    const data = {
      isAuthenticated: true,
    };
    dispatch(login(data));
    navigation.navigate('HomeTabs');
    setUsername('');
    setPassword('');
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
          keyboardShouldPersistTaps="hanlde">
          <View style={styles.container01}>
            <Image
              source={require('../../../assets/images/Logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.container02}>
            <View style={styles.container021}>
              <Text style={styles.title}>Chào Mừng Đến Với BCareful!</Text>
              <Text style={styles.content}>Nhập lại các thông tin</Text>
            </View>
            <View style={styles.container022}>
              <View style={styles.itemGroup}>
                <Text style={styles.itemText}>Số Điện Thoại</Text>
                <TextInput
                  style={[
                    style.input,
                    {
                      borderColor: objValidInput.isValidPhoneNumber
                        ? '#7864EA'
                        : 'red',
                    },
                    {color: objValidInput.isValidPhoneNumber ? 'black' : 'red'},
                  ]}
                  value={phoneNumber}
                  //   onBlur={handleUsernameBlur}
                  onChangeText={value => setPhoneNumber(value)}
                />
                <View style={styles.error}>
                  {!objValidInput.isValidPhoneNumber && (
                    <Text style={styles.errorText}>
                      Chưa nhập số điện thoại
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.itemGroup}>
                <Text style={styles.itemText}>Mật Khẩu mới</Text>
                <TextInput
                  style={[
                    style.input,
                    {
                      borderColor: objValidInput.isValidPassword
                        ? '#7864EA'
                        : 'red',
                    },
                    {color: objValidInput.isValidPassword ? 'black' : 'red'},
                  ]}
                  value={password}
                  //   onBlur={handleUsernameBlur}
                  onChangeText={value => setPassword(value)}
                />
                <View style={styles.error}>
                  {!objValidInput.isValidPassword && (
                    <Text style={styles.errorText}>Chưa nhập mật khẩu</Text>
                  )}
                </View>
              </View>
              <View style={styles.itemGroup}>
                <View style={styles.password}>
                  <Text style={styles.itemText}>Xác Nhận Mật Khẩu</Text>
                </View>
                <TextInput
                  style={[
                    style.input,
                    {
                      borderColor: objValidInput.isValidConfirmPassword
                        ? '#7864EA'
                        : 'red',
                    },
                    {
                      color: objValidInput.isValidConfirmPassword
                        ? 'black'
                        : 'red',
                    },
                  ]}
                  value={confirmPassword}
                  onChangeText={value => setConFirmPassword(value)}
                  //   onBlur={handlePasswordBlur}
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
                <View style={styles.error}>
                  {!objValidInput.isValidConfirmPassword ? (
                    <Text style={styles.errorText}>
                      Vui lòng xác nhận lại mật khẩu
                    </Text>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
              {/* <View style={styles.saveInfo}>
                  <TouchableOpacity style={styles.saveInfoBtn} />
                  <Text style={styles.saveInfoText}>Lưu Thông Tin Đăng Nhập</Text>
                </View> */}
            </View>
            <View style={styles.container023}>
              <TouchableOpacity style={style.btnSub} onPress={handleRegister}>
                <Text style={[style.h4, style.white]}>Đăng Ký</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container03}>
            <TouchableOpacity
              style={style.btnOutline}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={[style.h4]}>Đăng Nhập Tài Khoản</Text>
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
  },
  container03: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
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
  content: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#000000',
    marginTop: -10,
  },
  itemText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  itemTextInput: {
    fontSize: 16,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: '#7864EA',
    backgroundColor: '#E8D5FF',
    fontFamily: Fonts.regular,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  error: {
    height: 20,
  },
  password: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  registerBtn: {
    backgroundColor: '#EA793A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Fonts.bold,
    width: '40%',
    marginTop: 30,
  },
  registerText: {
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
    width: '54%',
    marginHorizontal: 'auto',
  },
  loginText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: Fonts.bold,
  },
});

export default ForgotPassword;
