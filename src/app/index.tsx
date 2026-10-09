import store from "@/store/store";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Provider } from "react-redux";
// import "../../global.css";
import "../../global.css";

const RootIndex = () => {
  const router = useRouter();

  const onStart = () => {
    router.push({ pathname: "/(pokemon)" });
  };

  return (
    <Provider store={store}>
      <View className="flex-1 justify-center items-center h-full">
        <Text className="font-extrabold text-4xl">Tendo Rex</Text>
        <TouchableOpacity
          onPress={onStart}
          activeOpacity={0.9}
          className="bg-blue-800   px-4 py-2 rounded-md mt-7 w-48 h-12  justify-center items-center shadow-slate-50 "
        >
          <Text className="text-white font-bold text-2xl">Start</Text>
        </TouchableOpacity>
      </View>
    </Provider>
  );
};
// fhfhhhh      fjfjfj' 'fjjf' "jfjdjd"
export default RootIndex;
