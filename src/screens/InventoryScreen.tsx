import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeCtx } from "../context/themeCtx.ts";
import { colors } from "../config/theme.ts";
import { FAB, Icon } from "@rneui/base";
import { useDatabaseConnection } from "../hooks/db.createConnection.tsx";
import { Document } from "../db/entities/document.entity.ts";
import { act } from "react-test-renderer";

interface InventoryScreenProps {
  navigation: any;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({ navigation }) => {

  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  const DocsList = ({ navigation }) => {

    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Products", { id_document: item.id })}
      >
        <Icon name="description" size={24} color={activeColors.main} />
        <View style={styles.infoContainer}>
          <Text style={styles.info}> Документ {index + 1}</Text>
          <Text style={[styles.info, styles.date]}>{item.date_create.toLocaleDateString()}</Text>
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

  const addDocument = async () => {
    await docService.create({}).then((data) => {
      getDocs();
    });
  };

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <View style={styles.container}>
      <DocsList navigation={navigation} />
      <FAB
        style={[styles.fab]}
        color={activeColors.main}
        onPress={addDocument}
        icon={<Icon name={"add"} color={activeColors.primary} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  fab: {
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
    justifyContent: "center",
    marginLeft: 20
  },
  info: {
    fontSize: 16,
    marginTop: 5
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
