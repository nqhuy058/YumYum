import { Dimensions, Image, Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { useEffect, useRef, useState } from "react";
import { APP_COLOR } from "@/utils/constant";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        width: width - 40,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 15,
        overflow: "hidden",
        height: 160,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
    },
    banner: {
        flex: 1,
        position: "relative",
    },
    bannerImage: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        padding: 20,
        justifyContent: "center",
    },
    content: {
        gap: 8,
    },
    discount: {
        fontSize: 36,
        fontWeight: "700",
        color: "#fff",
        lineHeight: 40,
    },
    title: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
        lineHeight: 18,
    },
    carouselContainer: {
        width: "100%",
    },
    dotsContainer: {
        position: "absolute",
        bottom: 15,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        zIndex: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.5)",
    },
    activeDot: {
        backgroundColor: APP_COLOR.ORANGE,
        width: 30,
        
    },
});

interface IBannerItem {
    id: number;
    image: any;
}

interface IProps {
    onPress?: () => void;
    bannerImages?: any[];
}

const BannerHome = (props: IProps) => {
    const { onPress, bannerImages = [] } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const autoScrollTimer = useRef<number | null>(null);

    // Default banners nếu không có ảnh được truyền vào
    const defaultBanners: IBannerItem[] = [
        { id: 1, image: require("@/assets/banner/banner1.png") },
        { id: 2, image: require("@/assets/banner/banner2.png") },
        { id: 3, image: require("@/assets/banner/banner3.png") },
    ];

    const banners: IBannerItem[] = bannerImages.length > 0 
        ? bannerImages.map((img, idx) => ({ id: idx, image: img }))
        : defaultBanners;

    useEffect(() => {
        startAutoScroll();
        return () => {
            if (autoScrollTimer.current) {
                clearInterval(autoScrollTimer.current);
            }
        };
    }, [banners.length]);

    const startAutoScroll = () => {
        autoScrollTimer.current = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % banners.length;
                flatListRef.current?.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });
                return nextIndex;
            });
        }, 1500);
    };

    const handleMomentumScrollEnd = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentScrollPosition = contentOffsetX / (width - 40);
        const index = Math.round(currentScrollPosition);
        setCurrentIndex(index);

        if (autoScrollTimer.current) {
            clearInterval(autoScrollTimer.current);
        }
        startAutoScroll();
    };

    const renderBanner = ({ item }: { item: IBannerItem }) => (
        <Pressable
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.banner}>
                <Image
                    source={item.image}
                    style={styles.bannerImage}
                    resizeMode="cover"
                />
                <View style={styles.overlay}>
                    <View style={styles.content}>
                        <Text style={styles.discount}>30%</Text>
                        <Text style={styles.discount}>OFF</Text>
                        <Text style={styles.title}>
                          Chương trình khuyến mãi{"\n"}mừng khai trương
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );

    return (
        <View style={{ position: "relative", height: 200 }}>
            <FlatList
                ref={flatListRef}
                data={banners}
                renderItem={renderBanner}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                scrollEnabled
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                scrollEventThrottle={16}
                style={styles.carouselContainer}
                contentContainerStyle={{ paddingHorizontal: 0 }}
            />

            {/* Dots Indicator */}
            {banners.length > 1 && (
                <View style={styles.dotsContainer}>
                    {banners.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

export default BannerHome;