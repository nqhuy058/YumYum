import { useCurrentApp } from "@/context/app.context";
import { updateUserAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { UpdateUserSchema } from "@/utils/validate.schema";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import React from "react";
import {
    ActivityIndicator,
    Image,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import Toast from "react-native-root-toast";
import ShareInput from "../input/share.input";

const UserInfo = () => {
    const { appState, setAppState } = useCurrentApp();

    const backend = Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL
        : process.env.EXPO_PUBLIC_IOS_API_URL;

    const baseImage = `${backend}/images/avatar`;

    const handleUpdateUser = async (name: string, phone: string) => {
        if (appState?.user._id) {
            const res = await updateUserAPI(appState.user._id, name, phone);

            if (res.data) {
                const updatedUserFromDB = res.data;

                const newState = {
                    ...appState,
                    user: { ...appState.user, ...updatedUserFromDB },
                };

                try {
                    await AsyncStorage.setItem('appState', JSON.stringify(newState));
                    setAppState(newState);

                    Toast.show("Cập nhật thông tin user thành công!", {
                        duration: Toast.durations.LONG,
                        textColor: "white",
                        backgroundColor: APP_COLOR.ORANGE,
                        opacity: 1
                    });

                } catch (e) {
                    console.error("Lỗi nghiêm trọng khi lưu state trong UserInfo:", e);
                }

            } else {
                const m = Array.isArray(res.message) ? res.message[0] : res.message;
                Toast.show(m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1
                });
            }
        }
    }

    if (!appState?.user) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={APP_COLOR.ORANGE} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: `${baseImage}/${appState.user.avatar}` }}
                    />
                    <Pressable style={styles.cameraButton}>
                        <EvilIcons name="camera" size={24} color="#fff" />
                    </Pressable>
                </View>

                <Formik
                    validationSchema={UpdateUserSchema}
                    initialValues={{
                        name: appState.user.name ?? '',
                        email: appState.user.email ?? '',
                        phone: appState.user.phone ?? ''
                    }}
                    onSubmit={values => handleUpdateUser(values?.name ?? "", values?.phone ?? "")}
                    enableReinitialize
                >
                    {({ handleChange, handleBlur, handleSubmit, values, isValid, dirty, errors, touched }) => (
                        <View style={styles.form}>
                            <ShareInput
                                title="Tên người dùng"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                error={errors.name}
                                touched={touched.name}
                            />

                            <ShareInput
                                title="Email"
                                value={values.email}
                                editable={false}
                            />

                            <ShareInput
                                title="Số điện thoại"
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                                keyboardType="phone-pad"
                                error={errors.phone}
                                touched={touched.phone}
                            />

                            <Pressable
                                disabled={!(isValid && dirty)}
                                onPress={handleSubmit as any}
                                style={({ pressed }) => [
                                    styles.updateButton,
                                    // Style cho trạng thái vô hiệu hóa
                                    !(isValid && dirty) && styles.updateButtonDisabled,
                                    // Style cho trạng thái đang được nhấn
                                    pressed && { opacity: 0.8 }
                                ]}
                            >
                                <Text style={styles.updateButtonText}>Cập nhật</Text>
                            </Pressable>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 30,
        position: 'relative',
    },
    avatar: {
        height: 120,
        width: 120,
        borderRadius: 25,
    },
    cameraButton: {
        position: 'absolute',
        bottom: -5,
        right: '32%',
        backgroundColor: APP_COLOR.ORANGE,
        borderRadius: 12,
        padding: 4,
        borderWidth: 2,
        borderColor: 'white'
    },
    cameraIcon: {
        fontSize: 18,
    },
    form: {},
    updateButton: {
        backgroundColor: APP_COLOR.ORANGE,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
        width: '50%',
        alignSelf: 'center',
    },
    updateButtonDisabled: {
        backgroundColor: '#FDBF60',
    },
    updateButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UserInfo;