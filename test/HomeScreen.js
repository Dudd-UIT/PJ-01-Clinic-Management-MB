import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();

  const handleItemPress = (itemId) => {
    navigation.navigate('Details', { itemId });
  };

  return (
    <View>
      <Text>Phần header</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View key={item.id}>
            <Text>{item.title}</Text>
            <Button title="Chi tiết" onPress={() => handleItemPress(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export const DetailsScreen = ({ route }) => {
  const { itemId } = route.params;
  const itemData = data.find((item) => item.id === itemId);

  if (!itemData) {
    return null;
  }

  return (
    <View>
      <ScrollView>
        <Text>{itemData.title}</Text>
        <Text>Chi tiết của item {itemId}</Text>
      </ScrollView>
    </View>
  );
};
