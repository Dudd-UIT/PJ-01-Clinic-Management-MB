import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, LinearProgress } from "@rneui/themed";
import { BCarefulTheme } from "../Theme";

function Progress({ values }) {
    return (
        <View style={styles.container}>
            <LinearProgress style={styles.progress} color={BCarefulTheme.colors.secondary} value={values} />
            <View style={styles.circlesContainer}>
                {values >= 0 ?
                    <View style={[styles.circle, styles.activeCircle]}>
                        <Icon name='fitness' type="ionicon" color={'white'} />
                    </View>
                    :
                    <View style={styles.circle}>
                        <Icon name='fitness-outline' type="ionicon" color={'white'} />
                    </View>
                }
                {values >= 0.5 ?
                    <View style={[styles.circle, styles.activeCircle]}>
                        <Icon name='receipt' type="ionicon" color={'white'} />
                    </View>
                    :
                    <View style={styles.circle}>
                        <Icon name='receipt-outline' type="ionicon" color={'white'} />
                    </View>
                }
                {values >= 1 ?
                    <View style={[styles.circle, styles.activeCircle]}>
                        <Icon name='cash' type="ionicon" color={'white'} />
                    </View>
                    :
                    <View style={styles.circle}>
                        <Icon name='cash-outline' type="ionicon" color={'white'} />
                    </View>
                }
            </View>
        </View>
    );
}

export default Progress;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
        height: 10,
    },
    progress: {
        height: 10,
    },
    circlesContainer: {
        top: -30,
        left: -2,
        width: '102%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circle: {
        width: 45,
        height: 45,
        borderRadius: 100,
        backgroundColor: '#F3C7AE',
        justifyContent: 'center',
    },
    activeCircle: {
        backgroundColor: BCarefulTheme.colors.secondary,
    }
});
