import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Camera, CameraRuntimeError,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner
} from "react-native-vision-camera";

import { ThemeCtx } from "../context/themeCtx.ts";
import { colors } from "../config/theme.ts";
import Toast, { ToastRef } from "./Toast.tsx";


type BarcodeScannerScreenProps = {
  onScanned: (code: string) => void
};

const NoCameraErrorView = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Необходимо дать разрешение на использование камеры :(</Text>
    </View>
  );
};


const BarcodeScanner: React.FC<BarcodeScannerScreenProps> = ({ onScanned }) => {
  const theme = useContext(ThemeCtx);
  let activeColors = colors[theme.mode];
  const toastRef = useRef<ToastRef>(null);

  const { hasPermission, requestPermission } = useCameraPermission();
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");

  const [scannedCode, setScannedCode] = useState("");
  const [scannedCodeSlice, setScannedCodeSlice] = useState("");
  const [scanning, setScanning] = useState(false);

  const codeScanner = useCodeScanner({
    codeTypes: ["code-39", "code-93", "code-128", "codabar"
      , "ean-13", "ean-8", "itf", "upc-e"
      , "upc-a", "qr", "pdf-417", "aztec"
      , "data-matrix"],
    onCodeScanned: (codes) => {
      const code = codes[0];
      // console.log(`Scanned ${codes.length} codes!`)
      // console.log(`Scanned ${code.value} !`)
      if (code.type === "ean-13") {
        const value = code.value;
        const country = value.slice(0, 3);
        const creator = value.slice(3, 7);
        const tovar = value.slice(7, 12);
        const res = `${country} ${creator} ${tovar}`;
        setScannedCodeSlice(res);
      }
      setScannedCode(codes[codes.length - 1].value);
      onScanned(code.value);
    }
  });

  // type OpenSettingsButtonProps = {
  //     children: string;
  // };
  //
  // const OpenSettingsButton = ({children}: OpenSettingsButtonProps) => {
  //     const handlePress = useCallback(async () => {
  //         // Open the custom settings if the app has one
  //         await Linking.openSettings();
  //     }, []);
  //
  //     return <Button title={children} onPress={handlePress}/>;
  // };


  useEffect(() => {

    // Check if permission hasn't been granted yet, and request it
    if (!hasPermission) {
      requestPermission().then(r => {
      });
    }
  }, [hasPermission, requestPermission]);


  if (device == null || !hasPermission) {
    return (<View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><NoCameraErrorView />
      {/*<OpenSettingsButton>Open Settings</OpenSettingsButton>*/}
      {/*<Button title="request permissions" onPress={requestCameraPermission} />*/}

    </View>);
  }

  const onCameraError = (error: CameraRuntimeError) => {
    toastRef?.current?.startToast(error.message, "error");
    console.log("camera error ", error);
  };

  return (
    <View style={styles.container}>
      {scanning ? <Text> process ... </Text> : null}
      <View style={[styles.textHintContainer, { backgroundColor: activeColors.secondary }]}>
        <Text style={[styles.text, { color: activeColors.text }]}>Сканируйте штрихкод</Text>
        <Text style={[styles.textSmall, { color: activeColors.text_secondary }]}>Наведите камеру</Text>
      </View>
      <View style={styles.cameraContainer}>

        <Camera
          ref={camera}
          style={[StyleSheet.absoluteFill]}
          device={device}
          codeScanner={codeScanner}
          enableZoomGesture={true}
          focusable={true}
          onError={onCameraError}
          isActive={true}
        />

      </View>

      <View style={[styles.result, { backgroundColor: activeColors.third }]}>
        <Text style={[{ color: activeColors.text_secondary }]}>{scannedCode}</Text>
        <Text style={[{ color: activeColors.text, fontWeight: "bold", fontSize: 16 }]}>{scannedCodeSlice}</Text>
      </View>

      <Toast ref={toastRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textHintContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 20
  },
  cameraContainer: {
    overflow: "hidden",
    height: "60%"
  },
  text: {
    fontSize: 18,
    textAlign: "center"
  },

  textSmall: {
    fontSize: 14,
    textAlign: "center"
  },
  fixToText: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  result: {
    padding: 20,
    alignItems: "center"
  }
});


export default BarcodeScanner;
