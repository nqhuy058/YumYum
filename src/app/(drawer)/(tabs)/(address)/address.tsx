import MyAddress from "@/components/address/MyAddress";
import { APP_COLOR } from "@/utils/constant";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const AddressPage = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: APP_COLOR.YELLOW_BASE }}>
            <MyAddress />
        </SafeAreaView>
    )
};

export default AddressPage;

