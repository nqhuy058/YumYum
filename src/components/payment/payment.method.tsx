import ShareButton from '@/components/button/share.button';
import { APP_COLOR } from '@/utils/constant';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface PaymentMethodType {
    id: string;
    name: string;
    icon: React.ReactNode;
}

const DUMMY_METHODS: PaymentMethodType[] = [
    {
        id: '1',
        name: 'Tài khoản ngân hàng',
        icon: <FontAwesome name="credit-card" size={40} color={APP_COLOR.ORANGE} />,
    },
    {
        id: '2',
        name: 'Apple Play',
        icon: <AntDesign name="apple" size={40} color={APP_COLOR.ORANGE} />,
    },
    {
        id: '3',
        name: 'Paypal',
        icon: <FontAwesome name="paypal" size={40} color={APP_COLOR.ORANGE} />,
    },
    {
        id: '4',
        name: 'Google Play',
        icon: <Entypo name="google-play" size={40} color={APP_COLOR.ORANGE} />,
    },
];

const PaymentMethod = () => {
    const [selectedMethodId, setSelectedMethodId] = useState<string | null>('1');

    const PaymentItem = ({ item, isSelected, onSelect }: { item: PaymentMethodType; isSelected: boolean; onSelect: () => void; }) => (
        <Pressable onPress={onSelect} style={styles.itemContainer}>
            {item.icon}
            <Text style={styles.itemText}>{item.name}</Text>
            <View style={[styles.radioOuterCircle, isSelected && { borderColor: APP_COLOR.ORANGE }]}>
                {isSelected && <View style={styles.radioInnerCircle} />}
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={DUMMY_METHODS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PaymentItem
                        item={item}
                        isSelected={item.id === selectedMethodId}
                        onSelect={() => setSelectedMethodId(item.id)}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={{ paddingTop: 20 }}
            />

            <View style={styles.buttonContainer}>
                <ShareButton
                    tittle="Thêm phương thức"
                    onPress={() => {}}
                    btnStyle={styles.addButton}
                    textStyle={styles.addButtonText}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 25,
    },
    itemText: {
        flex: 1,
        marginLeft: 20,
        fontSize: 16,
        color: '#333333',
        fontWeight: '500',
    },
    radioOuterCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: APP_COLOR.ORANGE,
    },
    separator: {
        height: 1,
        backgroundColor: '#EAEAEA',
        marginLeft: 25,
        marginRight: 25,
    },
    buttonContainer: {
        paddingHorizontal: '25%', 
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
    },
    addButton: {
        backgroundColor: APP_COLOR.ORANGE_LIGHT,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 160,
    },
    addButtonText: {
        color: APP_COLOR.ORANGE,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PaymentMethod;