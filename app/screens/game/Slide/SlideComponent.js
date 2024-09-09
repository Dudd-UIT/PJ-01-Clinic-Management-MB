import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { BCarefulTheme, style } from "../../../component/Theme"

export const CustomBtn = ({ label, func }) => {
    return (
        <TouchableOpacity style={[styles.block, style.center, label && styles.blockfill]}
        onPress={func}>
            <Text style={[style.h2, style.white]}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    block: {
        width: 70,
        height: 70,
        margin: 2,
        borderRadius: 10,
        backgroundColor: BCarefulTheme.colors.light,
    },

    blockfill: {
        backgroundColor: BCarefulTheme.colors.primary,

    }
})

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};