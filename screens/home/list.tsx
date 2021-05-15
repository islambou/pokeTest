import React from "react";

import { FlatList, StyleSheet } from "react-native";
import Loader from "../../components/loader";
import PokeCard from "../../components/pokeCard";
import Pokemon from "../../models/pokemon";

interface PokemonsListProps {
  pokemons: Array<Pokemon>;
  loadMore: () => void;
  isLoading?: boolean;
  onItemPress: (id: number) => void;
}

const PokemonsList: React.FC<PokemonsListProps> = (props) => {
  const keyExtractor = (item: Pokemon) => `pokemon-${item.info.id}`;
  const reenderItem = (item: Pokemon) => (
    <PokeCard
      pokemon={item.info}
      style={styles.pokeCardWrapper}
      onPress={() => {
        props.onItemPress(item.info.id);
      }}
    />
  );

  const LoadingIndecator = props.isLoading ? Loader : null;

  return (
    <FlatList
      data={props.pokemons}
      contentContainerStyle={styles.listContentContainer}
      numColumns={3}
      renderItem={({ item }) => reenderItem(item)}
      onEndReached={props.loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={LoadingIndecator}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  pokeCardWrapper: { marginRight: 10, marginBottom: 10 },
  listContentContainer: { paddingVertical: 30 },
});

export default PokemonsList;
