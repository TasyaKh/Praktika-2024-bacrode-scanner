import React, {useContext} from "react";
import {StyleSheet, View} from "react-native";
import {ThemeCtx} from "../context/themeCtx.ts";
import {colors} from "../config/theme.ts";

interface InventoryScreenProps {
    navigation: any;
}


const InventoryScreen: React.FC<InventoryScreenProps> = ({navigation}) => {
    const theme = useContext(ThemeCtx);
    let activeColors = colors[theme.mode];

    return (
        <View style={styles.container}>

        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
});


export default InventoryScreen;
