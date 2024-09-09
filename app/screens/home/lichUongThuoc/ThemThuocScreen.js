import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader} from '../../../component/Header';
import {BCarefulTheme, style} from '../../../component/Theme';
import {useNavigation} from '@react-navigation/native';
import CustomSwitch from '../../../component/CustomSwitch';
import React, {useEffect, useState} from 'react';
import {Icon} from '@rneui/themed';
import InputSpinner from 'react-native-input-spinner';
import Fonts from '../../../../assets/fonts/Fonts';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button, fonts} from '@rneui/base';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDatLichThuocByIdAction} from '../../../redux/action/fetchDatLichThuocByIdAction';
import {fetchAllGioDatLichAction} from '../../../redux/action/fetchAllGioDatLichAction';
import {fetchCTDTByIdAction} from '../../../redux/action/fetchCTDTById';
import {
  updateGioDatLich,
  insertGioDatLich,
  deleteGioDatLich,
} from '../../../services/datLichService';
import moment from 'moment';
import {
  cancelThongBao,
  onCreateTriggerNotification,
} from '../../../util/appUtil';

function ThemThuocScreen({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const gioThuoc = useSelector(state => state.gioThuocById?.data);
  console.log('giothuoc: ', gioThuoc);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const {MACTDT, TENTHUOC, THANHPHAN} = route.params.item;
  const [mode, setMode] = useState(1);
  const [cards, setCards] = useState([]);
  console.log('>>> cards', cards);
  const [initialCards, setInitialCards] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);

  useEffect(() => {
    dispatch(fetchDatLichThuocByIdAction(MACTDT));
  }, [dispatch, MACTDT]);

  useEffect(() => {
    if (gioThuoc && gioThuoc.length > 0) {
      const formattedCards = gioThuoc.map(item => ({
        maCTDT: MACTDT,
        maGio: item.MAGIO,
        time: item.THOIGIAN,
        dosage: 1,
        unit: 'viên',
        note: item.GHICHU,
      }));

      setCards(formattedCards);
      setInitialCards(JSON.parse(JSON.stringify(formattedCards)));
    }
  }, [gioThuoc]);

  const onSelectSwitch = index => {
    setMode(index);
  };

  const handleDeleteDosageCard = index => {
    console.log('<<< index', index);
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
    setModalVisible(false); // close modal after deletion
  };

  const buildDataToSave = async () => {
    const result = await cards?.map(item => {
      let data = {MACTDT: +item.maCTDT, THOIGIAN: item.time};
      return data;
    });
    console.log('result', result);
    return result ? result : [];
  };

  const handleSelectCard = index => {
    setSelectedCard(
      index !== null
        ? {...cards[index], index}
        : {
            maCTDT: MACTDT,
            time: '00:00',
            dosage: 1,
            unit: 'viên',
            note: route.params.item.GHICHU || '',
          },
    );
    setModalVisible(true);
  };

  const renderDosageCard = (time, dosage, unit, note, index) => {
    return (
      <View key={index} style={style.row}>
        <TouchableOpacity
          style={{backgroundColor: '#f7d0cd', padding: 4, borderRadius: 120}}
          onPress={() => handleDeleteDosageCard(index)}>
          <Icon
            name="trash-outline"
            type="ionicon"
            color={BCarefulTheme.colors.red}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.card, style.spacebtw, style.row]}
          onPress={() => handleSelectCard(index)}>
          <Text style={[style.h1, style.sub, {width: '30%'}]}>{time}</Text>
          <Text style={[style.t1, styles.seperate, {width: '55%'}]}>
            Dùng {dosage} {unit}, {note}
          </Text>
          <Icon
            name="options-outline"
            type="ionicon"
            color={BCarefulTheme.colors.primary}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const sortCards = cards => {
    return cards.sort((a, b) => {
      const timeA = a.time.split(':').map(Number) || '';
      const timeB = b.time.split(':').map(Number) || '';
      return timeA[0] - timeB[0] || timeA[1] - timeB[1];
    });
  };

  const generateCards = () => {
    return sortCards(cards).map((card, index) =>
      renderDosageCard(card.time, card.dosage, card.unit, card.note, index),
    );
  };

  const handleAddCard = () => {
    handleSelectCard(null);
  };

  const handleSaveCard = () => {
    const updatedCards = [...cards];
    if (selectedCard.index !== undefined) {
      updatedCards[selectedCard.index] = {
        ...updatedCards[selectedCard.index],
        time: selectedCard.time,
        dosage: selectedCard.dosage,
        unit: selectedCard.unit,
        note: selectedCard.note,
      };
    } else {
      updatedCards.push({
        maCTDT: selectedCard.maCTDT,
        time: selectedCard.time,
        dosage: selectedCard.dosage,
        unit: selectedCard.unit,
        note: selectedCard.note,
        new: true, // Đánh dấu card mới
      });
    }
    setCards(sortCards(updatedCards));
    setModalVisible(false);
    setSelectedCard(null);
  };

  const onChange = (event, selectedDate) => {
    console.log('ONCHANGE IS CALLED >>>>>>>>');
    if (selectedDate) {
      const currentDate = selectedDate;
      const formattedTime = moment(currentDate).format('HH:mm');
      console.log('formattedTime', formattedTime);
      console.log('typeof formattedTime', typeof formattedTime);

      setSelectedCard({...selectedCard, time: formattedTime});
    }
    setShow(Platform.OS === 'ios');
  };

  const showTimepicker = () => {
    setShow(true);
  };

  const handleSave = async () => {
    const data = await buildDataToSave();
    console.log('>>>>>>>>>>>> data: ', data);

    let response;

    if (data.length === 0) {
      console.log('>>>>>>>>>>>>>>>>>MACTDT: ', MACTDT);
      response = await deleteGioDatLich(MACTDT);
    } else {
      response = await updateGioDatLich(data);
    }

    if (response && response.data && response.data.errcode === 0) {
      Alert.alert(response.data.message);
      const maPK = route.params?.item?.maPK;
      dispatch(fetchDatLichThuocByIdAction(MACTDT));
      maPK && dispatch(fetchCTDTByIdAction(maPK));
      dispatch(fetchAllGioDatLichAction(user.MABN));
      // xóa các thông báo cũ để tạo thông báo mới
      await cancelThongBao(MACTDT);
      data.map(card => {
        const timeString = card.THOIGIAN;
        const [hour, minute] = timeString.split(':');
        const message = `BN ${user.HOTEN} đã đến giờ dùng thuốc ${TENTHUOC} (${THANHPHAN}) vào lúc ${card.THOIGIAN}`;
        const notiId = MACTDT + timeString;
        onCreateTriggerNotification(notiId, hour, minute, message);
      });
    }
    if (response && response.data && response.data.errcode !== 0) {
      Alert.alert(response.data.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'Thêm thuốc'} />
      <SafeAreaView style={style.container}>
        <Text style={style.h5}>
          {TENTHUOC} ({THANHPHAN})
        </Text>
        <CustomSwitch
          selectionMode={1}
          option1={'Hằng ngày'}
          option2={'Tùy chỉnh'}
          onSelectSwitch={onSelectSwitch}
          selectionColor={BCarefulTheme.colors.primary}
        />

        {/* Hàng ngày */}
        {mode === 1 && (
          <View style={style.mt4}>
            <Text style={style.h6}>Cài đặt lịch sử dụng</Text>

            {generateCards()}

            <TouchableOpacity style={[style.center]} onPress={handleAddCard}>
              <Text style={[style.h4, style.primary]}>
                + Thêm thời gian nhắc
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tùy chỉnh */}
        {mode === 2 && <Text>def</Text>}

        {modalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={style.h2}>Đặt liều thuốc</Text>

                {/* Phần chỉnh giờ */}
                <TouchableOpacity onPress={showTimepicker}>
                  <Text style={styles.timeText}>
                    {selectedCard.time !== ''
                      ? selectedCard.time
                      : 'Chọn giờ đi má'}
                  </Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    show={show}
                    display="default"
                    onChange={onChange}
                  />
                )}

                {/* Phần chỉnh số lượng */}
                <InputSpinner
                  max={20}
                  min={1}
                  step={1}
                  color={BCarefulTheme.colors.primary}
                  colorMax={BCarefulTheme.colors.border}
                  fontFamily={Fonts.bold}
                  fontSize={32}
                  style={[
                    style.p4,
                    {
                      height: 60,
                    },
                  ]}
                  inputStyle={{height: 80}}
                  value={selectedCard.dosage}
                  onChange={num =>
                    setSelectedCard({...selectedCard, dosage: num})
                  }
                />

                {/* Phần chỉnh đơn vị */}
                <TextInput
                  style={[styles.input, style.t1]}
                  placeholder="Đơn vị"
                  value={selectedCard.unit}
                  onChangeText={text =>
                    setSelectedCard({...selectedCard, unit: text})
                  }
                />

                {/* Phần note */}
                <TextInput
                  style={[styles.input, style.t1]}
                  placeholder="Ghi chú"
                  value={selectedCard.note}
                  onChangeText={text =>
                    setSelectedCard({...selectedCard, note: text})
                  }
                />

                <View style={style.spacebtw}>
                  <TouchableOpacity style={style.btn} onPress={handleSaveCard}>
                    <Text style={[style.h7, style.white]}>Lưu</Text>
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

                {selectedCard.index !== undefined && (
                  <TouchableOpacity
                    style={[
                      styles.trash,
                      {
                        position: 'absolute',
                        top: 10,
                        left: 20,
                      },
                    ]}
                    onPress={() => handleDeleteDosageCard(selectedCard.index)}>
                    <Icon
                      name="trash-outline"
                      type="ionicon"
                      color={BCarefulTheme.colors.red}
                      size={24}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
      <Button
        title="Lưu"
        buttonStyle={[style.btn, style.m3]}
        titleStyle={[style.h7, style.white]}
        onPress={handleSave}
      />
    </View>
  );
}

export default ThemThuocScreen;

const styles = StyleSheet.create({
  seperate: {
    borderLeftWidth: 2,
    borderColor: BCarefulTheme.colors.border,
    borderStyle: 'dashed',
    padding: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: BCarefulTheme.colors.border,
    marginVertical: 8,
    padding: 4,
  },
  trash: {
    backgroundColor: '#f7d0cd',
    padding: 4,
    borderRadius: 120,
  },
  timeText: {
    fontSize: 50, // Tăng kích thước font
    margin: 10,
    fontFamily: Fonts.bold,
    color: BCarefulTheme.colors.secondary,
  },
});
