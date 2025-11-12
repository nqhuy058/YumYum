import { View, StyleSheet, Pressable } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { APP_COLOR } from "@/utils/constant";

const styles = StyleSheet.create({
    container: {
        gap: 15,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    iconButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

interface IProps {
    title?: string;
}

const SocialButton = (props: IProps) => {
    const { title } = props;

    const handleFacebookPress = () => {
        alert("Đăng nhập với Facebook")
    }

    const handleGooglePress = () => {
        alert("Đăng nhập với Google")
    }

    const handleFingerprintPress = () => {
        alert("Đăng nhập với vân tay")
    }

    return (
        <View style={styles.container}>
            <View style={styles.iconsContainer}>
                {/* Facebook Icon */}
                <Pressable 
                    style={({ pressed }) => [
                        styles.iconButton,
                        { opacity: pressed ? 0.7 : 1 }
                    ]}
                    onPress={handleFacebookPress}
                >
                    <FontAwesome5 
                        name="facebook-f" 
                        size={24} 
                        color={APP_COLOR.ORANGE} 
                    />
                </Pressable>

                {/* Google Icon */}
                <Pressable 
                    style={({ pressed }) => [
                        styles.iconButton,
                        { opacity: pressed ? 0.7 : 1 }
                    ]}
                    onPress={handleGooglePress}
                >
                    <FontAwesome5 
                        name="google" 
                        size={24} 
                        color={APP_COLOR.ORANGE} 
                    />
                </Pressable>

            </View>
        </View>
    )
}

export default SocialButton;