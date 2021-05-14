import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Radar from "../../components/radar";
import Text from "../../components/text";
import PokeImage from "../../components/pokeImage";
import Pokemon, { PokemonBasic } from "../../models/pokemon";
import { getPokeColor, mapPokemonStats } from "../../utils";
import SimpleActionBar from "../../components/simpleActionBar";
import TypeTag from "../../components/typeTag";
import { ScrollView } from "react-native-gesture-handler";
import PokeCard from "../../components/pokeCard";

interface PokemonInfoContainerProps {
  pokemon: Required<Pokemon>;
  loading?: boolean;
  onItemPress: (id: number) => void;
}

const PokemonInfo: React.FC<PokemonInfoContainerProps> = ({
  pokemon,
  ...props
}) => {
  const statsData = mapPokemonStats(pokemon.details.stats || []);
  const generations = (pokemon.info.evolution_chain?.species || [])
    .map((i) => i)
    .sort((a, b) => a.id - b.id);

  const printPokemonTypes = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        {pokemon.details.types.map((item) => (
          <TypeTag type={item.type.name} key={`${item.type.name}-tag`} />
        ))}
      </View>
    );
  };

  const keyExtractor = (item: PokemonBasic) => `pokemon-${item.id}`;

  const reenderGenerationItem = (item: PokemonBasic) => (
    <PokeCard
      pokemon={item}
      style={{ marginRight: 10, marginBottom: 10 }}
      onPress={() => {
        if (pokemon.info.id !== item.id) {
          props.onItemPress(item.id);
        }
      }}
    />
  );

  return (
    <ScrollView
      style={{
        backgroundColor: getPokeColor(pokemon.info.color.name),
        flex: 1,
      }}
    >
      <SimpleActionBar />
      <View>
        <View style={{ flexDirection: "row" }}>
          <PokeImage pokemonId={pokemon.info.id} size={144} />
          <View style={{ justifyContent: "center" }}>
            <Text size={30} bold withshadow color="white">
              {pokemon.info.name}
            </Text>
            {printPokemonTypes()}
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text bold withshadow size={20} color="white">
            Statistics
          </Text>
          <Radar radarData={statsData} size={200} />
        </View>
        <View style={styles.section}>
          <Text bold withshadow size={20} color="white">
            Generations
          </Text>
          <FlatList
            horizontal
            data={generations}
            renderItem={({ item }) => reenderGenerationItem(item)}
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  section: {
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default PokemonInfo;
