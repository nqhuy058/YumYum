import { APP_COLOR } from "@/utils/constant";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <RootSiblingParent>
        <Stack
          screenOptions={
            {
              headerTintColor: APP_COLOR.ORANGE,
              headerTitleStyle: {
                color: "black"
              },
            }
          }
        >
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(auth)/welcome"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(auth)/login"
            options={{
              // headerTitle: "Log In",
              // headerBackTitle: " Back",
              headerShown: false
            }}
          />

          <Stack.Screen
            name="(auth)/signup"
            options={{ headerShown: false}}
          />
        </Stack>
      </RootSiblingParent>
    </GestureHandlerRootView>
  )
}

export default RootLayout

//