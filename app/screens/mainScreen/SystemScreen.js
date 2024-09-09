import React from 'react';
import {Button, ThemeProvider} from '@rneui/themed';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {BCarefulTheme2} from '../../component/Theme';
import {logout} from '../../redux/slice/authSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import Fonts from '../../../assets/fonts/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {logoutUser} from '../../services/userService';
import {useDispatch} from 'react-redux';

function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    let response = await logoutUser();
    dispatch(logout());

    if (response && response.data && response.data.errcode === 0) {
      navigation.navigate('Login');
    } else {
      toast.error(response.data.message);
    }
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleAI = () => {
    navigation.navigate('ChanDoanXQuang');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>More</Text>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('Game')} >
          <Icon name={'book-outline'} style={styles.icon} />
          <Text style={styles.text}>Trò chơi giải trí</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAI}>
          <Icon name={'document-text-outline'} style={styles.icon} />
          <Text style={styles.text}>Chẩn đoán X-Quang</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChatBot')}>
          <Icon name={'chatbubbles-outline'} style={styles.icon} />
          <Text style={styles.text}>Trợ lý ảo BCare</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Icon name={'lock-closed-outline'} style={styles.icon} />
          <Text style={styles.text}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Icon name={'log-out-outline'} style={styles.icon} />
          <Text style={styles.text}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.bold,
    color: 'black',
    fontSize: 28,
    alignSelf: 'center',
  },
  menu: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#DED9FA',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    borderColor: BCarefulTheme2.colors.primary,
    borderWidth: 3,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 26,
  },
  icon: {
    color: '#000',
    fontSize: 30,
  },
  text: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: '#000',
    paddingLeft: 18,
  },
});

export default HomeScreen;
