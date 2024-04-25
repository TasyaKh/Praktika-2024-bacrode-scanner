import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ThemeCtx } from "../../context/themeCtx.ts";
import { colors } from "../../config/theme.ts";

interface modalVisibleProps {
  mVisible: boolean;
  onModalVisibleChanged: (mVisible: boolean) => void;
  handleAccept: (chName: string) => void;
  title:string
}

const MAccept: React.FC<modalVisibleProps> = ({ mVisible, onModalVisibleChanged, handleAccept, title }) => {
  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  const [modalVisible, setModalVisible] = useState(mVisible);

  useEffect(() => {
    onModalVisibleChanged(modalVisible);
  }, [modalVisible]);


  function onSaveChapter() {
    handleAccept(title);
  }

  return (
    <View  style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: activeColors.primary, shadowColor:activeColors.main, borderColor:activeColors.main }]}>
            <Text  style={[styles.title, { color: activeColors.text }]}>{title}</Text>

            <View style={{ flexDirection: "row",  justifyContent: "space-between" }}>
              {/*exit*/}
              <TouchableOpacity style={[styles.button, {backgroundColor:activeColors.grey_400}]}
                                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonText}>отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.confirmButton,  {backgroundColor:activeColors.orange_400}]} onPress={() => {
                onSaveChapter();
              }}>
                <Text style={styles.buttonText}>да</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex:1,
    alignItems:"center",
    justifyContent: "center",
    marginTop: 22
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    borderRadius: 15,
    paddingVertical:20,
    paddingHorizontal:20,
    borderWidth:0.5,
    elevation: 15
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: '#DDDDDD',
  },
  confirmButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});

export default MAccept;
