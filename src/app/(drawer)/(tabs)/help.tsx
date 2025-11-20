import { APP_COLOR } from "@/utils/constant";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HelpItem = ({ title, subtitle, onPress }: { title: string, subtitle: string, onPress?: () => void }) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.menuItem, { opacity: pressed ? 0.7 : 1 }]}
            onPress={onPress}
        >
            <View>
                <Text style={styles.menuItemTitle}>{title}</Text>
                <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={APP_COLOR.ORANGE} />
        </Pressable>
    );
};

const HelpPage = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.description}>
                        Chúng tôi luôn sẵn sàng hỗ trợ bạn. Vui lòng chọn một chủ đề bên dưới để tìm câu trả lời cho thắc mắc của bạn.
                    </Text>

                    <View style={styles.menuContainer}>
                        <HelpItem
                            title="Liên hệ với nhân viên để được hỗ trợ"
                            subtitle="Support"
                            onPress={() => router.navigate("(help)/support")}
                        />
                        <HelpItem
                            title="Trung tâm hỗ trợ"
                            subtitle="contact"
                            onPress={() => { /* Xử lý điều hướng ở đây */ }}
                        />
                    </View>
                </ScrollView>
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
    backButton: {
        padding: 5,
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 25,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 30,
    },
    menuContainer: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuItemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 3,
    },
    menuItemSubtitle: {
        fontSize: 13,
        color: 'grey',
    },
});

export default HelpPage;