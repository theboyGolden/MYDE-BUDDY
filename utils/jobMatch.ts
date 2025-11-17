import type { Job } from "@/data/jobs";

// Mock user profile - In a real app, this would come from user context/profile
export interface UserProfile {
  skills: string[];
  experienceLevel: "entry" | "mid" | "senior" | "executive";
  yearsOfExperience: number;
  preferredCategories?: string[];
}

// Default user profile (can be replaced with actual user data)
export const DEFAULT_USER_PROFILE: UserProfile = {
  skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "UI Design",
    "Figma",
    "Front End",
    "Design & Creative",
    "Wireframing UX",
    "Prototype",
  ],
  experienceLevel: "mid",
  yearsOfExperience: 3,
  preferredCategories: ["technology", "design"],
};

/**
 * Calculate match percentage between user profile and job
 * Factors considered:
 * 1. Skills match (60% weight) - how many job tags match user skills
 * 2. Experience level match (25% weight) - how well user experience matches job requirement
 * 3. Category preference (15% weight) - if job category is in user's preferred categories
 */
export function calculateJobMatch(
  job: Job,
  userProfile: UserProfile = DEFAULT_USER_PROFILE
): number {
  // 1. Skills Match (60% weight)
  const jobTags = job.tags.map((tag) => tag.toLowerCase());
  const userSkills = userProfile.skills.map((skill) => skill.toLowerCase());

  // Calculate skill overlap
  const matchingSkills = jobTags.filter((tag) =>
    userSkills.some((skill) => {
      // Check for exact match or partial match
      return skill.includes(tag) || tag.includes(skill);
    })
  );

  const skillsMatchPercentage =
    jobTags.length > 0 ? (matchingSkills.length / jobTags.length) * 100 : 0;
  const skillsScore = (skillsMatchPercentage / 100) * 60;

  // 2. Experience Level Match (25% weight)
  const experienceLevels: Record<string, number> = {
    entry: 1,
    mid: 2,
    senior: 3,
    executive: 4,
  };

  const userLevel = experienceLevels[userProfile.experienceLevel] || 2;
  const jobLevel = experienceLevels[job.experienceLevel] || 2;

  // Perfect match = 100%, one level difference = 75%, two levels = 50%, etc.
  const levelDiff = Math.abs(userLevel - jobLevel);
  let experienceScore = 0;
  if (levelDiff === 0) {
    experienceScore = 100;
  } else if (levelDiff === 1) {
    experienceScore = 75;
  } else if (levelDiff === 2) {
    experienceScore = 50;
  } else {
    experienceScore = 25;
  }

  // Bonus if user has more experience than required
  if (userLevel > jobLevel) {
    experienceScore = Math.min(100, experienceScore + 10);
  }

  const experienceWeightedScore = (experienceScore / 100) * 25;

  // 3. Category Preference (15% weight)
  let categoryScore = 0;
  if (
    userProfile.preferredCategories &&
    userProfile.preferredCategories.includes(job.category)
  ) {
    categoryScore = 100;
  } else {
    // Still give some points if category is related
    categoryScore = 30;
  }
  const categoryWeightedScore = (categoryScore / 100) * 15;

  // Calculate total match percentage
  const totalMatch = Math.round(
    skillsScore + experienceWeightedScore + categoryWeightedScore
  );

  // Ensure match is between 0 and 100
  return Math.max(0, Math.min(100, totalMatch));
}

/**
 * Get recommendations for improving job match
 */
export interface MatchRecommendation {
  type: "skill" | "experience" | "category";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  impact: number; // Estimated match improvement percentage
}

export function getMatchRecommendations(
  job: Job,
  userProfile: UserProfile = DEFAULT_USER_PROFILE
): MatchRecommendation[] {
  const recommendations: MatchRecommendation[] = [];
  const matchPercentage = calculateJobMatch(job, userProfile);

  // If already a top match (90%+), return minimal recommendations
  if (matchPercentage >= 90) {
    return [
      {
        type: "skill",
        title: "You're a great match!",
        description: "Your skills and experience align well with this position. Consider highlighting your most relevant experience in your application.",
        priority: "low",
        impact: 0,
      },
    ];
  }

  // 1. Missing Skills Analysis
  const jobTags = job.tags.map((tag) => tag.toLowerCase());
  const userSkills = userProfile.skills.map((skill) => skill.toLowerCase());
  const missingSkills = jobTags.filter(
    (tag) => !userSkills.some((skill) => skill.includes(tag) || tag.includes(skill))
  );

  if (missingSkills.length > 0) {
    const topMissingSkills = missingSkills.slice(0, 3);
    recommendations.push({
      type: "skill",
      title: `Learn ${topMissingSkills[0]}`,
      description: `This job requires ${topMissingSkills.join(", ")}. Consider learning these skills to improve your match by up to ${Math.min(30, missingSkills.length * 5)}%.`,
      priority: missingSkills.length > 2 ? "high" : "medium",
      impact: Math.min(30, missingSkills.length * 5),
    });
  }

  // 2. Experience Level Analysis
  const experienceLevels: Record<string, number> = {
    entry: 1,
    mid: 2,
    senior: 3,
    executive: 4,
  };

  const userLevel = experienceLevels[userProfile.experienceLevel] || 2;
  const jobLevel = experienceLevels[job.experienceLevel] || 2;

  if (userLevel < jobLevel) {
    const levelDiff = jobLevel - userLevel;
    const levelNames = ["entry", "mid", "senior", "executive"];
    recommendations.push({
      type: "experience",
      title: `Gain ${levelDiff === 1 ? "more" : `${levelDiff} levels of`} experience`,
      description: `This role requires ${job.experienceLevel} level experience, but you're at ${userProfile.experienceLevel} level. Consider gaining more experience in similar roles or taking on more responsibilities.`,
      priority: levelDiff >= 2 ? "high" : "medium",
      impact: levelDiff * 8,
    });
  }

  // 3. Category Preference
  if (
    !userProfile.preferredCategories ||
    !userProfile.preferredCategories.includes(job.category)
  ) {
    const categoryNames: Record<string, string> = {
      technology: "Technology",
      marketing: "Marketing",
      sales: "Sales",
      design: "Design",
      management: "Management",
      "customer-service": "Customer Service",
    };

    recommendations.push({
      type: "category",
      title: `Explore ${categoryNames[job.category] || job.category} roles`,
      description: `This job is in the ${categoryNames[job.category] || job.category} category. Consider exploring similar roles to build relevant experience.`,
      priority: "low",
      impact: 10,
    });
  }

  // Sort by priority and impact
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  recommendations.sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return b.impact - a.impact;
  });

  return recommendations;
}

