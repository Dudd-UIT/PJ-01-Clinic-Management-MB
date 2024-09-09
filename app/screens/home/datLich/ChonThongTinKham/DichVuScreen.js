import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {style} from '../../../../component/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllDichVuAction} from '../../../../redux/action/fetchAllDichVuAction';
import {BCarefulTheme} from '../../../../component/Theme';
import Fonts from '../../../../../assets/fonts/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';

const DichVuScreen = () => {
  console.log('dvuScreen');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const {setService} = route.params;
  const services = useSelector(state => state.dichVu?.data) || [];
  console.log('services', services);
  const [servicesKham, setServicesKham] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const isLoading = useSelector(state => state.dichVu?.isLoading);

  const handleSelectService = selectedService => {
    setService(selectedService);
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(fetchAllDichVuAction());
  }, [dispatch]);

  useEffect(() => {
    const filteredServices = services.filter(
      service => +service.MALOAIDV !== 101,
    );
    setServicesKham(filteredServices);
    console.log('servicesKham', filteredServices);
  }, [services]);

  useEffect(() => {
    if (searchKeyword) {
      const filteredServices = services.filter(service =>
        service.TENDV.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
      setServicesKham(filteredServices);
    } else {
      const filteredServices = services.filter(
        service => +service.MALOAIDV !== 101,
      );
      setServicesKham(filteredServices);
    }
  }, [searchKeyword, services]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={style.h3}>Chọn dịch vụ khám</Text>
        </View>
        <View style={styles.icon} />
      </View>
      <TextInput
        style={styles.search}
        placeholder="Tìm nhanh dịch vụ"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        placeholderTextColor={'#999'}
      />
      <View style={styles.breakLine} />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={servicesKham}
          keyExtractor={item => item.MADV.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                style.input,
                {
                  marginVertical: 10,
                  marginHorizontal: 12,
                  backgroundColor: '#fff',
                },
              ]}
              onPress={() => handleSelectService(item)}>
              <View style={styles.itemGroup}>
                <View style={styles.itemDetails}>
                  <Text style={[style.h6, {fontFamily: Fonts.bold}]}>
                    {item.TENDV.toUpperCase()}
                  </Text>
                  <Text style={style.t3}>Loaị dịch vụ: {item.TENLOAIDV}</Text>
                </View>
                <Text style={[style.t1, style.primary, styles.price]}>
                  {item.GIADV}đ
                </Text>
                <Icon name={'chevron-forward-outline'} style={styles.icon} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#DED9FA',
  },
  header: {
    height: 100,
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
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
  dateTime: {
    fontSize: 16,
    color: '#000',
  },
  search: {
    borderColor: BCarefulTheme.colors.primary,
    borderWidth: 1,
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 10,
    color: '#000',
    padding: 10,
  },
  breakLine: {
    borderBottomColor: '#999',
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginVertical: 10,
    borderStyle: 'dashed',
  },
  icon: {
    fontSize: 26,
    color: '#000',
    marginLeft: 10,
  },
  price: {
    marginLeft: 'auto',
  },
});

export default DichVuScreen;
