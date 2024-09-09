import { Badge, Button } from '@rneui/themed';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fonts from '../../../../assets/fonts/Fonts';
import { BCarefulTheme, style } from '../../../component/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomHeader } from '../../../component/Header';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllGioDatLichAction } from '../../../redux/action/fetchAllGioDatLichAction';
import { fetchDatLichThuocByIdAction } from '../../../redux/action/fetchDatLichThuocByIdAction';

// Get screen width
const screenWidth = Dimensions.get('window').width;
// Calculate margins based on screen width
const buttonMargin = screenWidth * 0.03; // 5% of screen width

function LichThuocScreen({ route }) {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  const gioDatLich = useSelector(state => state.gioDatLich?.data);
  console.log('>>>>>>>>>>.gioDatLich', gioDatLich);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [medicationStatus, setMedicationStatus] = useState({});
  const [currentTimePeriod, setCurrentTimePeriod] = useState('');
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);
  console.log('user: ', user.HOTEN);

  // const medications = [
  //   {
  //     id: 1,
  //     name: 'Cetirizin dihydrochlorid',
  //     time: '08:00',
  //     dosage: 'Uống 1 viên trước ăn',
  //   },
  //   {id: 3, name: 'Ibuprofen', time: '11:00', dosage: 'Uống 1 viên sau ăn'},
  //   {id: 4, name: 'Paracetamol', time: '14:00', dosage: 'Uống 2 viên sau ăn'},
  //   {id: 5, name: 'Amoxicillin', time: '19:00', dosage: 'Uống 1 viên trước ăn'},
  // ];
  const handleMedication = medication => {
    setSelectedMedication(medication);
    setModalVisible(true);
  };

  useEffect(() => {
    dispatch(fetchAllGioDatLichAction(user.MABN));
  }, [dispatch]);

  useEffect(() => {
    scrollToSelectedDate();
    determineTimePeriod();
  }, [selectedDate]);

  const scrollToSelectedDate = () => {
    const index = weekDays.findIndex(day =>
      day.date.isSame(selectedDate, 'day'),
    );
    if (index !== -1) {
      flatListRef.current.scrollToIndex({ animated: true, index: index - 3 });
    }
  };

  const determineTimePeriod = () => {
    const currentHour = moment().hour();
    if (currentHour < 11) {
      setCurrentTimePeriod('morning');
    } else if (currentHour >= 11 && currentHour < 13) {
      setCurrentTimePeriod('noon');
    } else if (currentHour >= 13 && currentHour < 18) {
      setCurrentTimePeriod('afternoon');
    } else if (currentHour >= 18 && currentHour < 24) {
      setCurrentTimePeriod('evening');
    } else {
      setCurrentTimePeriod('');
    }
  };

  const renderDay = ({ item }) => {
    const isSelected = item.date.isSame(selectedDate, 'day');
    const dayStyle = isSelected ? [style.t1, style.primary] : [style.t2];
    const dateStyle = isSelected ? [style.h7, style.primary] : [style.t1];
    const containerStyle = isSelected
      ? styles.dayContainerSelected
      : styles.dayContainer;

    return (
      <TouchableOpacity onPress={() => setSelectedDate(item.date)}>
        <View style={containerStyle}>
          <Text style={dayStyle}>{item.day}</Text>
          <Text style={dateStyle}>{item.date.format('DD')}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const generateWeekDays = date => {
    const startOfWeek = moment(date).startOf('isoWeek');
    return Array.from({ length: 14 }).map((_, index) => {
      const day = moment(startOfWeek).add(index - 7, 'days');
      return {
        day: day.format('dd').toUpperCase(),
        date: day,
        isToday: day.isSame(moment(), 'day'),
      };
    });
  };
  const weekDays = generateWeekDays(selectedDate);

  const filterMedicationsByTime = (startHour, endHour) => {
    return gioDatLich.filter(med => {
      const medHour = moment(med.THOIGIAN, 'HH:mm').hour();
      return medHour >= startHour && medHour < endHour;
    });
  };

  const handleMedicationAction = (action, medId = null) => {
    if (medId) {
      setMedicationStatus(prevStatus => ({
        ...prevStatus,
        [medId]: action,
      }));
    } else {
      const allMeds = gioDatLich.map(med => med.MAGIO);
      const newStatus = allMeds.reduce((acc, id) => {
        acc[id] = action;
        return acc;
      }, {});
      setMedicationStatus(newStatus);
    }
    setModalVisible(false);
  };

  const renderMedicationStatus = medicationId => {
    const status = medicationStatus[medicationId];
    if (status === 'taken') {
      return (
        <Icon
          name="check-circle"
          size={24}
          color={BCarefulTheme.colors.green}
        />
      );
    } else if (status === 'skipped') {
      return (
        <Icon name="times-circle" size={24} color={BCarefulTheme.colors.red} />
      );
    }
    return <Icon name="circle-o" size={24} color="grey" />;
  };

  const handleDieuChinh = async medMaCTDT => {
    if (selectedMedication && selectedMedication.MACTDT) {
      console.log('selectedMedication: ', selectedMedication);
      console.log(medMaCTDT);

      try {
        const item = {
          MACTDT: medMaCTDT,
          TENTHUOC: selectedMedication.TENTHUOC,
          THANHPHAN: selectedMedication.THANHPHAN,
        };

        // Now you have the medication details and can navigate with confidence
        navigation.navigate('ThemThuoc', { item });
      } catch (error) {
        console.error('Error fetching medication details:', error);
        // Handle error gracefully, e.g., show a toast message
      }
    }
  };

  const renderMedicationCard = (title, meds, timePeriod, index) => {
    if (meds.length === 0) return null;

    console.log('meds: ', meds);

    let source;
    switch (timePeriod) {
      case 'morning':
        source = require('../../../../assets/images/morning.png');
        break;
      case 'noon':
        source = require('../../../../assets/images/noon.png');
        break;
      case 'afternoon':
        source = require('../../../../assets/images/afternoon.png');
        break;
      case 'evening':
        source = require('../../../../assets/images/evening.png');
        break;
      default:
        source = null;
    }

    // Sử dụng chỉ số để xác định kiểu thẻ
    const cardStyle = index % 2 === 0 ? style.cardLeft : style.cardRight;

    return (
      <View
        style={[
          cardStyle,
          currentTimePeriod === timePeriod
            ? {
              borderColor: BCarefulTheme.colors.secondary,
              borderBottomWidth: 7,
              elevation: 4,
              backgroundColor: 'white',
            }
            : {},
        ]}>
        <Text style={style.h7}>{title}</Text>
        {source && (
          <Image
            source={source}
            style={index % 2 === 0 ? styles.iconLeft : styles.iconRight}
          />
        )}
        {meds.map(med => {
          return (
            <View key={med.MAGIO} style={style.spacebtw}>
              {index % 2 === 0 ? (
                <>
                  <View style={[style.m2, style.mx4]}>
                    {renderMedicationStatus(med.MAGIO)}
                  </View>
                  <TouchableOpacity
                    style={styles.medicationItem}
                    onPress={() => handleMedication(med)}>
                    <Text style={style.h6}>{med.TENTHUOC}</Text>
                    <Text style={style.t2}>
                      <Text
                        style={[
                          style.h9,
                          currentTimePeriod === timePeriod ? style.sub : {},
                        ]}>
                        {med.THOIGIAN}
                      </Text>
                      {''} - {med.GHICHU}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.medicationItem}
                    onPress={() => handleMedication(med)}>
                    <Text style={[style.h6, style.end]}>{med.TENTHUOC}</Text>
                    <Text style={[style.t2, style.end]}>
                      {med.GHICHU} -
                      <Text
                        style={[
                          style.h9,
                          currentTimePeriod === timePeriod ? style.sub : {},
                        ]}> {''}
                        {med.THOIGIAN}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                  <View style={[style.m2, style.mx4]}>
                    {renderMedicationStatus(med.MAGIO)}
                  </View>
                </>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const morningMeds = filterMedicationsByTime(0, 11);
  const noonMeds = filterMedicationsByTime(11, 13);
  const afternoonMeds = filterMedicationsByTime(13, 18);
  const eveningMeds = filterMedicationsByTime(18, 24);

  const noMedications =
    morningMeds.length === 0 &&
    noonMeds.length === 0 &&
    afternoonMeds.length === 0 &&
    eveningMeds.length === 0;

  const renderCards = () => {
    const cards = [
      { title: 'Buổi sáng', meds: morningMeds, timePeriod: 'morning' },
      { title: 'Buổi trưa', meds: noonMeds, timePeriod: 'noon' },
      { title: 'Buổi chiều', meds: afternoonMeds, timePeriod: 'afternoon' },
      { title: 'Buổi tối', meds: eveningMeds, timePeriod: 'evening' },
    ];

    const card2 = cards.filter(card => card.meds.length > 0);

    return card2.map((card, index) =>
      renderMedicationCard(card.title, card.meds, card.timePeriod, index),
    );
  };

  const calendarBtn = () => {
    return (
      <TouchableOpacity onPress={() => { }}>
        <Icon
          name="calendar"
          type="ionicon"
          color={BCarefulTheme.colors.primary}
          size={24}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <CustomHeader title={'Lịch sử dụng thuốc'} rightIcon={calendarBtn} />

        <FlatList
          ref={flatListRef}
          data={weekDays}
          renderItem={renderDay}
          keyExtractor={item => item.date.toString()}
          horizontal
          style={styles.calendar}
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={7}
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 50 * index,
            index,
          })}
        />

        <Text
          style={[
            style.h7,
            {
              backgroundColor: BCarefulTheme.colors.background,
              textAlign: 'center',
            },
          ]}>
          {selectedDate.isSame(moment(), 'day') ? 'Hôm nay, ' : ''}
          Ngày {selectedDate.format('DD')} tháng {selectedDate.format('MM')},{' '}
          {selectedDate.format('YYYY')}
        </Text>

        <View style={styles.actionButtons}>
          <Button
            title="NGỪNG TẤT CẢ"
            titleStyle={[style.h7, style.white]}
            buttonStyle={[
              style.btnSub,
              { flex: 1, width: 'auto', marginHorizontal: buttonMargin },
            ]}
            onPress={() => {
              handleMedicationAction('skipped');
            }}
          />
          <Button
            title="DÙNG TẤT CẢ"
            titleStyle={[style.h7, style.white]}
            buttonStyle={[
              style.btnSubGreen,
              { flex: 1, width: 'auto', marginHorizontal: buttonMargin },
            ]}
            onPress={() => {
              handleMedicationAction('taken');
            }}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={[style.h4, style.mx3]}>
          {user.HOTEN} ({user.MABN})
        </Text>
        {renderCards()}
        {noMedications && (
          <Text style={styles.noMedicationText}>Bạn chưa có lịch nào</Text>
        )}

        <Button
          title="Quản lý toa thuốc"
          titleStyle={[style.h7, style.white]}
          buttonStyle={[style.btn, style.m3, style.h7]}
          onPress={() => {
            navigation.navigate('QuanLyThuoc');
          }}
        />
      </ScrollView>

      {/* Modal */}
      {selectedMedication && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={style.modalContainer}>
            <View style={style.modalView}>
              <Text style={style.h2}>Xác nhận uống thuốc</Text>
              <Text style={style.t1}>
                {user.HOTEN} ({user.MABN})
              </Text>
              <Text style={style.h4}>{selectedMedication.TENTHUOC}</Text>
              <Text style={[style.t2, style.grey, style.mb4]}>
                {selectedMedication.THOIGIAN} - {selectedMedication.GHICHU}
              </Text>

              <View style={[style.spaceard]}>
                <TouchableOpacity
                  style={styles.btnDisable}
                  onPress={() =>
                    handleMedicationAction('skipped', selectedMedication?.MAGIO)
                  }>
                  <Text style={[style.h73, style.white]}>Bỏ qua</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnSub}
                  onPress={() =>
                    handleMedicationAction('taken', selectedMedication?.MAGIO)
                  }>
                  <Text style={[style.h73, style.white]}>Dùng thuốc</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleDieuChinh(selectedMedication?.MACTDT)}>
                  <Text style={[style.h73, style.white]}>Điều chỉnh</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Icon
                  name="close"
                  type="ionicon"
                  color={BCarefulTheme.colors.red}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  calendar: {
    backgroundColor: BCarefulTheme.colors.background,
    paddingVertical: 10,
  },
  dayContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainerSelected: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: BCarefulTheme.colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: BCarefulTheme.colors.background,
    borderBottomColor: BCarefulTheme.colors.border,
    borderBottomWidth: 1,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 240, // Adjust this value based on the height of the fixed header
  },
  medicationItem: {
    flexDirection: 'column',
    flex: 1,
  },
  noMedicationText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconRight: {
    width: 70,
    height: 70,
    position: 'absolute',
    left: 10,
    top: 10,
  },
  iconLeft: {
    width: 70,
    height: 70,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  btn: {
    backgroundColor: BCarefulTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // marginHorizontal: 5,
    paddingHorizontal: 13,
    paddingVertical: 8,
    fontSize: 16,
  },
  btnSub: {
    backgroundColor: BCarefulTheme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 8,
    fontSize: 16,
  },
  btnDisable: {
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default LichThuocScreen;
