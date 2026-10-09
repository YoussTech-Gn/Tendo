import pokemon from "@/store/pokemon/getPokemons";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    pokemon,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// console.log(store.getState());
