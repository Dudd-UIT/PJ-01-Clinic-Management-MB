import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {BCarefulTheme, style} from '../../../../component/Theme';
import Fonts from '../../../../../assets/fonts/Fonts';
import {SafeAreaView} from 'react-native-safe-area-context';

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th.1',
    'Th.2',
    'Th.3',
    'Th.4',
    'Th.5',
    'Th.6',
    'Th.7',
    'Th.8',
    'Th.9',
    'Th.10',
    'Th.11',
    'Th.12',
  ],
  dayNames: [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vi';

const NgayKhamScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {setDate} = route.params;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date().toISOString().split('T')[0];

  const handleSelectDate = day => {
    const date = new Date(day.timestamp);

    setDate(
      date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    );

    navigation.goBack();
  };

  const getMarkedDates = () => {
    const dates = {};
    const todayDate = new Date(today);
    const startDate = new Date(today);
    const endDate = new Date(today);
    startDate.setFullYear(todayDate.getFullYear() - 1);
    endDate.setFullYear(todayDate.getFullYear() + 1);

    // Mark past dates
    for (
      let d = new Date(startDate);
      d <= todayDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split('T')[0];
      dates[dateStr] = {
        customStyles: {
          container: {
            backgroundColor: 'lightgray',
            borderRadius: 8,
            height: 46,
            width: 46,
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            color: 'gray',
            fontSize: 16,
            lineHeight: 20,
          },
        },
      };
    }

    // Mark today's date
    dates[today] = {
      customStyles: {
        container: {
          backgroundColor: 'white',
          elevation: 2,
          borderRadius: 8,
          height: 46,
          width: 46,
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          color: 'blue',
          fontSize: 16, // Adjust text size if necessary
          lineHeight: 20, // Adjust line height to reduce spacing
        },
      },
    };

    // Mark future dates
    let futureDate = new Date(todayDate);
    futureDate.setDate(futureDate.getDate() + 1);
    for (let d = futureDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      dates[dateStr] = {
        customStyles: {
          container: {
            backgroundColor: BCarefulTheme.colors.primary,
            borderRadius: 8,
            height: 46,
            width: 46,
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            color: '#fff',
            fontSize: 16, // Adjust text size if necessary
            lineHeight: 20, // Adjust line height to reduce spacing
          },
        },
      };
    }

    return dates;
  };

  const shouldDisableLeftArrow = () => {
    const minDate = new Date();
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    return (
      minDate.getMonth() === currentMonth &&
      minDate.getFullYear() === currentYear
    );
  };

  const shouldDisableRightArrow = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    return (
      maxDate.getMonth() === currentMonth &&
      maxDate.getFullYear() === currentYear
    );
  };

  const onMonthChange = month => {
    setSelectedDate(new Date(month.year, month.month - 1, 1));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={style.h3}>Chọn ngày khám</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Calendar
          current={selectedDate.toISOString().split('T')[0]}
          onDayPress={handleSelectDate}
          onMonthChange={onMonthChange}
          monthFormat={'MMMM yyyy'}
          hideArrows={false}
          renderArrow={direction =>
            shouldDisableLeftArrow() && direction === 'left' ? (
              <View style={styles.iconMuiTenContainer}></View>
            ) : shouldDisableRightArrow() && direction === 'right' ? (
              <View style={styles.iconMuiTenContainer}></View>
            ) : (
              <View style={styles.iconMuiTenContainer}>
                <FontAwesomeIcon
                  name={direction === 'left' ? 'angle-left' : 'angle-right'}
                  size={24}
                  style={styles.iconMuiTen}
                />
              </View>
            )
          }
          hideExtraDays={true}
          firstDay={0}
          disableMonthChange={false}
          minDate={today}
          disableArrowLeft={shouldDisableLeftArrow()}
          disableArrowRight={shouldDisableRightArrow()}
          theme={{
            calendarBackground: BCarefulTheme.colors.background,
            textSectionTitleColor: BCarefulTheme.colors.primary,
            todayTextColor: '#fff',
            textDisabledColor: '#999',
            arrowStyle: style.h6,
            textDayStyle: style.h7,
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'black',
            textMonthFontFamily: Fonts.bold,
            textDayHeaderFontFamily: Fonts.regular,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
            textDayHeaderFontFamily: Fonts.regular,
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                marginBottom: 5,
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: '#fff',
                borderRadius: 8,
              },
              monthText: {
                margin: 'auto',
                fontSize: 16,
                fontFamily: Fonts.bold,
                color: 'black',
              },
            },
          }}
          markingType={'custom'}
          markedDates={getMarkedDates()}
        />
        <View style={styles.chuThichContainer}>
          <View style={styles.chuThich}>
            <View
              style={[styles.mauChuThich, {backgroundColor: '#fff'}]}></View>
            <Text style={style.t2}>Ngày hôm nay</Text>
          </View>
          <View style={styles.chuThich}>
            <View
              style={[
                styles.mauChuThich,
                {backgroundColor: 'lightgray'},
              ]}></View>
            <Text style={style.t2}>Ngày ngoài vùng đăng ký khám</Text>
          </View>
          <View style={styles.chuThich}>
            <View
              style={[
                styles.mauChuThich,
                {backgroundColor: BCarefulTheme.colors.primary},
              ]}></View>
            <Text style={style.t2}>Ngày có thể chọn</Text>
          </View>
          <View style={styles.chuThich}>
            <View
              style={[
                styles.mauChuThich,
                {backgroundColor: 'lightyellow'},
              ]}></View>
            <Text style={style.t2}>Ngày nghỉ, lễ, tết</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  body: {
    marginTop: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: '#000',
  },
  icon: {
    fontSize: 26,
    color: '#000',
  },
  chuThichContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  chuThich: {
    flexDirection: 'row',
    marginVertical: 2,
    alignItems: 'center',
  },
  mauChuThich: {
    borderColor: 'lightgray',
    borderWidth: 1,
    height: 18,
    width: 18,
    borderRadius: 4,
    marginRight: 8,
  },
  iconMuiTenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    backgroundColor: BCarefulTheme.colors.light,
    borderRadius: 4,
  },
  iconMuiTen: {
    color: 'blue',
    paddingVertical: 4,
  },
});

export default NgayKhamScreen;
