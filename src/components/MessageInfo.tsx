import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeCtx } from "../context/themeCtx.ts";
import { colors } from "../config/theme.ts";

interface InfoMessageProps {
  text: string;
  typeMsg: "danger" | "info" | "accept";
}

const InfoMessage: React.FC<InfoMessageProps> = ({ text, typeMsg }) => {
  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  const getStylesTypeMsg = () => {
    let backgroundColor = activeColors.grey_400;
    let borderColor = activeColors.grey_700;
    let textColor = activeColors.black;

    switch (typeMsg) {
      case "danger":
        backgroundColor = activeColors.orange_200;
        borderColor = activeColors.orange_700;
        break;
      case "accept":
        backgroundColor = activeColors.green_200;
        borderColor = activeColors.green_700;
        break;
      case "info":
        backgroundColor = activeColors.yellow_200;
        borderColor = activeColors.yellow_700;
        break;
    }

    return {backgroundColor:backgroundColor,
      borderColor:borderColor,
      textColor:textColor}
  }

  const stylesTypeMsg  = getStylesTypeMsg()

  useEffect(() => {

  }, []);

  return (
    <View style={[styles.container, { backgroundColor: stylesTypeMsg.backgroundColor, borderColor:stylesTypeMsg.borderColor }]}>
      <Text style={[styles.text, { color: stylesTypeMsg.textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    opacity:0.9,
    padding: 10,
    borderRadius: 5,
    borderWidth:1,
    marginBottom: 10
  },
  text: {
    fontSize: 16
  }
});

export default InfoMessage;
