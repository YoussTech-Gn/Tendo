import { PokemonCard, PokemonDetails } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import actGetAllPok from "./set/actGetAllPokemons";
import actGetOnePokemon from "./set/getOnePokemon";

type LoadingState = "idle" | "pending" | "succeeded" | "failed";

interface PokemonState {
  listLoading: LoadingState;
  detailsLoading: LoadingState;
  pokemons: PokemonCard[];
  error: string | null;
  onePokemon: PokemonDetails | null;
}

const initialState: PokemonState = {
  pokemons: [],
  listLoading: "idle",
  detailsLoading: "idle",
  error: null,
  onePokemon: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    cleanUpPokemons: (state) => {
      state.pokemons = [];
      state.listLoading = "idle";
    },
    cleanUpOnePk: (state) => {
      state.onePokemon = null;
      state.detailsLoading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== List Operations =====
      .addCase(actGetAllPok.pending, (state) => {
        state.listLoading = "pending";
        state.error = null;
      })
      .addCase(
        actGetAllPok.fulfilled,
        (state, action: PayloadAction<PokemonCard[]>) => {
          state.listLoading = "succeeded";
          state.pokemons = action.payload;
        },
      )
      .addCase(actGetAllPok.rejected, (state, action) => {
        state.listLoading = "failed";
        state.error = action.payload as string;
      })

      // ===== Single Item Operations =====
      .addCase(actGetOnePokemon.pending, (state) => {
        state.detailsLoading = "pending";
        state.error = null;
      })
      .addCase(
        actGetOnePokemon.fulfilled,
        (state, action: PayloadAction<PokemonDetails>) => {
          state.detailsLoading = "succeeded";
          state.onePokemon = action.payload;
        },
      )
      .addCase(actGetOnePokemon.rejected, (state, action) => {
        state.detailsLoading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default pokemonSlice.reducer;
export const { cleanUpOnePk, cleanUpPokemons } = pokemonSlice.actions;
