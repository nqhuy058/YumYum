import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { useCurrentApp } from "@/context/app.context"
import { loginAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { LoginSchema } from "@/utils/validate.schema"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link, router } from "expo-router"
import { Formik } from "formik"
import { useState } from "react"
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import Toast from "react-native-root-toast"
import { SafeAreaView } from "react-native-safe-area-context"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_COLOR.YELLOW_BASE,
    },
    title: {
        fontSize: 25,
        fontWeight: "600",
        marginVertical: 30,
        color: '#fff'
    },
    forgotContainer: {
        marginVertical: 10,
    },
    forgotText: {
        textAlign: "center",
        color: APP_COLOR.ORANGE,
        fontWeight: "600",
    },
    dividerContainer: {
        marginVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#DDD",
    },
    dividerText: {
        fontSize: 14,
        color: "#999",
    },
    biometricContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    signupContainer: {
        marginVertical: 15,
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
    },
    signupText: {
        color: "black",
    },
    signupLink: {
        color: APP_COLOR.ORANGE,
        textDecorationLine: 'underline',
        fontWeight: "600",
    },
})

const LoginPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setAppState } = useCurrentApp();

    const handleLogin = async (email: string, password: string) => {

        try {
            setLoading(true)
            const res = await loginAPI(email, password);
            setLoading(false)
            if (res.data) {
                await AsyncStorage.setItem("access_token", res.data.access_token);
                setAppState(res.data);
                Toast.show("Đăng nhập thành công!", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1
                });

                router.replace("/(tabs)");

            } else {
                const m = Array.isArray(res.message)
                    ? res.message[0] : res.message;

                Toast.show(m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1
                });

                if (res.statusCode === 400) {
                    Toast.show("Xác thực tài khoản", {
                        duration: Toast.durations.LONG,
                        textColor: "white",
                        backgroundColor: APP_COLOR.ORANGE,
                        opacity: 1
                    });
                    router.replace({
                        pathname: "/(auth)/verify",
                        params: { email: email, isLogin: 1 }
                    })
                }
            }
        } catch (error) {
            console.log(">>> check error: ", error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* Title */}
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>Đăng nhập</Text>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            backgroundColor: "white",
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            flex: 1,
                            paddingTop: 30
                        }}
                        scrollEnabled={true}
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <Formik
                            validationSchema={LoginSchema}
                            initialValues={{ email: '', password: '' }}
                            onSubmit={values => handleLogin(values.email, values.password)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View style={{ gap: 15, marginHorizontal: 20, flex: 1 }}>
                                    {/* Email Input */}
                                    <ShareInput
                                        title="Email"
                                        keyboardType="email-address"
                                        placeholder="example@example.com"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        error={errors.email}
                                        touched={touched.email}
                                    />

                                    {/* Password Input */}
                                    <ShareInput
                                        title="Mật khẩu"
                                        placeholder="••••••••••"
                                        secureTextEntry={true}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        error={errors.password}
                                        touched={touched.password}
                                    />

                                    {/* Forgot Password */}
                                    <View style={styles.forgotContainer}>
                                        <Text
                                            onPress={() => router.navigate("/(auth)/request.password")}
                                            style={styles.forgotText}>
                                            Quên mật khẩu ?
                                        </Text>
                                    </View>

                                    {/* Login Button */}
                                    <ShareButton
                                        loading={loading}
                                        tittle="Đăng Nhập"
                                        onPress={handleSubmit as any}
                                        textStyle={{
                                            textTransform: "uppercase",
                                            color: "#fff",
                                            paddingVertical: 5,
                                        }}
                                        btnStyle={{
                                            justifyContent: "center",
                                            borderRadius: 30,
                                            marginHorizontal: 50,
                                            paddingVertical: 10,
                                            backgroundColor: APP_COLOR.ORANGE,
                                        }}
                                        pressStyle={{ alignSelf: "stretch" }}
                                    />

                                    {/* Divider */}
                                    <View style={styles.dividerContainer}>
                                        <View style={styles.divider} />
                                        <Text style={styles.dividerText}>Đăng nhập với</Text>
                                        <View style={styles.divider} />
                                    </View>

                                    <SocialButton />

                                    {/* Sign Up Link */}
                                    <View style={styles.signupContainer}>
                                        <Text style={styles.signupText}>
                                            Chưa có tài khoản?
                                        </Text>
                                        <Link href={"/(auth)/signup"}>
                                            <Text style={styles.signupLink}>
                                                Đăng ký.
                                            </Text>
                                        </Link>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default LoginPage;