import { currencyFormatter, getOrderHistoryAPI, getUrlBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Stack } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OrderStatus = 'Active' | 'Completed' | 'Cancelled';

const OrderPage = () => {
    const [orderHistory, setOrderHistory] = useState<IOrderHistory[]>([]);
    const [activeTab, setActiveTab] = useState<OrderStatus>('Completed'); // Bắt đầu ở tab Completed
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchOrderHistory = async () => {
            setIsLoading(true);
            try {
                const res = await getOrderHistoryAPI();
                if (res && res.data) {
                    setOrderHistory(res.data);
                }
            } catch (error) {
                console.error("Lỗi khi tải lịch sử đơn hàng:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchOrderHistory();
    }, []);

    // Hàm render nội dung chính dựa trên tab được chọn
    const renderBody = () => {
        // 1. Hiển thị loading indicator
        if (isLoading) {
            return <ActivityIndicator style={{ marginTop: 50 }} size="large" color={APP_COLOR.ORANGE} />;
        }

        // 2. Hiển thị nội dung cho từng tab
        switch (activeTab) {
            case 'Active':
                return (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Không có đơn hàng nào đang xử lí.</Text>
                    </View>
                );
            case 'Cancelled':
                return (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Không có đơn hàng nào bị hủy.</Text>
                    </View>
                );
            case 'Completed':
                // Nếu không có dữ liệu, cũng hiển thị thông báo
                if (orderHistory.length === 0) {
                    return (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No completed orders found.</Text>
                        </View>
                    );
                }
                // Nếu có dữ liệu, hiển thị danh sách
                return (
                    <ScrollView>
                        {orderHistory.map((item) => (
                            <View key={item._id}>
                                <View style={styles.completedCard}>
                                    <Image
                                        source={{ uri: `${getUrlBaseBackend()}/images/restaurant/${item.restaurant?.image}` }}
                                        style={styles.completedImage}
                                    />

                                    <View style={styles.completedContent}>
                                        <View style={styles.row}>
                                            <Text style={styles.completedTitle}>{item.restaurant.name}</Text>
                                            <Text style={styles.completedTotal}>{currencyFormatter(item.totalPrice)}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.completedText}>{item.restaurant.address}</Text>
                                            <Text style={styles.completedQuantity}>{item.totalQuantity} món</Text>
                                        </View>
                                        <Text style={[styles.completedText, { color: 'green', fontWeight: '500', marginTop: 'auto' }]}>
                                            Trạng thái: {item.status}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.separator}></View>
                            </View>
                        ))}
                    </ScrollView>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.background}>
                <View style={styles.container}>
                    {/* Giao diện các Tab */}
                    <View style={styles.tabContainer}>
                        {(['Active', 'Completed', 'Cancelled'] as OrderStatus[]).map((tab) => (
                            <Pressable key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
                                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                            </Pressable>
                        ))}
                    </View>

                    {renderBody()}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: APP_COLOR.YELLOW_BASE
    },

    background: {
        flex: 1,
        backgroundColor: APP_COLOR.YELLOW_BASE
    },

    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20
    },

    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
        paddingHorizontal: 20,
        marginBottom: 20
    },

    tab: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#FFF1E8'
    },

    activeTab: {
        backgroundColor: APP_COLOR.ORANGE
    },

    tabText: {
        color: APP_COLOR.ORANGE,
        fontWeight: '600'
    },

    activeTabText: {
        color: 'white'
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50
    },

    emptyText: {
        fontSize: 16,
        color: 'gray'
    },

    completedCard: {
        padding: 10,
        flexDirection: "row",
        gap: 10,
        backgroundColor: '#f8f8f8'
    },

    completedImage: {
        height: 108,
        width: 80,
        borderRadius: 20
    },

    completedContent: {
        flex: 1,
        justifyContent: 'space-between', 
        marginTop: 10,
        gap: 10
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    completedTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1, 
        marginRight: 8, 
    },

    completedText: {
        fontSize: 14,
        color: '#666',
        flex: 1, 
        marginRight: 8,
    },

    completedTotal: {
        fontSize: 20,
        fontWeight: 'bold',
        color: APP_COLOR.ORANGE,
    },

    completedQuantity: {
        fontSize: 14,
        color: '#666',
        textAlign: 'right', 
    },

    separator: {
        height: 10,
        backgroundColor: "#eee"
    }
});

export default React.memo(OrderPage);