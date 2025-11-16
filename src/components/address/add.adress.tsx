import ShareButton from '@/components/button/share.button';
import ShareInput from '@/components/input/share.input';
import { APP_COLOR } from '@/utils/constant';
import { SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const AddNewAddress = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const handleApply = () => {
        const message = `Name: ${name}\nAddress: ${address}`;
        Alert.alert(
            'Đã lưu địa chỉ:',
            message,
            [
                {
                    text: 'OK',
                    onPress: () => router.back(),
                },
            ]
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.iconContainer}>
                        <SimpleLineIcons name="home" size={80} color={APP_COLOR.ORANGE} />
                    </View>

                    <View style={styles.form}>
                        <ShareInput
                            title="Tên địa chỉ"
                            value={name}
                            onChangeText={setName}
                            placeholder="Nhập tên địa chỉ của bạn"
                        />

                        <ShareInput
                            title="Địa chỉ"
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Chi tiết địa chỉ của bạn"
                            multiline={true}
                            numberOfLines={3}
                        />
                    </View>

                    <View style={styles.buttonWrapper}>
                        <ShareButton
                            tittle="Xác nhận"
                            onPress={handleApply}
                            btnStyle={styles.applyButton}
                            textStyle={styles.applyButtonText}
                        />
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
    },
    iconContainer: {
        alignItems: 'center',
        marginVertical: 40,
    },
    form: {
        width: '100%',
    },
    buttonWrapper: {
        marginTop: 30,
        marginBottom: 40,
    },
    applyButton: {
        backgroundColor: APP_COLOR.ORANGE,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center',
    },
    applyButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddNewAddress;