export type PokemonType =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "???"
  | "shadow";

export type PokemonBasic = {
  id: number;
  name: string;
  color: {
    name: string;
  };
  evolution_chain?: {
    species: Array<PokemonBasic>;
  };
};
export type PokemonStat = { base_stat: number; stat_id: number };

type PokemonDetails = {
  types: Array<{ type: { name: PokemonType } }>;
  stats: Array<PokemonStat>;
};
type Pokemon = {
  info: PokemonBasic;
  details?: PokemonDetails;
};

export default Pokemon;
