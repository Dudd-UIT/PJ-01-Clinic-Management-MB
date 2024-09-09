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

function XacNhanScreen({setValues, formSubmit, formDisplay}) {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth?.user); // user chứa token, isAuthenticated, account
  let userInfo = {};
  if (user && user.account) {
    if (user.account.userInfo) {
      userInfo = user.account.userInfo[0];
    }
  }
  const [expanded, setExpanded] = useState({});

  const toggleExpand = doctorId => {
    setExpanded(prev => ({...prev, [doctorId]: !prev[doctorId]}));
  };

  const tongPhi = () => {
    const total = formDisplay.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue.giaDichVu);
    }, 0);

    return total;
  };

  const renderItem = ({item}) => (
    <View
      style={[
        styles.listItemContainer,
        {paddingHorizontal: 20, paddingVertical: 10},
      ]}>
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setValues(0)}>
          <Icon name={'arrow-back'} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={style.h6}>Thông tin đặt khám</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={[style.t2, {paddingHorizontal: 10}]}>
          Vui lòng kiểm tra thông tin đặt khám bên dưới.
        </Text>
        <View style={styles.listItemContainer}>
          <ListItem.Accordion
            content={
              <View style={[styles.header, {paddingVertical: 0, flex: 1}]}>
                <IoniconsIcon
                  name="person-add-outline"
                  style={[styles.icon, {marginLeft: 0, fontSize: 18}]}
                />
                <Text style={style.t2}>Hồ sơ đăng ký khám bệnh</Text>
              </View>
            }
            isExpanded={expanded[userInfo.MABN]}
            onPress={() => toggleExpand(userInfo.MABN)}>
            <View style={styles.breakline}></View>
            <View style={styles.input}>
              <View style={[styles.header, {paddingVertical: 6}]}>
                <Text style={[style.t2, {flex: 1}]}>Họ tên</Text>
                <Text
                  style={[
                    style.h6,
                    {color: BCarefulTheme.colors.primary, flex: 2},
                  ]}>
                  {userInfo.HOTEN.toUpperCase()}
                </Text>
              </View>
              <View style={[styles.header, {paddingVertical: 6}]}>
                <Text style={[style.t2, {flex: 1}]}>Giới tính</Text>
                <Text style={[style.t2, {flex: 2}]}>{userInfo.GIOITINH}</Text>
              </View>
              <View style={[styles.header, {paddingVertical: 6}]}>
                <Text style={[style.t2, {flex: 1}]}>Điện thoại</Text>
                <Text style={[style.t2, {flex: 2}]}>{userInfo.SDT}</Text>
              </View>
              <View style={[styles.header, {paddingVertical: 6}]}>
                <Text style={[style.t2, {flex: 1}]}>Địa chỉ</Text>
                <Text style={[style.t2, {flex: 2}]}>{userInfo.DIACHI}</Text>
              </View>
            </View>
          </ListItem.Accordion>
        </View>

        <View style={[styles.itemGroup, {paddingHorizontal: 14}]}>
          <Text style={[style.h7]}>Dịch vụ đã đặt</Text>
          <Text style={[style.h6, {marginLeft: 6}]}>
            ({formDisplay.length})
          </Text>
        </View>
        <View style={styles.listDVContainer}>
          <FlatList
            data={formDisplay}
            keyExtractor={item => item.MADV.toString()}
            renderItem={renderItem}
          />
        </View>

        <View
          style={[
            {
              backgroundColor: '#fff',
              paddingBottom: 10,
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
          ]}>
          <View
            style={[styles.itemGroup, {marginBottom: 4, marginHorizontal: 10}]}>
            <Text style={[style.t1]}>Thanh toán tạm tính:</Text>
            <Text style={[style.h6, {marginLeft: 10, fontSize: 18}]}>
              {tongPhi()}đ
            </Text>
          </View>
          <View style={style.spacebtw}>
            <TouchableOpacity
              style={[style.btnSub, {marginLeft: 10, minWidth: '44%'}]}
              onPress={() => setValues(0)}>
              <Text style={[style.h4, style.white]}>Trở lại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[style.btnSub, {marginRight: 10, minWidth: '44%'}]}
              onPress={() =>
                navigation.navigate('ThanhToan', {
                  item: {
                    TDTTMIN: 'Chưa thanh toán',
                    TTTT: 'Chưa thanh toán',
                    THANHTIEN: tongPhi(),
                    isNew: true,
                  },
                  pkByIdHd: formDisplay,
                })
              }>
              <Text style={[style.h4, style.white]}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listDVContainer: {
    flex: 1,
    paddingBottom: 120,
    overflow: 'hidden',
  },
  listItemContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BCarefulTheme.colors.border,
    overflow: 'hidden',
    backgroundColor: '#fff',
    margin: 8,
    elevation: 2,
  },
  input: {
    fontSize: 16,
    borderRadius: 10,
    fontFamily: Fonts.regular,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexGrow: 1,
  },
  itemGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  container: {
    flex: 1,
    backgroundColor: BCarefulTheme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: BCarefulTheme.colors.primary,
    fontSize: 16,
    marginHorizontal: 10,
  },
  title: {
    marginLeft: 10,
  },
  body: {
    flex: 1,
  },
  breakline: {
    borderTopWidth: 2,
    borderColor: BCarefulTheme.colors.border,
    borderStyle: 'dashed',
    marginBottom: 10,
    marginHorizontal: 20,
  },
});

export default XacNhanScreen;
