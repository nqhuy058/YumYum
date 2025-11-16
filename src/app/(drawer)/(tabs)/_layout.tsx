import { APP_COLOR } from "@/utils/constant";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from "expo-router";

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
                    height: 55,
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
                    headerShown: true,
                    title: "Đơn hàng của bạn",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: APP_COLOR.YELLOW_BASE },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
                    headerShadowVisible: false
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
                    headerShown: true,
                    title: "Thông tin cá nhân",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: APP_COLOR.YELLOW_BASE },
                    headerTintColor: "#ffff",
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 25, },
                    headerShadowVisible: false,
                }}
            />

            <Tabs.Screen
                name="address"
                options={{
                    href: null,
                    headerShown: true,
                    title: "Địa chỉ giao hàng",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: APP_COLOR.YELLOW_BASE },
                    headerTintColor: "#ffff",
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 25, },
                    headerShadowVisible: false,
                }}
            />

            <Tabs.Screen
                name="new.address"
                options={{
                    href: null,
                    headerShown: true,
                    title: "Thêm địa chỉ mới",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: APP_COLOR.YELLOW_BASE },
                    headerTintColor: "#ffff",
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 25, },
                    headerShadowVisible: false,
                }}
            />

             <Tabs.Screen
                name="payment"
                options={{
                    href: null,
                    headerShown: true,
                    title: "Phương thức thanh toán",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: APP_COLOR.YELLOW_BASE },
                    headerTintColor: "#ffff",
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 25, },
                    headerShadowVisible: false,
                }}
            />

            <Tabs.Screen
                name="contact"
                options={{
                    href: null,
                    headerShown: true,
                    title: "Liên hệ với chúng tôi",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: APP_COLOR.YELLOW_BASE },
                    headerTintColor: "#ffff",
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 25, },
                    headerShadowVisible: false,
                }}
            />
        </Tabs>
    )
}

export default TabLayout;