import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Text } from "react-native";
import { Button } from "@rneui/base";
import { ThemeCtx } from "../context/themeCtx";
import { colors } from "../config/theme";

const LoadingSpinner = (): JSX.Element => {
  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  const animationValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(8);

  useEffect(() => {
    Animated.loop(
      Animated.spring(animationValue, {
        toValue: scaleValue.current,
        // speed:1,
        // friction: 1,
        tension: 1,
        useNativeDriver: true
      })
    ).start()
  }, []);
  // const runAnimationOnClick = () => {
  //   scaleValue.current = scaleValue.current === 0 ? 8 : 0;
  //   Animated.loop(
  //     Animated.spring(animationValue, {
  //       toValue: scaleValue.current,
  //       speed:1,
  //       // friction: 1,
  //       // tension: 1,
  //       useNativeDriver: true
  //     })
  //   ).start()
  // }

  return (
    <View>

      <Animated.View
        style = {{
          height: 24,
          width: 24,
          borderBottomColor: activeColors.main,
          borderWidth:2,
          transform: [
            {
              rotate: animationValue.interpolate({
                inputRange: [0, 8],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      />
      {/*<Button title="Scale Up" onPress={runAnimationOnClick} >kmkmk</Button>*/}
    </View>
  )
}



const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    borderRadius: 40 / 2,
    borderWidth: 4,
    opacity: 0.25
  },
  progress: {
    width: '100%',
    height: '100%',
    borderRadius: 40 / 2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderWidth: 4,
    position: 'absolute'
  }
})

export default LoadingSpinner
