import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { style } from './Theme';

const CustomSwitch = ({
  navigation,
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
  width,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const slideValue = useRef(new Animated.Value(getSelectionMode === 1 ? 0 : 1)).current;

  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
    Animated.timing(slideValue, {
      toValue: val === 1 ? 0 : 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const option1Style = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [selectionColor, 'white']
  });

  const option2Style = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', selectionColor]
  });

  return (
    <View style={style.center}>
      <View
        style={{
          height: 'auto',
          width: 'auto',
          backgroundColor: 'white',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: option1Style,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => updatedSwitchData(1)}
          >
            <Text
              style={[style.h7, style.p3,{
                color: getSelectionMode === 1 ? 'white' : selectionColor,
              }]}>
              {option1}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: option2Style,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => updatedSwitchData(2)}>
            <Text
              style={[style.h7, style.p3,{
                  color: getSelectionMode === 2 ? 'white' : selectionColor,
                }]}>
              {option2}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};
export default CustomSwitch;
