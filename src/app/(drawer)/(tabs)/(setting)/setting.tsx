import { APP_COLOR } from '@/utils/constant';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Cấu trúc của một mục cài đặt
interface SettingItemType {
    id: string;
    title: string;
    icon: React.ReactNode;
    route: string;
}


const SETTINGS_DATA: SettingItemType[] = [
    {
        id: '1',
        title: 'Notification Setting',
        icon: <Ionicons name="notifications-outline" size={40} color={APP_COLOR.ORANGE} />,
        route: '/notification.setting',
    },
    {
        id: '2',
        title: 'Password Setting',
        icon: <MaterialCommunityIcons name="account-key-outline" size={40} color={APP_COLOR.ORANGE} />,
        route: '/password.setting',
    },
    {
        id: '3',
        title: 'Delete Account',
        icon: <MaterialCommunityIcons name="account-arrow-left-outline" size={40} color={APP_COLOR.ORANGE} />,
        route: '/',
    },
];

const SettingsList = () => {
    const router = useRouter();

    // Component để render mỗi mục cài đặt
    const SettingItem = ({ item }: { item: SettingItemType }) => (
        <Pressable
            onPress={() => router.navigate(item.route as Href)} 
            style={({ pressed }) => [styles.itemContainer, pressed && { opacity: 0.8 }]}
        >
            {item.icon}
            <Text style={styles.itemText}>{item.title}</Text>
            <AntDesign name="down" size={16} color={APP_COLOR.ORANGE} />
        </Pressable>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: APP_COLOR.YELLOW_BASE }}>
            <View style={styles.container}>
                <FlatList
                    data={SETTINGS_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <SettingItem item={item} />}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={{ paddingTop: 10 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 20,
    },
    itemText: {
        flex: 1,
        marginLeft: 20,
        fontSize: 18,
        color: '#333333',
        fontWeight: '600',
    },
    separator: {
        height: 1,
        backgroundColor: '#EAEAEA',
        marginLeft: 44,
    },
});

export default SettingsList;