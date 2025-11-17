import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerAndroid, type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
    Alert,
    Image,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { useUserProfile } from "@/contexts/user-profile-context";
import { UpdateUserImageSheet } from "../components/update-user-image-sheet";

type ThemePalette = typeof Colors.light;

const DEFAULT_AVATAR = "default"; // Special marker to use local profile.png

type FormState = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  email: string;
  dob: string;
  gender: string;
  location: string;
  bio: string;
  avatar: string;
  skills: string[];
  experienceLevel: "entry" | "mid" | "senior" | "executive";
  yearsOfExperience: string;
};

  const paramToString = (value: string | string[] | undefined) => {
    if (Array.isArray(value)) {
      return value[0] ?? "";
    }
    return value ?? "";
  };

const DOB_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const parseDobString = (value: string): Date | null => {
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  const segments = value.split(/[-/]/);
  if (segments.length === 3) {
    const [a, b, c] = segments.map((segment) => segment.trim());
    const reconstructed = `${c}-${b}-${a}`;
    const altParsed = new Date(reconstructed);
    if (!Number.isNaN(altParsed.getTime())) {
      return altParsed;
    }
  }

  return null;
};

const formatDob = (date: Date | null) => {
  if (!date) return "";
  return DOB_FORMAT.format(date);
};

const normalizeDob = (value: string) => formatDob(parseDobString(value));

const parseSkills = (value: string | string[] | undefined): string[] => {
  if (!value) return ["React", "TypeScript", "JavaScript", "Node.js", "UI Design", "Figma"];
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }
  // Try to parse as comma-separated string or JSON array
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // Not JSON, try comma-separated
    if (value.includes(",")) {
      return value.split(",").map(s => s.trim()).filter(Boolean);
    }
  }
  return [value].filter(Boolean);
};

const buildInitialFormState = (
  params: Record<string, string | string[] | undefined>,
  profileData?: { firstName: string; lastName: string; jobTitle: string; company: string; email: string; dob: string; gender: string; location: string; bio: string; avatar: string; skills: string[]; experienceLevel: "entry" | "mid" | "senior" | "executive"; yearsOfExperience: string }
): FormState => ({
    firstName: paramToString(params.firstName) || profileData?.firstName || "",
    lastName: paramToString(params.lastName) || profileData?.lastName || "",
    jobTitle: paramToString(params.jobTitle) || profileData?.jobTitle || "",
  company: paramToString(params.company) || profileData?.company || "Lunar Studio",
    email: paramToString(params.email) || profileData?.email || "",
  dob: normalizeDob(paramToString(params.dob)) || profileData?.dob || "",
    gender: paramToString(params.gender) || profileData?.gender || "Male",
    location: paramToString(params.location) || profileData?.location || "",
  bio: paramToString(params.bio) || profileData?.bio || "",
  avatar: paramToString(params.avatar) || profileData?.avatar || DEFAULT_AVATAR,
  skills: parseSkills(params.skills).length > 0 ? parseSkills(params.skills) : (profileData?.skills || []),
  experienceLevel: (paramToString(params.experienceLevel) || profileData?.experienceLevel || "mid") as "entry" | "mid" | "senior" | "executive",
  yearsOfExperience: paramToString(params.yearsOfExperience) || profileData?.yearsOfExperience || "3",
});

