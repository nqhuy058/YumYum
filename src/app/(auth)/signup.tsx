import ShareButton from "@/components/button/share.button"
import ShareInput from "@/components/input/share.input"
import { registerAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { SignUpSchema } from "@/utils/validate.schema"
import axios from "axios"
import { Link, router } from "expo-router"
import { Formik } from "formik"
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

const SignUpPage = () => {
    const handleSignUp = async (name: string, email: string, password: string) => {
        try {
            // Sửa thứ tự tham số: (email, password, name)
            const res = await registerAPI(email, password, name)
            if (res.data) {
                Toast.show("Đăng kí thành công!", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1
                });

                router.replace({
                    pathname: "/(auth)/verify",
                    params: { email: email, isLogin: 0 }
                })

            } else {
                const m = Array.isArray(res.message)
                    ? res.message[0]
                    : res.message
                Toast.show(m, {
                    duration: Toast.durations.SHORT,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1,
                });
            }


        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Check error: ", error.response?.data);
                Toast.show(error.response?.data?.message || "Đăng ký thất bại!", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: "#FF0000",
                    opacity: 1,
                });
            } else {
                console.log("Check error: ", error);
                Toast.show("Đăng ký thất bại!", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: "#FF0000",
                    opacity: 1,
                });
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* Title */}
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>Đăng kí tài khoản mới</Text>
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
                            validationSchema={SignUpSchema}
                            initialValues={{ name: '', email: '', password: '' }}
                            onSubmit={values => handleSignUp(values.name, values.email, values.password)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View style={{ gap: 15, marginHorizontal: 20, flex: 1 }}>
                                    {/* Name Input */}
                                    <ShareInput
                                        title="Tên người dùng"
                                        placeholder="Nhập tên"
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                        error={errors.name}
                                        touched={touched.name}
                                    />

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
                                        title="Password"
                                        placeholder="••••••••••"
                                        secureTextEntry={true}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        error={errors.password}
                                        touched={touched.password}
                                    />

                                    {/* Sign Up Button */}
                                    <ShareButton
                                        tittle="Đăng Ký"
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

                                    {/* Log in Link */}
                                    <View style={styles.signupContainer}>
                                        <Text style={styles.signupText}>
                                            Bạn đã có tài khoản?
                                        </Text>
                                        <Link href={"/(auth)/login"}>
                                            <Text style={styles.signupLink}>
                                                Đăng nhập.
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

export default SignUpPage;