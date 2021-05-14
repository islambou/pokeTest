import React, { FC, useState } from "react";
import { View, ViewProps, StyleSheet } from "react-native";
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
    elevation: 8,
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
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.style]}
    >
      <View style={{ backgroundColor: cardColor }}>
        <PokeImage pokemonId={pokemon.id} size={props.size} />
      </View>

      <Text bold>{pokemon.name}</Text>
      <Text bold subTitle size={10}>
        #{pokemon.id}
      </Text>
    </TouchableOpacity>
  );
};

export default PokeCard;
