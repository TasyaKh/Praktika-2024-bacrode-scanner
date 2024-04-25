import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeCtx } from "../context/themeCtx.ts";
import { colors } from "../config/theme.ts";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDatabaseConnection } from "../hooks/db.createConnection.tsx";
import { FAB, Icon } from "@rneui/base";
import { Product } from "../db/entities/product.entity.ts";
import InfoMessage from "../components/MessageInfo.tsx";

// Define the parameters type
type RootStackParamList = {
  Home: undefined;
  Products: { id_document: number }; // Define the parameter with type
  BarcodeScannerBack: { onPhotoTaken: (code: string) => void };
};

// Define the navigation props type for Details screen
type ProductsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Products">;

// Define the props for the Details screen
type ProductsScreenRouteProp = RouteProp<RootStackParamList, "Products">;

type ProductsScreenProps = {
  navigation: ProductsScreenNavigationProp;
  route: ProductsScreenRouteProp;
};


const ProductsScreen: React.FC<ProductsScreenProps> = ({ route, navigation }) => {
  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  const { id_document } = route.params;
  const [scannedCode, setScannedCode] = useState("-");

  const { prService } = useDatabaseConnection();
  const [dataProd, setDataProd] = useState<{
    prod: Product[],
    count: number
  }>();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const getProducts = async () => {

    await prService.findProducts({ id_document: id_document }).then((data) => {
      setDataProd({ prod: data[0], count: data[1] });
      // console.log("dsd", data[0])
    });

  };

  const addProduct = async (code: string) => {
    await prService.create({ code: code, date_create: new Date(), id_document: id_document }).then((data) => {
      getProducts();
    });
  };

  const deleteProduct = async (id: number) => {
    await prService.delete(id).then((data) => {
      getProducts();
    });
  };

  const handleTakePhoto = () => {
    navigation.navigate("BarcodeScannerBack", {
      onPhotoTaken: async (item) => {
        setScannedCode(item);
        await addProduct(item);
      }
    });
  };


  useEffect(() => {


    navigation.setOptions({
      title: `Документ ${id_document}`
    });

    getProducts().then(() => {
    });
  }, []);

  const ProductList = () => {
    const renderItem = ({ item, index }: { item: Product, index: number }) => (
      <View style={styles.item}>
        <Text style={styles.name}>{index + 1}</Text>
        <Text style={styles.code}>{item.code ?? "-"}</Text>
        <Text style={styles.name}>{item.date_create.toLocaleDateString()} {item.date_create.toLocaleTimeString()}</Text>
        <TouchableOpacity onPress={() => deleteProduct(item.id)}
                          style={{ backgroundColor: activeColors.secondary, padding: 5 }}>
          <Icon name={"delete"} color={activeColors.orange_400}></Icon>
        </TouchableOpacity>
      </View>
    );

    return (
      <FlatList
        data={dataProd?.prod}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: activeColors.text }}>Последний код: {scannedCode}</Text>
        {dataProd && dataProd.count > 0 ? <ProductList /> :
          <View style={{marginVertical:10}}><InfoMessage text={"Данных нет (сканируйте код)"} typeMsg={"info"} /></View>
        }
      </View>
      {/* done */}
      {/*<FAB*/}
      {/*  style={[styles.fabDone]}*/}
      {/*  color={activeColors.lightGreen}*/}
      {/*  onPress={addProduct}*/}
      {/*  icon={<Icon name={"done"} color={activeColors.primary} />}*/}
      {/*/>*/}
      {/* photo */}
      <FAB
        style={[styles.fabPhoto]}
        color={activeColors.main}
        onPress={handleTakePhoto}
        icon={<Icon name={"qr-code"} color={activeColors.primary} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  name: {
    fontSize: 12
  },
  code: {
    fontSize: 16,
    fontWeight: "bold"
  },
  fabAdd: {
    position: "absolute",
    margin: 20,
    left: 0,
    bottom: 50
  },
  fabPhoto: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 50
  }
});


export default ProductsScreen;
