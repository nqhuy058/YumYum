import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
// ✅ 1. Cập nhật import animation
import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter, getUrlBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from "react";
import Animated, { FadeIn, SlideInUp, SlideOutDown } from "react-native-reanimated";

// ... (Interface IUpdatedItem và logic giữ nguyên) ...
interface IUpdatedItem {
    image: string;
    title: string;
    option: string;
    price: number;
    quantity: number
}

const UpdateModalPage = () => {
    // --- TOÀN BỘ LOGIC CỦA BẠN ĐƯỢC GIỮ NGUYÊN ---
    const { restaurant, cart, setCart } = useCurrentApp();
    const { menuItemId } = useLocalSearchParams();
    const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);
    const [updatedItems, setUpdatedItems] = useState<IUpdatedItem[]>([]);

    useEffect(() => {
        if (restaurant && menuItemId) {
            for (let i = 0; i < restaurant.menu.length; i++) {
                const menu = restaurant.menu[i];
                let check = false;
                for (let j = 0; j < menu.menuItem.length; j++) {
                    if (menu.menuItem[j]._id === menuItemId) {
                        check = true;
                        setMenuItem(menu.menuItem[j]);
                        break;
                    }
                }
                if (check) break;
            }
        }
    }, [restaurant, menuItemId]);

    useEffect(() => {
        if (menuItem && restaurant) {
            const currentItems = cart[restaurant._id].items[menuItem._id];
            if (currentItems.extra) {
                const result = [];
                for (const [key, value] of Object.entries(currentItems.extra)) {
                    const option = menuItem.options?.find(
                        item => `${item.title}-${item.description}` === key
                    );
                    const addPrice = option?.additionalPrice ?? 0;
                    result.push({
                        image: menuItem.image,
                        title: menuItem.title,
                        option: key,
                        price: menuItem.basePrice + addPrice,
                        quantity: value
                    })
                }
                setUpdatedItems(result)
            }
        }
    }, [menuItem])

    const handlePressItem = (item: IUpdatedItem, action: "MINUS" | "PLUS") => {
        let foundItem = updatedItems.find(x => x.option === item.option);
        const foundIndex = updatedItems.findIndex(x => x.option === item.option);
        let shouldCloseModal = false;

        if (foundItem) {
            const total = action === "MINUS" ? -1 : 1;
            foundItem.quantity = foundItem.quantity + total;
            if (foundItem.quantity === 0) {
                const temp = updatedItems.filter(x => x.option !== item.option)
                setUpdatedItems(temp);
                if (temp.length === 0) shouldCloseModal = true;
            }
            else {
                const temp = [...updatedItems];
                temp[foundIndex] = foundItem
                setUpdatedItems(temp)
            }
            updateCart(total, foundItem.option, foundItem.price);
            if (shouldCloseModal) router.back();
        }
    }

    const updateCart = (total: number, keyOption: string, price: number) => {
        if (restaurant?._id && menuItem) {
            const item = menuItem;
            cart[restaurant._id].sum = cart[restaurant._id].sum + total * price;
            cart[restaurant._id].quantity = cart[restaurant._id].quantity + total;
            const currentQuantity = cart[restaurant._id].items[item._id].quantity + total;
            const i = cart[restaurant._id].items[item._id];
            let currentExtraQuantity = 0;
            if (i.extra && i.extra?.[keyOption] !== null)
                currentExtraQuantity = i.extra[keyOption] + total;

            cart[restaurant._id].items[item._id] = {
                data: menuItem,
                quantity: currentQuantity,
                extra: {
                    ...cart[restaurant._id].items[item._id].extra,
                    [keyOption]: currentExtraQuantity
                }
            };
            if (currentExtraQuantity <= 0) {
                delete cart[restaurant._id].items[item._id].extra?.[keyOption]
            }
            if (currentQuantity <= 0 && updatedItems.length === 1) {
                delete cart[restaurant._id].items[item._id];
            }
            setCart((prevState: any) => ({ ...prevState, ...cart }));
        }
    }
    // --- KẾT THÚC PHẦN LOGIC ---

    return (
        <Animated.View entering={FadeIn} style={styles.overlay}>
            <Pressable onPress={() => router.back()} style={StyleSheet.absoluteFill} />

            <Animated.View
                // ✅ 2. Cập nhật animation
                // entering={SlideInUp.springify().damping(15)}
                exiting={SlideOutDown}
                style={styles.modalContainer}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Chỉnh sửa số lượng</Text>
                    <Pressable onPress={() => router.back()} style={styles.closeButton}>
                        <AntDesign name="close" size={24} color="grey" />
                    </Pressable>
                </View>

                {/* Item List */}
                <ScrollView style={styles.scrollView}>
                    {updatedItems.map((item, index) => (
                        <View key={index} style={styles.itemCard}>
                            <Image
                                style={styles.itemImage}
                                source={{ uri: `${getUrlBaseBackend()}/images/menu-item/${item?.image}` }}
                            />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemTitle}>{item?.title}</Text>
                                <Text style={styles.itemOption}>{item?.option}</Text>
                                <View style={styles.footerRow}>
                                    <Text style={styles.itemPrice}>{currencyFormatter(item?.price)}</Text>
                                    <View style={styles.quantityControl}>
                                        <Pressable onPress={() => handlePressItem(item, "MINUS")}>
                                            <AntDesign name="minus-square" size={28} color={APP_COLOR.ORANGE} />
                                        </Pressable>
                                        <Text style={styles.quantityText}>{item.quantity}</Text>
                                        <Pressable onPress={() => handlePressItem(item, "PLUS")}>
                                            <AntDesign name="plus-square" size={28} color={APP_COLOR.ORANGE} />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </Animated.View>
        </Animated.View>
    );
}

// ✅ 3. Toàn bộ giao diện được tối ưu với StyleSheet
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#00000060',
    },
    modalContainer: {
        height: '60%',
        width: "100%",
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    headerTitle: {
        flex: 1,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 18
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        top: 15
    },
    scrollView: {
        flex: 1,
    },
    itemCard: {
        flexDirection: "row",
        padding: 15,
        borderBottomColor: "#f0f0f0",
        borderBottomWidth: 1
    },
    itemImage: {
        height: 80,
        width: 80,
        borderRadius: 10
    },
    itemDetails: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between'
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '500'
    },
    itemOption: {
        color: 'grey',
        fontSize: 14
    },
    footerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },
    itemPrice: {
        color: APP_COLOR.ORANGE,
        fontWeight: 'bold',
        fontSize: 16
    },
    quantityControl: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    quantityText: {
        minWidth: 25,
        textAlign: "center",
        fontSize: 16,
        fontWeight: '500'
    }
});

export default UpdateModalPage;