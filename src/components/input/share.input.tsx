import { APP_COLOR } from "@/utils/constant";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, KeyboardTypeOptions, Platform } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    inputGroup: {
        gap: 8,
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    inputContainer: {
        position: "relative",
    },
    input: {
        borderWidth: 0,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === "android" ? 12 : 15,
        borderRadius: 12,
        backgroundColor: APP_COLOR.YELLOW_LIGHT,
        fontSize: 14,
        color: "#333",
    },
    eye: {
        position: 'absolute',
        right: 15,
        top: Platform.OS === "android" ? 12 : 15,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    }
})

interface IProps {
    title?: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    value: any;
    setValue?: (v: any) => void;
    onChangeText?: any;
    onBlur?: any;
    error?: any;
    touched?: any;
    editable?: any;
    placeholder?: string;
}

const ShareInput = (props: IProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const { title, keyboardType, secureTextEntry = false,
        value, setValue, onChangeText, onBlur,
        error, touched, editable = true, placeholder = "" } = props;

    return (
        <View style={styles.inputGroup}>
            {title && <Text style={styles.label}>
                {title}
            </Text>}
            <View style={styles.inputContainer}>
                <TextInput
                    editable={editable}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        if (onBlur)
                            onBlur(e);
                        setIsFocused(false);
                    }}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    style={styles.input}
                    secureTextEntry={secureTextEntry && !isShowPassword}
                />
                {secureTextEntry &&
                    <FontAwesome5
                        style={styles.eye}
                        name={isShowPassword ? "eye" : "eye-slash"}
                        size={18}
                        color="#FF6B35"
                        onPress={() => setIsShowPassword(!isShowPassword)}
                    />
                }
            </View>
            {error && touched && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

export default ShareInput;