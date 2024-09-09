import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Fonts from '../../assets/fonts/Fonts';
import {BCarefulTheme} from './Theme';

const {width: screenWidth} = Dimensions.get('window');
const pageWidth = screenWidth - 40 - 24; // Chiều rộng của trang trừ đi padding 20px mỗi bên

const Carousel = ({data}) => {
  const [currentPage, setCurrentPage] = useState(1); // Bắt đầu từ trang giả đầu tiên
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextPage = currentPage + 1;
      if (nextPage >= data.length + 1) {
        nextPage = 1; // Quay lại trang đầu tiên nếu đang ở trang giả cuối cùng
      }
      scrollToPage(nextPage, true);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPage]);

  const scrollToPage = (page, animated = true) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: page * pageWidth, animated});
      setCurrentPage(page);
    }
  };

  const handleScroll = event => {
    const {contentOffset} = event.nativeEvent;
    const page = Math.round(contentOffset.x / pageWidth);

    if (page !== currentPage) {
      if (page === data.length + 1) {
        // Nếu đến trang giả cuối cùng, chuyển về trang giả đầu tiên
        scrollToPage(1, false);
      } else if (page === 0) {
        // Nếu đến trang giả đầu tiên, chuyển về trang giả cuối cùng
        scrollToPage(data.length, false);
      } else {
        setCurrentPage(page);
      }
    }
  };

  const handleMomentumScrollEnd = () => {
    // Khi scroll end, luôn scroll đến trang hiện tại để đảm bảo không bị lệch
    scrollToPage(currentPage, false);
  };

  const openLink = url => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentOffset={{x: pageWidth, y: 0}} // Bắt đầu từ trang giả đầu tiên
      >
        {/* Trang giả */}
        <TouchableOpacity
          style={styles.page}
          onPress={() => openLink(data[data.length - 1].path)}>
          <Image
            source={{uri: data[data.length - 1].img}}
            style={styles.image}
          />
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{data[data.length - 1].title}</Text>
        </TouchableOpacity>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.page}
            onPress={() => openLink(item.path)}>
            <Image source={{uri: item.img}} style={styles.image} />
            <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
          </TouchableOpacity>
        ))}
        {/* Trang giả */}
        <TouchableOpacity
          style={styles.page}
          onPress={() => openLink(data[0].path)}>
          <Image source={{uri: data[0].img}} style={styles.image} />
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{data[0].title}</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              index + 1 === currentPage && styles.paginationDotActive,
            ]}
            onPress={() => scrollToPage(index + 1)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: pageWidth,
  },
  image: {
    width: pageWidth,
    height: pageWidth * 0.4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  text: {
    fontFamily: Fonts.semiBold,
    color: 'black',
    fontSize: 12,
    paddingTop: 2,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BCarefulTheme.colors.secondary,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: BCarefulTheme.colors.primary,
  },
});

export default Carousel;
