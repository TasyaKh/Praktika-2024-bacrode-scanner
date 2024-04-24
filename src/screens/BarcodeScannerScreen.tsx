import React, {useContext} from "react";
import {ThemeCtx} from "../context/themeCtx.ts";
import {colors} from "../config/theme.ts";
import BarcodeScanner from "../components/BarcodeScanner.tsx";

interface BarcodeScannerScreenProps {
    navigation: any;
}


const BarcodeScannerScreen: React.FC<BarcodeScannerScreenProps> = ({navigation}) => {
    const theme = useContext(ThemeCtx);
    let activeColors = colors[theme.mode];

    const handleTakePhoto = async (code:string) => {

    };

    return (
       <BarcodeScanner onScanned={handleTakePhoto}/>
    )
};

export default BarcodeScannerScreen;
