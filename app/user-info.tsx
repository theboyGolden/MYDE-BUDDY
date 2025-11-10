import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NavigationProp } from "@react-navigation/native";

import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { UpdateUserImageSheet } from "../components/update-user-image-sheet";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";

type FormState = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  dob: string;
  gender: string;
  location: string;
  avatar: string;
};

const paramToString = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
};

const buildInitialFormState = (params: Record<string, string | string[] | undefined>): FormState => ({
  firstName: paramToString(params.firstName),
  lastName: paramToString(params.lastName),
  jobTitle: paramToString(params.jobTitle),
  email: paramToString(params.email),
  dob: paramToString(params.dob),
  gender: paramToString(params.gender) || "Male",
  location: paramToString(params.location),
  avatar: paramToString(params.avatar) || DEFAULT_AVATAR,
});

export default function UserInfo() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
  const { colorScheme, toggleTheme } = useTheme();

  const palette = Colors[colorScheme];

  const [form, setForm] = useState<FormState>(() => buildInitialFormState(params));
  const [showImageSheet, setShowImageSheet] = useState(false);

  const { styles, placeholderColor } = useMemo(() => createStyles(colorScheme), [colorScheme]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ThemeToggleButton colorScheme={colorScheme} onToggle={toggleTheme} />,
      headerStyle: { backgroundColor: palette.background },
      headerTintColor: palette.text,
      headerTitleStyle: { color: palette.text },
      headerShadowVisible: false,
    });
  }, [navigation, colorScheme, toggleTheme, palette.background, palette.text]);

  useEffect(() => {
    setForm(buildInitialFormState(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.avatar,
    params.dob,
    params.email,
    params.firstName,
    params.gender,
    params.jobTitle,
    params.lastName,
    params.location,
  ]);

  const handleInputChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAvatarChange = (uri: string) => {
    setForm((prev) => ({ ...prev, avatar: uri }));
  };

  const handleSave = () => {
    router.replace({
      pathname: "/profile",
      params: form,
    });
  };

  const onChooseFromLibrary = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Please allow photo library access to choose an image.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        handleAvatarChange(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while selecting an image.");
    } finally {
      setShowImageSheet(false);
    }
  };

  const onTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Please allow camera access to take a photo.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        handleAvatarChange(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while taking a photo.");
    } finally {
      setShowImageSheet(false);
    }
  };

  const onDeletePhoto = () => {
    handleAvatarChange(DEFAULT_AVATAR);
    setShowImageSheet(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={palette.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>

        {/* Profile Icon */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: form.avatar,
            }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon} onPress={() => setShowImageSheet(true)}>
            <MaterialIcons name="edit" size={16} color={colorScheme === "dark" ? "#151718" : "#fff"} />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            placeholder="Enter first name"
            value={form.firstName}
            onChangeText={(t) => handleInputChange("firstName", t)}
            style={styles.input}
            placeholderTextColor={placeholderColor}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            placeholder="Enter last name"
            value={form.lastName}
            onChangeText={(t) => handleInputChange("lastName", t)}
            style={styles.input}
            placeholderTextColor={placeholderColor}
          />

          <Text style={styles.label}>Job Title</Text>
          <TextInput
            placeholder="Enter job title"
            value={form.jobTitle}
            onChangeText={(t) => handleInputChange("jobTitle", t)}
            style={styles.input}
            placeholderTextColor={placeholderColor}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            placeholder="Enter email"
            value={form.email}
            onChangeText={(t) => handleInputChange("email", t)}
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor={placeholderColor}
          />

          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              placeholder="DD/MM/YYYY"
              value={form.dob}
              onChangeText={(t) => handleInputChange("dob", t)}
              style={[styles.input, styles.dateInput]}
              placeholderTextColor={placeholderColor}
            />
            <MaterialIcons name="calendar-today" size={20} color={palette.tint} />
          </View>

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            {["Male", "Female"].map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => handleInputChange("gender", g)}
                style={[styles.genderOption, form.gender === g && styles.genderActive]}
              >
                {form.gender === g && (
                  <MaterialIcons
                    name="check-circle"
                    size={18}
                    color={colorScheme === "dark" ? "#151718" : "#fff"}
                    style={{ marginRight: 5 }}
                  />
                )}
                <Text style={[styles.genderText, form.gender === g && styles.genderTextActive]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Location</Text>
          <TextInput
            placeholder="Enter location"
            multiline
            numberOfLines={3}
            value={form.location}
            onChangeText={(t) => handleInputChange("location", t)}
            style={[styles.input, styles.locationInput]}
            placeholderTextColor={placeholderColor}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>

      <UpdateUserImageSheet
        visible={showImageSheet}
        onRequestClose={() => setShowImageSheet(false)}
        onChooseFromLibrary={onChooseFromLibrary}
        onTakePhoto={onTakePhoto}
        onDeletePhoto={onDeletePhoto}
        colorScheme={colorScheme}
      />
    </SafeAreaView>
  );
}

const createStyles = (colorScheme: "light" | "dark") => {
  const palette = Colors[colorScheme];
  const accent = palette.tint;
  const borderColor = colorScheme === "dark" ? "#2F3133" : "#F4A300";
  const surface = colorScheme === "dark" ? "#1F2022" : "#FFFCF5";
  const secondaryText = colorScheme === "dark" ? "#D0D4DA" : "#333";
  const saveTextColor = colorScheme === "dark" ? "#151718" : "#fff";
  const placeholderColor = colorScheme === "dark" ? "#8A8F98" : "#A1A5AD";

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.background,
    },
    scrollView: {
      flex: 1,
    },
    container: {
      padding: 20,
      backgroundColor: palette.background,
      flexGrow: 1,
    },
    backButton: {
      alignSelf: "flex-start",
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
      color: palette.text,
      marginBottom: 10,
    },
    imageContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    editIcon: {
      position: "absolute",
      bottom: 0,
      right: 140,
      backgroundColor: accent,
      padding: 5,
      borderRadius: 20,
    },
    form: {
      marginTop: 20,
    },
    label: {
      fontSize: 13,
      fontWeight: "500",
      color: secondaryText,
      marginBottom: 6,
      marginTop: 10,
    },
    input: {
      backgroundColor: surface,
      borderWidth: 1,
      borderColor,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: palette.text,
    },
    dateInput: {
      flex: 1,
      borderWidth: 0,
      backgroundColor: "transparent",
      paddingHorizontal: 0,
    },
    inputWithIcon: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor,
      borderRadius: 12,
      paddingHorizontal: 12,
      backgroundColor: surface,
    },
    genderContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 8,
    },
    genderOption: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor,
      borderRadius: 25,
      paddingVertical: 10,
      marginHorizontal: 4,
      backgroundColor: surface,
    },
    genderActive: {
      backgroundColor: accent,
    },
    genderText: {
      color: palette.text,
      fontWeight: "500",
    },
    genderTextActive: {
      color: saveTextColor,
    },
    saveButton: {
      backgroundColor: accent,
      borderRadius: 30,
      paddingVertical: 14,
      marginTop: 20,
      alignItems: "center",
    },
    saveText: {
      color: saveTextColor,
      fontWeight: "600",
    },
    locationInput: {
      height: 80,
      textAlignVertical: "top",
    },
  });

  return { styles, placeholderColor };
};
