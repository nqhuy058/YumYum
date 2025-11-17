import PaymentMethod from "@/components/payment/payment.method";
import { APP_COLOR } from "@/utils/constant";
import { SafeAreaView } from "react-native-safe-area-context";

const PayMentPage = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: APP_COLOR.YELLOW_BASE }}>
            <PaymentMethod />
        </SafeAreaView >
    )

}
export default PayMentPage;