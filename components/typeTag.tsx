import React, { FC } from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { PokemonTypeColors } from "../constants";
import { PokemonType } from "../models/pokemon";
import Text from "./text";

interface TypeTagProps extends ViewProps {
  type: PokemonType;
}
const TypeTag: FC<TypeTagProps> = ({ type, ...props }) => {
  return (
    <View
      style={[
        {
          backgroundColor: PokemonTypeColors[type],
        },
        styles.container,
        props.style,
      ]}
    >
      <Text bold color="white">
        {type}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
});

export default TypeTag;
