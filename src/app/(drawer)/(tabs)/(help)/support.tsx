import { APP_COLOR } from "@/utils/constant";
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IMessage {
    id: string;
    text: string;
    timestamp: string;
    sender: 'user' | 'bot';
    type?: 'options' | 'orderInfo';
    options?: string[];
    orderInfo?: {
        items: string;
        orderNo: string;
        dateTime: string;
    };
}


const SupportPage = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        setMessages([
            { id: 'bot1', text: 'Xin chào!', timestamp: '09:00', sender: 'bot' },
            {
                id: 'bot2',
                text: 'Xin chào, vui lòng chọn số tương ứng với nhu cầu của bạn để được phục vụ hiệu quả hơn.',
                timestamp: '09:00',
                sender: 'bot',
                type: 'options',
                options: [
                    '1. Quản lý đơn hàng',
                    '2. Quản lý thanh toán',
                    '3. Tài khoản và hồ sơ',
                    '4. Theo dõi đơn hàng',
                    '5. An toàn',
                ],
            },
        ]);
    }, []);

    const handleSend = () => {
        if (inputText.trim().length === 0) return;

        const userMessage: IMessage = {
            id: Date.now().toString(),
            text: inputText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'user',
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputText('');
        Keyboard.dismiss();

        setTimeout(() => {
            getBotResponse(inputText, newMessages);
        }, 1000);
    };

    const getBotResponse = (userInput: string, currentMessages: IMessage[]) => {
        let botResponse: IMessage;

        if (userInput.trim() === '1') {
            botResponse = {
                id: `bot-${Date.now()}`,
                text: 'Bạn có một đơn hàng hiện tại:',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sender: 'bot',
                type: 'orderInfo',
                orderInfo: {
                    items: 'Dâu lắc và Bông cải xanh Lasagna',
                    orderNo: '0054752',
                    dateTime: '29 Th11, 01:20 pm',
                },
            };
        } else {
            botResponse = {
                id: `bot-${Date.now()}`,
                text: 'Xin lỗi, tôi chưa hiểu yêu cầu của bạn. Vui lòng chọn một trong các tùy chọn trên.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sender: 'bot',
            };
        }
        setMessages([...currentMessages, botResponse]);
    };

    const renderMessage = ({ item }: { item: IMessage }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[styles.messageRow, isUser ? styles.userMessageRow : styles.botMessageRow]}>
                <View style={[styles.messageBubble, isUser ? styles.userMessageBubble : styles.botMessageBubble]}>
                    <Text style={isUser ? styles.userMessageText : styles.botMessageText}>{item.text}</Text>
                    {item.type === 'options' && (
                        <View style={styles.optionsContainer}>
                            {item.options?.map((opt, index) => <Text key={index} style={styles.botMessageText}>{opt}</Text>)}
                        </View>
                    )}
                    {item.type === 'orderInfo' && item.orderInfo && (
                        <View style={styles.orderInfoContainer}>
                            <Text style={styles.orderInfoItems}>{item.orderInfo.items}</Text>
                            <Text style={styles.orderInfoDetails}>Mã đơn: {item.orderInfo.orderNo}</Text>
                            <Text style={styles.orderInfoDetails}>{item.orderInfo.dateTime}</Text>
                            <View style={styles.orderButtons}>
                                <Pressable style={styles.orderButton}><Text style={styles.orderButtonText}>Vấn đề đơn hàng</Text></Pressable>
                                <Pressable style={styles.orderButton}><Text style={styles.orderButtonText}>Chưa nhận được hàng</Text></Pressable>
                            </View>
                        </View>
                    )}
                </View>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
        );
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={80}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    style={styles.chatArea}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                />

                <View style={styles.inputContainer}>
                    <Ionicons name="attach" size={24} color="#555" style={styles.inputIcon} />
                    <TextInput
                        style={styles.textInput}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Viết ở đây..."
                        placeholderTextColor="#999"
                    />
                    <FontAwesome name="microphone" size={22} color="#555" style={styles.inputIcon} />
                    <Pressable onPress={handleSend}>
                        <Feather name="send" size={24} color={APP_COLOR.ORANGE} style={styles.inputIcon} />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: APP_COLOR.YELLOW_BASE
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    backButton: {
        padding: 5
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },

    chatArea: {
        paddingHorizontal: 15,
        marginTop: 25
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: APP_COLOR.ORANGE_LIGHT,
        marginBottom: 65,
        backgroundColor: APP_COLOR.ORANGE_LIGHT,
    },

    textInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        fontSize: 15
    },
    inputIcon: {
        marginHorizontal: 5
    },
    messageRow: {
        marginBottom: 15,
        maxWidth: '80%'
    },
    userMessageRow: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    },
    botMessageRow: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    },
    messageBubble: {
        padding: 12,
        borderRadius: 18
    },
    userMessageBubble: {
        backgroundColor: '#FFF8E1',
        borderTopRightRadius: 4
    },
    botMessageBubble: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: APP_COLOR.ORANGE,
        borderTopLeftRadius: 4
    },
    userMessageText: {
        color: '#333',
        fontSize: 15
    },
    botMessageText: {
        color: '#333',
        fontSize: 15,
        lineHeight: 22
    },
    timestamp: {
        fontSize: 11,
        color: '#aaa',
        marginTop: 4,
        marginHorizontal: 5
    },
    optionsContainer: {
        marginTop: 10
    },
    orderInfoContainer: {
        marginTop: 8
    },
    orderInfoItems: {
        fontWeight: '600',
        color: '#333',
        fontSize: 15
    },
    orderInfoDetails: {
        color: '#666',
        fontSize: 13,
        marginTop: 4
    },
    orderButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 12
    },
    orderButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        backgroundColor: '#FFEADD',
        marginRight: 8,
        marginBottom: 8
    },
    orderButtonText: {
        color: APP_COLOR.ORANGE,
        fontSize: 13,
        fontWeight: '500'
    },
});

export default SupportPage;