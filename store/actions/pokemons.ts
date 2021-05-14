import PokemonType from "../../models/pokemon";

export const APPEND_POKEMONS = "APPEND_POKEMONS";

export const appendPokemons = (
  action: Array<PokemonType>
): AppendPokemonsAction => ({
  type: APPEND_POKEMONS,
  payload: action,
});

interface AppendPokemonsAction {
  type: typeof APPEND_POKEMONS;
  payload: Array<PokemonType>;
}

export type PokemonsActions = AppendPokemonsAction;
