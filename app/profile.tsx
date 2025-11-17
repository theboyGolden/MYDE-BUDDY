import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    type ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { useUserProfile } from "@/contexts/user-profile-context";

type ExperienceItem = {
  logo: ImageSourcePropType;
  title: string;
  company: string;
};

type EducationItem = {
  logo: ImageSourcePropType;
  title: string;
  subtitle: string;
};

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

const parseSkills = (value: string | string[] | undefined): string[] => {
  if (!value) return ["Design & Creative", "Wireframing UX", "Figma", "UI Design", "Prototype", "Adobe XD", "UX Design", "Front End"];
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    if (value.includes(",")) {
      return value.split(",").map(s => s.trim()).filter(Boolean);
    }
  }
  return [value].filter(Boolean);
};

const EXPERIENCE_ITEMS: ReadonlyArray<ExperienceItem> = [
  {
    logo: require("@/assets/images/netflix.png"),
    title: "Sr. UI Designer",
    company: "Netflix • 2019",
  },
  {
    logo: require("@/assets/images/paypal.png"),
    title: "Junior UI Designer",
    company: "PayPal • 2020",
  },
  {
    logo: require("@/assets/images/spotify.png"),
    title: "UI/UX Designer",
    company: "Spotify • 2021",
  },
] as const;

const EDUCATION_ITEMS: ReadonlyArray<EducationItem> = [
  {
    logo: require("@/assets/images/university-of-oxford-badge-logo.png"),
    title: "University of Oxford",
    subtitle: "Computer Science • 2020",
  },
] as const;

type ThemePalette = typeof Colors.light;

export default function ProfileScreen() {
  const router = useRouter();
  const { colorScheme } = useTheme();
  const { profile } = useUserProfile();
  const palette = useMemo<ThemePalette>(() => Colors[colorScheme], [colorScheme]);
  const accent = useMemo(
    () => (colorScheme === "dark" ? "#F4A300" : palette.tint),
    [colorScheme, palette.tint]
  );
  const iconOnAccent = colorScheme === "dark" ? "#151718" : "#fff";
  const styles = useMemo(() => createStyles(colorScheme, accent, palette), [colorScheme, accent, palette]);

  const user = useMemo(() => {
    return {
      firstName: profile.firstName,
      lastName: profile.lastName,
      jobTitle: profile.jobTitle,
      company: profile.company,
      email: profile.email,
      dob: profile.dob,
      gender: profile.gender,
      location: profile.location,
      bio: profile.bio,
      avatar: profile.avatar,
    };
  }, [profile]);

  const userSkills = useMemo(() => profile.skills, [profile.skills]);
  const experienceLevel = useMemo(() => profile.experienceLevel, [profile.experienceLevel]);
  const yearsOfExperience = useMemo(() => profile.yearsOfExperience, [profile.yearsOfExperience]);

  const handleEditPress = () => {
    router.push({
      pathname: "/user-info",
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={palette.text} />
        </TouchableOpacity>
      </View>

     
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={user.avatar && user.avatar !== 'default' ? { uri: user.avatar } : require('@/assets/images/profile.png')}
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
            <TouchableOpacity style={styles.editBtn} onPress={handleEditPress}>
              <MaterialIcons name="edit" size={22} color={iconOnAccent} />
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
        {EXPERIENCE_ITEMS.map((exp, index) => (
          <View key={index} style={styles.expItem}>
            <Image source={exp.logo} style={styles.expIcon} />
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
          {userSkills.map((skill, i) => (
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

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <View style={styles.experienceInfo}>
          <Text style={[styles.experienceLabel, { color: palette.text }]}>
            Level: <Text style={styles.experienceValue}>{experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)}</Text>
          </Text>
          <Text style={[styles.experienceLabel, { color: palette.text }]}>
            Years: <Text style={styles.experienceValue}>{yearsOfExperience} {yearsOfExperience === "1" ? "year" : "years"}</Text>
          </Text>
        </View>
      </View>

      {/* Education Section */}
      <View style={[styles.section, { marginBottom: 60 }]}>
        <Text style={styles.sectionTitle}>Education</Text>
        {EDUCATION_ITEMS.map((education, index) => (
          <View key={index} style={styles.expItem}>
            <Image source={education.logo} style={styles.expIcon} />
            <View>
              <Text style={styles.expTitle}>{education.title}</Text>
              <Text style={styles.expSub}>{education.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const createShadow = (colorScheme: "light" | "dark") => {
  if (colorScheme === "dark") {
    return {
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 12,
      elevation: 8,
    };
  }

  return {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  };
};

const createStyles = (colorScheme: "light" | "dark", accent: string, palette: ThemePalette) => {
  const secondaryText = colorScheme === "dark" ? "#C4C8CF" : "#666";
  const tertiaryText = colorScheme === "dark" ? "#A1A5AD" : "#777";
  const neutralSurface = colorScheme === "dark" ? "#2A2C31" : "#E9EBEE";
  const chipSurface = colorScheme === "dark" ? "#2A2C31" : "#F4F4F4";
  const emphasisText = colorScheme === "dark" ? "#151718" : "#fff";

  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: palette.background },
    container: { flex: 1, backgroundColor: palette.background },
    contentContainer: { paddingBottom: 40 },
    topBar: {
      marginTop: 8,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    backButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colorScheme === "dark" ? "#2A2C31" : "#F2F3F7",
    },
    editBtn: {
      backgroundColor: accent,
      borderRadius: 25,
      padding: 10,
      ...createShadow(colorScheme),
    },
    profileSection: { alignItems: "center", marginTop: 20, paddingHorizontal: 20 },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 20,
      borderWidth: 4,
      borderColor: palette.background,
    },
    name: { fontSize: 22, fontWeight: "700", marginTop: 8, color: palette.text },
    role: { fontSize: 14, color: secondaryText },
    company: { color: accent, fontWeight: "600" },
    bio: { fontSize: 13, color: tertiaryText, marginVertical: 4 },
    buttonRow: { flexDirection: "row", gap: 10, marginTop: 12 },
    sendBtn: {
      backgroundColor: accent,
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
    activeSkillChip: { backgroundColor: accent },
    activeSkillText: { color: emphasisText },
    experienceInfo: {
      gap: 8,
    },
    experienceLabel: {
      fontSize: 14,
      fontWeight: "500",
      marginBottom: 4,
    },
    experienceValue: {
      fontWeight: "700",
      color: accent,
    },
  });
};
