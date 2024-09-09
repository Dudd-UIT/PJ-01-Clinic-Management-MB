import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CustomBtn, shuffleArray } from "./SlideComponent";
import { BCarefulTheme, style } from "../../../component/Theme";
import { View } from "react-native";
import { useState } from "react";


function SlideGame() {
    const initialPositions = [1, 2, 3, 4, 5, 6, 7, 8, null];
    const [positions, setPositions] = useState(shuffleArray([...initialPositions]));
    const [toggle, setToggle] = useState(false);
    const [count, setCount] = useState(0);
    const [isWin, setIsWin] = useState(false);


    const switchPosition = (position, index) => {
        const newPositions = [...positions];
        const nullIndex = newPositions.indexOf(null);

        if (
            (index === 0 && (nullIndex === 1 || nullIndex === 3)) ||
            (index === 1 && (nullIndex === 0 || nullIndex === 2 || nullIndex === 4)) ||
            (index === 2 && (nullIndex === 1 || nullIndex === 5)) ||
            (index === 3 && (nullIndex === 0 || nullIndex === 4 || nullIndex === 6)) ||
            (index === 4 && (nullIndex === 1 || nullIndex === 3 || nullIndex === 5 || nullIndex === 7)) ||
            (index === 5 && (nullIndex === 2 || nullIndex === 4 || nullIndex === 8)) ||
            (index === 6 && (nullIndex === 3 || nullIndex === 7)) ||
            (index === 7 && (nullIndex === 4 || nullIndex === 6 || nullIndex === 8)) ||
            (index === 8 && (nullIndex === 5 || nullIndex === 7))
        ) {
            newPositions[index] = null;
            newPositions[nullIndex] = position;
            setPositions(newPositions);
            setCount(count + 1);
            setToggle(!toggle);
            if (checkWin(newPositions)) {
                setIsWin(true)
            }
        }
    };



    const refreshGame = () => {
        setPositions(shuffleArray([...initialPositions]));
        setToggle(!toggle);
        setCount(0);
        setIsWin(false)
    };

    const checkWin = (positions) => {
        for (let i = 0; i < positions.length - 1; i++) {
            if (positions[i] !== i + 1) return false;
        }
        return positions[positions.length - 1] === null;
    };

    return (
        <View style={[style.container, style.center, { top: 150 }]}>
            <View style={[style.row, style.m4]}>
                <TouchableOpacity
                    style={style.card}
                    onPress={refreshGame}
                >
                    <Text style={[style.black, style.h6]}>Chơi lại</Text>
                </TouchableOpacity>
                <View style={[style.btnSub, { minWidth: 60 }]}>
                    <Text style={[style.h5, style.white,]}>{count}</Text>
                </View>
            </View>
            <View style={[styles.puzzleContainer]}>
                {
                    positions.map((position, index) => (
                        <CustomBtn
                            key={index}
                            label={position}
                            func={() => switchPosition(position, index)}
                        />
                    ))
                }
            </View>

            {isWin && (
          <View style={styles.win}>
            <Text style={style.h3}>Bạn đã thắng!</Text>
          </View>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    puzzleContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 230,
    },
    win: {
        position: 'absolute',
        top: '20%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        zIndex: 10,
      },
})

export default SlideGame;