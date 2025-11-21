import ShareButton from '@/components/button/share.button';
import ShareInput from '@/components/input/share.input';
import { APP_COLOR } from '@/utils/constant';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Toast from 'react-native-root-toast';
import { WebView } from 'react-native-webview';


const defaultLocation = {
    latitude: 21.0205,
    longitude: 105.7725,
};

const AddNewAddress = () => {
    const [name, setName] = useState('');
    const [addressQuery, setAddressQuery] = useState('');
    const [location, setLocation] = useState(defaultLocation);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchAddress = async () => {
        if (!addressQuery.trim()) {
            Alert.alert('Thông báo', 'Vui lòng nhập một địa chỉ để tìm kiếm.');
            return;
        }
        Keyboard.dismiss();
        setIsSearching(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressQuery)}`);
            const data = await res.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                setLocation({
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lon),
                });
            } else {
                Alert.alert('Không tìm thấy', 'Không thể tìm thấy địa chỉ này. Vui lòng thử lại.');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tìm kiếm địa chỉ.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleApply = () => {
        if (!name.trim() || !addressQuery.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên và địa chỉ.');
            return;
        }
        const message = `Tên: ${name}\nĐịa chỉ: ${addressQuery}`;
        Alert.alert('Đã lưu địa chỉ:', message, [{ text: 'OK', onPress: () => router.navigate('/(drawer)/(tabs)/(address)/address') }]);
        Toast.show('Thêm địa chỉ mới thành công!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: '#4CAF50', 
            textColor: 'white',
        });
    };

    // Tạo một chuỗi HTML để hiển thị bản đồ
    const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <style>
            html, body, #map { margin: 0; padding: 0; height: 100%; width: 100%; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            var map = L.map('map').setView([${location.latitude}, ${location.longitude}], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker([${location.latitude}, ${location.longitude}]).addTo(map);
        </script>
    </body>
    </html>
    `;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={styles.form}>
                        <ShareInput title="Tên địa chỉ (ví dụ: Nhà, Công ty)" value={name} onChangeText={setName} placeholder="Nhập tên địa chỉ của bạn" />
                        <ShareInput title="Địa chỉ" value={addressQuery} onChangeText={setAddressQuery} placeholder="Nhập số nhà, tên đường, phường, quận..." />
                        <ShareButton tittle={isSearching ? "Đang tìm..." : "Tìm trên bản đồ"} onPress={handleSearchAddress} btnStyle={styles.searchButton} textStyle={styles.searchButtonText} loading={isSearching} />

                        {/*Thay thế MapView bằng WebView */}
                        <View style={styles.mapContainer}>
                            <WebView
                                originWhitelist={['*']}
                                source={{ html: mapHTML }}
                                style={styles.map}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.buttonWrapper}>
                    <ShareButton tittle="Xác nhận địa chỉ" onPress={handleApply} btnStyle={styles.applyButton} textStyle={styles.applyButtonText} />
                </View>
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
        paddingHorizontal: 25
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15,
        color: '#333'
    },
    form: {
        width: '100%',
        flex: 1,
        marginTop: 50
    },
    searchButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    searchButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500'
    },
    mapContainer: {
        height: 180,
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#eee'
    },
    map: {
        flex: 1
    },
    buttonWrapper: {
        paddingVertical: 20
    },
    applyButton: {
        backgroundColor: APP_COLOR.ORANGE,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 70
    },
    applyButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
});


export default AddNewAddress;