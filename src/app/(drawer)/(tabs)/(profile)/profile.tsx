import UserInfo from "@/components/account/UserInfo";
import { APP_COLOR } from "@/utils/constant";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePage = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: APP_COLOR.YELLOW_BASE }}>
            <UserInfo />
        </SafeAreaView>
    );
};

export default ProfilePage;