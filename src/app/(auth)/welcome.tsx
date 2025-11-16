import ShareButton from "@/components/button/share.button";
import { APP_COLOR } from "@/utils/constant";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_COLOR.ORANGE,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginBottom: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: APP_COLOR.YELLOW_BASE,
        marginTop: 20,
        textAlign: "center",
        letterSpacing: 2,
    },
    description: {
        fontSize: 14,
        color: "#FFFFFF",
        textAlign: "center",
        marginVertical: 25,
        lineHeight: 22,
        marginHorizontal: 10,
        opacity: 0.9,
    },
    buttonContainer: {
        width: "100%",
        marginTop: 50,
        gap: 15,
    },
    loginBtn: {
        backgroundColor: APP_COLOR.YELLOW_BASE,
        paddingVertical: 14,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 5,
    },
    signupBtn: {
        backgroundColor: APP_COLOR.YELLOW_LIGHT,
        paddingVertical: 14,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 5,
    },
    loginText: {
        fontSize: 16,
        fontWeight: "600",
        color: APP_COLOR.ORANGE,
    },
    signupText: {
        fontSize: 16,
        fontWeight: "600",
        color: APP_COLOR.ORANGE,
    },
})

const WelcomePage = () => {
    const handleLogIn = () => {
        router.replace("/(auth)/login");

        // Navigate to login screen
    }

    const handleSignUp = () => {
        router.replace("/(auth)/signup");
        // Navigate to sign up screen
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={false}
        >
            <View style={styles.container}>
                {/* Logo Icon */}
                <View style={styles.logoContainer}>
                    <Ionicons name="fast-food" size={120} color={APP_COLOR.YELLOW_LIGHT} />
                </View>

                {/* Title */}
                <Text style={styles.title}>YUMYUM</Text>

                {/* Description */}
                <Text style={styles.description}>
                   Chào mừng bạn đến với YumYum! Khám phá hàng ngàn món ngon từ các nhà hàng yêu thích.
                </Text>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <ShareButton
                        tittle="Đăng nhập"
                        onPress={handleLogIn}
                        btnStyle={styles.loginBtn}
                        textStyle={styles.loginText}
                    />
                    <ShareButton
                        tittle="Đăng kí"
                        onPress={handleSignUp}
                        btnStyle={styles.signupBtn}
                        textStyle={styles.signupText}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default WelcomePage