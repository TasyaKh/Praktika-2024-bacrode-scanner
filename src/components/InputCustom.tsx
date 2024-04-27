import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeCtx } from "../context/themeCtx";
import { colors } from "../config/theme";
import { Input } from "@rneui/base";

interface Props {
  onChangeText?: (txt: string) => void;
  value: string;
  lengthMax?:number
}


const InputCustom: React.FC<Props> = ({ onChangeText, value, lengthMax }) => {
  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  return (
    <Input onChangeText={onChangeText ?? null} value={value} cursorColor={activeColors.main} maxLength={lengthMax ?? 1000}
           style={{ color: activeColors.text }}></Input>
  );
};


const styles = StyleSheet.create({});

export default InputCustom;
