import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import colors from "../../../config/colors";
import SPACING from "../../../config/SPACING";
import ConversationField from "../../components/conversationField";
import MessageBubble from "../../components/MessageBubble";
import ConversationGemini from "./controller/ConversationGemini.js";

const CoffeeChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Adiciona a mensagem do usuário
    const userMessage = {
      id: `user_${Date.now()}`,
      text: message,
      type: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      setIsLoading(true);
      // Chama o método de envio da API do Gemini
      const aiResponseText = await ConversationGemini.sendMessage(message);

      // Adiciona a resposta da IA
      const aiMessage = {
        id: `ai_${Date.now()}`,
        text: aiResponseText,
        type: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      // Trata erros de envio
      const errorMessage = {
        id: `error_${Date.now()}`,
        text: "Desculpe, ocorreu um erro ao processar sua mensagem.",
        type: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        padding: SPACING * 1.5,
        paddingTop: SPACING * 3.5,
        backgroundColor: colors.dark,
        flex: 1,
      }}
    >
      {/* Header */}
      <View
        style={{
          padding: SPACING / 2,
          height: SPACING * 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: SPACING,
        }}
      >
        <View
          style={{
            backgroundColor: colors["dark-light"],
            width: SPACING * 2,
            height: SPACING * 2,
            borderRadius: SPACING / 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../../assets/gemini_icon.png")}
            resizeMode="contain"
            style={{
              width: SPACING * 1.5,
              height: SPACING * 1.5,
            }}
          />
        </View>
        <Text
          numberOfLines={1}
          style={{
            color: colors.light,
            fontSize: SPACING * 2,
            marginLeft: SPACING * 2,
            fontWeight: "700",
          }}
        >
          Gemini Coffee Assistant
        </Text>
      </View>

      {/* Conversation ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING / 2,
          paddingBottom: SPACING * 2,
        }}
        ref={(ref) => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() => {
          this.scrollView.scrollToEnd({ animated: true });
        }}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            text={msg.text}
            type={msg.type}
            timestamp={msg.timestamp}
          />
        ))}

        {isLoading && (
          <MessageBubble
            text="Typing ..."
            type="ai"
            timestamp={new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        )}
      </ScrollView>

      {/* Conversation Input */}
      <ConversationField onSendMessage={handleSendMessage} />
    </SafeAreaView>
  );
};

export default CoffeeChatScreen;
