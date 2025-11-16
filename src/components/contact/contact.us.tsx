import { APP_COLOR } from '@/utils/constant';
import { AntDesign, FontAwesome, FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    LayoutAnimation,
    Linking,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    UIManager,
    View,
} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ContactItemType {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: string;
    type: 'url' | 'tel';
}


const CONTACT_DATA: ContactItemType[] = [
    { id: '1', title: 'Liên hệ hỗ tợ viên', icon: <FontAwesome5 name="headset" size={35} color={APP_COLOR.ORANGE} />, content: '0397301364', type: 'tel' },
    { id: '2', title: 'Website', icon: <Ionicons name="globe-outline" size={35} color={APP_COLOR.ORANGE} />, content: 'https://github.com/nqhuy058', type: 'url' },
    { id: '3', title: 'Tiktok', icon: <FontAwesome6 name="tiktok" size={35} color={APP_COLOR.ORANGE} />, content: 'https://www.tiktok.com/@bestflo058', type: 'url' },
    { id: '4', title: 'Facebook', icon: <FontAwesome name="facebook-square" size={35} color={APP_COLOR.ORANGE} />, content: 'https://www.facebook.com/huytieulmht/', type: 'url' },
    { id: '5', title: 'Instagram', icon: <AntDesign name="instagram" size={35} color={APP_COLOR.ORANGE} />, content: 'https://www.instagram.com/huydz085/', type: 'url' },
];

const ContactUs = () => {
    const [activeTab, setActiveTab] = useState('Contact Us');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handlePressItem = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const handleLinkPress = async (item: ContactItemType) => {
        const url = item.type === 'tel' ? `tel:${item.content}` : item.content;

        const supported = await Linking.canOpenURL(url);

        if (supported) {
            try {
                await Linking.openURL(url);
            } catch (error) {
                alert(`Đã xảy ra lỗi khi cố gắng mở liên kết.`);
            }
        } else {
            alert(`Không thể mở: ${url}. Vui lòng cài đặt một ứng dụng phù hợp.`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <Pressable
                    style={[styles.tabButton, activeTab === 'FAQ' && styles.activeTabButton]}
                    onPress={() => setActiveTab('FAQ')}
                >
                    <Text style={[styles.tabButtonText, activeTab === 'FAQ' && styles.activeTabText]}>FAQ</Text>
                </Pressable>
                <Pressable
                    style={[styles.tabButton, activeTab === 'Contact Us' && styles.activeTabButton]}
                    onPress={() => setActiveTab('Contact Us')}
                >
                    <Text style={[styles.tabButtonText, activeTab === 'Contact Us' && styles.activeTabText]}>Liên hệ với</Text>
                </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {CONTACT_DATA.map((item) => {
                    const isExpanded = item.id === expandedId;
                    return (
                        <View key={item.id} style={styles.itemWrapper}>
                            <Pressable style={styles.itemHeader} onPress={() => handlePressItem(item.id)}>
                                {item.icon}
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <AntDesign
                                    name={isExpanded ? 'up' : 'down'}
                                    size={16}
                                    color={APP_COLOR.ORANGE}
                                />
                            </Pressable>
                            {isExpanded && (
                                <View style={styles.itemContent}>
                                    <Pressable onPress={() => handleLinkPress(item)}>
                                        <Text style={styles.linkText}>{item.content}</Text>
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FDEFE7',
        borderRadius: 25,
        marginVertical: 20,
        padding: 5,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    activeTabButton: {
        backgroundColor: APP_COLOR.ORANGE,
    },
    tabButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: APP_COLOR.ORANGE,
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    itemWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },
    itemTitle: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
    },
    itemContent: {
        paddingBottom: 20,
        paddingLeft: 39,
    },
    linkText: {
        color: '#888888',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});

export default ContactUs;