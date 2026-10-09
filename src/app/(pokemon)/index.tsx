import PokemonCards from "@/components/Pokemon";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { cleanUpOnePk } from "@/store/pokemon/getPokemons"; // تأكد من المسار الصحيح للـ actions
import actGetAllPok from "@/store/pokemon/set/actGetAllPokemons";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Pokemon = () => {
  // استخدام listLoading المخصصة للقائمة فقط
  const { pokemons, error, listLoading } = useAppSelector((s) => s.pokemon);
  const dispatch = useAppDispatch();

  const load = () => dispatch(actGetAllPok());

  useEffect(() => {
    const promise = load();
    return () => {
      promise.abort("the user shift");
      dispatch(cleanUpOnePk()); // ✅ إصلاح إرسال الـ action وتنفيذ الدالة
    };
  }, [dispatch]);

  if (listLoading === "idle" || listLoading === "pending") {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (listLoading === "failed") {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text className="text-3xl text-gray-700 font-semibold">{error}</Text>
        <Pressable onPress={load}>
          <Text className="text-xl text-gray-500">Try again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ gap: 10, padding: 12 }}
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonCards item={item} />}
        ListEmptyComponent={<Text>No pokemon found</Text>}
      />
    </SafeAreaView>
  );
};

export default Pokemon;
