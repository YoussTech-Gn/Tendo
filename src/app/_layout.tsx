// import "@global.css";
import { Provider } from "react-redux";
import "../../global.css";

import store from "@/store/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { BottomSheetModalProvider } from "@expo/ui/community/bottom-sheet";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack
            UNSTABLE_routeNamesChangeBehavior="lastUnhandled"
            screenOptions={{ statusBarStyle: "dark" }}
          >
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen
              name="(pokemon)/index"
              options={{ title: "Pokemon", headerShown: true }}
            />
            <Stack.Screen
              name="(pokemon)/details"
              options={{
                statusBarAnimation: "slide",
                title: "Details",
                headerShown: true,
                // 👇 التوجيه الديناميكي: فصل المنصات
                presentation: "formSheet",
                sheetAllowedDetents: [0.3, 0.6],
                animation:
                  Platform.OS === "android" ? "slide_from_bottom" : "default",

                // 👇 الحماية الديناميكية: لا ترسل هذه الخصائص لأندرويد أبداً
                ...(Platform.OS === "ios" && {
                  sheetAllowedDetents: [0.3, 0.5, 0.7],
                  sheetGrabberVisible: true,
                  sheetCornerRadius: 20,
                  sheetElevation: 50,
                }),
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
