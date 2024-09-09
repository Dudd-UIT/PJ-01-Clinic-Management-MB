import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {BCarefulTheme} from '../../../Theme';
import Fonts from '../../../../../assets/fonts/Fonts';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

export function IFNgay({title, style, onDateChange}) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const formatDate = date => {
    if (!date) return 'dd/mm/yyyy';
    return date.toLocaleDateString('en-GB'); // This will format the date as dd/mm/yyyy
  };

  return (
    <View>
      <DatePicker
        modal
        open={open}
        date={selectedDate || new Date()}
        onConfirm={date => {
          setOpen(false);
          setSelectedDate(date);
          onDateChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.status}>
          <FontistoIcon name={'calendar'} style={styles.icon} />
          <Text style={styles.date} onPress={() => setOpen(true)}>
            {formatDate(selectedDate)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#999',
    paddingRight: 10,
  },
  icon: {
    color: '#999',
    fontFamily: Fonts.regular,
    marginRight: 6,
    fontSize: 16,
  },
  date: {
    color: BCarefulTheme.colors.primary,
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
});
