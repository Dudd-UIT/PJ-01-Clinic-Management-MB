import React, {useState} from 'react';
import {Button} from '@rneui/themed';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Fonts from '../../../assets/fonts/Fonts';
import {login} from '../../redux/slice/authSlice';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../services/userService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {style, BCarefulTheme} from '../../component/Theme';
import Icon from 'react-native-vector-icons/Ionicons';

const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('doandanhdu999@gmail.com');
  const [password, setPassword] = useState('Admin@1234');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const defaultObjValidInput = {
    isValidEmail: true,
    isEmail: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!email) {
      setObjValidInput({...defaultObjValidInput, isValidEmail: false});
      return;
    }
    if (!isValidEmail(email)) {
      setObjValidInput({...defaultObjValidInput, isEmail: false});
      return;
    }
    if (!password) {
      setObjValidInput({...defaultObjValidInput, isValidPassword: false});
      return;
    }

    const response = await loginUser(email, password);

    if (response && response.data && response.data.errcode === 0) {
      const roles = response.data.data.roles;
      const username = response.data.data.username;
      const groupName = response.data.data.groupName;
      const groupID = response.data.data.groupID;
      const userInfo = response.data.data.userInfo;
      const token = response.data.data.access_token; // token chứa username và roles

      let data = {
        isAuthenticated: true,
        token,
        account: {
          roles,
          groupName,
          groupID,
          username,
          userInfo,
        },
      };

      dispatch(login(data));
      navigation.navigate('HomeTabs');
      setEmail('');
      setPassword('');
    }
    if (response && response.data && response.data.errcode !== 0) {
      Alert.alert('Lỗi', `${response.data.message}`);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/BackgroundLogin.png')}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="handle">
          <View style={styles.container01}>
            <Image
              source={require('../../../assets/images/Logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.container02}>
            <View style={styles.container021}>
              <Text style={[style.h1]}>Chào Mừng Trở Lại BCarefull!</Text>
              <Text style={style.t1}>Đăng Nhập Để Tiếp Tục</Text>
            </View>
            <View style={styles.container022}>
              <View>
                <Text style={style.h4}>Email</Text>
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
                  ]}
                  value={email}
                  onChangeText={value => setEmail(value)}
                />
                <View style={styles.error}>
                  {!objValidInput.isValidEmail && (
                    <Text style={[style.t3, style.danger]}>
                      Chưa nhập email
                    </Text>
                  )}
                  {!objValidInput.isEmail && (
                    <Text style={[style.t3, style.danger]}>
                      Email không đúng định dạng.
                    </Text>
                  )}
                </View>
              </View>
              <View>
                <Text style={style.h4}>Mật Khẩu</Text>
                <View style={styles.itemGroup}>
                  <TextInput
                    style={[
                      style.input,
                      {
                        borderColor: objValidInput.isValidPassword
                          ? '#7864EA'
                          : 'red',
                      },
                      {
                        color: objValidInput.isValidPassword ? 'black' : 'red',
                      },
                      {
                        borderRadius: 0,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        flexGrow: 1,
                      },
                    ]}
                    value={password}
                    onChangeText={value => setPassword(value)}
                    autoCapitalize="none"
                    secureTextEntry={!isPasswordVisible}
                  />
                  <TouchableOpacity
                    style={[
                      styles.dropdownButtonStyle,
                      {
                        borderWidth: 3,
                        borderRadius: 0,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                      },
                      {
                        borderColor: objValidInput.isValidPassword
                          ? '#7864EA'
                          : 'red',
                      },
                      {
                        color: objValidInput.isValidPassword ? 'black' : 'red',
                      },
                    ]}
                    onPress={togglePasswordVisibility}>
                    <Icon
                      name={isPasswordVisible ? 'eye-off' : 'eye'}
                      size={20}
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.error}>
                  {!objValidInput.isValidPassword ? (
                    <Text style={[style.t3, style.danger]}>
                      Chưa nhập password
                    </Text>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
              <View style={style.row}>
                <TouchableOpacity style={styles.saveInfoBtn} />
                <Text style={[style.t3, style.px3]}>
                  Lưu Thông Tin Đăng Nhập
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.container023}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}>
              <Text style={style.t5}>Quên Mật Khẩu?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[style.btn]} onPress={handleLogin}>
              <Text style={[style.h4, style.white]}>Đăng Nhập</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingVertical: 20}}>
            <TouchableOpacity
              style={[style.btnOutlineSub]}
              onPress={() => {
                navigation.navigate('Register01');
              }}>
              <Text style={style.h4}>Đăng Kí Tài Khoản Mới</Text>
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
    paddingVertical: 20,
    margin: 18,
  },
  logo: {
    marginLeft: 40,
    marginTop: 80,
  },
  itemGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownButtonStyle: {
    backgroundColor: BCarefulTheme.colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 3,
    borderStartWidth: 0,
    borderColor: BCarefulTheme.colors.primary,
  },
  eyeIcon: {
    color: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    height: 24,
  },
  saveInfoBtn: {
    borderColor: BCarefulTheme.colors.secondary,
    borderWidth: 4,
    borderRadius: 10,
    width: 20,
    height: 20,
  },
});

export default LoginScreen;
