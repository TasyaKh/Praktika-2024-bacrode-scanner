import React, {} from "react";
import 'react-native-reanimated'
import {
    SafeAreaView,

    useColorScheme,
    View
} from "react-native";


import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Icon} from "@rneui/base";
import {ThemeCtx} from "./src/context/themeCtx.ts";
import {colors} from "./src/config/theme.ts";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BarcodeScanner from "./src/screens/BarcodeScanner.tsx";

import {DatabaseConnectionProvider} from "./src/hooks/db.createConnection";
import InventoryScreen from "./src/screens/InventoryScreen.tsx";
import TabBar from "./src/components/nav/TabBar.tsx";
import ProductsScreen from "./src/screens/ProductsScreen.tsx";

// import 'react-native-gesture-handler'

const Tab = createBottomTabNavigator();

function AppTabs() {
    return (
        <Tab.Navigator screenOptions={{headerShown:false}} initialRouteName={"barcode"} tabBar={props => <TabBar {...props} />} >
            <Tab.Screen name="barcode" component={BarcodeScanner} />
            <Tab.Screen name="inventory" component={InventoryScreen} />
        </Tab.Navigator>
    );
}


function App(): React.JSX.Element {

    const theme = {mode: useColorScheme() ?? "light"};
    let activeColors = colors[theme.mode];

    const Stack = createNativeStackNavigator();

    const BottomTabs = createBottomTabNavigator();

    const customLightThemeNav = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: colors["light"].primary
        }
    };

// Custom dark theme with overridden and added colors
    const customDarkThemeNav = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            background: colors["dark"].primary
        }
    };


    return (
        <ThemeCtx.Provider value={theme}>
            <DatabaseConnectionProvider>
                <SafeAreaView style={{flex: 1}}>
                    <GestureHandlerRootView style={{flex: 1}}>
                        <View style={{flex: 1, backgroundColor: activeColors.primary}}>
                            <NavigationContainer
                                theme={theme.mode === "dark" ? customDarkThemeNav : customLightThemeNav}>
                                    <Stack.Navigator initialRouteName={"HomeTabs"} screenOptions={{headerShown:false}}>
                                        <Stack.Screen name="HomeTabs" component={AppTabs}/>
                                        <Stack.Screen name="Products" component={ProductsScreen} />
                                    </Stack.Navigator>
                                </NavigationContainer>
                        </View>
                    </GestureHandlerRootView>
                </SafeAreaView>

            </DatabaseConnectionProvider>
        </ThemeCtx.Provider>

    );
}

export default App;

