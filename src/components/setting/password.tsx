import ShareInput from "@/components/input/share.input";
import { updateUserPasswordAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { UpdateUserPasswordSchema } from "@/utils/validate.schema";
import { Formik, FormikProps } from "formik";
import { useRef } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import Toast from "react-native-root-toast";


const ChangePassword = () => {
    const formikRef = useRef<FormikProps<any>>(null);

    const handleUpdatePassword = async (
        currentPassword: string,
        newPassword: string
    ) => {
        const res = await updateUserPasswordAPI(currentPassword, newPassword);
        if (res.data) {
            Toast.show("Cập nhật mật khẩu thành công!", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1
            });

            formikRef?.current?.resetForm();

        } else {
            const m = Array.isArray(res.message)
                ? res.message[0] : res.message;

            Toast.show(m, {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1
            });
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.container}>
                    <Formik
                        innerRef={formikRef}
                        validationSchema={UpdateUserPasswordSchema}
                        initialValues={{
                            currentPassword: "",
                            newPassword: "",
                            confirmNewPassword: ""
                        }}
                        onSubmit={values => handleUpdatePassword(
                            values?.currentPassword ?? "",
                            values?.newPassword ?? "",
                        )}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors,
                            touched, isValid, dirty,
                        }) => (
                            <View style={styles.formContainer}>
                                <ShareInput
                                    title="Mật khẩu hiện tại"
                                    secureTextEntry={true}
                                    onChangeText={handleChange('currentPassword')}
                                    onBlur={handleBlur('currentPassword')}
                                    value={values.currentPassword}
                                    error={errors.currentPassword}
                                    touched={touched.currentPassword}
                                    placeholder="************"
                                />

                                <ShareInput
                                    title="Mật khẩu mới"
                                    secureTextEntry={true}
                                    onChangeText={handleChange('newPassword')}
                                    onBlur={handleBlur('newPassword')}
                                    value={values.newPassword}
                                    error={errors.newPassword}
                                    touched={touched.newPassword}
                                    placeholder="************"
                                />

                                <ShareInput
                                    title="Xác nhận mật khẩu mới"
                                    secureTextEntry={true}
                                    onChangeText={handleChange('confirmNewPassword')}
                                    onBlur={handleBlur('confirmNewPassword')}
                                    value={values.confirmNewPassword}
                                    error={errors.confirmNewPassword}
                                    touched={touched.confirmNewPassword}
                                    placeholder="************"
                                />
                                <View style={styles.buttonWrapper}>
                                    <Pressable
                                        disabled={!(isValid && dirty)}
                                        onPress={handleSubmit as any}
                                        style={[
                                            styles.button,
                                            !(isValid && dirty) && styles.buttonDisabled
                                        ]}
                                    >
                                        <Text style={styles.buttonText}>Thay đổi mật khẩu</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
    },
    formContainer: {
        gap: 15,
        marginTop: 70,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginTop: -10,
        marginBottom: 10,
    },

    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20,
        marginTop: 30,
    },
    button: {
        backgroundColor: APP_COLOR.ORANGE,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: '#F3F3F3',
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default ChangePassword;