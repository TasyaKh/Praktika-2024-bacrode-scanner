import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import BarcodeScanner from "../components/BarcodeScanner.tsx";
import BackButton from "../components/buttons/BackButton.tsx";
import { View } from "react-native";

type RootStackParamList = {
  Products: undefined;
  Photo: { onPhotoTaken: (code: string) => void };
};

type PhotoScreenRouteProp = RouteProp<RootStackParamList, "Photo">;

type PhotoScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Photo">;
  route: PhotoScreenRouteProp;
};

const BarcodeScannerScreenBack: React.FC<PhotoScreenProps> = ({ route, navigation }) => {

  const { onPhotoTaken } = route.params;

  const handleTakePhoto = async (code: string) => {

    onPhotoTaken(code);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <BarcodeScanner onScanned={handleTakePhoto} />
    </View>

  );
};

export default BarcodeScannerScreenBack;
