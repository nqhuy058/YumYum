import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter, getUrlBaseBackend, placeOrderAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

interface IOrderItem {
    image: string;
    title: string;
    option: string;
    price: number;
    quantity: number
}

const PlaceOrder = () => {
    const { restaurant, cart, setCart, appState } = useCurrentApp();
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
    const [paymentMethod, setPaymentMethod] = useState('Tiền mặt');
    const [orderSuccess, setOrderSuccess] = useState(false);

    // ✅ SỬA LỖI: Tạo biến để lấy giỏ hàng của nhà hàng hiện tại một cách an toàn
    const restaurantCart = restaurant ? cart?.[restaurant._id] : null;

    useEffect(() => {
        // ✅ SỬA LỖI: Thêm điều kiện kiểm tra `restaurantCart` tồn tại
        if (restaurantCart) {
            const result = [];
            for (const [menuItemId, currentItems]
                of Object.entries(restaurantCart.items)
            ) {
                if (currentItems.extra) {
                    for (const [key, value] of Object.entries(currentItems.extra)) {
                        const option = currentItems.data.options?.find(
                            item => `${item.title}-${item.description}` === key
                        );
                        const addPrice = option?.additionalPrice ?? 0;
                        result.push({
                            image: currentItems.data.image,
                            title: currentItems.data.title,
                            option: key,
                            price: currentItems.data.basePrice + addPrice,
                            quantity: value
                        })
                    }
                } else {
                    result.push({
                        image: currentItems.data.image,
                        title: currentItems.data.title,
                        option: "",
                        price: currentItems.data.basePrice,
                        quantity: currentItems.quantity
                    })
                }
                setOrderItems(result);
            }
        }
    }, [restaurant, cart]) // Thêm `cart` vào dependency array để cập nhật khi giỏ hàng thay đổi

    useEffect(() => {
        if (orderSuccess) {
            router.replace("/");
        }
    }, [orderSuccess]);

    const handlePlaceOrder = async () => {
        const data = {
            restaurant: restaurant?._id,
            // ✅ SỬA LỖI: Sử dụng restaurantCart và cung cấp giá trị mặc định
            totalPrice: restaurantCart?.sum ?? 0,
            totalQuantity: restaurantCart?.quantity ?? 0,
            detail: orderItems
        }
        const res = await placeOrderAPI(data);
        if (res.data) {
            Toast.show("Đặt hàng thành công", {
                duration: Toast.durations.SHORT,
                textColor: "white",
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1,
            });
            if (restaurant) {
                delete cart[restaurant._id];
                setCart((prevCart: any) => ({ ...prevCart, ...cart }));
            }
            setOrderSuccess(true);
        } else {
            const m = Array.isArray(res.message)
                ? res.message[0]
                : res.message
            Toast.show(m, {
                duration: Toast.durations.SHORT,
                textColor: "white",
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1,
            });
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} hitSlop={10}>
                    <Ionicons name="chevron-back" size={28} color={APP_COLOR.ORANGE} />
                </Pressable>
                <Text style={styles.headerTitle}>Xác nhận đơn hàng</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Giao từ</Text>
                    <Text style={styles.restaurantName}>{restaurant?.name}</Text>
                    <Text style={styles.restaurantAddress}>{restaurant?.address}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Giao đến</Text>
                    <Text style={styles.restaurantName}>{appState?.user?.name}</Text>
                    <Text style={styles.restaurantAddress}>{appState?.user?.address}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Các món đã chọn</Text>
                    {orderItems?.map((item, index) => (
                        <View key={index} style={styles.orderItem}>
                            <Image style={styles.itemImage} source={{ uri: `${getUrlBaseBackend()}/images/menu-item/${item?.image}` }} />
                            <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                {item.option && <Text style={styles.itemOption}>{item.option}</Text>}
                            </View>
                            <Text style={styles.itemPrice}>{currencyFormatter(item.price * item.quantity)}</Text>
                        </View>
                    ))}
                </View>

                {orderItems?.length > 0 &&
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Tổng cộng</Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tạm tính ({restaurantCart?.quantity ?? 0} món)</Text>
                            <Text style={styles.summaryValue}>{currencyFormatter(restaurantCart?.sum ?? 0)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Phí giao hàng</Text>
                            <Text style={styles.summaryValue}>{currencyFormatter(0)}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Thành tiền</Text>
                            <Text style={styles.totalValue}>{currencyFormatter(restaurantCart?.sum ?? 0)}</Text>
                        </View>
                    </View>
                }

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Phương thức thanh toán</Text>
                    <View style={styles.paymentContainer}>
                        <Pressable
                            onPress={() => setPaymentMethod('PayPal')}
                            style={[styles.paymentButton, paymentMethod === 'PayPal' && styles.paymentButtonSelected]}
                        >
                            <Text style={[styles.paymentText, paymentMethod === 'PayPal' && styles.paymentTextSelected]}>Ví PayPal</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setPaymentMethod('Tiền mặt')}
                            style={[styles.paymentButton, paymentMethod === 'Tiền mặt' && styles.paymentButtonSelected]}
                        >
                            <Text style={[styles.paymentText, paymentMethod === 'Tiền mặt' && styles.paymentTextSelected]}>Tiền mặt</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable
                    onPress={handlePlaceOrder}
                    disabled={!restaurantCart || restaurantCart.quantity === 0}
                    style={[styles.placeOrderButton, (!restaurantCart || restaurantCart.quantity === 0) && styles.disabledButton]}
                >
                    <Text style={styles.placeOrderButtonText}>
                        Đặt đơn - {currencyFormatter(restaurantCart?.sum ?? 0)}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15, backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '600'
    },

    scrollView: {
        flex: 1
    },

    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 15,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: APP_COLOR.ORANGE
    },

    restaurantName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333'
    },

    restaurantAddress: {
        fontSize: 14,
        color: 'grey',
        marginTop: 5
    },

    orderItem: {
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: "#f0f0f0",
        borderBottomWidth: 1,
    },

    itemImage: {
        height: 50,
        width: 50,
        borderRadius: 8
    },

    itemQuantity: {
        fontWeight: "bold",
        marginHorizontal: 10
    },

    itemDetails: {
        flex: 1,
        gap: 5
    },

    itemTitle: {
        fontSize: 15
    },

    itemOption: {
        fontSize: 13,
        color: 'grey'
    },

    itemPrice: {
        fontWeight: '500'
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5
    },

    summaryLabel: {
        color: 'grey'
    },

    summaryValue: {},

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
        marginTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0'
    },

    totalLabel: {
        fontWeight: 'bold'
    },

    totalValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: APP_COLOR.ORANGE
    },

    paymentContainer: {
        flexDirection: "row",
        gap: 10
    },

    paymentButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center'
    },

    paymentButtonSelected: {
        borderColor: APP_COLOR.ORANGE,
        backgroundColor: '#FFF5E6'
    },

    paymentText: {
        color: '#555'
    },

    paymentTextSelected: {
        color: APP_COLOR.ORANGE,
        fontWeight: 'bold'
    },

    footer: {
        padding: 15,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },

    placeOrderButton: {
        padding: 15,
        backgroundColor: APP_COLOR.ORANGE,
        borderRadius: 10,
        alignItems: 'center'
    },

    disabledButton: {
        backgroundColor: '#cccccc',
    },

    placeOrderButtonText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 16
    },
});


export default PlaceOrder;