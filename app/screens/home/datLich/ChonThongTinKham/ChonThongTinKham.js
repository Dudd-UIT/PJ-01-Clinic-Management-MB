import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ListItem, Icon} from '@rneui/themed';
import {BCarefulTheme, style} from '../../../../component/Theme';
import {LogBox} from 'react-native';
import Fonts from '../../../../../assets/fonts/Fonts';
import {useSelector} from 'react-redux';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function ChonThongTinKham({
  setValues,
  formSubmit,
  formDisplay,
  setFormSubmit,
  setFormDisplay,
}) {
  console.log('>>>>> formSubmit', formSubmit);
  console.log('>>>>>> formDisplay', formDisplay);
  const navigation = useNavigation();
  const user = useSelector(state => state.auth?.user); // user chứa token, isAuthenticated, account
  let userInfo = {};
  if (user && user.account) {
    if (user.account.userInfo) {
      userInfo = user.account.userInfo[0];
    }
  }
  const [selectedDV, setSelectedDV] = useState([]);
  console.log('selectedDV', selectedDV);
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  console.log('service', service);
  const [date, setDate] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const formDataDefault = {
    maBN: userInfo.MABN,
    dichVu: [],
    maBS: null,
    ngayKham: null,
    gioDatLich: null,
  };

  const [formData, setFormData] = useState(formDataDefault);
  console.log('formData', formData);

  useEffect(() => {
    if (service) {
      setStep(1);
    }
    if (date && service) {
      setStep(2);
      setFormData(prev => ({...prev, ngayKham: date}));
    }
    if (date && !service) {
      setStep(1);
    }
    if (doctor) {
      setStep(3);
      setFormData(prev => ({...prev, maBS: doctor.MABS}));
    }
    if (schedule) {
      setFormData(prev => ({...prev, gioDatLich: schedule}));
    }
  }, [service, date, doctor, schedule]);

  useEffect(() => {
    if (selectedDV.length === 0) {
      setAdded(false);
      setStep(0);
      setDate(null);
    }
  }, [selectedDV.length]);

  useEffect(() => {
    if (formSubmit && Object.keys(formSubmit).length !== 0) {
      setFormData({...formSubmit});
      setDate(formData.ngayKham);
    }
    if (formDisplay.length > 0) {
      setSelectedDV([...formDisplay]);
      setAdded(true);
    }
    console.log('formData', formData);
    console.log('selectedDV', selectedDV);
  }, []);

  const handleAddDV = selected => {
    //selected = service
    console.log('date', date);
    console.log('doctor', doctor);
    console.log('schedule', schedule);
    console.log('selected', selected);
    setShowError(false);

    if (!selected) {
      setError('Chưa chọn dịch vụ khám!');
      setShowError(true);
      return;
    }
    if (!date) {
      setError('Chưa chọn ngày khám!');
      setShowError(true);
      return;
    }
    if (!doctor || !schedule) {
      setError('Chưa chọn bác sĩ khám và giờ khám!');
      setShowError(true);
      console.log('err', error);
      return;
    }

    if (selected) {
      setShowError(false);
      setShowWarning(false);
      if (selectedDV.find(service => service.MADV === selected.MADV)) {
        setError('Dịch vụ này đã được chọn, vui lòng chọn dịch vụ khác!');
        setShowError(true);
        return;
      }
      if (selectedDV.find(service => service.gioDatLich === schedule)) {
        setShowWarning(true);
        return;
      }
      const newService = {
        maBN: userInfo.MABN,
        MADV: selected.MADV,
        tenDichVu: selected.TENDV,
        giaDichVu: selected.GIADV,
        maBS: doctor?.MABS,
        ngayKham: date,
        gioDatLich: schedule,
      };
      setSelectedDV(prev => [...prev, newService]);
      console.log('>>>selected', selected);

      const updatedServices = [...selectedDV, selected];
      const selectedNoServices = updatedServices.map(
        selectedService => selectedService.MADV,
      );

      setFormData(prev => ({...prev, dichVu: selectedNoServices}));
    }
    setDoctor(null);
    setSchedule(null);
    setService(null);
    setStep(0);

    setAdded(true);
  };

  const handleDeleteDV = item => {
    const updatedServices = selectedDV.filter(
      selectedService => selectedService.MADV !== item.MADV,
    );
    setSelectedDV(updatedServices);

    const selectedNoServices = updatedServices.map(
      selectedService => selectedService.MADV,
    );
    setFormData(prev => ({...prev, dichVu: selectedNoServices}));

    setAdded(true);
  };

  const handleContinueDV = () => {
    setAdded(false);
    setShowError(false);
  };

  const handleContinue = () => {
    setFormSubmit(formData);
    setFormDisplay(selectedDV);
    setValues(0.5);
  };

  const tongPhi = () => {
    let total = 0;
    if (selectedDV.length > 0) {
      total = selectedDV.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.giaDichVu);
      }, 0);
    }

    return total;
  };

  const renderItem = ({item}) => (
    <View style={styles.listItemContainer}>
      <View style={styles.breakline}></View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleDeleteDV(item)}>
        <IoniconsIcon name={'trash'} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.itemGroup}>
        <Text style={[style.t2, {flex: 1}]}>Chuyên khoa</Text>
        <Text
          style={[style.h6, {flex: 2, color: BCarefulTheme.colors.primary}]}>
          {item.tenDichVu.toUpperCase()}
        </Text>
      </View>
      <View style={styles.itemGroup}>
        <Text style={[style.t2, {flex: 1}]}>Ngày khám</Text>
        <Text style={[style.t2, {flex: 2}]}>{item.ngayKham}</Text>
      </View>
      <View style={styles.itemGroup}>
        <Text style={[style.t2, {flex: 1}]}>Giờ khám</Text>
        <Text style={[style.t2, {flex: 2}]}>{item.gioDatLich}</Text>
      </View>
      <View style={styles.itemGroup}>
        <Text style={[style.t2, {flex: 1}]}>Phòng khám</Text>
        <Text style={[style.t2, {flex: 2}]}>Phòng B8.08, tầng 8, khu B</Text>
      </View>
      <View style={styles.itemGroup}>
        <Text style={[style.t2, {flex: 1}]}>Phí khám</Text>
        <Text style={[style.t2, {flex: 2}]}>{item.giaDichVu} đ</Text>
      </View>
    </View>
  );

  return (
    <View
      style={[
        style.container,
        {backgroundColor: BCarefulTheme.colors.background},
      ]}>
      {!added && selectedDV.length === 0 ? (
        <>
          <View>
            <View style={{gap: 12, marginTop: 20}}>
              <ListItem
                Component={TouchableOpacity}
                containerStyle={style.input}
                onPress={() => navigation.navigate('ChonDichVu', {setService})}
                disabledStyle={{opacity: 0.5}}>
                <Icon
                  name="medical-services"
                  type="material"
                  color={BCarefulTheme.colors.primary}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    <Text style={style.t2}>
                      {service ? service.TENDV.toUpperCase() : 'Chọn dịch vụ'}
                    </Text>
                  </ListItem.Title>
                </ListItem.Content>
                {step === 0 && (
                  <ListItem.Chevron color={BCarefulTheme.colors.primary} />
                )}
              </ListItem>
              <ListItem
                Component={TouchableOpacity}
                containerStyle={style.input}
                disabled={step < 1 || selectedDV.length > 0}
                onPress={() => navigation.navigate('NgayKham', {setDate})}
                disabledStyle={{opacity: 0.5}}>
                <Icon
                  name="calendar-month"
                  type="material"
                  color={BCarefulTheme.colors.primary}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    <Text style={style.t2}>
                      {date ? date : 'Chọn ngày khám'}
                    </Text>
                  </ListItem.Title>
                </ListItem.Content>
                {step === 1 && (
                  <ListItem.Chevron color={BCarefulTheme.colors.primary} />
                )}
              </ListItem>
              <ListItem
                Component={TouchableOpacity}
                containerStyle={style.input}
                disabled={step < 2}
                onPress={() =>
                  navigation.navigate('ChonBacSi', {
                    setDoctor,
                    setSchedule,
                    date,
                  })
                }
                disabledStyle={{opacity: 0.5}}>
                <Icon
                  name="doctor"
                  type="material-community"
                  color={BCarefulTheme.colors.primary}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    <Text style={style.t2}>
                      {doctor?.MABS
                        ? 'BS ' + doctor.TRINHDO + ' ' + doctor.HOTEN
                        : 'Chọn bác sĩ'}
                    </Text>
                  </ListItem.Title>
                </ListItem.Content>
                {step >= 2 && (
                  <ListItem.Chevron color={BCarefulTheme.colors.primary} />
                )}
              </ListItem>
              <ListItem
                Component={TouchableOpacity}
                containerStyle={style.input}
                disabled={true}
                onPress={() => {}}
                disabledStyle={{opacity: 0.5}}>
                <Icon
                  name="hourglass-half"
                  type="font-awesome-5"
                  color={BCarefulTheme.colors.primary}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    <Text style={style.t2}>
                      {schedule ? schedule : 'Chọn giờ khám'}
                    </Text>
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </View>
            <TouchableOpacity
              style={style.seperateHorizontal}></TouchableOpacity>
          </View>
          <View style={style.center}>
            <TouchableOpacity
              style={style.btnSub}
              onPress={() => handleAddDV(service)}>
              <Text style={[style.h4, style.white]}>Thêm dịch vụ</Text>
            </TouchableOpacity>
          </View>
          {showError ? (
            <>
              <View style={{flex: 1, margin: 20}}>
                <Text style={[style.h4, style.italic, {color: 'red'}]}>
                  {error}
                </Text>
              </View>
            </>
          ) : showWarning ? (
            <>
              <View style={{flex: 1, margin: 20}}>
                <Text style={[style.h4, style.italic, {color: 'red'}]}>
                  Bạn đang đăng kí dịch vụ trùng giờ với dịch vụ chọn trước đó.
                  Vui lòng chọn khung giờ khác.
                </Text>
              </View>
            </>
          ) : (
            <></>
          )}
        </>
      ) : !added && selectedDV.length > 0 ? (
        <>
          <View>
            <View style={{gap: 12, marginTop: 20}}>
              <ListItem
                Component={TouchableOpacity}
                containerStyle={style.input}
                disabled={step < 1 || selectedDV.length > 0}
                onPress={() => navigation.navigate('NgayKham', {setDate})}
                disabledStyle={{opacity: 0.5}}>
                <Icon
                  name="calendar-month"
                  type="material"
                  color={BCarefulTheme.colors.primary}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    <Text style={style.t2}>
                      {date ? date : 'Chọn ngày khám'}
                    </Text>
                  </ListItem.Title>
                </ListItem.Content>
                {step === 0 && (
                  <ListItem.Chevron color={BCarefulTheme.colors.primary} />
                )}
              </ListItem>
              <ListItem
                Component={TouchableOpacity}
                containerStyle={style.input}
                onPress={() => navigation.navigate('ChonDichVu', {setService})}
                disabledStyle={{opacity: 0.5}}>
                <Icon
                  name="medical-services"
                  type="material"
                  color={BCarefulTheme.colors.primary}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    <Text style={style.t2}>
                      {service ? service.TENDV.toUpperCase() : 'Chọn dịch vụ'}
                    </Text>
                  </ListItem.Title>
                </ListItem.Content>
                {step === 1 && (
                  <ListItem.Chevron color={BCarefulTheme.colors.primary} />
                )}
              </ListItem>
              <ListItem
                Component={TouchableOpacity}
                containerStyle={style.input}
                disabled={step < 2}
                onPress={() =>
                  navigation.navigate('ChonBacSi', {
                    setDoctor,
                    setSchedule,
                    date,
                  })
                }
                disabledStyle={{opacity: 0.5}}>
                <Icon
                  name="doctor"
                  type="material-community"
                  color={BCarefulTheme.colors.primary}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    <Text style={style.t2}>
                      {doctor?.MABS
                        ? 'BS ' + doctor.TRINHDO + ' ' + doctor.HOTEN
                        : 'Chọn bác sĩ'}
                    </Text>
                  </ListItem.Title>
                </ListItem.Content>
                {step >= 2 && (
                  <ListItem.Chevron color={BCarefulTheme.colors.primary} />
                )}
              </ListItem>
              <ListItem
                Component={TouchableOpacity}
                containerStyle={style.input}
                disabled={true}
                onPress={() => {}}
                disabledStyle={{opacity: 0.5}}>
                <Icon
                  name="hourglass-half"
                  type="font-awesome-5"
                  color={BCarefulTheme.colors.primary}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    <Text style={style.t2}>
                      {schedule ? schedule : 'Chọn giờ khám'}
                    </Text>
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </View>
            <TouchableOpacity
              style={style.seperateHorizontal}></TouchableOpacity>
          </View>
          <View style={style.center}>
            <TouchableOpacity
              style={style.btnSub}
              onPress={() => handleAddDV(service)}>
              <Text style={[style.h4, style.white]}>Thêm dịch vụ</Text>
            </TouchableOpacity>
          </View>
          {showError ? (
            <>
              <View style={{flex: 1, margin: 20}}>
                <Text style={[style.h4, style.italic, {color: 'red'}]}>
                  {error}
                </Text>
              </View>
            </>
          ) : showWarning ? (
            <>
              <View style={{flex: 1, margin: 20}}>
                <Text style={[style.h4, style.italic, {color: 'red'}]}>
                  Bạn đang đăng kí dịch vụ trùng giờ với dịch vụ chọn trước đó.
                  Vui lòng chọn khung giờ khác.
                </Text>
              </View>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <View style={styles.listDVContainer}>
            <View
              style={[
                styles.itemGroup,
                {paddingHorizontal: 20, paddingVertical: 4},
              ]}>
              <Text style={style.t1}>Dịch vụ đã chọn</Text>
              <Text style={[style.h6, {marginLeft: 6}]}>
                ({selectedDV.length})
              </Text>
            </View>
            <FlatList
              data={selectedDV}
              keyExtractor={item => item.MADV.toString()}
              renderItem={renderItem}
            />
          </View>
          <View
            style={[
              {
                backgroundColor: '#fff',
                paddingBottom: 10,
                paddingTop: 10,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
              },
            ]}>
            <View style={[styles.itemGroup, {marginBottom: 4, marginHorizontal: 10}]}>
              <Text style={[style.t1, {fontSize: 16}]}>
                Thanh toán tạm tính:
              </Text>
              <Text style={[style.h6, {marginLeft: 10, fontSize: 18}]}>
                {tongPhi()}đ
              </Text>
            </View>

            <View style={style.spacebtw}>
              <TouchableOpacity
                style={[style.btnSub, {marginLeft: 10, width: '44%'}]}
                onPress={handleContinueDV}>
                <Text style={[style.h4, style.white, {textAlign: 'center'}]}>Thêm tiếp</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.btnSub, {marginRight: 10, width: '44%'}]}
                onPress={handleContinue}>
                <Text style={[style.h4, style.white]}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listDVContainer: {
    marginTop: 20,
    marginBottom: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BCarefulTheme.colors.border,
    elevation: 2,
    overflow: 'hidden',
  },
  listItemContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  itemGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    flex: 1,
  },
  value: {
    flex: 2,
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
  iconContainer: {
    color: BCarefulTheme.colors.primary,
    fontSize: 16,
    alignSelf: 'flex-end',
    padding: 4,
    borderWidth: 1,
    borderColor: BCarefulTheme.colors.border,
    borderRadius: 4,
  },
  icon: {
    color: BCarefulTheme.colors.primary,
    fontSize: 16,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  body: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: '#000',
  },
  breakline: {
    borderTopWidth: 2,
    borderColor: BCarefulTheme.colors.border,
    borderStyle: 'dashed',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    minWidth: '40%',
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
});

export default ChonThongTinKham;
