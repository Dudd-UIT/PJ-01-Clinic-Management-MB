import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import Fonts from '../../../assets/fonts/Fonts';

const {width: viewportWidth} = Dimensions.get('window');

const CarouselScreen = ({navigation}) => {
  const flatListRef = useRef();
  const itemWidth = viewportWidth;
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = [
    {
      id: '01',
      title: 'Welcome To BCarefull',
      text: 'Đăng ký khám và Theo dõi hành trình khám bệnh.',
      image: require('../../../assets/images/Carousel2.png'),
    },
    {
      id: '02',
      title: 'Đi Khám Nhanh Hơn',
      text: 'Chỉ đường đến và trong phòng khám, Thanh toán online các dịch vụ.',
      image: require('../../../assets/images/Carousel3.png'),
    },
    {
      id: '03',
      title: 'Theo Dõi Sức Khỏe Chi Tiết',
      text: 'Xem lại kết quả khám, Đặt lịch nhắc uống thuốc.',
      image: require('../../../assets/images/Carousel1.png'),
    },
    {
      id: '04',
      title: 'Và Nhiều Tiện Ích Khác!',
      text: 'Trợ lý ảo, mini game, tin tức cá nhân hóa, chẩn đoán hình ảnh bằng AI.',
      image: require('../../../assets/images/Carousel4.png'),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        flatListRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatListRef.current.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex, carouselData.length]);

  const getItemLayout = (data, index) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index,
  });

  const renderItem = ({item}) => (
    <View style={styles.contentContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.indicatorContainer}>{renderDot()}</View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / itemWidth);
    setActiveIndex(index);
  };

  const renderDot = () => {
    return carouselData.map((dot, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          {backgroundColor: activeIndex === index ? 'purple' : 'gray'},
        ]}
      />
    ));
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register01');
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/frame1.png')}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id}
          ref={flatListRef}
          data={carouselData}
          getItemLayout={getItemLayout}
          renderItem={renderItem}
          horizontal={true}
          pagingEnabled={true}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng Nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}>
            <Text style={styles.buttonText}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  background: {
    flex: 1,
    width: viewportWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: viewportWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 400,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    position: 'absolute',
    bottom: 70,
  },
  loginButton: {
    backgroundColor: '#7864EA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    width: '35%',
  },
  registerButton: {
    backgroundColor: '#EA793A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    width: '35%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: Fonts.bold,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
});

export default CarouselScreen;
