import AddNewAddress from "@/components/address/add.adress";
import { APP_COLOR } from "@/utils/constant";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const AddNewAddressPage = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: APP_COLOR.YELLOW_BASE }}>
            <AddNewAddress />
        </SafeAreaView>
    )
}

export default AddNewAddressPage;