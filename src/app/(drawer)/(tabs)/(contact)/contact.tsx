import ContactUs from "@/components/contact/contact.us";
import { APP_COLOR } from "@/utils/constant";
import { SafeAreaView } from "react-native-safe-area-context";

const ContactPage = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: APP_COLOR.YELLOW_BASE }}>
            <ContactUs />
        </SafeAreaView>
    )
}

export default ContactPage;