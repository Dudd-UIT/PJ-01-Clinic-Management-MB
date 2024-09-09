import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import {confirmUser, verifyUser} from '../../services/userService';
import Fonts from '../../../assets/fonts/Fonts';
import {style} from '../../component/Theme';

// XAC THUC EMAIL
const VerificationForm = ({navigation, route}) => {
  const [otps, setOtps] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const handleResendOtp = async () => {
    setCountdown(60);
    setIsResendDisabled(true);
    setOtps(['', '', '', '', '', '']);
    await verifyUser(route.params.email);
  };

  const handleConfirm = async () => {
    const email = route.params.email;
    const otp = otps.join('');
    console.log('otp', otp);
    const response = await confirmUser(email, otp);
    if (response && response.data && response.data.errcode === 0) {
      Alert.alert('', `${response.data.message}`);
      navigation.navigate('Register02', {...route.params});
    } else {
      Alert.alert('Error', `${response.data.message}`);
    }
  };

  const handleChangeText = (value, index) => {
    const newOtp = [...otps];
    newOtp[index] = value;
    setOtps(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otps[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={[style.container, style.center]}>
      <View style={styles.content}>
        <Text style={style.h1}>Nhập mã OTP</Text>
        <Text style={style.t1}>Vui lòng kiểm tra Email và nhập mã OTP</Text>
        <Text style={style.t1}>chúng tôi vừa gửi cho bạn.</Text>
      </View>

      <View style={styles.otpContainer}>
        {otps.map((digit, index) => (
          <TextInput
            key={index}
            ref={el => (inputRefs.current[index] = el)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={value => handleChangeText(value, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <View style={styles.resendCode}>
        <Text style={style.t1}>Không nhận được mã?</Text>
        <TouchableOpacity onPress={handleResendOtp} disabled={isResendDisabled}>
          <Text style={[style.h4, style.primary]}> Gửi lại mã.</Text>
        </TouchableOpacity>
      </View>

      <Text style={style.t1}>Mã OTP hết hạn sau: {countdown}s</Text>

      <TouchableOpacity style={[style.btn]} onPress={handleConfirm}>
        <Text style={[style.h3, style.white]}>Xác Nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    width: '15%',
    height: 50,
    borderColor: '#7864EA',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  },
  resendCode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default VerificationForm;
