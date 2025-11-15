import UserInfo from "@/components/account/UserInfo";
import { APP_COLOR } from "@/utils/constant";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePage = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: APP_COLOR.YELLOW_BASE }}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Thông tin cá nhân",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: APP_COLOR.YELLOW_BASE },
                    headerTintColor: "#ffff",
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 25, },
                    headerShadowVisible: false,

                }}
            />
            <UserInfo />
        </SafeAreaView>
    );
};

export default ProfilePage;