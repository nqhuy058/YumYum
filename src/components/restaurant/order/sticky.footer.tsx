import { Pressable, StyleSheet, Text, View } from "react-native"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

interface IProps {
    restaurant: IRestaurants | null;
}

const StickyFooter = (props: IProps) => {
    const { cart } = useCurrentApp();
    const { restaurant } = props;

    const restaurantCart = restaurant ? cart[restaurant._id] : null;

    if (!restaurantCart || restaurantCart.quantity === 0) {
        return null;
    }

    return (
     
        <Animated.View
            entering={SlideInDown.delay(100)}
            exiting={SlideOutDown}
            style={styles.container}
        >
        
            <View style={styles.cartInfo}>
                <View style={styles.basketContainer}>
                    <FontAwesome5 name="shopping-basket" size={28} color={APP_COLOR.ORANGE} />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {restaurantCart.quantity}
                        </Text>
                    </View>
                </View>
                <Text style={styles.priceText}>
                    {currencyFormatter(restaurantCart.sum)}
                </Text>
            </View>

            <Pressable
                style={styles.checkoutButton}
                onPress={() => router.navigate("/(user)/product/place.order")}
            >
                <Text style={styles.checkoutButtonText}>
                    Giao hàng
                </Text>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        
        zIndex: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cartInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    basketContainer: {
       
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -8,
        backgroundColor: APP_COLOR.ORANGE,
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    checkoutButton: {
        backgroundColor: APP_COLOR.ORANGE,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 10,
    },
    checkoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default StickyFooter;