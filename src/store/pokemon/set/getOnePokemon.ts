import { PokemonDetails } from "@/types/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// شكل رد الـ API فقط (لا يخرج من هذا الملف)
interface PokemonDetailsApiResponse {
  name: string;
  base_experience: number | null;
  sprites: {
    front_shiny: string | null;
    back_shiny: string | null;
  };
}

const BASE_URL =
  process.env.EXPO_PUBLIC_POKEMON_BASE_URL ??
  "https://pokeapi.co/api/v2/pokemon";

const actGetOnePokemon = createAsyncThunk<
  PokemonDetails,
  string,
  { rejectValue: string }
>("pokemon/actGetOnePokemon", async (name, { rejectWithValue, signal }) => {
  try {
    const { data } = await axios.get<PokemonDetailsApiResponse>(
      `${BASE_URL}/${encodeURIComponent(name.trim().toLowerCase())}`,
      { signal },
    );

    return {
      name: data.name,
      baseExperience: data.base_experience ?? 0,
      frontShiny: data.sprites.front_shiny ?? "",
      backShiny: data.sprites.back_shiny ?? "",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        return rejectWithValue(`Pokemon "${name}" not found`);
      }
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unexpected error");
  }
});

export default actGetOnePokemon;
