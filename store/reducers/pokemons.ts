import { APPEND_POKEMONS, PokemonsActions } from "../actions/pokemons";

import Pokemon from "../../models/pokemon";

export default (
  state: Array<Pokemon> = [],
  action: PokemonsActions
): Array<Pokemon> => {
  let newState = state.map((i) => i);

  switch (action.type) {
    case APPEND_POKEMONS:
      action.payload.forEach((pokemon) => {
        //prettier-ignore
        let pokemonExistsIndex = newState.map((item) => item.info.id).indexOf(pokemon.info.id);
        if (pokemonExistsIndex != -1) {
          newState.splice(pokemonExistsIndex, 1, pokemon); //replace existing pokemon entity with the fresh payload
        } else {
          newState.push(pokemon);
        }
      });
      return newState;

    default:
      return state;
  }
};
