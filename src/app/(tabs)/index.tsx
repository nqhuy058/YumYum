import {
    View,
    StyleSheet,
    ScrollView,
    Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLOR } from "@/utils/constant";
import SearchBar from "@/components/search/searchbar";
import Header from "@/components/search/header";
import MenuHome from "@/components/home/menu.home";
import BannerHome from "@/components/home/banner.home";
import CollectionHome from "@/components/home/collection.home";
import bannerImage from "@/assets/banner/banner2.png";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: APP_COLOR.YELLOW_BASE,
    },
    header: {
        backgroundColor: APP_COLOR.YELLOW_BASE,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 8,
        justifyContent: "flex-end",
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 90,
    },
    greeting: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    greetingTitle: {
        fontSize: 26,
        fontWeight: "700",
        color: "#333",
        marginBottom: 3,
    },
    greetingSubtitle: {
        fontSize: 13,
        color: APP_COLOR.ORANGE,
        fontWeight: "600",
    },
});

const collectionData = [
    {
        key: 1,
        name: "Best Seller",
        description: "Gợi ý những quán được yêu thích nhất",
        refAPI: "top-freeship"
    },
    {
        key: 2,
        name: "Recommend",
        description: "Những quán được khuyến nghị dành riêng cho bạn",
        refAPI: "newcomer"
    },
    {
        key: 3,
        name: "Top Rating",
        description: "Những quán được đánh giá 5* cao nhất",
        refAPI: "top-rating"
    },
];

const HomePage = () => {
    return (
        <SafeAreaView style={styles.wrapper}>
            {/* Header with Icons */}
            <View style={styles.header}>
                <Header cartCount={2} />
                 <SearchBar />

            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.contentContainer}
            >
                {/* Search Bar */}
               
                {/* Greeting Section */}
                <View style={styles.greeting}>
                    <Text style={styles.greetingTitle}>Xin chào bạn</Text>
                    <Text style={styles.greetingSubtitle}>
                        Chúc bạn tìm được những món ăn yêu thích
                    </Text>
                </View>

                {/* Menu Categories */}
                <MenuHome
                    onSelectMenu={(menu) => {
                        console.log("Selected menu:", menu);
                    }}
                />

                {/* Banner */}
                <BannerHome
                    bannerImages={[
                        require("@/assets/banner/banner1.png"),
                        require("@/assets/banner/banner2.png"),
                        require("@/assets/banner/banner3.png"),
                    ]}
                    onPress={() => {
                        console.log("Banner pressed");
                    }}
                />

                {/* Collections */}
                {collectionData.map((item) => (
                    <CollectionHome
                        key={item.key}
                        name={item.name}
                        description={item.description}
                        refAPI={item.refAPI}
                    />
                ))}

                <View style={{ height: 20 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomePage;