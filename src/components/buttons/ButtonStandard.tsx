import React, { ReactNode, useContext } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeCtx } from "../../context/themeCtx";
import { colors } from "../../config/theme";

interface Props {
  text: string;
  color?: string;
  onPressed: () => void;
  child?: ReactNode;
}

const ButtonStandard: React.FC<Props> = ({ onPressed, text, child, color }) => {
  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  return (
    <TouchableOpacity onPress={onPressed} style={[styles.button, {  borderColor: color ?? activeColors.grey_400}]}>
      <Text style={[styles.backText, { color: activeColors.text }]}>{text}</Text>
      {child}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button: {
    borderWidth:1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding:8,
    justifyContent:"center",
    marginVertical: 18
  },
  backText: {
    fontSize: 16,
    marginLeft: 5
  }
});

export default ButtonStandard;
