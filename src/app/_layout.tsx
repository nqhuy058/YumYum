import AppProvider from "@/context/app.context";
import { APP_COLOR } from "@/utils/constant";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";



const RootLayout = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  }

  return (
    <GestureHandlerRootView>
      <RootSiblingParent>
        <AppProvider>
          {/* <SafeAreaView style={{ flex: 1 }}> */}
          <ThemeProvider value={navTheme}>
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
                  headerShown: true,
                  title: "Đăng nhập",
                  headerTitleAlign: "center",
                  headerStyle: { backgroundColor: APP_COLOR.YELLOW_BASE },
                  contentStyle: { backgroundColor: APP_COLOR.YELLOW_BASE },
                  headerTintColor: "#ffff",
                  headerTitleStyle: { fontWeight: 'bold', fontSize: 25, },
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}
              />

              <Stack.Screen
                name="(auth)/signup"
                options={{
                  headerShown: true,
                  title: "Đăng kí tài khoản",
                  headerTitleAlign: "center",
                  headerStyle: { backgroundColor: APP_COLOR.YELLOW_BASE },
                  contentStyle: { backgroundColor: APP_COLOR.YELLOW_BASE },
                  headerTintColor: "#ffff",
                  headerTitleStyle: { fontWeight: 'bold', fontSize: 25, },
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}
              />

              <Stack.Screen
                name="(auth)/verify"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="(auth)/request.password"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="(auth)/forgot.password"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="(drawer)"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="(user)/product/[id]"
                options={{ headerShown: false }}
              />


              <Stack.Screen
                name="(user)/product/create.modal"
                options={{
                  headerShown: false,
                  animation: "fade",
                  presentation: "transparentModal",
                }}
              />

              <Stack.Screen
                name="(user)/product/update.modal"
                options={{
                  headerShown: false,
                  animation: "fade",
                  presentation: "transparentModal",
                }}
              />

              <Stack.Screen
                name="(user)/product/place.order"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="(auth)/search"
                options={{ headerShown: false }}
              />

            </Stack>
          </ThemeProvider>
          {/* </SafeAreaView> */}
        </AppProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  )
}

export default RootLayout

//