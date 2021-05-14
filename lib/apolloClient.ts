import { onError } from "apollo-link-error";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";

import Pokemon from "../models/pokemon";
import { adaptPokemonsListResponse } from "../utils";

const httpLink = createHttpLink({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
});

const errorLink = onError(({ graphQLErrors }) => {
  console.error(graphQLErrors);
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.error(message));
});
const client = new ApolloClient({
  //@ts-ignore
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
});

export const DEFAULT_FETCH_LIMIT = 60;

type FetchPokemonsResponse = {
  data: Array<Pokemon>;
  count: number;
};
export const fetchPokemons = async (
  offset: number = 0,
  limit: number = DEFAULT_FETCH_LIMIT
): Promise<FetchPokemonsResponse | null> => {
  const res = await client
    .query({
      query: gql`
        query GetPokemons($limit: Int, $offset: Int) {
          pokemons: pokemon_v2_pokemonspecies(
            limit: $limit
            offset: $offset
            order_by: { id: asc }
          ) {
            id
            name
            color: pokemon_v2_pokemoncolor {
              name
            }
          }
          total_count: pokemon_v2_pokemonspecies_aggregate {
            aggregate {
              count
            }
          }
        }
      `,
      variables: { offset, limit },
    })
    .catch((e) => console.error(e));
  if (res && res.data?.pokemons) {
    return {
      data: adaptPokemonsListResponse(res.data.pokemons),
      count: res.data.total_count.aggregate.count,
    };
  }
  return null;
};

export const fetchOnePokemon = async (id: number): Promise<Pokemon | null> => {
  const res = await client
    .query({
      query: gql`
        query GetOnePokemon($id: Int!) {
          info: pokemon_v2_pokemonspecies_by_pk(id: $id) {
            id
            name
            color: pokemon_v2_pokemoncolor {
              name
            }
            evolution_chain: pokemon_v2_evolutionchain {
              species: pokemon_v2_pokemonspecies {
                id
                name
                color: pokemon_v2_pokemoncolor {
                  name
                }
              }
            }
          }
          details: pokemon_v2_pokemon_by_pk(id: $id) {
            types: pokemon_v2_pokemontypes(
              where: { pokemon_id: { _eq: $id } }
            ) {
              type: pokemon_v2_type {
                name
              }
            }
            stats: pokemon_v2_pokemonstats {
              base_stat
              stat_id
            }
          }
        }
      `,
      variables: { id },
    })
    .catch((e) => console.error(e));
  if (res && res.data) {
    return res.data;
  }
  return null;
};

export default client;
