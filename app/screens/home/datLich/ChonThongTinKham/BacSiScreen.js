import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ListItem, Icon} from '@rneui/themed';
import {BCarefulTheme, style} from '../../../../component/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBacSiByDateAction} from '../../../../redux/action/fetchBacSiByDateAction';
import Fonts from '../../../../../assets/fonts/Fonts';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const schedule = [
  '7h00',
  '8h00',
  '9h00',
  '10h00',
  '11h00',
  '13h00',
  '14h00',
  '15h00',
  '16h00',
  '17h00',
];

const BacSiScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const {setDoctor, setSchedule, date} = route.params;
  console.log('route.params', route.params);
  console.log('date', date);
  const doctorsByDate = useSelector(state => state.bacSiByDate?.data) || [];
  console.log('doctorsByDate', doctorsByDate);
  const isLoading = useSelector(state => state.bacSi?.isLoading);
  const [expanded, setExpanded] = useState({});

  function convertToTimeInterval(timeString) {
    // Kiểm tra định dạng của chuỗi giờ
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(timeString)) {
      console.error('Invalid time format');
      return null;
    }

    // Tách giờ và phút từ chuỗi đầu vào
    const [hours, minutes] = timeString.split(':').map(Number);

    // Tính toán thời gian kết thúc (được giả định là 1 giờ sau)
    const endHours = hours === 23 ? 0 : hours + 1;
    const endMinutes = minutes;

    // Định dạng lại thời gian thành chuỗi
    const formattedStartTime = `${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}`;
    const formattedEndTime = `${endHours < 10 ? '0' : ''}${endHours}:${
      endMinutes < 10 ? '0' : ''
    }${endMinutes}`;

    // Tạo và trả về chuỗi thời gian kết quả
    return `${formattedStartTime} - ${formattedEndTime}`;
  }

  // Sử dụng hàm
  const timeString = '08:00';
  const timeInterval = convertToTimeInterval(timeString);
  console.log(timeInterval); // Kết quả: '08:00 - 09:00'

  const toggleExpand = doctorId => {
    setExpanded(prev => ({...prev, [doctorId]: !prev[doctorId]}));
  };

  const handleSelect = (doctorName, schedule) => {
    setDoctor(doctorName);
    setSchedule(schedule);
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(fetchBacSiByDateAction(date));
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.listItemContainer}>
      <ListItem.Accordion
        content={
          <ListItem.Content style={styles.input}>
            <View style={[styles.header, {paddingVertical: 0}]}>
              <MaterialCommunityIcon name={'doctor'} style={styles.icon} />
              <ListItem.Title
                style={[style.h6, {color: BCarefulTheme.colors.primary}]}>
                {item.TRINHDO} BS. {item.HOTEN}
              </ListItem.Title>
            </View>
            <View style={[styles.header, {paddingVertical: 0}]}>
              <MaterialIcon name={'subject'} style={styles.icon} />
              <ListItem.Subtitle style={style.t1}>
                {item.CHUYENKHOA}
              </ListItem.Subtitle>
            </View>
            <View style={[styles.header, {paddingVertical: 0}]}>
              <IoniconsIcon name={'location'} style={styles.icon} />
              <ListItem.Subtitle style={style.t1}>
                Phòng 101 - Tầng 1
              </ListItem.Subtitle>
            </View>
          </ListItem.Content>
        }
        isExpanded={expanded[item.MABS]}
        onPress={() => toggleExpand(item.MABS)}>
        <View style={styles.breakline}></View>
        <Text style={[style.t1, {paddingHorizontal: 20, paddingVertical: 10}]}>
          Chọn một trong các giờ sau
        </Text>
        <View style={styles.buttonContainer}>
          {item.GIOLAMVIEC.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                item.GIODADAT.includes(time) ? style.btnDisable : style.btn,
              ]}
              onPress={() =>
                !item.GIODADAT.includes(time) && handleSelect(item, time)
              }
              disabled={item.GIODADAT.includes(time)}>
              <Text style={styles.buttonText}>
                {convertToTimeInterval(time)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ListItem.Accordion>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.content}>Chọn giờ khám</Text>
        </View>
      </View>
      <FlatList
          data={doctorsByDate}
          keyExtractor={item => item.MABS.toString()}
          renderItem={renderItem}
        />
    </SafeAreaView>
  );
};

export default BacSiScreen;

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    marginHorizontal: 24,
    marginVertical: 10,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BCarefulTheme.colors.border,
    elevation: 2,
    overflow: 'hidden',
  },
  input: {
    fontSize: 16,
    borderRadius: 10,
    fontFamily: Fonts.regular,
    paddingHorizontal: 12,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    color: BCarefulTheme.colors.primary,
    fontSize: 16,
    marginRight: 8,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  body: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: '#000',
  },
  breakline: {
    borderTopWidth: 1,
    borderColor: BCarefulTheme.colors.border,
    borderStyle: 'dashed',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    minWidth: '46%',
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
});
