import { Dimensions, Text, View } from "react-native";
import React, { useContext, useImperativeHandle, useState } from "react";
import { ThemeCtx } from "../context/themeCtx";
import { colors } from "../config/theme";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

interface ToastProps {
}

export type ToastType = 'warning' | 'error' | 'save'

export interface ToastRef {
  startToast: (message: string, mode: ToastType) => void;
}

const Toast = React.forwardRef<ToastRef, ToastProps>((props, ref) => {
  // const [showT, setShowT] = useState(show)
  const [mode, setMode] = useState<ToastType>('warning');
  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  const [msg, setMsg] = useState("");
  const toastTopPosition = useSharedValue(-Dimensions.get("window").height);

  const toastAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: toastTopPosition.value
    };
  });

  useImperativeHandle(ref, () => ({
    startToast(message: string, mode: ToastType = 'warning') {
      setMsg(message);
      setMode(mode);
      showToast();
    }
  }));

  const showToast = () => {
    toastTopPosition.value = withTiming( 1);

    setTimeout(() => {
      toastTopPosition.value = withTiming(-Dimensions.get("window").height);
    }, 2000);
  };

  return (
    <Animated.View
      style={[{
        padding: 20,
        position: "absolute",
        top: 40,
        width: "100%",
        zIndex: 10
      }, toastAnimatedStyle]}
    >
      <View
        style={{
          backgroundColor: activeColors.primary,
          borderColor: toastStyles[mode].color,
          flexDirection: "row",
          elevation:16,
          shadowColor:activeColors.main
        }}
        className={"p-2 rounded-xl border opacity-95"}
      >
        <FontAwesome6 name={toastStyles[mode].icon}
                      color={toastStyles[mode].color} size={20} />
        <Text style={{ color: activeColors.text, paddingHorizontal: 10 }}>
          {msg}
        </Text>
      </View>
    </Animated.View>
  );
});
export default Toast;

const toastStyles = {
  warning: {
    color: "#ff982d",
    icon:"circle-exclamation"
  },
  error:{
    color: "#ff3e3e",
    icon:"xmark"
  },
  save:{
    color: "#abde63",
    icon:"check"
  }
}

