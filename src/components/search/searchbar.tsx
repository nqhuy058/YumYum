import { View, StyleSheet, TextInput, Pressable } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { APP_COLOR } from "@/utils/constant";

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
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm món ăn và cửa hàng"
                    placeholderTextColor="#CCC"
                    onChangeText={onSearch}
                />
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