export default function UserInfo() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colorScheme } = useTheme();
  const { profile, updateProfile } = useUserProfile();

  const palette = useMemo<ThemePalette>(() => Colors[colorScheme], [colorScheme]);
  const accent = useMemo(() => (colorScheme === "dark" ? "#046A38" : "#046A38"), [colorScheme]);
  const saveTextColor = useMemo(() => (colorScheme === "dark" ? "#151718" : "#fff"), [colorScheme]);
  const surface = useMemo(() => (colorScheme === "dark" ? "#1F2022" : "#FFFCF5"), [colorScheme]);
  const borderColor = useMemo(() => (colorScheme === "dark" ? "#2F3133" : "#046A38"), [colorScheme]);

  const [form, setForm] = useState<FormState>(() => buildInitialFormState(params, profile));
  const [showImageSheet, setShowImageSheet] = useState(false);
  const [dobModalVisible, setDobModalVisible] = useState(false);
  const [tempDob, setTempDob] = useState<Date>(parseDobString(buildInitialFormState(params).dob) ?? new Date());
  const [newSkill, setNewSkill] = useState("");

  const { styles, placeholderColor } = useMemo(
    () => createStyles(colorScheme, palette),
    [colorScheme, palette]
  );

  useEffect(() => {
    setForm(buildInitialFormState(params, profile));
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
    params.company,
    params.bio,
    params.skills,
    params.experienceLevel,
    params.yearsOfExperience,
    profile,
  ]);

  useEffect(() => {
    setTempDob(parseDobString(form.dob) ?? new Date());
  }, [form.dob]);

  const handleInputChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAvatarChange = (uri: string) => {
    setForm((prev) => ({ ...prev, avatar: uri }));
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        jobTitle: form.jobTitle,
        company: form.company,
        email: form.email,
        dob: form.dob,
        gender: form.gender,
        location: form.location,
        bio: form.bio,
        avatar: form.avatar,
        skills: form.skills,
        experienceLevel: form.experienceLevel,
        yearsOfExperience: form.yearsOfExperience,
      });
      router.replace({
        pathname: "/profile",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save profile. Please try again.");
    }
  };

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !form.skills.includes(trimmed)) {
      setForm((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
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

  const handleDobChange = (date: Date) => {
    handleInputChange("dob", formatDob(date));
  };

  const openDobPicker = () => {
    const currentDate = parseDobString(form.dob) ?? new Date();

    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        mode: "date",
        value: currentDate,
        onChange: (_event: DateTimePickerEvent, selectedDate?: Date) => {
          if (selectedDate) {
            handleDobChange(selectedDate);
          }
        },
        maximumDate: new Date(),
      });
    } else {
      setTempDob(currentDate);
      setDobModalVisible(true);
    }
  };

  const handleDobConfirm = () => {
    handleDobChange(tempDob);
    setDobModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.topBar}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={palette.text} />
      </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
          <View style={styles.placeholder} />
        </View>

      {/* Profile Icon */}
      <View style={styles.imageContainer}>
        <Image
          source={form.avatar && form.avatar !== 'default' ? { uri: form.avatar } : require('@/assets/images/profile.png')}
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

          <Text style={styles.label}>Company</Text>
          <TextInput
            placeholder="Enter company"
            value={form.company}
            onChangeText={(t) => handleInputChange("company", t)}
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
          <TouchableOpacity style={styles.inputWithIcon} onPress={openDobPicker} activeOpacity={0.8}>
            <Text style={[styles.dateText, !form.dob && styles.datePlaceholder]}>
              {form.dob || "Select date"}
            </Text>
            <MaterialIcons name="calendar-today" size={20} color={palette.tint} />
          </TouchableOpacity>

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

          <Text style={styles.label}>Bio</Text>
          <TextInput
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={4}
            value={form.bio}
            onChangeText={(t) => handleInputChange("bio", t)}
            style={[styles.input, styles.bioInput]}
            placeholderTextColor={placeholderColor}
        />

        <Text style={styles.label}>Skills</Text>
        <View style={styles.skillsInputContainer}>
          <TextInput
            placeholder="Add a skill (e.g., React, Python, Design)"
            value={newSkill}
            onChangeText={setNewSkill}
            onSubmitEditing={handleAddSkill}
            returnKeyType="done"
            style={[styles.skillInput, { flex: 1 }]}
            placeholderTextColor={placeholderColor}
          />
          <TouchableOpacity
            onPress={handleAddSkill}
            style={[styles.addSkillButton, { backgroundColor: accent }]}
            activeOpacity={0.8}
          >
            <MaterialIcons name="add" size={20} color={saveTextColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.skillsContainer}>
          {form.skills.map((skill, index) => (
            <View key={index} style={[styles.skillTag, { backgroundColor: surface, borderColor }]}>
              <Text style={[styles.skillTagText, { color: palette.text }]}>{skill}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveSkill(skill)}
                style={styles.removeSkillButton}
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              >
                <MaterialIcons name="close" size={16} color={palette.text} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Text style={styles.label}>Experience Level</Text>
        <View style={styles.experienceContainer}>
          {(["entry", "mid", "senior", "executive"] as const).map((level) => {
            const levelLabels: Record<string, string> = {
              entry: "Entry Level",
              mid: "Mid Level",
              senior: "Senior Level",
              executive: "Executive",
            };
            return (
              <TouchableOpacity
                key={level}
                onPress={() => handleInputChange("experienceLevel", level)}
                style={[
                  styles.experienceOption,
                  form.experienceLevel === level && styles.experienceActive,
                  { borderColor },
                ]}
              >
                {form.experienceLevel === level && (
                  <MaterialIcons
                    name="check-circle"
                    size={18}
                    color={colorScheme === "dark" ? "#151718" : "#fff"}
                    style={{ marginRight: 5 }}
                  />
                )}
                <Text
                  style={[
                    styles.experienceText,
                    form.experienceLevel === level && styles.experienceTextActive,
                  ]}
                >
                  {levelLabels[level]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Years of Experience</Text>
        <TextInput
          placeholder="Enter years of experience"
          value={form.yearsOfExperience}
          onChangeText={(t) => handleInputChange("yearsOfExperience", t)}
          keyboardType="numeric"
          style={styles.input}
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

      {Platform.OS === "ios" && (
        <Modal
          visible={dobModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setDobModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setDobModalVisible(false)}>
                  <Text style={styles.modalSecondary}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Select date</Text>
                <TouchableOpacity onPress={handleDobConfirm}>
                  <Text style={styles.modalPrimary}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalPickerContainer}>
                <DateTimePicker
                  mode="date"
                  value={tempDob}
                  onChange={(_event: DateTimePickerEvent, selectedDate?: Date) => {
                    if (selectedDate) {
                      setTempDob(selectedDate);
                    }
                  }}
                  maximumDate={new Date()}
                  display="spinner"
                  style={styles.modalPicker}
                  themeVariant={colorScheme}
                  textColor={palette.text}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const createStyles = (colorScheme: "light" | "dark", palette: ThemePalette) => {
  const accent = colorScheme === "dark" ? "#F4A300" : palette.tint;
  const borderColor = colorScheme === "dark" ? "#2F3133" : "#F4A300";
  const surface = colorScheme === "dark" ? "#1F2022" : "#FFFCF5";
  const secondaryText = colorScheme === "dark" ? "#D0D4DA" : "#333";
  const saveTextColor = colorScheme === "dark" ? "#151718" : "#fff";
  const placeholderColor = colorScheme === "dark" ? "#8A8F98" : "#A1A5AD";
  const backButtonBackground = colorScheme === "dark" ? "#2A2C31" : "#F2F3F7";
  const modalDividerColor = colorScheme === "dark" ? "#33363B" : "#E4E7EC";

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
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    backButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: backButtonBackground,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text,
      flex: 1,
      textAlign: "center",
    },
    placeholder: {
      width: 36,
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
    inputWithIcon: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor,
      borderRadius: 12,
      paddingHorizontal: 12,
      backgroundColor: surface,
      minHeight: 48,
    },
    dateText: {
      flex: 1,
      color: palette.text,
      fontSize: 14,
    },
    datePlaceholder: {
      color: placeholderColor,
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
    bioInput: {
      height: 110,
      textAlignVertical: "top",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.45)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: palette.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingBottom: 32,
      overflow: "hidden",
    },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: modalDividerColor,
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: palette.text,
    },
    modalPrimary: {
      color: accent,
      fontWeight: "600",
      fontSize: 15,
    },
    modalSecondary: {
      color: secondaryText,
      fontSize: 15,
    },
    modalPickerContainer: {
      paddingHorizontal: 20,
      paddingBottom: 16,
      paddingTop: 4,
      backgroundColor: palette.background,
    },
    modalPicker: {
      backgroundColor: palette.background,
      height: 220,
      alignSelf: "stretch",
    },
    skillsInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
    },
    skillInput: {
      backgroundColor: surface,
      borderWidth: 1,
      borderColor,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: palette.text,
    },
    addSkillButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 10,
    },
    skillTag: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      gap: 6,
    },
    skillTagText: {
      fontSize: 13,
      fontWeight: "500",
    },
    removeSkillButton: {
      padding: 2,
    },
    experienceContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 8,
    },
    experienceOption: {
      flex: 1,
      minWidth: "45%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderRadius: 25,
      paddingVertical: 10,
      backgroundColor: surface,
    },
    experienceActive: {
      backgroundColor: accent,
    },
    experienceText: {
      color: palette.text,
      fontWeight: "500",
      fontSize: 13,
    },
    experienceTextActive: {
      color: saveTextColor,
    },
  });

  return { styles, placeholderColor };
};

