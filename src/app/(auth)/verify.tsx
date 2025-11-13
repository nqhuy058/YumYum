import LoadingOverlay from "@/components/loading/overlay";
import ShareButton from "@/components/button/share.button";
import { APP_COLOR } from "@/utils/constant";
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback,  ScrollView, Pressable } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { useEffect, useRef, useState } from "react";
import { resendCodeAPI, verifyCodeAPI } from "@/utils/api";
import Toast from 'react-native-root-toast';
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
       
        paddingTop: 30,
        paddingBottom: 40,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        padding: 10,
        marginRight: 10,
    },
    headerText: {
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
    },
    container: {
        flex: 1,
        // paddingHorizontal: 20,
        
    },
    contentCard: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30,
        paddingHorizontal: 20,
        flex: 1,
    },

    heading: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 15,
        color: "#333",
    },
    description: {
        fontSize: 14,
        color: "#888",
        lineHeight: 20,
        marginBottom: 30,
    },
    fingerprintContainer: {
        alignItems: "center",
        marginVertical: 40,
        marginBottom: 50,
    },
    fingerprintIcon: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#FFF3E0",
        justifyContent: "center",
        alignItems: "center",
    },
    otpContainer: {
        marginVertical: 30,
    },
    otpLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 15,
    },
    otpInputContainer: {
        marginBottom: 20,
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginVertical: 20,
        marginBottom: 30,
    },
    resendText: {
        fontSize: 13,
        color: "#666",
    },
    resendLink: {
        fontSize: 13,
        color: APP_COLOR.ORANGE,
        fontWeight: "600",
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 15,
        marginBottom: 30,
    },
    skipBtn: {
        flex: 1,
        backgroundColor: "#FFE8D6",
        paddingVertical: 12,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    skipText: {
        color: APP_COLOR.ORANGE,
        fontWeight: "600",
        fontSize: 14,
    },
    continueBtn: {
        backgroundColor: APP_COLOR.ORANGE,
        paddingVertical: 13,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: APP_COLOR.ORANGE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    continueText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
});

const VerifyPage = () => {
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const otpRef = useRef<OTPTextView>(null);
    const [code, setCode] = useState<string>("");
    const { email, isLogin } = useLocalSearchParams();

    const verifyCode = async () => {
        Keyboard.dismiss();
        setIsSubmit(true);
        const res = await verifyCodeAPI(email as string, code);
        setIsSubmit(false);
        
        if (res.data) {
            otpRef.current?.clear();
            Toast.show("Kích hoạt tài khoản thành công", {
                duration: Toast.durations.SHORT,
                textColor: "white",
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1,
            });
            if (isLogin === "0") {
                router.replace({
                    pathname: "/(auth)/login",
                    params: { email: email }
                });
            } else {
                router.replace("/(tabs)");
            }
        } else {
            Toast.show(res.message as string, {
                duration: Toast.durations.SHORT,
                textColor: "white",
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1,
            });
        }
    };

    useEffect(() => {
        if (code && code.length === 6) {
            verifyCode();
        }
    }, [code]);

    const handleResendCode = async () => {
        otpRef.current?.clear();
        const res = await resendCodeAPI(email as string);
        const m = res.data ? "Resend code thành công" : res.message;
        Toast.show(m as string, {
            duration: Toast.durations.SHORT,
            textColor: "white",
            backgroundColor: APP_COLOR.ORANGE,
            opacity: 1,
        });
    };

    

    return (
        <SafeAreaView style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1,  backgroundColor: APP_COLOR.YELLOW_BASE, }}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Pressable 
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <FontAwesome5 name="chevron-left" size={20} color= {APP_COLOR.ORANGE} />
                        </Pressable>
                        <Text style={styles.headerText}>Xác thực tài khoản</Text>
                    </View>

                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <View style={styles.container}>
                            <View style={styles.contentCard}>
                    
                                {/* OTP Input */}
                                <View style={styles.otpContainer}>
                                    <Text style={styles.otpLabel}>Mã xác thực</Text>
                                    <View style={styles.otpInputContainer}>
                                        <OTPTextView
                                            ref={otpRef}
                                            handleTextChange={setCode}
                                            autoFocuse
                                            inputCount={6}
                                            inputCellLength={1}
                                            tintColor={APP_COLOR.ORANGE}
                                            textInputStyle={{
                                                borderWidth: 2,
                                                borderColor: "#E8E8E8",
                                                borderBottomWidth: 2,
                                                borderRadius: 8,
                                                // @ts-ignore:next-line
                                                color: APP_COLOR.ORANGE,
                                                fontSize: 18,
                                                fontWeight: "600",
                                            }}
                                        />
                                    </View>
                                </View>

                                {/* Resend Code */}
                                <View style={styles.resendContainer}>
                                    <Text style={styles.resendText}>Bạn đã nhận được mã xác thực?</Text>
                                    <Pressable onPress={handleResendCode}>
                                        <Text style={styles.resendLink}>Gửi lại</Text>
                                    </Pressable>
                                </View>

                                {/* Buttons */}
                                <View style={styles.buttonContainer}>
                                    
                                    <Pressable 
                                        style={({ pressed }) => [
                                            styles.continueBtn,
                                            { opacity: pressed ? 0.9 : 1 },
                                            { flex: 1 }
                                        ]}
                                        onPress={() => verifyCode()}
                                    >
                                        <Text style={styles.continueText}>Hoàn tất</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>

            {isSubmit && <LoadingOverlay />}
        </SafeAreaView>
    );
};

export default VerifyPage;