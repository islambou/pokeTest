import React, { useState } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

//@ts-ignore
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor, store } from "./store";

import * as Font from "expo-font";
import { Asset } from "expo-asset";

import MainNavigation from "./navigation/mainNavigation";

//------------ SCREENS -----------------------//
import LoadingScreen from "./screens/loadingApp";

export default function App() {
  const [assetsLoaded, setAssestsLoaded] = useState(false);

  const LoadAssets = () => {
    const loadFontsPromess = Font.loadAsync({
      /* RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
       */
    });

    const loadAssetsPromess = Asset.loadAsync([
      //  require("./assets/images/in-app-logo.png"),
    ]);

    Promise.all([loadFontsPromess, loadAssetsPromess]).then(() =>
      setAssestsLoaded(true)
    );
  };
  LoadAssets();

  if (!assetsLoaded) {
    return <LoadingScreen />;
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
