import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { Dimensions, Pressable, StyleSheet, TextInput, View, Platform } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCurrentApp } from "@/context/app.context";
import { likeRestaurantAPI } from "@/utils/api";
import Toast from "react-native-root-toast"
import { useEffect, useState } from "react";


const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons)
const { height: sHeight, width: sWidth } = Dimensions.get('window');


interface IProps {
    headerHeight: number;
    imageHeight: number;

    animatedBackgroundStyle: any;
    animatedArrowColorStyle: any;
    animatedStickyHeaderStyle: any;
    animatedHeartIconStyle: any;
}

const StickyHeader = (props: IProps) => {
    const insets = useSafeAreaInsets();
    const {
        headerHeight, imageHeight,
        animatedBackgroundStyle,
        animatedArrowColorStyle, animatedStickyHeaderStyle,
        animatedHeartIconStyle
    } = props;

    const [like, setLike] = useState<boolean>(false);
    const { restaurant, appState } = useCurrentApp();

    useEffect(() => {
        if (restaurant) {
            setLike(restaurant.isLike);
        }
    }, [restaurant])

    const handleLikeRestaurant = async () => {
        //chỉ thực hiện khi user đã đăng nhập
        if (appState?.user._id && restaurant) {
            //lấy phủ định
            const quantity = like === true ? -1 : 1;
            const res = await likeRestaurantAPI(
                restaurant?._id, quantity
            )
            if (res.data) {
                //success 
                setLike(!like);
            } else {
                const m = Array.isArray(res.message)
                    ? res.message[0] : res.message;

                Toast.show(m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1
                });
            }
        }
    }

    return (
        <>
            <View style={{
                zIndex: 11,
                paddingTop: insets.top + 10,
                paddingHorizontal: 10,
                height: headerHeight,
                position: "absolute",
                width: sWidth,
            }}>

                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }}>
                    <Pressable
                        style={({ pressed }) => ([{
                            opacity: pressed === true ? 0.5 : 1,
                        }])}
                        onPress={() => router.back()}>
                        <Animated.View
                            style={[animatedBackgroundStyle, styles.backButtonCircle]}
                        >
                            <AnimatedMaterialIcons
                                name="arrow-back" size={24}
                                style={animatedArrowColorStyle}
                            />
                        </Animated.View>
                    </Pressable>

                    {/*Thanh tìm kiếm */}
                    <Animated.View style={[{ flex: 1 }, animatedStickyHeaderStyle]}>
                        <View style={styles.searchContainer}>
                            <MaterialIcons name="search" size={22} color="#888" style={styles.searchIcon} />
                            <TextInput
                                placeholder={"Tìm món ăn tại cửa hàng..."}
                                placeholderTextColor="#888"
                                style={styles.searchInput}
                            />
                        </View>
                    </Animated.View>
                </View>
            </View>

            {/* background */}
            <Animated.View style={[{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                height: headerHeight,
                backgroundColor: 'white',
            }, animatedStickyHeaderStyle]} />

            {/* like/dislike a restaurant */}
            <Animated.View style={[{
                position: 'absolute',
                top: imageHeight + 80,
                right: 10,
                zIndex: 9,
            }, animatedHeartIconStyle]}>
                <MaterialIcons
                    onPress={handleLikeRestaurant}
                    name={like === true ?
                        "favorite" : "favorite-outline"
                    }
                    size={20}
                    color={like === true ? APP_COLOR.ORANGE : APP_COLOR.GREY}
                />
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    backButtonCircle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', 
        borderRadius: 10,        
        paddingHorizontal: 12,
        height: 40,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#333',
    },
});


export default StickyHeader;