import { colorsByType, DEFAULT_TYPE_COLOR } from "@/constants/colors";
import { PokemonCard } from "@/types/type";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: PokemonCard;
}

const PokemonCards = ({ item }: Props) => {
  const router = useRouter();
  const color = colorsByType[item.types[0]] ?? DEFAULT_TYPE_COLOR;

  const routeMe = () => {
    router.push({
      pathname: "/(pokemon)/details",
      params: { name: item.name, type: item.types[0] }, // المعرّف فقط
    });
  };

  return (
    <TouchableOpacity onPress={routeMe}>
      <View
        className="p-5 rounded-2xl"
        style={{ backgroundColor: color + "60" }} // الديناميكي فقط في style
      >
        <Text className="text-3xl font-bold text-center">{item.name}</Text>
        <Text className="text-base font-medium text-center">
          {item.types[0]}
        </Text>
        <View className="flex-row-reverse justify-center">
          {item.front !== "" && (
            <Image
              source={{ uri: item.front }}
              style={{ width: 120, height: 120 }}
            />
          )}
          {item.back !== "" && (
            <Image
              source={{ uri: item.back }}
              style={{ width: 120, height: 120 }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCards;
