import { APP_COLOR } from "@/utils/constant";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        gap: 10,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#333",
    },
    filterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: APP_COLOR.ORANGE,
        justifyContent: "center",
        alignItems: "center",
    },
});

interface IProps {
    onSearch?: (text: string) => void;
}

const SearchBar = (props: IProps) => {
    const { onSearch } = props;

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <FontAwesome5 name="search" size={14} color="#999" />
                 <Pressable
                    onPress={() => router.navigate("/(auth)/search")}
                    style={({ pressed }) => [
                        styles.input,
                        { opacity: pressed ? 0.7 : 1 } 
                    ]}
                >
                    <Text style={{ color: "#CCC" }}>
                        Tìm kiếm món ăn và cửa hàng
                    </Text>
                </Pressable>
            </View>
            <Pressable
                style={({ pressed }) => [
                    styles.filterButton,
                    { opacity: pressed ? 0.8 : 1 }
                ]}
            >
                <FontAwesome5 name="sliders-h" size={18} color="#fff" />
            </Pressable>
        </View>
    );
};

export default SearchBar;