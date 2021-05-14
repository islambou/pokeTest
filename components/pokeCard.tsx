import React, { FC } from "react";
import { View, ViewProps, StyleSheet, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Text from "../components/text";
import { PokemonBasic } from "../models/pokemon";
import { getPokeColor } from "../utils";
import PokeImage from "./pokeImage";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  shadow: {
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

interface PokeCardProps extends ViewProps {
  pokemon: PokemonBasic;
  onPress?: () => void;
  size?: number;
}
const PokeCard: FC<PokeCardProps> = ({ pokemon, ...props }) => {
  const cardColor = getPokeColor(pokemon.color.name);
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.shadow}>
      <View style={[styles.container, props.style]}>
        <View style={{ backgroundColor: cardColor, overflow: "hidden" }}>
          <PokeImage pokemonId={pokemon.id} size={props.size} />
        </View>

        <Text bold>{pokemon.name}</Text>
        <Text bold subTitle size={10}>
          #{pokemon.id}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PokeCard;
