import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { style } from "../../component/Theme";
import { useNavigation } from "@react-navigation/native";

function Game() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={style.container}>
            <View>
                <Text style={[style.center, style.h1]}>Chọn trò chơi</Text>
                <TouchableOpacity style={[style.btnOutline, style.m5]}
                onPress={() => navigation.navigate('2048')}>
                    <Text style={[style.h2,]}>2048</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btnOutline, style.m5]}
                onPress={() => navigation.navigate('Slide')}>
                    <Text style={[style.h2,]}>Slide game</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

export default Game;