import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnePokemon, fetchPokemons } from "../lib/apolloClient";
import Pokemon from "../models/pokemon";
import { appendPokemons } from "../store/actions/pokemons";
import { MyStoreState } from "../store/reducers";

export default () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [isLoadingFaild, setLoadingFailed] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);

  const pokemons = useSelector((state: MyStoreState) => state.pokemons);

  const loadPokemons = async (offset?: number) => {
    setLoading(true);
    setLoadingFailed(false);
    const result = await fetchPokemons(offset);
    setLoading(false);
    if (!result) {
      setLoadingFailed(true);
      return null;
    } else {
      setTotalCount(result.count);
      setOffset(offset || 0);
      dispatch(appendPokemons(result.data));
    }
  };

  const getPokemonById = async (
    id: number
  ): Promise<Required<Pokemon> | null> => {
    //check if the pokemon has already been fetched
    const foundPokemon = pokemons.find((poke) => poke.info.id === id);
    if (foundPokemon && !!foundPokemon.details) {
      return foundPokemon as Required<Pokemon>;
    }
    //pokemon not found in the store and needs to be fetched
    setLoading(true);
    setLoadingFailed(false);
    const fetchedPokemon = await fetchOnePokemon(id);
    setLoading(false);

    if (!fetchedPokemon) {
      setLoadingFailed(true);
      return null;
    }
    dispatch(appendPokemons([fetchedPokemon]));
    return fetchedPokemon as Required<Pokemon>;
  };

  return {
    pokemons,
    loadPokemons,
    totalCount,
    offset,
    getPokemonById,
    isLoading,
    isLoadingFaild,
  };
};
