// import "@global.css";
import { Provider } from "react-redux";
import "../../global.css";

import store from "@/store/store";
import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        UNSTABLE_routeNamesChangeBehavior="lastUnhandled"
        screenOptions={{ statusBarStyle: "dark" }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen
          name="(pokemon)/index"
          options={{ title: "Pokemon", headerShown: true }}
        />
      </Stack>
    </Provider>
  );
}
