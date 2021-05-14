import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { MainStackNavigationParamList } from "../../navigation/mainNavigation";
import Home from "./home";
import usePokemon from "../../hooks/usePokemon";
import { StackNavigationProp } from "@react-navigation/stack";
import { DEFAULT_FETCH_LIMIT } from "../../lib/apolloClient";

type HomeContainerNavigationProp = StackNavigationProp<
  MainStackNavigationParamList,
  "Home"
>;
type HomeNavigatedContainerProp = {
  route: RouteProp<MainStackNavigationParamList, "Home">;
};
interface HomeContainerProps extends HomeNavigatedContainerProp {}

const HomeContainer: React.FC<HomeContainerProps> = () => {
  const { pokemons, loadPokemons, isLoading, offset, totalCount } =
    usePokemon();

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadMorePokemons = useCallback(async () => {
    const rest = totalCount - offset;
    if (rest > 0) {
      loadPokemons(offset + DEFAULT_FETCH_LIMIT);
    }
  }, [offset, totalCount]);

  const navigation = useNavigation<HomeContainerNavigationProp>();

  const navigateToPokemonPage = (id: number) => {
    navigation.navigate("PokemonInfo", { pokemonId: id });
  };

  return (
    <Home
      pokemons={pokemons}
      loadPokemons={loadMorePokemons}
      isLoading={isLoading}
      navigateToPokemonPage={navigateToPokemonPage}
    />
  );
};

export default HomeContainer;
