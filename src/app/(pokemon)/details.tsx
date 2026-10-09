import { colorsByType, DEFAULT_TYPE_COLOR } from "@/constants/colors";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { cleanUpOnePk } from "@/store/pokemon/getPokemons";
import actGetOnePokemon from "@/store/pokemon/set/getOnePokemon";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";
import { View } from "react-native";

const PokemonDetails = () => {
  const param = useLocalSearchParams<{ name: string; type: string }>();
  const { onePokemon, error } = useAppSelector((state) => state.pokemon);
  const dispatch = useAppDispatch();
  const color = colorsByType[param.type] ?? DEFAULT_TYPE_COLOR;

  const load = () => dispatch(actGetOnePokemon(param.name));

  console.log("params : ", param);
  useEffect(() => {
    load();
    return () => {
      cleanUpOnePk;
    };
  }, []);
  return (
    <View className="p-3 flex-1">
      <Stack.Screen options={{ title: param.name }} />
      <View
        className="flex-row justify-center rounded-lg shadow-slate-950"
        style={{ backgroundColor: color + 60 }}
      >
        <Image
          source={{ uri: onePokemon?.frontShiny }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
        />
        {/* <Image
          source={{ uri: onePokemon?.backShiny }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
        /> */}
      </View>
    </View>
  );
};

export default PokemonDetails;
