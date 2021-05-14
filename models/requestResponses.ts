export type PokemonListResponseElemnt = {
  id: number;
  name: string;
  color: {
    name: string;
  };
};

export type PokemonListResponse = Array<PokemonListResponseElemnt>;
