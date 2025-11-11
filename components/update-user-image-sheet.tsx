import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/theme";

type UpdateUserImageSheetProps = {
  visible: boolean;
  onRequestClose: () => void;
  onTakePhoto: () => void;
  onChooseFromLibrary: () => void;
  onDeletePhoto: () => void;
  colorScheme: "light" | "dark";
};

export function UpdateUserImageSheet({
  visible,
  onRequestClose,
  onTakePhoto,
  onChooseFromLibrary,
  onDeletePhoto,
  colorScheme,
}: UpdateUserImageSheetProps) {
  const { styles, iconColor, deleteColor } = React.useMemo(() => createStyles(colorScheme), [colorScheme]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.centerContainer}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Change your picture</Text>

          <TouchableOpacity style={styles.option} onPress={onTakePhoto}>
            <MaterialIcons name="photo-camera" size={22} color={iconColor} style={styles.iconMargin} />
            <Text style={styles.optionText}>Take a photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={onChooseFromLibrary}>
            <MaterialIcons name="photo-library" size={22} color={iconColor} style={styles.iconMargin} />
            <Text style={styles.optionText}>Choose from your file</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, styles.deleteOption]} onPress={onDeletePhoto}>
            <MaterialIcons name="delete" size={22} color={deleteColor} style={styles.iconMargin} />
            <Text style={styles.deleteText}>Delete Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colorScheme: "light" | "dark") => {
  const palette = Colors[colorScheme];
  const surface = colorScheme === "dark" ? "#1F2022" : "#FFFFFF";
  const optionBackground = colorScheme === "dark" ? "#2A2B2F" : "#F6F6F9";
  const borderColor = colorScheme === "dark" ? "#313236" : "#ECEDEE";
  const iconColor = colorScheme === "dark" ? "#E4E6EB" : "#333";
  const deleteColor = "#FF5555";

  const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.45)",
    },
    centerContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    sheet: {
      width: "100%",
      maxWidth: 360,
      borderRadius: 28,
      backgroundColor: surface,
      paddingVertical: 24,
      paddingHorizontal: 20,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 30,
      elevation: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text,
      marginBottom: 20,
      textAlign: "center",
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: optionBackground,
      borderRadius: 18,
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor,
    },
    iconMargin: {
      marginRight: 12,
    },
    optionText: {
      fontSize: 15,
      fontWeight: "500",
      color: palette.text,
    },
    deleteOption: {
      backgroundColor: colorScheme === "dark" ? "rgba(244, 67, 54, 0.12)" : "rgba(244, 67, 54, 0.08)",
      borderColor: "transparent",
      marginBottom: 0,
    },
    deleteText: {
      fontSize: 15,
      fontWeight: "600",
      color: deleteColor,
    },
  });

  return { styles, iconColor, deleteColor };
};

