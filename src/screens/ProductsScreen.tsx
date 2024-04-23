import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeCtx } from "../context/themeCtx.ts";
import { colors } from "../config/theme.ts";
import { Route } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import BackButton from "../components/buttons/BackButton.tsx";

interface ProductsScreenProps {
  route: Route<any>;
  navigation: any;
}

const products = [
  { id: 1, name: "Product 1", price: 0 },
  { id: 2, name: "Product 2", price: 0 },
  { id: 3, name: "Product 3", price: 0 }
  // Add more product objects as needed
];

const ProductList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const ProductsScreen: React.FC<ProductsScreenProps> = ({ route, navigation }) => {
  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];

  const params = route.params;

  return (
    <View style={styles.container}>
      <BackButton onPressed={() => navigation.goBack()}/>
      {/* products */}
      <View >
        <Text> params {params?.id_document}</Text>
        <ProductList />
      </View>

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
    fontSize: 18
  },
  price: {
    fontSize: 16,
    fontWeight: "bold"
  }
});


export default ProductsScreen;
