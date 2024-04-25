import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { ThemeCtx } from "../context/themeCtx.ts";
import { colors } from "../config/theme.ts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonDefault from "../components/buttons/ButtonDefault.tsx";
import { Icon } from "@rneui/base";
import { useFocusEffect } from "@react-navigation/native";
import Toast, { ToastRef } from "../components/Toast.tsx";
import { EMAIL } from "../config/local-storage-names.ts";

interface Props {
  navigation: any;
}

const SettingsScreen: React.FC<Props> = () => {
  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];
  const toastRef = useRef<ToastRef>(null);

  const [inputValue, setInputValue] = useState('');

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(EMAIL).then((email)=> {
        setInputValue(email)
      })
    }, [])
  );


  const saveEmailValue = async () => {
    try {
      await AsyncStorage.setItem(EMAIL, inputValue);
      toastRef?.current?.startToast("сохранено", "save");
    } catch (error) {
      toastRef?.current?.startToast("ошибка", "error");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.setting}>
        <Text style={{color:activeColors.text_secondary}}>e-mail</Text>
        <TextInput keyboardType={"email-address"} focusable={false}  value={inputValue} cursorColor={activeColors.main} style={[styles.input, {color:activeColors.text}]} onChangeText={setInputValue}></TextInput>
        <ButtonDefault onPressed={saveEmailValue} text={"сохранить"} color={activeColors.green_400} child={<Icon name={"done"} color={activeColors.green_400} />}/>
      </View>
      <Toast ref={toastRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding:10,
    alignItems: 'center',
  },
  input: {
    padding: 8,
    width:150,
    borderBottomWidth:1,
    maxWidth:150
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
});

export default SettingsScreen;
