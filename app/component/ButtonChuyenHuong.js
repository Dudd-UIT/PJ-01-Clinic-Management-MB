import React from "react";
import { Button, Text } from "@rneui/themed";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function ButtonChuyenHuong({ title, name }) {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', }}>
        <Button
          type="solid"
          onPress={() => navigation.navigate(name)}
          buttonStyle={{
            padding: 10,
            borderRadius: 5
          }}
        >{title}</Button>
    </View>
  );
}
