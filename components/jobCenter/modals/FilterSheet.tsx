import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BRAND,
  GRADIENT_END,
  GRADIENT_START,
  TEXT_MUTED,
  WHITE,
} from "@/constants/colors";

/* ------------------- TYPES --------------------- */

export type FilterOptions = {
  category?: string;
  jobType?: string;
  experienceLevel?: string;
  workMode?: string;
  company?: string;
  timePosted?: string;
  location?: string;
  salaryUnit?: string;
  salaryMin?: string;
  salaryMax?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
};

type Option = { label: string; value: string };

/* ------------------- DROPDOWN DATA (from screenshots) --------------------- */

// Categories
const CATEGORIES: Option[] = [
  { label: "All Categories", value: "all" },
  { label: "Technology", value: "technology" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Design", value: "design" },
  { label: "Management", value: "management" },
  { label: "Customer Service", value: "customer-service" },
];

// Job Types (header shows “All Job Types”; keeping a practical set)
const JOB_TYPES: Option[] = [
  { label: "All Job Types", value: "all" },
  { label: "Full Time", value: "full-time" },
  { label: "Part Time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Freelance", value: "freelance" },
  { label: "Internship", value: "internship" },
];

// Experience levels
const EXPERIENCE_LEVELS: Option[] = [
  { label: "All Experience Levels", value: "all" },
  { label: "Entry Level", value: "entry" },
  { label: "Mid Level", value: "mid" },
  { label: "Senior Level", value: "senior" },
  { label: "Executive", value: "executive" },
];

// Work modes
const WORK_MODES: Option[] = [
  { label: "All Work Modes", value: "all" },
  { label: "Onsite", value: "onsite" },
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
];

// Companies
const COMPANIES: Option[] = [
  { label: "All Companies", value: "all" },
  { label: "TechCorp Solutions", value: "techcorp-solutions" },
  { label: "Global Marketing Inc", value: "global-marketing-inc" },
  { label: "Data Insights Ltd", value: "data-insights-ltd" },
  { label: "SalesForce Pro", value: "salesforce-pro" },
  { label: "Creative Design Studio", value: "creative-design-studio" },
  { label: "Project Solutions Co", value: "project-solutions-co" },
  { label: "Content Creators Ltd", value: "content-creators-ltd" },
  { label: "Customer First Inc", value: "customer-first-inc" },
];

// Time posted
const TIME_POSTED: Option[] = [
  { label: "All Time", value: "all" },
  { label: "Last 24 hours", value: "24h" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
];

// Locations (you already had these)
const LOCATIONS: Option[] = [
  { label: "Remote", value: "remote" },
  { label: "United States", value: "us" },
  { label: "Canada", value: "canada" },
  { label: "Germany", value: "germany" },
  { label: "Ghana", value: "ghana" },
  { label: "Switzerland", value: "switzerland" },
];

// Salary units (keep your original set)
const SALARY_UNITS: Option[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
  { label: "Hourly", value: "hourly" },
];

/* ------------------- COMPONENT --------------------- */

export default function FilterSheet({
  visible,
  onClose,
  onApply,
  initialFilters,
}: Props) {
  // ✅ Default selected values (so each dropdown shows something by default)
  const [filters, setFilters] = useState<FilterOptions>({
    category: CATEGORIES[0].value,
    jobType: JOB_TYPES[0].value,
    experienceLevel: EXPERIENCE_LEVELS[0].value,
    workMode: WORK_MODES[0].value,
    company: COMPANIES[0].value,
    timePosted: TIME_POSTED[0].value,
    location: LOCATIONS[0].value, // optional default
    salaryUnit: "monthly",
    salaryMin: "",
    salaryMax: "",
    ...initialFilters,
  });

  // Which dropdown is open
  const [open, setOpen] = useState<null | keyof FilterOptions>(null);

  // bottom-sheet animation
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: visible ? 1 : 0,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    if (!visible) setOpen(null);
  }, [visible]);

  const translateY = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  const labelFor = (value: string | undefined, arr: Option[]) =>
    arr.find((x) => x.value === value)?.label || "Select";

  // Reusable dropdown (same design)
  const Dropdown = ({
    label,
    type,
    options,
    z,
  }: {
    label: string;
    type: keyof FilterOptions;
    options: Option[];
    z: number;
  }) => {
    const isOpen = open === type;
    const selectedLabel = labelFor(filters[type], options);

    return (
      <View style={[styles.dropdownWrapper, { zIndex: z }]}>
        <Text style={styles.sectionLabel}>{label}</Text>

        <TouchableOpacity
          onPress={() => setOpen(isOpen ? null : type)}
          style={[styles.dropdownButton, isOpen && styles.dropdownButtonActive]}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.dropdownButtonText,
              selectedLabel !== "Select" && styles.dropdownButtonSelected,
            ]}
          >
            {selectedLabel}
          </Text>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={18}
            color={BRAND}
          />
        </TouchableOpacity>

        {isOpen && (
          <View style={[styles.dropdownMenu, { zIndex: z + 50 }]}>
            <ScrollView>
              {options.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => {
                    setFilters((f) => ({ ...f, [type]: opt.value }));
                    setOpen(null);
                  }}
                  style={[
                    styles.dropdownItem,
                    filters[type] === opt.value && styles.dropdownItemSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      filters[type] === opt.value &&
                        styles.dropdownItemTextSelected,
                    ]}
                  >
                    {opt.label}
                  </Text>

                  {filters[type] === opt.value && (
                    <Ionicons name="checkmark" size={16} color={BRAND} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters({
      category: CATEGORIES[0].value,
      jobType: JOB_TYPES[0].value,
      experienceLevel: EXPERIENCE_LEVELS[0].value,
      workMode: WORK_MODES[0].value,
      company: COMPANIES[0].value,
      timePosted: TIME_POSTED[0].value,
      location: LOCATIONS[0].value,
      salaryUnit: "monthly",
      salaryMin: "",
      salaryMax: "",
    });
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      {/* Blur overlay */}
      <View style={StyleSheet.absoluteFill}>
        <BlurView tint="dark" intensity={40} style={StyleSheet.absoluteFill} />
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding" })}
        style={styles.container}
      >
        {/* Bottom sheet */}
        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filter Jobs</Text>
          </View>

          {/* Content */}
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Dropdown label="Job Category" type="category" options={CATEGORIES} z={9999} />
            <Dropdown label="All Job Types" type="jobType" options={JOB_TYPES} z={9998} />
            <Dropdown label="All Experience Levels" type="experienceLevel" options={EXPERIENCE_LEVELS} z={9997} />
            <Dropdown label="All Work Modes" type="workMode" options={WORK_MODES} z={9996} />
            <Dropdown label="All Companies" type="company" options={COMPANIES} z={9995} />
            <Dropdown label="Time" type="timePosted" options={TIME_POSTED} z={9994} />
            <Dropdown label="Location" type="location" options={LOCATIONS} z={9993} />

            {/* Salary header + unit dropdown */}
            <View style={styles.salaryHeaderRow}>
              <Text style={styles.sectionLabel}>Salary</Text>

              <View style={{ zIndex: 9992 }}>
                <TouchableOpacity
                  onPress={() => setOpen(open === "salaryUnit" ? null : "salaryUnit")}
                  style={styles.salaryUnitBtn}
                >
                  <Text style={styles.salaryUnitText}>
                    {labelFor(filters.salaryUnit, SALARY_UNITS)}
                  </Text>
                  <Ionicons
                    name={open === "salaryUnit" ? "chevron-up" : "chevron-down"}
                    size={16}
                    color={BRAND}
                  />
                </TouchableOpacity>

                {open === "salaryUnit" && (
                  <View style={styles.salaryUnitMenu}>
                    {SALARY_UNITS.map((opt) => (
                      <TouchableOpacity
                        key={opt.value}
                        style={[
                          styles.salaryUnitItem,
                          filters.salaryUnit === opt.value && styles.salaryUnitItemSelected,
                        ]}
                        onPress={() => {
                          setFilters((f) => ({ ...f, salaryUnit: opt.value }));
                          setOpen(null);
                        }}
                      >
                        <Text
                          style={[
                            styles.salaryUnitItemText,
                            filters.salaryUnit === opt.value && styles.salaryUnitItemTextSelected,
                          ]}
                        >
                          {opt.label}
                        </Text>

                        {filters.salaryUnit === opt.value && (
                          <Ionicons name="checkmark" size={14} color={BRAND} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            {/* Salary Min/Max */}
            <View style={styles.salaryRow}>
              <View style={{ flex: 1 }}>
                <View style={styles.salaryFieldBox}>
                  <Text style={styles.salaryPrefix}>$</Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="150"
                    value={filters.salaryMin}
                    onChangeText={(t) => setFilters((f) => ({ ...f, salaryMin: t }))}
                    style={styles.salaryInput}
                  />
                </View>
                <Text style={styles.salaryCaption}>Min. Salary</Text>
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.salaryFieldBox}>
                  <Text style={styles.salaryPrefix}>$</Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="350"
                    value={filters.salaryMax}
                    onChangeText={(t) => setFilters((f) => ({ ...f, salaryMax: t }))}
                    style={styles.salaryInput}
                  />
                </View>
                <Text style={styles.salaryCaption}>Max. Salary</Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.85}>
              <LinearGradient colors={[GRADIENT_START, GRADIENT_END]} style={styles.applyGradient}>
                <Text style={styles.applyText}>Apply Filters</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleClear}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

/* ------------------- STYLES --------------------- */

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject },
  container: { ...StyleSheet.absoluteFillObject, justifyContent: "flex-end" },
  sheet: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "85%",
  },

  /* Header */
  header: {
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtn: {
    position: "absolute",
    left: 20,
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 70,
  },

  /* Dropdowns */
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: TEXT_MUTED,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  dropdownWrapper: {
    marginBottom: 22,
    position: "relative",
  },
  dropdownButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownButtonActive: {
    borderColor: BRAND,
    backgroundColor: "#fff6ea",
  },
  dropdownButtonText: {
    color: TEXT_MUTED,
    fontSize: 16,
  },
  dropdownButtonSelected: {
    color: "#111",
    fontWeight: "600",
  },

  dropdownMenu: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 20,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  dropdownItemSelected: {
    backgroundColor: "#fff4e5",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#374151",
  },
  dropdownItemTextSelected: {
    color: BRAND,
    fontWeight: "700",
  },

  /* Salary */
  salaryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 10,
  },

  salaryUnitBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  salaryUnitText: {
    color: BRAND,
    fontWeight: "600",
    marginRight: 6,
  },

  salaryUnitMenu: {
    position: "absolute",
    top: 48,
    right: 0,
    width: 140,
    backgroundColor: WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 20,
    zIndex: 9999,
  },
  salaryUnitItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  salaryUnitItemSelected: { backgroundColor: "#fff4e5" },
  salaryUnitItemText: {
    fontSize: 15,
    color: "#374151",
  },
  salaryUnitItemTextSelected: {
    color: BRAND,
    fontWeight: "700",
  },

  salaryRow: {
    flexDirection: "row",
    gap: 12,
  },
  salaryFieldBox: {
    height: 52,
    borderRadius: 14,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  salaryPrefix: {
    color: "#6b7280",
    fontWeight: "700",
    marginRight: 6,
  },
  salaryInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  salaryCaption: {
    marginTop: 6,
    fontSize: 12,
    color: TEXT_MUTED,
  },

  /* Footer */
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  applyBtn: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  applyGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  applyText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: "700",
  },
  clearText: {
    color: "#ef4444",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
  },
});
