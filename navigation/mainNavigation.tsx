import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home";
import PokemonInfo from "../screens/pokemonInfo";

const Stack = createStackNavigator<MainStackNavigationParamList>();

const MainNavigation: React.FC<{}> = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PokemonInfo" component={PokemonInfo} />
    </Stack.Navigator>
  );
};
const screenOptions = { headerShown: false };

export default MainNavigation;
export type MainStackNavigationParamList = {
  PokemonInfo: { pokemonId: number };
  Home: {};
};
