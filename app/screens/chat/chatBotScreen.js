import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Badge, Button} from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import {sendMessageToTextCortex} from '../../services/chatBotService';
import {saveMessage} from '../../redux/slice/chatMessageSlice';
import {useSelector, useDispatch} from 'react-redux';
import TypingIndicator from '../../component/TypingIndicator';
import Fonts from '../../../assets/fonts/Fonts';
import {BCarefulTheme, BCarefulTheme2, style} from '../../component/Theme';

const initMessages = [
  {
    text: 'Xin chào, tôi là trợ lí ảo của phòng khám BCare, tôi có thể giúp bạn giải đáp các thắc mắc liên quan đến vấn đề sức khỏe và y tế.',
    sender: 'bot',
  },
  {
    text: 'Tuy nhiên, những câu trả lời của tôi chỉ mang tính chất tham khảo, nếu muốn được tư vấn đầy đủ và chính xác nhất, hãy đến gặp các bác sĩ tại phòng khám BCare của chúng tôi.',
    sender: 'bot',
  },
];

function ChatBotScreen({navigation}) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(messages); //ref to messages to access in component unmount
  const existMessages = useSelector(state => state.messages?.messages);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null); // Add a reference for ScrollView

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    const userMessage = {text: inputText, sender: 'user'};
    const updatedMessages = [...messagesRef.current, userMessage];
    setMessages(updatedMessages);
    messagesRef.current = updatedMessages;
    setLoading(true);
    setInputText('');

    const botMessage = await sendMessageToTextCortex(inputText);
    if (botMessage) {
      setLoading(false);
    }
    const finalMessages = [
      ...messagesRef.current,
      {text: botMessage, sender: 'bot'},
    ];
    setMessages(finalMessages);
    messagesRef.current = finalMessages;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    setMessages(existMessages.length > 0 ? existMessages : initMessages);
    messagesRef.current =
      existMessages.length > 0 ? existMessages : initMessages;

    return () => {
      console.log('COMPONENT UNMOUNT >>>>>> ', messagesRef.current);
      dispatch(saveMessage(messagesRef.current));
    };
  }, []);

  // Scroll to end whenever messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={style.h3}>BCare Chatbot</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name={'home'} style={styles.iconGoHome} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.chatContainer} ref={scrollViewRef}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={
              msg.sender === 'user' ? styles.userMessage : styles.botMessage
            }>
            {msg.text}
          </Text>
        ))}
        {loading && (
          <View style={styles.botMessage}>
            <TypingIndicator />
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        {/* <Button
          title="SEND"
          titleStyle={[style.h7, style.white]}
          buttonStyle={[style.btnSub, {flex: 1, width: 'auto'}]}
          onPress={handleSend}
        /> */}
        <TouchableOpacity onPress={handleSend}>
          <Icon name={'send'} style={styles.iconSend} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  chatContainer: {
    flex: 1,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: BCarefulTheme2.colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    color: '#FFF',
    backgroundColor: BCarefulTheme.colors.primary,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 35,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E4E4E4',
    // backgroundColor: '#FFF',
    // color: '#000',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 35,
  },
  icon: {
    fontSize: 26,
    color: '#000',
    marginLeft: 15,
  },
  iconGoHome: {
    fontSize: 26,
    color: '#000',
    marginRight: 15,
  },
  iconSend: {
    fontSize: 30,
    color: BCarefulTheme.colors.secondary,
    marginRight: 5,
  },
});

export default ChatBotScreen;
