/**
 *  Colors were retrieved using this query
 *query GetPokemonsColors {
  pokemon_v2_pokemoncolor_aggregate(distinct_on: name) {
    nodes {
      name
    }
  }
}
 */

import { pokemon_statnames } from "./constants";
import Pokemon, { PokemonStat } from "./models/pokemon";
import { RadarData } from "./components/radar";
import { MAX_STAT_VALUE } from "./constants";
import { PokemonListResponse } from "./models/requestResponses";

export const getPokeColor = (colorName: string): string => {
  let result = "#4d6478";
  switch (colorName) {
    case "black":
      result = "#2a3c4b";
      break;
    case "blue":
      result = "#77abbf";
      break;
    case "brown":
      result = "#eebb93";
      break;
    case "gray":
      result = "#818b94";
      break;
    case "green":
      result = "#9bd0b4";
      break;
    case "pink":
      result = "#e68e9f";
      break;
    case "purple":
      result = "#7993c2";
      break;
    case "red":
      result = "#d37467";
      break;
    case "white":
      result = "#eee";
      break;
    case "yellow":
      result = "#f9d26b";
  }
  return result;
};

//----------------------------------------------------------------

export const getStatLabel = (id: number): string => {
  return pokemon_statnames.find((stat) => stat.stat_id === id)?.name || "";
};

export const mapPokemonStats = (
  stats: Array<PokemonStat>
): Array<RadarData> => {
  return stats.map((stat) => ({
    label: getStatLabel(stat.stat_id),
    value: (stat.base_stat * 100) / MAX_STAT_VALUE,
  }));
};

//---------------------------------------------------------------

export const adaptPokemonsListResponse = (
  entries: PokemonListResponse
): Array<Pokemon> => {
  return entries.map((item) => ({ info: item }));
};
