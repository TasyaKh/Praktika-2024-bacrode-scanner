import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { ThemeCtx } from "../../context/themeCtx";
import { colors } from "../../config/theme";

interface Props {
  onSwitchPressed: (state: boolean) => void;
  textChecked:string,
  textUnchecked:string,
  state:boolean
}

const SwitchButton: React.FC<Props> = ({ onSwitchPressed, textChecked, textUnchecked, state }) => {
  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  const [stateBtn, setStateBtn] = useState(state);

  const toggleText = () => {
    setStateBtn(!stateBtn);
    onSwitchPressed(stateBtn);
  };

  return (
    <View>
        <TouchableOpacity onPress={toggleText} style={{ borderColor: activeColors.main, borderWidth:1, minWidth:100}}
                          className={"px-2 py-2 rounded flex-row justify-center items-center"}>
          <Text style={{color:activeColors.main}} className={'pr-2'}>{stateBtn ? textChecked : textUnchecked}</Text>
          <FontAwesome6 name={"repeat"} color={activeColors.main} />
        </TouchableOpacity>

    </View>
  );
};

export default SwitchButton;
