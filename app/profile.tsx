import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useMemo } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { NavigationProp } from "@react-navigation/native";

import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";

const DEFAULT_USER = {
  firstName: "Pyotr",
  lastName: "Kodzhebash",
  jobTitle: "Front End Developer",
  company: "Lunar Studio",
  email: "pyotr@example.com",
  dob: "12 March 1995",
  gender: "Male",
  location: "Accra, Ghana",
  bio: "Art and draw only by coding.",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const paramToString = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
};

export default function ProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
  const { colorScheme, toggleTheme } = useTheme();
  const palette = useMemo(() => Colors[colorScheme], [colorScheme]);
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);

  const user = useMemo(() => {
    const mergedUser = { ...DEFAULT_USER };

    const firstName = paramToString(params.firstName);
    if (firstName) mergedUser.firstName = firstName;

    const lastName = paramToString(params.lastName);
    if (lastName) mergedUser.lastName = lastName;

    const jobTitle = paramToString(params.jobTitle);
    if (jobTitle) mergedUser.jobTitle = jobTitle;

    const email = paramToString(params.email);
    if (email) mergedUser.email = email;

    const dob = paramToString(params.dob);
    if (dob) mergedUser.dob = dob;

    const gender = paramToString(params.gender);
    if (gender) mergedUser.gender = gender;

    const location = paramToString(params.location);
    if (location) mergedUser.location = location;

    const avatar = paramToString(params.avatar);
    if (avatar) mergedUser.avatar = avatar;

    return mergedUser;
  }, [
    params.dob,
    params.email,
    params.firstName,
    params.gender,
    params.jobTitle,
    params.lastName,
    params.location,
    params.avatar,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ThemeToggleButton colorScheme={colorScheme} onToggle={toggleTheme} />,
      headerStyle: { backgroundColor: palette.background },
      headerTintColor: palette.text,
      headerTitleStyle: { color: palette.text },
      headerShadowVisible: false,
    });
  }, [navigation, colorScheme, toggleTheme, palette]);

  const handleEditPress = () => {
    router.push({
      pathname: "/user-info",
      params: {
        firstName: user.firstName,
        lastName: user.lastName,
        jobTitle: user.jobTitle,
        email: user.email,
        dob: user.dob,
        gender: user.gender,
        location: user.location,
          avatar: user.avatar,
      },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65",
        }}
        style={styles.headerImage}
      />

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={handleEditPress}
      >
        <MaterialIcons name="edit" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: user.avatar,
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.role}>
          {user.jobTitle} at <Text style={styles.company}>{user.company}</Text>
        </Text>
        <Text style={styles.bio}>{user.bio}</Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.sendBtn}>
            <Text style={styles.sendBtnText}>Send Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hiringBtn}>
            <Text style={styles.hiringBtnText}>Hiring</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.sectionText}>{user.bio}</Text>
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {[
          {
            logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
            title: "Sr. UI Designer",
            company: "Netflix • 2019",
          },
          {
            logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/PayPal_2014_logo.png",
            title: "Junior UI Designer",
            company: "PayPal • 2020",
          },
          {
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
            title: "UI/UX Designer",
            company: "Spotify • 2021",
          },
        ].map((exp, index) => (
          <View key={index} style={styles.expItem}>
            <Image source={{ uri: exp.logo }} style={styles.expIcon} />
            <View>
              <Text style={styles.expTitle}>{exp.title}</Text>
              <Text style={styles.expSub}>{exp.company}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Skills Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {[
            "Design & Creative",
            "Wireframing UX",
            "Figma",
            "UI Design",
            "Prototype",
            "Adobe XD",
            "UX Design",
            "Front End",
          ].map((skill, i) => (
            <View
              key={i}
              style={[styles.skillChip, i === 0 && styles.activeSkillChip]}
            >
              <Text
                style={[styles.skillText, i === 0 && styles.activeSkillText]}
              >
                {skill}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Education Section */}
      <View style={[styles.section, { marginBottom: 60 }]}>
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.expItem}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/en/d/d8/University_of_Oxford_coat_of_arms.svg",
            }}
            style={styles.expIcon}
          />
          <View>
            <Text style={styles.expTitle}>University of Oxford</Text>
            <Text style={styles.expSub}>Computer Science • 2020</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (colorScheme: "light" | "dark") => {
  const palette = Colors[colorScheme];
  const secondaryText = colorScheme === "dark" ? "#C4C8CF" : "#666";
  const tertiaryText = colorScheme === "dark" ? "#A1A5AD" : "#777";
  const neutralSurface = colorScheme === "dark" ? "#2A2C31" : "#E9EBEE";
  const chipSurface = colorScheme === "dark" ? "#2A2C31" : "#F4F4F4";
  const emphasisText = colorScheme === "dark" ? "#151718" : "#fff";

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: palette.background },
    headerImage: { width: "100%", height: 140 },
    editBtn: {
      position: "absolute",
      right: 20,
      top: 100,
      backgroundColor: palette.tint,
      borderRadius: 25,
      padding: 10,
      elevation: 4,
    },
    profileSection: { alignItems: "center", marginTop: -40 },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 20,
      borderWidth: 4,
      borderColor: palette.background,
    },
    name: { fontSize: 22, fontWeight: "700", marginTop: 8, color: palette.text },
    role: { fontSize: 14, color: secondaryText },
    company: { color: palette.tint, fontWeight: "600" },
    bio: { fontSize: 13, color: tertiaryText, marginVertical: 4 },
    buttonRow: { flexDirection: "row", gap: 10, marginTop: 12 },
    sendBtn: {
      backgroundColor: palette.tint,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    sendBtnText: { color: emphasisText, fontWeight: "600" },
    hiringBtn: {
      backgroundColor: neutralSurface,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    hiringBtnText: { color: colorScheme === "dark" ? "#EDEFF2" : "#333", fontWeight: "600" },
    section: { paddingHorizontal: 20, marginTop: 30 },
    sectionTitle: { fontWeight: "700", fontSize: 16, marginBottom: 10, color: palette.text },
    sectionText: { color: tertiaryText, lineHeight: 22, fontSize: 14 },
    expItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
      gap: 10,
    },
    expIcon: { width: 30, height: 30, resizeMode: "contain" },
    expTitle: { fontSize: 15, fontWeight: "600", color: palette.text },
    expSub: { color: tertiaryText, fontSize: 13 },
    skillsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    skillChip: {
      backgroundColor: chipSurface,
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 14,
    },
    skillText: { color: palette.text, fontWeight: "500", fontSize: 13 },
    activeSkillChip: { backgroundColor: palette.tint },
    activeSkillText: { color: emphasisText },
  });
};
