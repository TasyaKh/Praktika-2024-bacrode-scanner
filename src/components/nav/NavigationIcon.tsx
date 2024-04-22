import React, {useContext} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Icon} from "@rneui/base";
import {ThemeCtx} from "../../context/themeCtx.ts";
import {colors} from "../../config/theme.ts";

interface NavigationIconProps {
    route: string,
    isFocused: boolean
}

interface IcoNameProps {
    name: string,
    isFocused: boolean,
    icon:string
}



const NavigationIcon = ({route, isFocused}: NavigationIconProps) => {
    const theme = useContext(ThemeCtx);
    let activeColors = colors[theme.mode];

    const IcoName = ({name, isFocused, icon}: IcoNameProps) => {
        return (
            <View>
                <Icon name={icon} color={isFocused ? activeColors.main : activeColors.text_secondary}/>
                <Text style={{fontSize: 12, color:isFocused ? activeColors.main : activeColors.text_secondary}}>{name}</Text>
            </View>

        )
    }

    const renderIcon = (route: string, isFocues: boolean) => {

        switch (route) {
            case "barcode":
                return <IcoName name={"штрихкод"} isFocused={isFocues} icon={"qr-code"}/>
            case "inventory":
                return <IcoName name={"инвентарь"} isFocused={isFocues} icon={"inventory"}/>
            default:
                break;
        }
    }

    return (
        <View>
            {renderIcon(route, isFocused)}
        </View>

    )
}

const styles = StyleSheet.create({})

export default NavigationIcon
