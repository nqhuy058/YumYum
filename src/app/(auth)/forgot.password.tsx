import ShareButton from "@/components/button/share.button"
import ShareInput from "@/components/input/share.input"
import { forgotPasswordAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { ForgotPasswordSchema } from "@/utils/validate.schema"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { router, useLocalSearchParams } from "expo-router"
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
    },
    submitBtn: {
        backgroundColor: APP_COLOR.ORANGE,
        paddingVertical: 13,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25,
        marginTop: 10,
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

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { email } = useLocalSearchParams();

    const handleForgotPassword = async (code: string, password: string) => {
        try {
            setLoading(true)
            const res = await forgotPasswordAPI(code, email as string, password);
            setLoading(false)
            if (res.data) {
                Toast.show("Thay đổi mật khẩu thành công!", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1
                });
                router.replace("/(auth)/login");
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
            Toast.show("Thay đổi mật khẩu thất bại!", {
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
                        <Text style={styles.headerText}>Tạo mật khẩu mới</Text>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <View style={styles.container}>
                            <View style={styles.contentCard}>
                                <Formik
                                    validationSchema={ForgotPasswordSchema}
                                    initialValues={{
                                        code: '',
                                        password: '',
                                        confirmPassword: ''
                                    }}
                                    onSubmit={values => handleForgotPassword(values.code, values.password)}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                        <>
                                            {/* Title */}
                                            <Text style={styles.title}>Thay đổi mật khẩu</Text>

                                            {/* Description */}
                                            <Text style={styles.description}>
                                                Vui lòng nhập mã xác thực và mật khẩu mới của bạn để thay đổi mật khẩu.
                                            </Text>

                                            {/* Inputs */}
                                            <View style={styles.inputsWrapper}>
                                                <ShareInput
                                                    title="Mã xác thực"
                                                    placeholder="Nhập mã xác thực"
                                                    onChangeText={handleChange('code')}
                                                    onBlur={handleBlur('code')}
                                                    value={values.code}
                                                    error={errors.code}
                                                    touched={touched.code}
                                                    keyboardType="numeric"
                                                />

                                                <ShareInput
                                                    title="Mật khẩu mới"
                                                    placeholder="••••••••••"
                                                    secureTextEntry={true}
                                                    onChangeText={handleChange('password')}
                                                    onBlur={handleBlur('password')}
                                                    value={values.password}
                                                    error={errors.password}
                                                    touched={touched.password}
                                                />

                                                <ShareInput
                                                    title="Xác nhận mật khẩu"
                                                    placeholder="••••••••••"
                                                    secureTextEntry={true}
                                                    onChangeText={handleChange('confirmPassword')}
                                                    onBlur={handleBlur('confirmPassword')}
                                                    value={values.confirmPassword}
                                                    error={errors.confirmPassword}
                                                    touched={touched.confirmPassword}
                                                />
                                            </View>

                                            {/* Submit Button */}
                                            <ShareButton
                                                loading={loading}
                                                tittle="Đặt lại mật khẩu"
                                                onPress={handleSubmit as any}
                                                textStyle={styles.submitText}
                                                btnStyle={styles.submitBtn}
                                                pressStyle={{ alignSelf: "stretch" }}
                                            />

                                            
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

export default ForgotPasswordPage;