import { PokemonCard, Res } from "@/types/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// شكل ما يرجعه الـ API فقط (لا يخرج من هذا الملف)
interface PokemonApiResponse {
  name: string;
  sprites: { front_default: string | null; back_default: string | null };
  types: { slot: number; type: { name: string; url: string } }[];
}

const API_URL =
  process.env.EXPO_PUBLIC_POKEMON_API ??
  "https://pokeapi.co/api/v2/pokemon/?limit=10";

const actGetAllPok = createAsyncThunk<
  PokemonCard[],
  void,
  { rejectValue: string }
>("pokemon/actGetAllPokemon", async (_, { rejectWithValue, signal }) => {
  try {
    const { data: list } = await axios.get<{ results: Res[] }>(API_URL, {
      signal,
    });

    const settled = await Promise.allSettled(
      list.results.map(async (pokemon): Promise<PokemonCard> => {
        const { data } = await axios.get<PokemonApiResponse>(pokemon.url, {
          signal,
        });
        return {
          name: data.name,
          types: data.types?.map((t) => t.type.name) ?? [],
          front: data.sprites.front_default ?? "",
          back: data.sprites.back_default ?? "",
        };
      }),
    );

    const cards = settled
      .filter(
        (r): r is PromiseFulfilledResult<PokemonCard> =>
          r.status === "fulfilled",
      )
      .map((r) => r.value);

    if (cards.length === 0) {
      return rejectWithValue("Could not load any pokemon");
    }
    return cards;
  } catch (error) {
    if (isAxiosError(error)) return rejectWithValue(error.message);
    return rejectWithValue("Unexpected error");
  }
});

export default actGetAllPok;
