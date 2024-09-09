import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import Fonts from '../../../assets/fonts/Fonts';
import {BCarefulTheme, style} from '../../component/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component';

const ChanDoanXQuangScreen = () => {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const navigation = useNavigation();
  const tableHeadBenhById = ['Tên bệnh', 'Xác suất'];
  const tableDataBenhById = predictions.map(item => [
    item[0],
    item[1].toFixed(3),
  ]);
  const widthArrBenhById = [100, 200];

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0]);
      }
    });
  };

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName || `filename.${image.type.split('/')[1]}`,
    });

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('>>>base64', response.data); // Log kết quả từ backend Flask
      if (response.data.predictions) {
        const predictionsArray = Object.entries(response.data.predictions);
        const sortedPredictions = predictionsArray.sort((a, b) => b[1] - a[1]);
        setPredictions(sortedPredictions.slice(0, 5)); // Lấy 5 bệnh có xác suất cao nhất
        Alert.alert('Thành công', 'Đã có kết quả chẩn đoán.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi ảnh.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} style={styles.iconGoBack} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={style.h2}>Chẩn đoán X-Quang</Text>
        </View>
        <View style={styles.iconGoBack} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[style.t1, styles.content]}>
          Thêm ảnh cận lâm sàng để xem kết quả chẩn đoán.
        </Text>
        <Text style={[style.t1, styles.content, {paddingTop: 0, color: 'red'}]}>
          Lưu ý đây chỉ là chẩn đoán sơ bộ ban đầu, bạn cần đến phòng khám
          BCarefull trực tiếp để nhận được tư vấn từ đội ngũ bác sĩ của chúng
          tôi.
        </Text>

        <View style={styles.body}>
          <View style={styles.imageContainer}>
            {image && <Image source={{uri: image.uri}} style={styles.image} />}
          </View>

          {predictions.length > 0 && (
            <View style={styles.predictionsContainer}>
              <Text style={[style.h7, {fontFamily: Fonts.bold}]}>
                Kết quả chẩn đoán:
              </Text>
              <View style={styles.tableContainer}>
                <Table
                  borderStyle={{
                    borderWidth: 1,
                    borderColor: BCarefulTheme.colors.primary,
                  }}>
                  <Row
                    data={tableHeadBenhById}
                    style={styles.head}
                    widthArr={widthArrBenhById}
                    textStyle={styles.headText}
                  />
                  <TableWrapper style={styles.wrapper}>
                    <Rows
                      data={tableDataBenhById}
                      widthArr={widthArrBenhById}
                      textStyle={styles.text}
                    />
                  </TableWrapper>
                </Table>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={[style.spacebtw, {alignItems: 'flex-end'}]}>
          <TouchableOpacity
            style={[style.btn, {marginLeft: 10, minWidth: '45%'}]}
            onPress={selectImage}>
            <Text style={[style.h4, style.white]}>Thêm ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.btn, {marginRight: 10, minWidth: '45%'}]}
            disabled={!image}
            onPress={uploadImage}>
            <Text style={[style.h4, style.white]}>Chẩn đoán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BCarefulTheme.colors.background,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  body: {
    paddingVertical: 10,
  },
  iconGoBack: {
    fontSize: 26,
    color: '#000',
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: 20,
    fontFamily: Fonts.italic,
  },
  imageContainer: {
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 320,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  predictionsContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  predictionItem: {
    flexDirection: 'row',
  },
  prediction: {
    marginTop: 8,
    fontSize: 16,
  },
  tableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    backgroundColor: '#f1f8ff',
  },
  headText: {
    margin: 4,
    fontFamily: Fonts.bold,
    color: BCarefulTheme.colors.primary,
    textAlign: 'center',
  },
  text: {
    margin: 1,
    fontFamily: Fonts.regular,
    color: '#000',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderColor: BCarefulTheme.colors.border,
    overflow: 'hidden',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100, // Adjust padding to ensure all content is visible
  },
});

export default ChanDoanXQuangScreen;
