import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import actGetAllPok from "@/store/pokemon/set/actGetAllPokemons";
import { useEffect } from "react";
import { ScrollView, Text } from "react-native";

export interface Res {
  name: string;
  url: string;
}
const Pokemon = () => {
  const selector = useAppSelector((state) => state.Pokemon);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actGetAllPok());
    console.log(selector);
  }, []);
  return (
    <ScrollView>
      <Text>Pokemon</Text>
    </ScrollView>
  );
};

export default Pokemon;
