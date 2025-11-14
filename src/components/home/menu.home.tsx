import { View, StyleSheet, Text, ScrollView, Pressable, Image } from "react-native";
import { APP_COLOR } from "@/utils/constant";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingVertical: 20,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        gap: 20,
    },
    menuItem: {
        alignItems: "center",
        gap: 10,
    },
    iconContainer: {
        width: 70,
        height: 85,
        borderRadius: 35,
        backgroundColor: APP_COLOR.YELLOW_LIGHT,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    },
    icon: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: "#333",
        textAlign: "center",
    },
});

const MENU_ITEMS = [
    { 
        id: 1, 
        name: "Đồ ăn vặt", 
        image: require("@/assets/menuHome/snack.png") 
    },
    { 
        id: 2, 
        name: "Đồ ăn chính", 
        image: require("@/assets/menuHome/meal.png") 
    },
    { 
        id: 3, 
        name: "đồ ăn Healthy", 
        image: require("@/assets/menuHome/vegan.png") 
    },
    { 
        id: 4, 
        name: "Bánh", 
        image: require("@/assets/menuHome/dessert.png") 
    },
    { 
        id: 5, 
        name: "Đồ uống", 
        image: require("@/assets/menuHome/drinks.png") 
    },
];

interface IProps {
    onSelectMenu?: (menuName: string) => void;
}

const MenuHome = (props: IProps) => {
    const { onSelectMenu } = props;

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollContainer}
            >
                {MENU_ITEMS.map((item) => (
                    <Pressable
                        key={item.id}
                        style={({ pressed }) => [
                            styles.menuItem,
                            { opacity: pressed ? 0.7 : 1 }
                        ]}
                        onPress={() => onSelectMenu?.(item.name)}
                    >
                        <View style={styles.iconContainer}>
                            <Image
                                source={item.image}
                                style={styles.icon}
                            />
                        </View>
                        <Text style={styles.label}>{item.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};

export default MenuHome;