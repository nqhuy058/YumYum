import { getRestaurantByNameAPI, getUrlBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import debounce from "debounce";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const popularSearches = [
   { key: 1, name: "Quán Tiền Bối", source: require("@/assets/icons/noodles.png") },
    { key: 2, name: "Bún, Mì, Phở", source: require("@/assets/icons/bun-pho.png") },
    { key: 3, name: "Fast Food", source: require("@/assets/icons/fastfood.png") },
    { key: 4, name: "Pizza", source: require("@/assets/icons/Pizza.png") },
    { key: 5, name: "Burger", source: require("@/assets/icons/burger.png") },
    { key: 6, name: "Sống Khỏe", source: require("@/assets/icons/egg-cucmber.png") },
    { key: 7, name: "Giảm 50k", source: require("@/assets/icons/moi-moi.png") },
    { key: 8, name: "Milk Tea", source: require("@/assets/icons/salad.png") },
];

const SearchPage = () => {
    const [restaurants, setRestaurants] = useState<IRestaurants[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearchAPI = useCallback(debounce(async (text: string) => {
        if (!text) {
            setRestaurants([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        const res = await getRestaurantByNameAPI(text);
        if (res.data) {
            setRestaurants(res.data.results);
        }
        setLoading(false);
    }, 100), []);

    const handleSearchTextChange = (text: string) => {
        setSearchTerm(text);
        handleSearchAPI(text.trim());
    };

    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator style={{ marginTop: 50 }} size="large" color={APP_COLOR.ORANGE} />;
        }
        if (searchTerm.length === 0) {
            return <DefaultResult />;
        }
        if (restaurants.length === 0) {
            return <NoResults term={searchTerm} />;
        }
        return (
            <FlatList
                data={restaurants}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <SearchResultItem item={item} />}
                contentContainerStyle={{ backgroundColor: 'white' }}
                showsVerticalScrollIndicator={false}
            />
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                    style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.6 : 1 }]}
                >
                    <MaterialIcons name="arrow-back" size={26} color={APP_COLOR.ORANGE} />
                </Pressable>

                <View style={styles.searchWrapper}>
                    <TextInput
                        placeholder="Tìm kiếm cửa hàng..."
                        placeholderTextColor="#888"
                        value={searchTerm}
                        onChangeText={handleSearchTextChange}
                        style={styles.searchInput}
                    />
                    {searchTerm.length > 0 && (
                        <Pressable onPress={() => handleSearchTextChange('')} style={styles.clearButton}>
                            <MaterialIcons name="clear" size={20} color="#666" />
                        </Pressable>
                    )}
                </View>
            </View>
            
            <Pressable style={styles.contentArea} onPress={Keyboard.dismiss}>
                {renderContent()}
            </Pressable>
        </SafeAreaView>
    );
}


const DefaultResult = () => (
    <View style={styles.defaultContainer}>
        <Text style={styles.popularTitle}>Tìm kiếm phổ biến</Text>
        <View style={styles.popularGrid}>
            {popularSearches.map((item) => (
                <Pressable key={item.key} style={({ pressed }) => [styles.popularItem, { opacity: pressed ? 0.8 : 1 }]}>
                    <Image source={item.source} style={styles.popularImage} />
                    <Text style={styles.popularName}>{item.name}</Text>
                </Pressable>
            ))}
        </View>
    </View>
);

const SearchResultItem = ({ item }: { item: IRestaurants }) => (
    <Pressable
        onPress={() => router.navigate({
            pathname: "/(user)/product/[id]",
            params: { id: item._id }
        })}
        style={({ pressed }) => [styles.resultItem, { opacity: pressed ? 0.7 : 1 }]}
    >
        <Image
            source={{ uri: `${getUrlBaseBackend()}/images/restaurant/${item.image}` }}
            style={styles.resultImage}
        />
        <View style={{ flex: 1 }}>
            <Text style={styles.resultName}>{item.name}</Text>
            <Text style={styles.resultAddress} numberOfLines={1}>{item.address}</Text>
        </View>
    </Pressable>
);


const NoResults = ({ term }: { term: string }) => (
    <View style={styles.noResultsContainer}>
        <MaterialIcons name="search-off" size={60} color="#ccc" />
        <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
        <Text style={styles.noResultsSubText}>Rất tiếc, chúng tôi không tìm thấy kết quả nào cho "{term}"</Text>
    </View>
);


const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: 'white' },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        gap: 10,
    },
    backButton: {
        padding: 5,
    },
    searchWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: APP_COLOR.YELLOW_LIGHT,
        borderRadius: 10,
    },
    searchInput: {
        flex: 1,
        height: 42,
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#333",
    },
    clearButton: {
        padding: 10,
    },
    contentArea: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    defaultContainer: {
        backgroundColor: "white",
        padding: 15,
    },
    popularTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    popularGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    popularItem: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
        gap: 10
    },
    popularImage: {
        width: 35,
        height: 35,
    },
    popularName: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
    },
    
    noResultsContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 50, 
        paddingHorizontal: 20,
    },
    noResultsText: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555'
    },
    noResultsSubText: {
        marginTop: 5,
        fontSize: 14,
        color: 'grey',
        textAlign: 'center'
    },
    resultItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        gap: 15,
        backgroundColor: 'white',
        borderBottomColor: "#f0f0f0",
        borderBottomWidth: 1,
    },
    resultImage: {
        height: 55,
        width: 55,
        borderRadius: 8,
    },
    resultName: {
        fontSize: 16,
        fontWeight: '500'
    },
    resultAddress: {
        fontSize: 13,
        color: 'grey',
        marginTop: 3
    }
});

export default SearchPage;