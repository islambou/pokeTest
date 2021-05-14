import React, { useEffect, useState } from "react";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { MainStackNavigationParamList } from "../../navigation/mainNavigation";
import Loader from "../../components/loader";
import Pokemon from "../../models/pokemon";
import usePokemon from "../../hooks/usePokemon";
import PokemonInfoScreen from "./pokemonInfo";
import GenericScreen from "../generic";
import Text from "../../components/text";
import { StackNavigationProp } from "@react-navigation/stack";

type PokemonInfoContainerNavigationProp = StackNavigationProp<
  MainStackNavigationParamList,
  "PokemonInfo"
>;
type PokemonInfoNavigatedContainerProp = {
  route: RouteProp<MainStackNavigationParamList, "PokemonInfo">;
};
interface PokemonInfoContainerProps extends PokemonInfoNavigatedContainerProp {}

const PokemonInfoContainer: React.FC<PokemonInfoContainerProps> = (props) => {
  const { getPokemonById, isLoading } = usePokemon();
  const [pokemon, setPokemon] = useState<Required<Pokemon>>();
  const navigation = useNavigation<PokemonInfoContainerNavigationProp>();

  const pokemonId = props.route.params.pokemonId;

  const getAndShowPokemon = async () => {
    const pokemon = await getPokemonById(pokemonId);
    if (pokemon) {
      setPokemon(pokemon);
    }
  };

  useEffect(() => {
    getAndShowPokemon();
  }, []);

  const navigateToPokemon = (id: number) => {
    navigation.replace("PokemonInfo", { pokemonId: id });
  };

  if (isLoading)
    return (
      <GenericScreen>
        <Loader />
      </GenericScreen>
    );

  if (pokemon)
    return (
      <PokemonInfoScreen pokemon={pokemon} onItemPress={navigateToPokemon} />
    );

  return (
    <GenericScreen>
      <Text>Something went wrong!</Text>
    </GenericScreen>
  );
};

export default PokemonInfoContainer;
