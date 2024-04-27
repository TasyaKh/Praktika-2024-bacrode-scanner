import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeCtx } from "../context/themeCtx.ts";
import { colors } from "../config/theme.ts";
import { FAB, Icon } from "@rneui/base";
import { useDatabaseConnection } from "../hooks/db.createConnection.tsx";
import { Document } from "../db/entities/document.entity.ts";
import MDefault from "../components/modals/MAccept.tsx";
import ButtonDefault from "../components/buttons/ButtonDefault.tsx";
import InfoMessage from "../components/MessageInfo.tsx";
import { FilesService } from "../db/services/outside/create-files.ts";
import Toast, { ToastRef } from "../components/Toast.tsx";
import { EmailService, IAttachment } from "../db/services/outside/email.ts";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EMAIL } from "../config/local-storage-names.ts";

interface InventoryScreenProps {
  navigation: any;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({ navigation }) => {

  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  const toastRef = useRef<ToastRef>(null);

  const [deleteDocId, setDeleteDocId] = useState<number | null>();
  const [modalClearAllVisible, setModalClearAllVisible] = useState(false);

  const DocsList = ({ navigation }) => {

    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Products", { id_document: item.id })}
      >
        <Icon name="description" size={24} color={activeColors.main} style={{flex:1}} />
        <View style={styles.infoContainer}>
          <Text style={[styles.info, {flex:1}]}> {item.name}</Text>
          <Text
            style={[styles.info, styles.date, {flex:1}]}>{item.date_create.toLocaleDateString()} {item.date_create.toLocaleTimeString()}</Text>

        </View>
        <View style={{ flex:1 }}>
          <TouchableOpacity onPress={() => deleteDoc(item.id)}
                            style={{ backgroundColor: activeColors.secondary, padding: 5 }}>
            <Icon name={"delete"} color={activeColors.orange_400}></Icon>
          </TouchableOpacity>
        </View>

      </TouchableOpacity>
    );

    return (
      <FlatList
        data={data?.docs}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  };

  const { docService, prService } = useDatabaseConnection();
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

  const handleDeleteAll = async () => {
    await docService.deleteAll().then((data) => {
      getDocs();
      setModalClearAllVisible(false);
    });
  };

  const onCSVCreate = async () => {
    // Fetch products from the database
    const products = await prService.findProducts({});

    // Convert products data to CSV format
    const csvData = prService.convertToCSVProducts(products[0]);

    const fS = new FilesService();

    let csv = await fS.createCSVFile("products", "csv", csvData);
    if (csv.msg.err) toastRef?.current?.startToast(csv.msg.err, "error");
    else if (csv.msg) {
      // connect to email
      let eS = new EmailService();
      let attachment: IAttachment = { name: "products", path: csv.path, type: "csv" };
      const resp = (error: string) => {
        toastRef?.current?.startToast(error, "error");
      };
      await eS.sendEmail([attachment], resp, "Отчет по инвентаризации");
      // toastRef?.current?.startToast(csv.msg.msg, "save");
    }
  };

  const handleAcceptDelete = async () => {
    await docService.delete(deleteDocId).then((data) => {
      getDocs();
      setDeleteDocId(null);
    });
  };

  useFocusEffect(
    useCallback(() => {
      getDocs();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.settingsView}>
        <ButtonDefault text={"CSV"} onPressed={onCSVCreate} color={activeColors.green_400}
                       child={<Icon name={"upload"} color={activeColors.text} />} />
        <ButtonDefault onPressed={() => setModalClearAllVisible(true)} text={"Очистить все"}
                       color={activeColors.orange_400} />
      </View>
      {data?.docs.length > 0 ? <DocsList navigation={navigation} /> :
        <InfoMessage text={"Документов нет"} typeMsg={"info"} />}
      {/* add doc */}
      <FAB
        style={[styles.fabAdd]}
        color={activeColors.main}
        onPress={addDocument}
        icon={<Icon name={"add"} color={activeColors.primary} />}
      />
      {/* modal delete docs */}
      {deleteDocId && <MDefault mVisible={true} handleAccept={handleAcceptDelete} title={"Удалить документ?"}
                                onModalVisibleChanged={(visible) => setDeleteDocId(visible ? deleteDocId : null)} />}
      {/* modal delete all docs */}
      {modalClearAllVisible &&
        <MDefault mVisible={modalClearAllVisible} handleAccept={handleDeleteAll} title={"Удалить ВСЕ документы?"}
                  onModalVisibleChanged={(visible) => setModalClearAllVisible(visible)} />}
      <Toast ref={toastRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  settingsView: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  fabAdd: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 80
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal:10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  infoContainer: {
    flexDirection: "row",
    flex:5,
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  info: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,

  },
  document: {
    fontSize: 18,
    fontWeight: "bold"
  }
});


export default InventoryScreen;
