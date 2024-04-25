import React, {useContext} from 'react';

import {View, Pressable, Dimensions, StyleSheet, Text} from 'react-native'
import NavigationElem from "./NavigationElem.tsx";
import {ThemeCtx} from "../../context/themeCtx.ts";
import {colors} from "../../config/theme.ts";

const {width} = Dimensions.get('window')

const TabBar = ({state, descriptors, navigation}: any) => {
    const theme = useContext(ThemeCtx);
    let activeColors = colors[theme.mode];

    return (
        <View style={[styles.mainContainer, {backgroundColor: activeColors.secondary}]}>
            {state.routes.map((route: any, index: number) => {
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <View key={index} style={[styles.mainItemContainer, {borderRightWidth: label == "notes" ? 3 : 0}]}>
                        <Pressable
                            onPress={onPress}>
                            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                                <NavigationElem route={label} isFocused={isFocused}/>
                            </View>
                        </Pressable>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        borderRadius: 20,
        marginHorizontal: width * 0.15
    },
    mainItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        borderRadius: 1,
    },
})


export default TabBar;
