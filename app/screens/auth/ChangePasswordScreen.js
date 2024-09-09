import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Fonts from '../../../assets/fonts/Fonts';
import {changeUserPassword} from '../../services/userService';
import {BCarefulTheme, style} from '../../component/Theme';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const ChangePasswordScreen = ({navigation}) => {
  const user = useSelector(state => state.auth?.user); // user chứa token, isAuthenticated, account
  let userInfo = {};
  if (user && user.account) {
    if (user.account.userInfo) {
      userInfo = user.account.userInfo[0];
    }
  }

  const [email, setEmail] = useState(userInfo.EMAIL);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const defaultObjValidInput = {
    isValidEmail: true,
    isValidOldPassword: true,
    isValidNewPassword: true,
    isValidConfirmPassword: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleChangePassword = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!email) {
      setObjValidInput({...defaultObjValidInput, isValidEmail: false});
      return;
    }
    if (!oldPassword) {
      setObjValidInput({...defaultObjValidInput, isValidOldPassword: false});
      return;
    }
    if (!newPassword) {
      setObjValidInput({...defaultObjValidInput, isValidNewPassword: false});
      return;
    }
    if (!confirmPassword) {
      setObjValidInput({
        ...defaultObjValidInput,
        isValidConfirmPassword: false,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setObjValidInput({
        ...defaultObjValidInput,
        isValidConfirmPassword: false,
      });
      return;
    }

    const response = await changeUserPassword(email, oldPassword, newPassword);

    if (response && response.data && response.data.errcode === 0) {
      Alert.alert(response.data.message);
      navigation.navigate('HomeTabs');
    }
    if (response && response.data && response.data.errcode !== 0) {
      Alert.alert(response.data.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="hanlde">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name={'arrow-back'} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.title}>Đổi mật khẩu</Text>
        </View>
        <View style={styles.body}>
          <View>
            <Text style={styles.itemText}>Email</Text>
            <TextInput
              style={[
                style.input,
                {
                  borderColor: objValidInput.isValidEmail ? '#7864EA' : 'red',
                },
                {color: objValidInput.isValidEmail ? 'black' : 'red'},
              ]}
              value={email}
              onChangeText={value => setEmail(value)}
            />
            <View style={styles.error}>
              {!objValidInput.isValidEmail && (
                <Text style={[style.t3, style.danger]}>Chưa nhập email.</Text>
              )}
              {!objValidInput.isValidEmail && (
                <Text style={[style.t3, style.danger]}>
                  Email không đúng định dạng.
                </Text>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.itemText}>Nhập mật khẩu cũ</Text>
            <View style={styles.itemGroup}>
              <TextInput
                style={[
                  style.input,
                  {
                    borderColor: objValidInput.isValidOldPassword
                      ? '#7864EA'
                      : 'red',
                  },
                  {
                    color: objValidInput.isValidOldPassword ? 'black' : 'red',
                  },
                  {
                    borderRadius: 0,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    flexGrow: 1,
                  },
                ]}
                value={oldPassword}
                onChangeText={value => setOldPassword(value)}
                autoCapitalize="none"
                secureTextEntry={!isOldPasswordVisible}
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
                    borderColor: objValidInput.isValidOldPassword
                      ? '#7864EA'
                      : 'red',
                  },
                  {
                    color: objValidInput.isValidOldPassword ? 'black' : 'red',
                  },
                ]}
                onPress={() => setIsOldPasswordVisible(!isOldPasswordVisible)}>
                <Icon
                  name={isOldPasswordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.error}>
              {!objValidInput.isValidOldPassword && (
                <Text style={styles.errorText}>Chưa nhập mật khẩu</Text>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.itemText}>Nhập mật khẩu mới</Text>
            <View style={styles.itemGroup}>
              <TextInput
                style={[
                  style.input,
                  {
                    borderColor: objValidInput.isValidNewPassword
                      ? '#7864EA'
                      : 'red',
                  },
                  {
                    color: objValidInput.isValidNewPassword ? 'black' : 'red',
                  },
                  {
                    borderRadius: 0,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    flexGrow: 1,
                  },
                ]}
                value={newPassword}
                onChangeText={value => setNewPassword(value)}
                autoCapitalize="none"
                secureTextEntry={!isNewPasswordVisible}
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
                    borderColor: objValidInput.isValidNewPassword
                      ? '#7864EA'
                      : 'red',
                  },
                  {
                    color: objValidInput.isValidNewPassword ? 'black' : 'red',
                  },
                ]}
                onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}>
                <Icon
                  name={isNewPasswordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.error}>
              {!objValidInput.isValidNewPassword ? (
                <Text style={styles.errorText}>Chưa nhập mật khẩu mới</Text>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.itemText}>Xác nhận mật khẩu mới</Text>
            <View style={styles.itemGroup}>
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
                  {
                    borderRadius: 0,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    flexGrow: 1,
                  },
                ]}
                value={confirmPassword}
                onChangeText={value => setConfirmPassword(value)}
                autoCapitalize="none"
                secureTextEntry={!isConfirmPasswordVisible}
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
                onPress={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }>
                <Icon
                  name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.error}>
              {!objValidInput.isValidConfirmPassword ? (
                <Text style={styles.errorText}>
                  Vui lòng xác nhận lại mật khẩu mới
                </Text>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.changePasswordBtn}
            onPress={handleChangePassword}>
            <Text style={styles.changePasswordText}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  body: {
    marginHorizontal: 40,
    paddingVertical: 40,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
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
  title: {
    margin: 'auto',
    fontFamily: Fonts.bold,
    fontSize: 26,
    color: '#000',
  },
  icon: {
    color: '#000',
    fontSize: 30,
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
  changePasswordBtn: {
    backgroundColor: BCarefulTheme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontFamily: Fonts.bold,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
  changePasswordText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: Fonts.bold,
  },
});

export default ChangePasswordScreen;
