import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { AIChatAssistant } from "./ai-chat-assistant";

type Props = {
  context?: "education" | "entrepreneurship";
};

export default function FloatingAIButton({ context = "education" }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scale = useSharedValue(1);
  const backgroundColor = useThemeColor({}, "background");
  const brandColor = useThemeColor({ light: "#046A38", dark: "#046A38" }, "tint");
  const textColor = useThemeColor({}, "text");
  const shadowColor = useThemeColor({ light: "#000", dark: "#000" }, "background");

  const handlePress = () => {
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });
    setIsModalVisible(true);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <>
      <Animated.View style={[styles.floatingButton, animatedStyle]}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: brandColor,
              shadowColor,
            },
          ]}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          {context === "education" ? (
            <Image
              source={require("@/assets/images/robot-education.jpg")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          ) : context === "entrepreneurship" ? (
            <Image
              source={require("@/assets/images/robot-entrepreneurship.jpg")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          ) : (
            <Ionicons name="chatbubbles" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </Animated.View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Ionicons name="close" size={24} color={textColor} />
            </TouchableOpacity>
          </View>
          <AIChatAssistant
            context={context}
            onChatHistoryToggle={() => {}}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 20,
    zIndex: 1000,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  closeButton: {
    padding: 8,
  },
  iconImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
  },
});

