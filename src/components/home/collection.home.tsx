import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Platform,
    Pressable,
    Dimensions,
} from "react-native";
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { getTopRestaurants } from "@/utils/api";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { height: sHeight, width: sWidth } = Dimensions.get("window");

interface IProps {
    name: string;
    description: string;
    refAPI: string;
}

const styles = StyleSheet.create({
    divider: {
        height: 10,
        backgroundColor: "#f0f0f0",
    },
    container: {
        paddingVertical: 15,
        backgroundColor: "#fff",
    },
    contentPadding: {
        paddingHorizontal: 20,
    },
    headerContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        color: "#333",
        fontSize: 18,
        fontWeight: "700",
    },
    viewAllContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        color: "#5a5a5a",
        fontSize: 13,
        fontWeight: "600",
    },
    descriptionText: {
        color: "#888",
        fontSize: 13,
        marginVertical: 12,
        lineHeight: 18,
    },
    flatListContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    cardContainer: {
        marginRight: 12,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#fff",
        width: 140,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        flex: 1,
    },
    cardImage: {
        height: 140,
        width: "100%",
        backgroundColor: "#f0f0f0",
    },
    cardContent: {
        padding: 10,
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "space-between",
    },
    cardNameContainer: {
        height: 40,
        justifyContent: "flex-start",
        marginBottom: 8,
    },
    cardName: {
        fontWeight: "600",
        fontSize: 12,
        color: "#333",
        lineHeight: 14,
    },
    badgeContainer: {
        borderWidth: 1,
        borderColor: APP_COLOR.ORANGE,
        borderRadius: 3,
        alignItems: "flex-start",
        paddingHorizontal: 6,
        paddingVertical: 3,
        alignSelf: "flex-start",
    },
    badgeText: {
        color: APP_COLOR.ORANGE,
        fontSize: 10,
        fontWeight: "600",
    },
    loadingContainer: {
        paddingVertical: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    skeletonCard: {
        width: 140,
        height: 190,
        backgroundColor: "#e9e9e9",
        borderRadius: 12,
        marginRight: 12,
    },
});

const CollectionHome = (props: IProps) => {
    const { name, description, refAPI } = props;
    const [restaurants, setRestaurants] = useState<ITopRestaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getTopRestaurants(refAPI);
                // console.log("API Response for", refAPI, ":", res);
                
                if (res.data) {
                    if (Array.isArray(res.data)) {
                        setRestaurants(res.data);
                    } else if (res.data && Array.isArray(res.data)) {
                        setRestaurants(res.data);
                    } else if (res.data) {
                        setRestaurants(res.data);
                    }
                }
            } catch (error) {
                console.log("Error fetching restaurants:", error);
            }
            setLoading(false);
        };
        fetchData();
    }, [refAPI]);

    const backend =
        Platform.OS === "android"
            ? process.env.EXPO_PUBLIC_ANDROID_API_URL
            : process.env.EXPO_PUBLIC_IOS_API_URL;

    const baseImage = `${backend}/images/restaurant`;

    return (
        <>
            <View style={styles.divider} />
            <View style={styles.container}>
                {loading === false ? (
                    <>
                        {/* Header */}
                        <View style={[styles.headerContainer, styles.contentPadding]}>
                            <Text style={styles.title}>{name}</Text>
                            <Pressable
                                onPress={() => router.navigate("/(drawer)/(tabs)/restaurants" as any)}
                                style={styles.viewAllContainer}
                            >
                                <Text style={styles.viewAllText}>Xem tất cả</Text>
                                <MaterialIcons
                                    style={{ marginTop: 3 }}
                                    name="navigate-next"
                                    size={20}
                                    color="#888"
                                />
                            </Pressable>
                        </View>

                        {/* Description */}
                        <Text style={[styles.descriptionText, styles.contentPadding]}>
                            {description}
                        </Text>

                        {/* FlatList */}
                        {restaurants && restaurants.length > 0 ? (
                            <FlatList
                                data={restaurants}
                                horizontal
                                scrollEnabled={true}
                                contentContainerStyle={styles.flatListContainer}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => {
                                    return (
                                        <Pressable
                                            onPress={() =>
                                                router.navigate({
                                                    pathname: "/(user)/product/[id]",
                                                    params: { id: item._id },
                                                })
                                            }
                                            style={styles.cardContainer}
                                        >
                                            <View style={styles.card}>
                                                <Image
                                                    style={styles.cardImage}
                                                    source={{
                                                        uri: `${baseImage}/${item.image}`,
                                                    }}
                                                    resizeMode="cover"
                                                />
                                                <View style={styles.cardContent}>
                                                    <View style={styles.cardNameContainer}>
                                                        <Text
                                                            numberOfLines={2}
                                                            ellipsizeMode="tail"
                                                            style={styles.cardName}
                                                        >
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.badgeContainer}>
                                                        <Text style={styles.badgeText}>
                                                            Flash sale
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </Pressable>
                                    );
                                }}
                            />
                        ) : (
                            <View style={styles.loadingContainer}>
                                <Text style={{ color: "#999" }}>No restaurants found</Text>
                            </View>
                        )}
                    </>
                ) : (
                    <>
                        {/* Loading Header */}
                        <View style={[styles.headerContainer, styles.contentPadding]}>
                            <View style={{ width: 120, height: 20, backgroundColor: "#e9e9e9", borderRadius: 6 }} />
                        </View>

                        {/* Loading Description */}
                        <View style={[styles.contentPadding, { marginBottom: 12 }]}>
                            <View style={{ width: "100%", height: 14, backgroundColor: "#e9e9e9", borderRadius: 6, marginBottom: 6 }} />
                            <View style={{ width: "80%", height: 14, backgroundColor: "#e9e9e9", borderRadius: 6 }} />
                        </View>

                        {/* Loading Skeleton */}
                        <View style={{ flexDirection: "row", paddingLeft: 20, paddingRight: 20 }}>
                            <View style={styles.skeletonCard} />
                            <View style={styles.skeletonCard} />
                            <View style={styles.skeletonCard} />
                        </View>
                    </>
                )}
            </View>
        </>
    );
};

export default CollectionHome;