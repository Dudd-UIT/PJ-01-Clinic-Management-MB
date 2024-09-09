import React, {useState} from 'react';
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
import Fonts from '../../../assets/fonts/Fonts';
import {registerUserTK} from '../../services/userService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {style} from '../../component/Theme';

// NHAP PASSWORD
const verifyPassword = password => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const RegisterScreen02 = ({navigation, route}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConFirmPassword] = useState('');
  const maBN = route.params.MABN || null;
  const email = route.params.email;

  const defaultObjValidInput = {
    isValidPassword: true,
    isPassword: true,
    isValidConfirmPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handlePassword = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!password) {
      setObjValidInput({...defaultObjValidInput, isValidPassword: false});
      return;
    }
    if (!verifyPassword(password)) {
      setObjValidInput({...defaultObjValidInput, isPassword: false});
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
    if (maBN) {
      const response = await registerUserTK({email, password, maBN});

      if (response && response.data && response.data.errcode === 0) {
        Alert.alert('Thành công', `${response.data.message}`);
        navigation.navigate('Login');
      } else {
        Alert.alert('Lỗi', `${response.data.message}`);
      }
    } else {
      navigation.navigate('Register03', {...route.params, password});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
              <Text style={style.p1}>Nhập Password Để Tiếp Tục</Text>
            </View>
            <View style={styles.container022}>
              <View style={styles.itemGroup}>
                <View style={style.spacebtw}>
                  <Text style={style.h4}>Mật Khẩu</Text>
                </View>
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
                  onChangeText={value => setPassword(value)}
                  //   onBlur={handleUsernameBlur}
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
                <View style={styles.error}>
                  {!objValidInput.isValidPassword && (
                    <Text style={[style.t3, style.danger]}>
                      Chưa nhập mật khẩu
                    </Text>
                  )}
                  {!objValidInput.isPassword && (
                    <Text style={[style.t3, style.danger]}>
                      Mật khẩu ít nhất 8 kí tự (chữ hoa, thường, số,... ).
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.itemGroup}>
                <View style={styles.password}>
                  <Text style={style.h4}>Xác Nhận Mật Khẩu</Text>
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
                    <Text style={[style.t3, style.danger]}>
                      Vui lòng xác nhận lại mật khẩu
                    </Text>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </View>
            <View style={[style.center]}>
              <TouchableOpacity style={style.btnSub} onPress={handlePassword}>
                <Text style={[style.h4, style.white]}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container03}>
            <Text style={style.h4}>Đã có tài khoản?</Text>
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
    marginTop: 32,
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
  forgotPasswordText: {
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

export default RegisterScreen02;
