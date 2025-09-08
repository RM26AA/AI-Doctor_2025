import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";

const API_KEY = "AIzaSyAOMKW8BRvFL-JrtVwMIMxSIuRrOUwIY6A"; // add your API key here

export default function HomeScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const flatListRef = useRef(null);

  // 🔊 Load & play sound when doctor replies
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/noti-1.mp3") // put your sound file in assets
    );
    await sound.playAsync();
  };

  // 🧠 Send user message + call Gemini
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Dr. Jenny, a helpful and empathetic virtual doctor. Answer professionally:\n\n${newMessage.text}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const doctorReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn’t process that.";

      // Add doctor reply
      const replyMessage = {
        id: Date.now().toString() + "_bot",
        text: doctorReply,
        sender: "doctor",
      };
      setMessages((prev) => [...prev, replyMessage]);

      await playSound(); // play effect
    } catch (error) {
      console.error("Gemini API error:", error);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === "user";
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userContainer : styles.doctorContainer,
        ]}
      >
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.doctorBubble]}>
          <Text style={[styles.messageText, isUser ? styles.userText : styles.doctorText]}>
            {item.text}
          </Text>
          {/* Spike */}
          <View
            style={[
              styles.spike,
              isUser ? styles.userSpike : styles.doctorSpike,
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../assets/profile-1.PNG")} style={styles.image} />
        <Text style={styles.name}>Dr. Jenny</Text>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatArea}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="How can I help you?"
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#07ab95",
    marginTop: 5,
  },
  chatArea: {
    flexGrow: 1,
    padding: 10,
    justifyContent: "flex-end",
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: "75%",
  },
  userContainer: {
    alignSelf: "flex-end",
  },
  doctorContainer: {
    alignSelf: "flex-start",
  },
  bubble: {
    padding: 10,
    borderRadius: 16,
    position: "relative",
  },
  userBubble: {
    backgroundColor: "#07ab95",
    borderTopRightRadius: 0,
  },
  doctorBubble: {
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: "#fff",
  },
  doctorText: {
    color: "#333",
  },
  inputRow: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#07ab95",
    marginLeft: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
