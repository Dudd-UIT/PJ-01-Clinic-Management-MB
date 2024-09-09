import { Button } from '@rneui/themed';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import Fonts from '../../../assets/fonts/Fonts';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BCarefulTheme, style } from '../../component/Theme';

function NotificationScreen() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [readNotifications, setReadNotifications] = useState([
    {
      id: '1',
      title: 'Đề phòng dịch COVID19',
      date: '2024-05-15',
      content: 'Với tình trạng dịch COVID đang diễn biến phức tạp, phòng khám sẽ chỉ khám tối đa 2 bệnh nhân một lúc, mong Quý bệnh nhân thông cảm vì sự bất tiện này.',
    },
    {
      id: '2',
      title: 'Thông báo nghỉ tết Nguyên Đán 2024',
      date: '2024-05-18',
      content: 'Lịch nghỉ Tết Nguyên Đán năm nay từ ngày 10/02 đến 16/02, phòng khám sẽ tạm nghỉ trong khoảng thời gian này.',
    },
    {
      id: '3',
      title: 'Lời cảm ơn từ BCare',
      date: '2024-05-17',
      content:
        'Xin cảm ơn Quý Người bệnh, Người nhà đã tin tưởng lựa chọn phòng khám BCare.',
    },
    {
      id: '4',
      title: 'Giảm giá nhân dịp khai trương',
      date: '2024-05-21',
      content: 'Phòng khám giảm giá 30% các loại thuốc từ ngày 1/5 đến 7/5 năm 2024',
    },
  ]);

  const [unreadNotifications, setUnreadNotifications] = useState([
    {
      id: '5',
      title: 'Sửa đổi chính sách bảo hiểm y tế',
      date: '2024-05-20',
      content:
        'Từ ngày 15/6/2024, phòng khám sẽ ngừng áp dụng các chính sách về BHYT, mong Quý bệnh nhân lưu ý trong quá trình đăng ký khám tại phòng khám.',
    },
    {
      id: '6',
      title: 'Chào mừng đến với BCare',
      date: '2024-05-16',
      content: 'Bạn đã đăng ký thành công tài khoản tại BCare, tiến hành đặt khám ngay tại mục Đặt lịch khám.',
    },
    {
      id: '7',
      title: 'Tuyển dụng nhân sự',
      date: '2024-05-10',
      content: 'Công ty có nhu cầu tuyển dụng thêm nhân viên cho vị trí kỹ thuật viên IT, nộp đơn ứng tuyển tại bcare.com.vn',
    },
    {
      id: '8',
      title: 'Liên kết ví MOMO',
      date: '2024-05-3',
      content:
        'Kể từ tháng 6/2024, phòng khám sẽ tích hợp MOMO vào quy trình thanh toán khi đi khám, Quý bệnh nhân có thể sử dụng MOMO UAT để thanh toán các dịch vụ tại phòng khám.',
    },
  ]);

  // sort thong bao
  const sortedNotifications = notifications => {
    return notifications.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Danh dau tat ca da doc
  const markAllAsRead = () => {
    setReadNotifications([...readNotifications, ...unreadNotifications]);
    setUnreadNotifications([]);
  };

  // Hien thi danh sach thong bao
  const renderNotification = ({ item }) => {
    const isUnread = unreadNotifications.some(
      notification => notification.id === item.id,
    );

    return (
      <TouchableOpacity
        style={[
          styles.notificationContainer,
          isUnread ? styles.unreadNotification : styles.readNotification,
        ]}
        onPress={() => {
          setSelectedNotification(item);
          setModalVisible(true);
          if (isUnread) {
            // Nếu thông báo chưa đọc
            // Chuyển thông báo từ mảng chưa đọc sang mảng đã đọc
            setUnreadNotifications(
              unreadNotifications.filter(
                notification => notification.id !== item.id,
              ),
            );
            setReadNotifications([...readNotifications, item]);
          }
        }}>
        {isUnread && <View style={styles.unreadDot} />}
        <Text style={[style.h3, style.primary, style.upperCase]}>{item.title}</Text>
        <Text style={[style.t4, style.italic]}>{item.date}</Text>
        <Text style={style.h4}>{item.content}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Thông Báo</Text>
        <TouchableOpacity
          // style={styles.markAllAsReadButton}
          onPress={markAllAsRead}>
          {/* <Text style={styles.markAllAsReadButtonText}>Đọc hết</Text> */}
          {/* <FontistoIcon name={'arrow-swap'} style={styles.icon} /> */}
          <Icon name="checkmark-done" type="ionicon" color={'#000'} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[selectedTab === 'all' ? styles.selectedTab : styles.tab]}
          onPress={() => setSelectedTab('all')}>
          <Text
            style={
              selectedTab === 'all' ? styles.selectedTabText : styles.tabText
            }>
            Tất Cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ selectedTab === 'unread' ? styles.selectedTab : styles.tab,]}
          onPress={() => setSelectedTab('unread')}>
          <Text
            style={
              selectedTab === 'unread' ? styles.selectedTabText : styles.tabText
            }>
            Chưa Đọc
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={
          selectedTab === 'all'
            ? sortedNotifications([
              ...unreadNotifications,
              ...readNotifications,
            ])
            : sortedNotifications(unreadNotifications)
        } // Hiển thị thông báo theo tab đã chọn
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedNotification?.title}</Text>
            <Text style={styles.modalContent}>
              {selectedNotification?.content}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: '#ddd',
  },
  selectedTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderBottomWidth: 2,
    // borderColor: '#ddd',
    borderBottomWidth: 5,
    borderRightColor: '#ddd',
    borderLeftColor: '#ddd',
    borderTopColor: '#ddd',
    borderBottomColor: BCarefulTheme.colors.primary,
  },
  header: {
    color: '#000',
    fontFamily: Fonts.bold,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  markAllAsReadButton: {
    backgroundColor: BCarefulTheme.colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  markAllAsReadButtonText: {
    color: 'white',
    fontSize: 16,
  },
  tabText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: '#000',
  },
  selectedTabText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: BCarefulTheme.colors.primary,
    bottom: -2,
  },
  notificationContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  unreadNotification: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: BCarefulTheme.colors.primary,
    marginRight: 10,
  },
  date: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#888',
  },
  content: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#333',
    marginTop: 5,
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
  modalTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    marginBottom: 10,
    textTransform: 'uppercase',
    color: BCarefulTheme.colors.primary,
  },
  modalContent: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: BCarefulTheme.colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default NotificationScreen;
