import { createSlice } from "@reduxjs/toolkit";
import actGetAllPok from "./set/actGetAllPokemons";

interface PokemonState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  pokemons: [];
  error: string | null;
}
const initialState: PokemonState = {
  pokemons: [],
  loading: "idle",
  error: null,
};
const pokemonSlice = createSlice({
  name: "Pokemon",
  initialState,
  reducers: {},
  extraReducers: (Builds) => {
    Builds.addCase(actGetAllPok.pending, (state, action) => {
      state.loading = "pending";
    })
      .addCase(actGetAllPok.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.pokemons = action as any;
      })
      .addCase(actGetAllPok.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = "failed";
      });
  },
});

export default pokemonSlice.reducer;
export const {} = pokemonSlice.getInitialState;
// export const {} = pokemonSlice;
