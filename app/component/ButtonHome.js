import React from "react";
import { Button, Icon, Text } from "@rneui/themed";
import { View, Image, TouchableOpacity } from "react-native";
import { BCarefulTheme } from "./Theme";
import Fonts from "../../assets/fonts/Fonts";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export function ButtonHome({ title, name, navigation }) {
  let img = 0;
  if (name == 'DatLich') {
    img = require('../../assets/images/DatLich.png')
  } else if (name == 'TheoDoi') {
    img = require('../../assets/images/TheoDoi.png')
  } else if (name == 'LichThuoc') {
    img = require('../../assets/images/LichThuoc.png')
  } else if (name == 'QuyTrinh') {
    img = require('../../assets/images/QuyTrinh.png')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', }}>
      <LinearGradient
        colors={[BCarefulTheme.colors.primary, BCarefulTheme.colors.secondary]}
        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
        style={{
          justifyContent: 'flex-end',
          padding: 3,
          width: '100%',
          borderRadius: 5,
        }}>
        <Button
          type="solid"
          onPress={() => navigation.navigate(name)}
          buttonStyle={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 5

          }}
        >
          <Image
            source={img}
            style={{
              flex: 1,
              aspectRatio: 1,
              resizeMode: 'contain',
            }}
          />
          <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginLeft: 8, }}>
            <Text style={{ fontFamily: Fonts.semiBold, color: 'black', fontSize: 14}}>
              {title}
            </Text>
          </View>
        </Button>
      </LinearGradient>
    </View>
  );
}


export function BackToHomeBtn() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Home')}>
      <Icon name="home" type="ionicon" color={BCarefulTheme.colors.primary} />
    </TouchableOpacity>
  )
}
export function GoBackBtn() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}>
      <Icon name="arrow-back-outline" type="ionicon" color={BCarefulTheme.colors.primary} size={24} />
    </TouchableOpacity>
  )
}