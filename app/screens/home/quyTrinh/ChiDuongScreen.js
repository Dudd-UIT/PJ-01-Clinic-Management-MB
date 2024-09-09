import {Button} from '@rneui/themed';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import Fonts from '../../../../assets/fonts/Fonts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {style} from '../../../component/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal} from 'react-native';
import {useState} from 'react';

const screenWidth = Dimensions.get('window').width;
const images = {
  A101: require('../../../../assets/images/A101.png'),
  A102: require('../../../../assets/images/A102.png'),
  A103: require('../../../../assets/images/A103.png'),
  A104: require('../../../../assets/images/A104.png'),
  B201: require('../../../../assets/images/B201.png'),
  B202: require('../../../../assets/images/B202.png'),
  B203: require('../../../../assets/images/B203.png'),
  B204: require('../../../../assets/images/B204.png'),
};

function ChiDuongScreen({navigation, route}) {
  const item = route?.params?.item;
  const [isVisible, setIsVisible] = useState(false);
  const selectedImage = images[item.SOPHONG];
  const displayImages = [
    {
      url: '',
      props: {
        // Or you can set source directory.
        source: selectedImage,
      },
    },
  ];

  const handleZoomImage = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={style.h4}>Bản đồ bệnh viện - Tầng {item.TANG}</Text>
          <Text style={style.h7}>
            {item.TENPHONG} {item.SOPHONG}
          </Text>
        </View>
        <View style={styles.rightIconSpacer} />
      </View>

      <View style={styles.body}>
        <TouchableOpacity onPress={() => handleZoomImage()}>
          <Image style={styles.mapImage} source={selectedImage} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isVisible}
        transparent={true}
        onRequestClose={() => handleZoomImage()}>
        <ImageViewer imageUrls={displayImages} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DED9FA',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: '#000',
  },
  icon: {
    fontSize: 26,
    color: '#000',
    marginLeft: 10,
  },
  rightIconSpacer: {
    width: 26, // Same width as the icon for symmetry
  },
  mapImage: {
    resizeMode: 'contain',
    width: screenWidth * 0.975,
    marginBottom: 60,
  },
});

export default ChiDuongScreen;
