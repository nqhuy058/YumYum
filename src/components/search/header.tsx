import { View, StyleSheet, Pressable, Image, Text } from "react-native";
import { APP_COLOR } from "@/utils/constant";
import cartIcon from "@/assets/header/shop.header.png";
import notificationIcon from "@/assets/header/nofication.header.png";
import profileIcon from "@/assets/header/account.header.png";
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 15,
    },
    iconButton: {
        width: 25,
        height: 30,
        borderRadius: 20,
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4,
    },
    icon: {
        width: 22,
        height: 22,
        resizeMode: "contain",
    },
    badge: {
        position: "absolute",
        top: -8,
        right: -8,
        backgroundColor: "#FF3B30",
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: APP_COLOR.YELLOW_BASE,
    },
    badgeText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
    },
});

interface IProps {
    cartCount?: number;
    onCartPress?: () => void;
    onNotificationPress?: () => void;
    onProfilePress?: () => void;
}

const Header = (props: IProps) => {
    const { 
        cartCount = 0,
        onCartPress,
        onNotificationPress,
        onProfilePress
    } = props;


    return (
        <View style={styles.container}>
            {/* Cart */}
            <Pressable
                style={({ pressed }) => [
                    styles.iconButton,
                    { opacity: pressed ? 0.8 : 1 }
                ]}
                onPress={onCartPress}
            >
                <Image
                    source={cartIcon}
                    style={styles.icon}
                />
                {cartCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{cartCount}</Text>
                    </View>
                )}
            </Pressable>

            {/* Notification */}
            <Pressable
                style={({ pressed }) => [
                    styles.iconButton,
                    { opacity: pressed ? 0.8 : 1 }
                ]}
                onPress={onNotificationPress}
            >
                <Image
                    source={notificationIcon}
                    style={styles.icon}
                />
            </Pressable>

            {/* Profile */}
            <Pressable
                style={({ pressed }) => [
                    styles.iconButton,
                    { opacity: pressed ? 0.8 : 1 }
                ]}
                onPress={onProfilePress}
            >
                <Image
                    source={profileIcon}
                    style={styles.icon}
                />
            </Pressable>
        </View>
    );
};

export default Header;