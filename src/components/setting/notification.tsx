import { APP_COLOR } from '@/utils/constant';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';

type NotificationSettingsState = {
    general: boolean;
    sound: boolean;
    soundCall: boolean;
    vibrate: boolean;
    specialOffers: boolean;
    payments: boolean;
    promo: boolean;
    cashback: boolean;
};

// Dữ liệu tĩnh cho danh sách các tùy chọn
const NOTIFICATION_OPTIONS = [
    { id: '1', label: 'Thông báo chung', key: 'general' as keyof NotificationSettingsState },
    { id: '2', label: 'Âm thanh', key: 'sound' as keyof NotificationSettingsState },
    { id: '3', label: 'Âm thanh cuộc gọi', key: 'soundCall' as keyof NotificationSettingsState },
    { id: '4', label: 'Rung', key: 'vibrate' as keyof NotificationSettingsState },
    { id: '5', label: 'Ưu đãi đặc biệt', key: 'specialOffers' as keyof NotificationSettingsState },
    { id: '6', label: 'Thanh toán', key: 'payments' as keyof NotificationSettingsState },
    { id: '7', label: 'Khuyến mãi và giảm giá', key: 'promo' as keyof NotificationSettingsState },
    { id: '8', label: 'Hoàn tiền', key: 'cashback' as keyof NotificationSettingsState },
];

const NotificationOptions = () => {
    // Trạng thái ban đầu dựa trên giao diện mẫu
    const [settings, setSettings] = useState<NotificationSettingsState>({
        general: true,
        sound: true,
        soundCall: true,
        vibrate: false,
        specialOffers: false,
        payments: false,
        promo: false,
        cashback: false,
    });

    // Hàm để thay đổi trạng thái của một công tắc
    const toggleSwitch = (key: keyof NotificationSettingsState) => {
        setSettings(prevState => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    // Component để render mỗi dòng trong danh sách
    const renderItem = ({ item }: { item: typeof NOTIFICATION_OPTIONS[0] }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Switch
                trackColor={{ false: '#FDEFE7', true: APP_COLOR.ORANGE }}
                thumbColor={settings[item.key] ? '#FFFFFF' : '#F4F3F4'}
                ios_backgroundColor="#FDEFE7"
                onValueChange={() => toggleSwitch(item.key)}
                value={settings[item.key]}
            />
        </View>
    );



    return (
        <View style={styles.container}>
            <FlatList
                data={NOTIFICATION_OPTIONS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 10 }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 5,
    },
    itemLabel: {
        fontSize: 16,
        color: '#333333',
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: '#F0F0F0',
    },
});

export default NotificationOptions;