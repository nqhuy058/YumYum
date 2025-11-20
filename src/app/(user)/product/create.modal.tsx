import ItemSingle from "@/components/restaurant/order/item.single";
import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

const CreateModalPage = () => {

    // --- TOÀN BỘ LOGIC CỦA BẠN ĐƯỢC GIỮ NGUYÊN ---
    const { restaurant, cart, setCart } = useCurrentApp();
    const { menuItemId } = useLocalSearchParams();
    const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

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
    }, [restaurant, menuItemId])

    const handlePressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
        if (action === "MINUS" && quantity === 1) return;
        const total = action === "MINUS" ? -1 : 1;
        setQuantity((prevQuantity: number) => prevQuantity + total)
    }

    const handleAddCart = () => {
        if (restaurant?._id && menuItem) {
            const total = quantity;
            const item = menuItem;
            const option = menuItem.options[selectedIndex];
            const keyOption = `${option.title}-${option.description}`;
            if (!cart[restaurant?._id]) {
                cart[restaurant._id] = {
                    sum: 0,
                    quantity: 0,
                    items: {}
                }
            }
            cart[restaurant._id].sum = cart[restaurant._id].sum + total * (item.basePrice + option.additionalPrice);
            cart[restaurant._id].quantity = cart[restaurant._id].quantity + total;
            if (!cart[restaurant._id].items[item._id]) {
                cart[restaurant._id].items[item._id] = {
                    data: menuItem,
                    quantity: 0,
                    extra: {
                        [keyOption]: 0
                    }
                };
            }
            if (cart[restaurant._id].items[item._id]) {
                const extra = cart[restaurant._id].items[item._id].extra;
                if (extra && !extra[keyOption]) {
                    cart[restaurant._id].items[item._id] = {
                        ...cart[restaurant._id].items[item._id],
                        extra: {
                            ...cart[restaurant._id].items[item._id].extra,
                            [keyOption]: 0
                        }
                    }
                }
            }
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
            if (currentQuantity <= 0) {
                delete cart[restaurant._id].items[item._id];
            }
            setCart((prevState: any) => ({ ...prevState, ...cart }))
            router.back()
        }
    }
    // --- KẾT THÚC PHẦN LOGIC ---

    const finalPrice = (menuItem?.basePrice ?? 0) + (menuItem?.options[selectedIndex]?.additionalPrice ?? 0);

    return (
        <Animated.View entering={FadeIn} style={styles.overlay}>
            <Pressable onPress={() => router.back()} style={StyleSheet.absoluteFill} />

            <Animated.View
                entering={SlideInDown}
                style={styles.modalContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Thêm món mới</Text>
                    <Pressable onPress={() => router.back()} style={styles.closeButton}>
                        <AntDesign name="close" size={24} color="grey" />
                    </Pressable>
                </View>

                {/* Item Info */}
                <View style={styles.itemSection}>
                    {menuItem &&
                        <ItemSingle
                            menuItem={menuItem}
                            showMinus={true}
                            quantity={quantity}
                            handlePressItem={handlePressItem}
                        />
                    }
                </View>

                {/* Options Section */}
                <View style={styles.optionsHeader}>
                    <Text style={styles.optionsHeaderText}>Lựa chọn (chọn 1)</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    {menuItem?.options?.map((item, index) => (
                        <Pressable key={index} onPress={() => setSelectedIndex(index)} style={styles.optionItem}>
                            <View style={{ flex: 1, gap: 5 }}>
                                <Text style={styles.optionTitle}>{item.title} - {item.description}</Text>
                                <Text style={styles.optionPrice}>
                                    +{currencyFormatter(item.additionalPrice)}
                                </Text>
                            </View>
                            <View style={[styles.radioOuter, index === selectedIndex && styles.radioOuterSelected]}>
                                {index === selectedIndex && <View style={styles.radioInner} />}
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Footer Button */}
                <View style={styles.footer}>
                    <Pressable onPress={handleAddCart} style={styles.addButton}>
                        <Text style={styles.addButtonText}>
                            Thêm vào giỏ - {currencyFormatter(finalPrice * quantity)}
                        </Text>
                    </Pressable>
                </View>
            </Animated.View>
        </Animated.View>
    );
}

// ✅ Toàn bộ giao diện được tối ưu với StyleSheet
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#00000060',
    },
    modalContainer: {
        height: '80%',
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
    itemSection: {
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0"
    },
    optionsHeader: {
        backgroundColor: "#f7f7f7",
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    optionsHeaderText: {
        fontWeight: '500',
        color: '#555'
    },
    scrollView: {
        flex: 1,
    },
    optionItem: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        flexDirection: "row",
        alignItems: 'center'
    },
    optionTitle: {
        fontSize: 16,
        color: '#333'
    },
    optionPrice: {
        color: APP_COLOR.ORANGE,
        fontWeight: '500'
    },
    radioOuter: {
        height: 22,
        width: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioOuterSelected: {
        borderColor: APP_COLOR.ORANGE
    },
    radioInner: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: APP_COLOR.ORANGE
    },
    footer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: 'white'
    },
    addButton: {
        padding: 15,
        backgroundColor: APP_COLOR.ORANGE,
        borderRadius: 10,
        alignItems: 'center'
    },
    addButtonText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default CreateModalPage;