import { Tabs } from "expo-router";

const TabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home"
                }}
            />

            <Tabs.Screen
                name="account"
                options={{
                    title: "Tôi"
                }}
            />
        </Tabs>
    )
}

export default TabLayout;