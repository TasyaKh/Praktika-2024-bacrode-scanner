import { Modal, StyleSheet, View, TextInput, Text } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Icon } from "@rneui/base";
import { ThemeCtx } from "../../context/themeCtx";
import { colors } from "../../config/theme";
import { act } from "react-test-renderer";

interface modalVisibleProps {
  mVisible: boolean;
  onModalVisibleChanged: (mVisible: boolean) => void;
  handleSaveChapter: (chName: string) => void;
  title:string
}

const MCreateChapter: React.FC<modalVisibleProps> = ({ mVisible, onModalVisibleChanged, handleSaveChapter, title }) => {
  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  const [modalVisible, setModalVisible] = useState(mVisible);

  const [chapterName, setChapterName] = useState(title);

  useEffect(() => {
    onModalVisibleChanged(modalVisible);
  }, [modalVisible]);


  function onSaveChapter() {
    handleSaveChapter(chapterName);
  }

  return (
    <View  className={'flex-1'}  style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View  className={'flex-1'}  style={styles.centeredView}>
          <View className={"px-12 py-6"} style={[styles.modalView, { backgroundColor: activeColors.primary, shadowColor:activeColors.main }]}>
            <TextInput
              onChangeText={(text) => setChapterName(text)}
              value={chapterName}
              placeholder="Name ..."
              autoFocus={true}
              placeholderTextColor={activeColors.hint}
              style={{ color: activeColors.text }}
            />
            <View style={{ flexDirection: "row",  justifyContent: "space-between" }}>
              {/*exit*/}
              <Button radius={"xl"} color={"red"}
                      onPress={() => setModalVisible(!modalVisible)}>
                exit
                <Icon name="close" color="white" />
              </Button>
              {/*save */}
              <Button radius={"xl"} type="solid" onPress={() => {
                onSaveChapter();
              }}>
                save
                <Icon name="done" color="white" />
              </Button>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems:"center",
    justifyContent: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    borderRadius: 15,

    // shadowOffset: {
    //   width: 0,
    //   height: 12
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 2,
    elevation: 15
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default MCreateChapter;
