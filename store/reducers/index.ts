import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage"; // default: localStorage if web, AsyncStorage if react-native

import pokemonsReducer from "./pokemons";
import Pokemon from "../../models/pokemon";

const config = {
  key: "root",
  storage,
  blacklist: ["pokemons"],
  debug: false,
};

export interface MyStoreState {
  pokemons: Array<Pokemon>;
}
const rootReducer = persistCombineReducers(config, {
  //@ts-ignore
  pokemons: pokemonsReducer,
});
export default rootReducer;
