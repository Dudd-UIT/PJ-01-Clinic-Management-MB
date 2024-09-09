import * as React from 'react';
import {Header, Icon} from '@rneui/base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BCarefulTheme} from './Theme';
import {StyleSheet, View} from 'react-native';
import Fonts from '../../assets/fonts/Fonts';
import {BackToHomeBtn, GoBackBtn} from './ButtonHome';
import Progress from './datLich/Progress';

export function CustomHeader({title, leftIcon = GoBackBtn, rightIcon = null}) {
  return (
    <View>
      <Header
        backgroundColor="white"
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: title,
          style: styles.header,
        }}
        centerContainerStyle={{alignContent: 'flex-start'}}
        leftComponent={leftIcon}
        leftContainerStyle={{left: 10}}
        linearGradientProps={{}}
        placement="center"
        statusBarProps={{}}
        rightComponent={rightIcon}
        rightContainerStyle={{right: 10}}
      />
    </View>
  );
}

export function DatLichHeader({title, values}) {
  return (
    <>
      <CustomHeader title={title} />
      <View style={{padding: 30, backgroundColor: '#fff'}}>
        <Progress values={values ? values : 0} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    color: '#000',
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
});
