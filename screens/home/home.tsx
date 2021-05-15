import React from "react";

import { View, StyleSheet } from "react-native";
import Pokemon from "../../models/pokemon";
import Header from "./header";
import List from "./list";

interface HomeProps {
  pokemons: Array<Pokemon>;
  loadPokemons: () => any;
  isLoading?: boolean;
  navigateToPokemonPage: (id: number) => void;
}

const Home: React.FC<HomeProps> = (props) => {
  const pokemons = props.pokemons;

  return (
    <View style={styles.container}>
      <Header />

      <List
        pokemons={pokemons}
        loadMore={props.loadPokemons}
        isLoading={props.isLoading}
        onItemPress={props.navigateToPokemonPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 5, alignItems: "center", flex: 1 },
});

export default Home;
