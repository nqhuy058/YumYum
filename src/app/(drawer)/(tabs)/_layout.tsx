import { Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { APP_COLOR } from "@/utils/constant";

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "rgba(255,255,255,0.6)",
                tabBarStyle: {
                    backgroundColor: APP_COLOR.ORANGE,
                    borderTopWidth: 0,
                    height:55,
                    paddingTop: 12,
                    paddingBottom: 25,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    position: 'absolute',
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    elevation: 10,
                },
                tabBarLabelStyle: {
                    display: "none",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="menu"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="utensils" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorite"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="heart" size={size} color={color} solid />
                    ),
                }}
            />
            <Tabs.Screen
                name="order"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="clipboard-list" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="help"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="headset" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    )
}

export default TabLayout;