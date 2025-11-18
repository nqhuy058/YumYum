import {
    getFavoriteRestaurantAPI,
    getUrlBaseBackend
} from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Dimensions, FlatList,
    Image, Pressable, RefreshControl,
    StyleSheet, Text, View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get('window');
const itemWidth = (screenWidth - 45) / 2;

const FavoritePage = () => {
    const [favoriteRestaurant, setFavoriteRestaurant] = useState<IRestaurants[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const fetchRestaurants = async () => {
        const res = await getFavoriteRestaurantAPI();
        if (res.data) setFavoriteRestaurant(res.data)
    }
    useEffect(() => {
        fetchRestaurants();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchRestaurants();
        setRefreshing(false);
    }

    // Component render mỗi sản phẩm trong lưới
    const renderFavoriteItem = ({ item }: { item: IRestaurants }) => (
        <Pressable
            style={styles.card}
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
                <View style={styles.iconTopRight}>
                    <Ionicons name="heart" size={16} color={"#FF453A"} />
                </View>
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.cardDescription} numberOfLines={1}>
                   {item.address}
                </Text>
                <Text style={styles.phone} numberOfLines={1}>
                   {`Liên hệ sđt: ${item.phone}`}
                </Text>
            </View>
        </Pressable>
    );

    // Component hiển thị khi danh sách trống
    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Bạn chưa có cửa hàng yêu thích nào.</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Nội dung chính */}
            <View style={styles.container}>
                <FlatList
                    data={favoriteRestaurant}
                    renderItem={renderFavoriteItem}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContentContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={APP_COLOR.ORANGE}
                        />
                    }
                    ListHeaderComponent={
                        <Text style={styles.subtitle}>
                            Cùng khám phá những cửa hàng bạn yêu thích nhé!
                        </Text>
                    }
                    ListEmptyComponent={renderEmptyComponent}
                />
            </View>
        </SafeAreaView>
    )
}

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
        paddingHorizontal: 7.5, // 15/2
        paddingBottom: 100,
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
        margin: 7.5,
        alignItems: 'center',
    },
    cardImage: {
        width: itemWidth,
        height: itemWidth,
        borderRadius: 20,
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
    cardContent: {
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: APP_COLOR.ORANGE,
    },
    cardDescription: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },

    phone: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default FavoritePage;