import { PokemonType } from "./models/pokemon";

/**
 * retrieved using 
 * query MyQuery {
  pokemon_v2_statname(where: {language_id: {_eq: 9}}) {
    name
    stat_id
  }
}
 */
export const pokemon_statnames = [
  {
    name: "HP",
    stat_id: 1,
  },
  {
    name: "Attack",
    stat_id: 2,
  },
  {
    name: "Defense",
    stat_id: 3,
  },
  {
    name: "S. Attack",
    stat_id: 4,
  },
  {
    name: "S. Defense",
    stat_id: 5,
  },
  {
    name: "Speed",
    stat_id: 6,
  },
  {
    name: "accuracy",
    stat_id: 7,
  },
  {
    name: "evasion",
    stat_id: 8,
  },
];

/* 
   retrieved using :
    query MyQuery {
  pokemon_v2_pokemonstat(distinct_on: base_stat) {
    base_stat
  }
}
*/
export const MAX_STAT_VALUE = 255;

/*
retrieved using 
query MyQuery {
  pokemon_v2_typename(distinct_on: id, where: {language_id: {_eq: 9}}) {
    name
  }
}
*/

export const PokemonTypeColors: Record<PokemonType, string> = {
  "???": "#eee",
  bug: "#a8b820",
  dark: "#705848",
  dragon: "#7038f8",
  electric: "#f8d030",
  fairy: "#f0b6bc",
  fighting: "#c03028",
  fire: "#f08030",
  flying: "#a890f0",
  ghost: "#705898",
  grass: "#78c850",
  ground: "#e0c068",
  ice: "#98d8d8",
  normal: "#a8a878",
  poison: "#a040a0",
  psychic: "#f85888",
  rock: "#b8a038",
  shadow: "#705898",
  steel: "#b8b8d0",
  water: "#6890f0",
};
