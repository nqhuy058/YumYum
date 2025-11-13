import ShareButton from "@/components/button/share.button"
import ShareInput from "@/components/input/share.input"
import { requestPasswordAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { RequestPasswordSchema } from "@/utils/validate.schema"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { router } from "expo-router"
import { Formik } from "formik"
import { useState } from "react"
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import Toast from "react-native-root-toast"
import { SafeAreaView } from "react-native-safe-area-context"

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: APP_COLOR.YELLOW_BASE,
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
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 30,
        paddingHorizontal: 20,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#333",
        marginBottom: 15,
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        color: "#888",
        lineHeight: 20,
        marginBottom: 25,
        textAlign: "center",
    },
    inputsWrapper: {
        gap: 15,
        marginBottom: 20,
        marginTop: 30,
    },
    submitBtn: {
        backgroundColor: APP_COLOR.ORANGE,
        paddingVertical: 13,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25,
        marginTop: 30,
        shadowColor: APP_COLOR.ORANGE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    submitText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    backLink: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        paddingBottom: 30,
    },
    backLinkText: {
        color: APP_COLOR.ORANGE,
        fontWeight: "600",
        fontSize: 14,
    },
})

const RequestPasswordPage = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleRequestPassword = async (email: string) => {
        try {
            setLoading(true);
            const res = await requestPasswordAPI(email);
            setLoading(false);
            if (res.data) {
                Toast.show("Mã xác thực đã được gửi đến email của bạn!", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1
                });
                router.replace({
                    pathname: "/(auth)/forgot.password",
                    params: { email }
                });
            } else {
                const m = Array.isArray(res.message)
                    ? res.message[0] : res.message;

                Toast.show(m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: "#FF0000",
                    opacity: 1
                });
            }
        } catch (error) {
            setLoading(false)
            console.log(">>> check error: ", error)
            Toast.show("Yêu cầu thất bại!", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: "#FF0000",
                opacity: 1
            });
        }
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Pressable
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <FontAwesome5 name="chevron-left" size={20} color={APP_COLOR.ORANGE} />
                        </Pressable>
                        <Text style={styles.headerText}>Đặt lại mật khẩu</Text>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <View style={styles.container}>
                            <View style={styles.contentCard}>
                                <Formik
                                    validationSchema={RequestPasswordSchema}
                                    initialValues={{ email: '' }}
                                    onSubmit={values => handleRequestPassword(values.email)}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                        <>
                                            {/* Title */}
                                            <Text style={styles.title}>Đặt lại mật khẩu của bạn</Text>

                                            {/* Description */}
                                            <Text style={styles.description}>
                                                Vui lòng điền vào email tài khoản đăng nhập của bạn để thực hiện yêu cầu thay đổi mật khẩu.
                                            </Text>

                                            {/* Inputs */}
                                            <View style={styles.inputsWrapper}>
                                                <ShareInput
                                                    title="Email xác thực"
                                                    keyboardType="email-address"
                                                    placeholder="example@example.com"
                                                    onChangeText={handleChange('email')}
                                                    onBlur={handleBlur('email')}
                                                    value={values.email}
                                                    error={errors.email}
                                                    touched={touched.email}
                                                />
                                            </View>

                                            {/* Submit Button */}
                                            <ShareButton
                                                loading={loading}
                                                tittle="Gửi mã xác thực"
                                                onPress={handleSubmit as any}
                                                textStyle={styles.submitText}
                                                btnStyle={styles.submitBtn}
                                                pressStyle={{ alignSelf: "stretch" }}
                                            />

                                            {/* Back Link */}
                                            <View style={styles.backLink}>
                                                <Text style={{ color: "#666", fontSize: 14 }}>
                                                    Đã nhớ mật khẩu?
                                                </Text>
                                                <Pressable onPress={() => router.back()}>
                                                    <Text style={styles.backLinkText}>Đăng nhập</Text>
                                                </Pressable>
                                            </View>
                                        </>
                                    )}
                                </Formik>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default RequestPasswordPage;