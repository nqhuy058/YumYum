import { filterRestaurantAPI, getUrlBaseBackend, likeRestaurantAPI } from "@/utils/api"; // ✅ 1. Thêm import likeRestaurantAPI
import { APP_COLOR } from "@/utils/constant";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCurrentApp } from "@/context/app.context"; 
import Toast from "react-native-root-toast";

const { width: screenWidth } = Dimensions.get('window');
const itemWidth = (screenWidth - 45) / 2;

const RestaurantsPage = () => {
    const [restaurants, setRestaurants] = useState<IRestaurants[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 20;
    const { appState } = useCurrentApp(); 

    useEffect(() => {
        const fetchData = async () => {
            const res = await filterRestaurantAPI(`current=${currentPage}&pageSize=${pageSize}`);
            const results = res?.data?.results;
            if (results) {
                if (currentPage === 1) {
                    setRestaurants(results);
                } else {
                    setRestaurants(prevRestaurants => {
                        const newItems = results.filter(
                            (newItem: IRestaurants) => !prevRestaurants.some(existingItem => existingItem._id === newItem._id)
                        );
                        return [...prevRestaurants, ...newItems];
                    });
                }
            }
        };
        fetchData();
    }, [currentPage]);

    const handleEndReached = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleToggleLike = async (restaurantId: string, isCurrentlyLiked: boolean) => {
        if (!appState?.user._id) {
            Toast.show("Vui lòng đăng nhập để thực hiện chức năng này.", { duration: Toast.durations.LONG });
            return;
        }

        // Cập nhật giao diện ngay lập tức để người dùng thấy phản hồi
        setRestaurants(prevRestaurants =>
            prevRestaurants.map(r =>
                r._id === restaurantId ? { ...r, isLike: !isCurrentlyLiked } : r
            )
        );

    
        const quantity = isCurrentlyLiked ? -1 : 1;
        const res = await likeRestaurantAPI(restaurantId, quantity);

      
        if (!res.data) {
            Toast.show("Đã có lỗi xảy ra. Vui lòng thử lại.", { duration: Toast.durations.LONG });
            setRestaurants(prevRestaurants =>
                prevRestaurants.map(r =>
                    r._id === restaurantId ? { ...r, isLike: isCurrentlyLiked } : r
                )
            );
        }
    };

    const renderRestaurantItem = ({ item }: { item: IRestaurants }) => (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
            ]}
            onPress={() => router.navigate({
                pathname: "/(user)/product/[id]",
                params: { id: item._id }
            })}
        >
            <View>
                <Image
                    source={{ uri: `${getUrlBaseBackend()}/images/restaurant/${item.image}` }}
                    style={styles.cardImage}
                />
                <View style={styles.iconTopLeft}>
                    <Ionicons name="restaurant-outline" size={16} color={APP_COLOR.ORANGE} />
                </View>

                
                <Pressable
                    style={styles.iconTopRight}
                    onPress={() => handleToggleLike(item._id, item.isLike)}
                    hitSlop={10} 
                >
                    <Ionicons
                        name={item.isLike ? "heart" : "heart-outline"}
                        size={16}
                        color={item.isLike ? "#FF453A" : "grey"} 
                    />
                </Pressable>
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>{item.address}</Text>
                <View style={styles.cardFooter}>
                    <View style={styles.rating}>
                        <Text style={styles.ratingText}>5.0</Text>
                        <FontAwesome name="star" size={12} color="#FFC107" />
                    </View>
                    <View style={styles.priceTag}>
                        <Text style={styles.priceText}>{item.email}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <FlatList
                    data={restaurants}
                    renderItem={renderRestaurantItem}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContentContainer}
                    ListHeaderComponent={
                        <Text style={styles.subtitle}>
                            Những cửa hàng hiện tại đang mở cửa
                        </Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: APP_COLOR.YELLOW_BASE,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    listContentContainer: {
        paddingHorizontal: 15,
        paddingBottom: 100, 
        gap: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: APP_COLOR.ORANGE,
        textAlign: 'center',
        marginVertical: 20,
    },
    card: {
        width: itemWidth,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 15,
        marginHorizontal: 7.5, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    iconTopLeft: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
        elevation: 5,
    },
    iconTopRight: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
        elevation: 5,
    },
    priceTag: {
        position: 'absolute',
        right: 2,
        backgroundColor: APP_COLOR.ORANGE,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 3,
        left: 50
    },
    priceText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDescription: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        minHeight: 30, 
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5E6',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 3,
    },
    ratingText: {
        marginRight: 4,
        color: APP_COLOR.ORANGE,
        fontWeight: 'bold',
        fontSize: 12,
    },
    cartIcon: {
        backgroundColor: APP_COLOR.ORANGE,
        borderRadius: 8,
        padding: 6,
    },
});


export default RestaurantsPage;