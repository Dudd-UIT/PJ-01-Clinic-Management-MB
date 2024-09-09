import notifee, {
  TimestampTrigger,
  TriggerType,
  TimeUnit,
  RepeatFrequency,
} from '@notifee/react-native';
import {useDispatch, useSelector} from 'react-redux';

export const getUser = () => {
  const user = useSelector(state => state.auth?.user?.account?.userInfo[0]);
  console.log('USER >>>>>>>>>>>>>> ', user);
  return user;
};

export const linking = {
  prefixes: ['bcareful://'],
  config: {
    screens: {
      DSDV: 'dsdv',
    },
  },
};

export async function onDisplayNotification(title, message, data) {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'fromBS',
    name: 'Thong Bao From Bac Si',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: message,
    data: data,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export async function onCreateTriggerNotification(
  notiId,
  hour,
  minute,
  message,
) {
  const date = new Date(Date.now());
  date.setHours(hour);
  date.setMinutes(minute);

  // Create a time-based trigger
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
    alarmManager: {
      allowWhileIdle: true,
    },
  };

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Create a trigger notification
  await notifee.createTriggerNotification(
    {
      id: notiId,
      title: 'BCare - Lời nhắc dùng thuốc',
      body: message,
      android: {
        channelId,
      },
    },
    trigger,
  );
  console.log('THONG BAO HAS BEEN CREATED !!!!!!');
}

export async function cancelThongBao(mactdt) {
  console.log('GO INTO CANCEL THONGBAO >>>>>>>>>>>');
  const ids = await notifee.getTriggerNotificationIds();
  ids.forEach(async id => {
    if (id.includes(mactdt)) {
      await notifee.cancelNotification(id);
      console.log('XOA MOT THONG BAO ID >>>>>>>>>>> ', id);
    }
  });
}

export function compareDates(date1, date2) {
  // Lấy ra các thành phần ngày, tháng, năm của date1 và date2
  const day1 = date1.getDate();
  const month1 = date1.getMonth();
  const year1 = date1.getFullYear();

  const day2 = date2.getDate();
  const month2 = date2.getMonth();
  const year2 = date2.getFullYear();

  // So sánh theo thứ tự năm -> tháng -> ngày
  if (year1 < year2) {
    return 1; // date1 < date2
  } else if (year1 > year2) {
    return -1; // date1 > date2
  } else {
    // Cùng năm, so sánh tháng
    if (month1 < month2) {
      return 1; // date1 < date2
    } else if (month1 > month2) {
      return -1; // date1 > date2
    } else {
      // Cùng năm và tháng, so sánh ngày
      if (day1 < day2) {
        return 1; // date1 < date2
      } else if (day1 > day2) {
        return -1; // date1 > date2
      } else {
        return 0; // date1 = date2
      }
    }
  }
}
