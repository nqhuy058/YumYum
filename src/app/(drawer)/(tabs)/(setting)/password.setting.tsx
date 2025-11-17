import ChangePassword from "@/components/setting/password";
import { APP_COLOR } from "@/utils/constant";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PasswordSetting = () => {
    const navigation = useNavigation();
    const router = useRouter();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={() => router.push('/setting')} style={{ marginLeft: 15 }}>
                    <Ionicons name="chevron-back" size={28} color={APP_COLOR.ORANGE} />
                </Pressable>
            ),
        });
    }, [navigation]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: APP_COLOR.YELLOW_BASE }}>
            <ChangePassword />
        </SafeAreaView >
    )
}

export default PasswordSetting;