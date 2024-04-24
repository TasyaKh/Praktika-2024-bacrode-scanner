import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeCtx } from "../context/themeCtx.ts";
import { colors } from "../config/theme.ts";
import { FAB, Icon } from "@rneui/base";
import { useDatabaseConnection } from "../hooks/db.createConnection.tsx";
import { Document } from "../db/entities/document.entity.ts";
import MAccept from "../components/modals/MAccept.tsx";

interface InventoryScreenProps {
  navigation: any;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({ navigation }) => {

  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  const [deleteDocId, setDeleteDocId] = useState<number | null>();
  const DocsList = ({ navigation }) => {

    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Products", { id_document: item.id })}
      >
        <Icon name="description" size={24} color={activeColors.main} />
        <View style={styles.infoContainer}>
          <Text style={styles.info}> Документ {item.id}</Text>
          <Text
            style={[styles.info, styles.date]}>{item.date_create.toLocaleDateString()} {item.date_create.toLocaleTimeString()}</Text>
          <TouchableOpacity onPress={() => deleteDoc(item.id)} style={{backgroundColor:activeColors.secondary, padding:5}}>
            <Icon name={"delete"} color={activeColors.lightRed}></Icon>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={data?.docs}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  };

  const { docService } = useDatabaseConnection();
  const [data, setData] = useState<{
    docs: Document[],
    count: number
  }>();

  const getDocs = async () => {
    await docService.findDocuments({}).then((data) => {
      setData({ docs: data[0], count: data[1] });
    });
  };

  const deleteDoc = async (id: number) => {
    setDeleteDocId(id);
  };

  const addDocument = async () => {
    await docService.create({}).then((data) => {
      getDocs();
    });
  };

  const handleAcceptDelete = async () => {
    await docService.delete(deleteDocId).then((data) => {
      getDocs();
      setDeleteDocId(null)
    });
  };

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <View style={styles.container}>
      <DocsList navigation={navigation} />
      <FAB
        style={[styles.fabDone]}
        color={activeColors.main}
        onPress={addDocument}
        icon={<Icon name={"add"} color={activeColors.primary} />}
      />
      {deleteDocId && <MAccept mVisible={true} handleAccept={handleAcceptDelete} title={"Удалить документ?"}
                               onModalVisibleChanged={(visible) => setDeleteDocId(visible ? deleteDocId : null)} />}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  fabDone: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 80
  },
  item: {

    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  infoContainer: {
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "center",
    marginLeft: 20
  },
  info: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    marginHorizontal: 20
  },
  document: {
    fontSize: 18,
    fontWeight: "bold"
  }
});


export default InventoryScreen;
