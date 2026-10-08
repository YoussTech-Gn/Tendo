import { Res } from "@/app/(pokemon)";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetAllPok = createAsyncThunk(
  "pokemon/actGetAllPokemon",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const api =
      process.env.RESTful_Pokémon_API ||
      "https://pokeapi.co/api/v2/pokemon/?limit=10";
    try {
      const res = await axios.get<{ results: Res[] }>(api);

      const details = await Promise.all(
        res.data.results.map(async (pokemon) => {
          try {
            const detailsRes = await axios.get(pokemon.url);
            return detailsRes.data;
          } catch (error) {
            thunkApi.rejectWithValue(`Failed to fetch: ${pokemon.url}`);
            // استيعاب الصدمة: إرجاع قيمة بديلة بدلاً من كسر السلسلة
            console.error(`Failed to fetch: ${pokemon.url}`);
            return null;
          }
        }),
      );
      return details;
      // setPokemonData(details);
    } catch (error) {
      rejectWithValue("We couldn't Fetch the pokemons");
      console.log(error);
    }
  },
);

export default actGetAllPok;
