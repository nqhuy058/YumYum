import { useCurrentApp } from '@/context/app.context';
import { APP_COLOR } from '@/utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { router } from 'expo-router'; // Loại bỏ useNavigation ở đây
import { Alert, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_COLOR.ORANGE,
        borderRadius: 30,
    },
    profileContainer: {
        padding: 20,
        paddingTop: 30,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileTextContainer: {
        flex: 1,
    },
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        color: APP_COLOR.YELLOW_LIGHT,
        fontSize: 13,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        gap: 20,
    },
    menuIconContainer: {
        width: 40.3,
        height: 40.3,
        borderRadius: 13,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: 'white',
    },
    menuLabel: {
        color: APP_COLOR.YELLOW_LIGHT,
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#ffff',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    footer: {
        padding: 20,
        paddingBottom: 30,
    }
});

const menuItems = [
    { label: 'Đơn hàng của bạn', icon: require('@/assets/drawer/order.png'), route: '/(drawer)/(tabs)/order' },
    { label: 'Trang cá nhân', icon: require('@/assets/drawer/profile.png'), route: '/(drawer)/(tabs)/profile' },
    { label: 'Địa chỉ giao hàng', icon: require('@/assets/drawer/adress.png'), route: '/(drawer)/(tabs)/address' },
    { label: 'Ví thanh toán', icon: require('@/assets/drawer/payment.png'), route: '/(drawer)/(tabs)/payment' },
    { label: 'Liên hệ', icon: require('@/assets/drawer/contact.png'), route: '/(drawer)/(tabs)/contact' },
    { label: 'Hỗ trợ và tư vấn', icon: require('@/assets/drawer/help.png'), route: '/(drawer)/(tabs)/help' },
    { label: 'Cài đặt', icon: require('@/assets/drawer/setting.png'), route: '/(drawer)/(tabs)/setting' },
];

const CustomDrawerContent = (props: DrawerContentComponentProps) => { // Sử dụng type DrawerContentComponentProps
    const { appState, setAppState } = useCurrentApp();

    const backend = Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL
        : process.env.EXPO_PUBLIC_IOS_API_URL;

    const baseImage = `${backend}/images/avatar`;

    const handleNavigate = (route: string) => {
        router.navigate(route as any);
        props.navigation.dispatch(DrawerActions.closeDrawer()); // Sử dụng props.navigation
    };

    const handleLogout = () => {
        Alert.alert('Đăng xuất', 'Bạn chắc chắn muốn đăng xuất?', [
            {
                text: 'Hủy',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Xác nhận',
                onPress: async () => {
                    await AsyncStorage.removeItem("access_token");
                    router.replace("/(auth)/welcome");
                }
            },
        ]);
    }

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={{ backgroundColor: APP_COLOR.ORANGE }} />
            {/* Profile Section */}
            <Pressable
                onPress={() => handleNavigate('/(drawer)/profile')}
                style={({ pressed }) => [
                    styles.profileContainer,
                    { opacity: pressed ? 0.8 : 1 }
                ]}
            >
                <Image
                    source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
                    style={styles.avatar}
                />
                <View style={styles.profileTextContainer}>
                    <Text style={styles.name}>{appState?.user.name}</Text>
                    <Text style={styles.email}>{appState?.user.email}</Text>
                </View>
            </Pressable>

            <View style={styles.divider} />

            {/* Menu Items */}
            <DrawerContentScrollView {...props}>
                {menuItems.map((item, index) => (
                    <Pressable
                        key={index}
                        style={({ pressed }) => [styles.menuItem, { opacity: pressed ? 0.7 : 1 }]}
                        onPress={() => handleNavigate(item.route)}
                    >
                        <View style={styles.menuIconContainer}>
                            <Image source={item.icon} style={styles.menuIcon} />
                        </View>
                        <Text style={styles.menuLabel}>{item.label}</Text>

                    </Pressable>
                ))}
            </DrawerContentScrollView>

            <View style={styles.divider} />

            {/* Logout Button */}
            <View style={styles.footer}>
                <Pressable
                    style={({ pressed }) => [styles.menuItem, { opacity: pressed ? 0.7 : 1 }]}
                    onPress={handleLogout}
                >
                    <View style={styles.menuIconContainer}>
                        <Image source={require('@/assets/drawer/logout.png')} style={styles.menuIcon} />
                    </View>
                    <Text style={styles.menuLabel}>Đăng xuất</Text>
                </Pressable>
            </View>
            <SafeAreaView edges={['bottom']} style={{ backgroundColor: APP_COLOR.ORANGE }} />
        </View>
    );
};

export default CustomDrawerContent;