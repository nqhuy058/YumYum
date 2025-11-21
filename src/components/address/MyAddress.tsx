import { APP_COLOR } from '@/utils/constant';
import { SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ShareButton from '../button/share.button';


const COLORS = {
    primaryOrange: APP_COLOR.ORANGE,
    lightOrange: APP_COLOR.ORANGE_LIGHT,
    white: '#FFFFFF',
    darkText: '#333333',
    lightText: '#888888',
    borderColor: '#EAEAEA',
};

// Cấu trúc của một địa chỉ
interface Address {
    id: string;
    title: string;
    address: string;
}

// Dữ liệu tĩnh cho danh sách địa chỉ
const DUMMY_ADDRESSES: Address[] = [
    {
        id: '1',
        title: 'Địa chỉ giao hàng 1',
        address: '81 hẻm 8/11/186 Lê Quang Đạo',
    },
    {
        id: '2',
        title: 'Địa chỉ giao hàng 2',
        address: 'Tiểu khu Thạch Lý, Xã Đà Bắc, Phường Hòa Bình',
    },
    {
        id: '3',
        title: "Địa chỉ giao hàng 3",
        address: 'Đại Hải Trình ',
    },
];

const MyAddress = () => {
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>('1');

    const AddressItem = ({ item, isSelected, onSelect }: { item: Address; isSelected: boolean; onSelect: () => void; }) => (
        <Pressable onPress={onSelect} style={styles.addressItemContainer}>
            <SimpleLineIcons name="home" size={24} color={COLORS.primaryOrange} />
            <View style={styles.addressTextContainer}>
                <Text style={styles.addressTitle}>{item.title}</Text>
                <Text style={styles.addressDetail}>{item.address}</Text>
            </View>
            <View style={[styles.radioOuterCircle, isSelected && { borderColor: COLORS.primaryOrange }]}>
                {isSelected && <View style={styles.radioInnerCircle} />}
            </View>
        </Pressable>
    );

    return (

        <View style={styles.contentContainer}>
            <FlatList
                data={DUMMY_ADDRESSES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AddressItem
                        item={item}
                        isSelected={item.id === selectedAddressId}
                        onSelect={() => setSelectedAddressId(item.id)}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={{ paddingTop: 10, marginTop: 30 }}
            />

            <View style={styles.buttonContainer}>
                <ShareButton
                    tittle="Thêm địa chỉ mới"
                    onPress={() => router.navigate('/(drawer)/(tabs)/(address)/new.address')}
                    btnStyle={styles.addButton}
                    textStyle={styles.addButtonText}
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignContent: 'center',
        justifyContent: 'center',
    },
    addressItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,

    },
    addressTextContainer: {
        flex: 1,
        marginLeft: 15,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.darkText,
    },
    addressDetail: {
        fontSize: 14,
        color: COLORS.lightText,
        marginTop: 4,
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
        backgroundColor: COLORS.primaryOrange,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.borderColor,
        marginLeft: 20,
        marginRight: 20,
    },
    buttonContainer: {
        padding: 20,
        backgroundColor: COLORS.white,
    },
    addButton: {
        backgroundColor: COLORS.lightOrange,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 180,
        width: '50%',
        alignSelf: 'center',
    },
    addButtonText: {
        color: COLORS.primaryOrange,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyAddress;