// Tile.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Tile = ({ value, rowIndex, colIndex }) => {
    const scale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scale, {
            toValue: 1,
            tension: 100,
            friction: 7,
            useNativeDriver: true,
        }).start();
    }, [value, rowIndex, colIndex]);

    const colors = ['#eee', '#ffd8e5', '#e5b7f2', '#ce75f0', '#965dec', '#704fde', '#4343d2', '#6de7d7', '#90F4B2', '#D2FA84', '#F9F871', '#FFFD12'];
    let color;
    if (value === 0) {
        color = colors[0];
    } else {
        color = colors[Math.log2(value)];
    }

    return (
        <>
            {value !== 0 ?
                (
                    <Animated.View style={[styles.tile, { backgroundColor: color, transform: [{ scale }] }]}>
                        <Text style={styles.tileText}>{value !== 0 ? value : ''}</Text>
                    </Animated.View>
                ) :
                (
                    <View style={[styles.tile, { backgroundColor: color }]}>
                        <Text style={styles.tileText}>{value !== 0 ? value : ''}</Text>
                    </View>
                )
            }
        </>
    );
};

const styles = StyleSheet.create({
    tile: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: '#eee',
    },
    tileText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Tile;
