import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Feather';
import { Header, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function ChatPage(props) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigation();

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const updatedMessages = [...messages, { text: newMessage, sender: 'user' }];
    setMessages(updatedMessages);
    setNewMessage('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header 
        leftComponent={
          <TouchableOpacity style={{marginTop:-30}} onPress={() => props.navigation.navigate("Inbox")}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
        }
        centerComponent={
          <View style={styles.headerCenter}>
            <Avatar
              rounded
              source={{ uri: 'https://i.pravatar.cc/150' }}
              size={35}
            />
            <View style={styles.headerCenterText}>
              <Text style={styles.headerText}>John Doe</Text>
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        }
        containerStyle={styles.headerContainer}
      />
      <View style={styles.chatContainer}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        {messages.map((message, index) => (
          <View key={index} style={message.sender === 'user' ? styles.userMessageContainer : styles.bothMessageContainer}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    value={newMessage}
    onChangeText={setNewMessage}
    placeholder="Message"
    placeholderTextColor="#999"
    autoCapitalize="none"
    autoCorrect={false}
    autoFocus={true}
    clearButtonMode="always"
    onSubmitEditing={handleSend}
    returnKeyType="send"
  />
  <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
    <Icon name="arrow-up-circle" size={24} color="green" />
  </TouchableOpacity>
</View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#003300',
    borderBottomWidth: 0,
    height: "10%"
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    alignSelf: "center",
    marginTop:-35
  },
  headerCenterText: {
    marginLeft: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1
  },
  statusText: {
    color: 'white',
    fontSize: 14,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  userMessageContainer: {
    maxWidth: '50%',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginLeft: 200
  },
  inputContainer: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderTopWidth: StyleSheet.hairlineWidth,
  borderColor: '#ddd',
  paddingHorizontal: 20,
  paddingVertical: 10,
  marginBottom: 10
},
input: {
  flex: 1,
  height: 40,
  fontSize: 16,
  paddingHorizontal: 10,
  backgroundColor: '#eee',
  borderRadius: 20,
},
sendButton: {
  marginLeft: 10,
},
});
