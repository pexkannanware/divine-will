export type AssessmentDomain =
  | "depression"
  | "anxiety"
  | "stress"
  | "burnout"
  | "sleep"
  | "selfEsteem"
  | "socialAnxiety"
  | "wellbeing";

export type ResultLevel = "low" | "notice" | "support";

export const responseOptions = [
  { value: 0, short: "Not at all", detail: "Not at all" },
  { value: 1, short: "A little", detail: "Occasionally / a little" },
  { value: 2, short: "Quite a lot", detail: "Often / quite a lot" },
  { value: 3, short: "Very much", detail: "Almost every day / very much" },
] as const;

export const assessmentSections = [
  {
    domain: "depression" as const,
    label: "Depression",
    shortLabel: "Low mood",
    questions: [
      "I have lost interest or pleasure in activities that I usually enjoy.",
      "I have been feeling sad, empty, low, or hopeless.",
      "I feel tired or lack energy even after resting.",
    ],
  },
  {
    domain: "anxiety" as const,
    label: "Anxiety",
    shortLabel: "Worry & unease",
    questions: [
      "I feel nervous, worried, or uneasy without a clear reason.",
      "I find it difficult to control or stop worrying.",
      "I notice physical signs of anxiety, such as a racing heart, trembling, breathlessness, or stomach discomfort.",
    ],
  },
  {
    domain: "stress" as const,
    label: "Stress",
    shortLabel: "Pressure & tension",
    questions: [
      "I feel under pressure or overwhelmed by my responsibilities.",
      "I find it difficult to relax, even when I have time to rest.",
      "I become irritated, impatient, or emotionally overwhelmed easily.",
    ],
  },
  {
    domain: "burnout" as const,
    label: "Burnout",
    shortLabel: "Emotional exhaustion",
    questions: [
      "I feel emotionally or physically exhausted by the demands in my life.",
      "I feel I have less energy, motivation, or capacity than I used to.",
    ],
  },
  {
    domain: "sleep" as const,
    label: "Sleep Quality",
    shortLabel: "Rest & recovery",
    questions: [
      "I have difficulty falling asleep, staying asleep, or wake earlier than I want to.",
      "My sleep does not leave me feeling rested or restored.",
    ],
  },
  {
    domain: "selfEsteem" as const,
    label: "Self-Esteem",
    shortLabel: "Self-worth",
    questions: [
      "I have been critical of myself or felt that I am not good enough.",
      "I have felt worthless, guilty, or like a failure.",
    ],
  },
  {
    domain: "socialAnxiety" as const,
    label: "Social Anxiety",
    shortLabel: "Social comfort",
    questions: [
      "I feel very self-conscious or fear being judged around other people.",
      "I avoid people, conversations, or situations because they make me anxious.",
    ],
  },
  {
    domain: "wellbeing" as const,
    label: "Emotional Well-being",
    shortLabel: "Emotional balance",
    questions: [
      "I find it difficult to manage strong emotions when they arise.",
      "My emotional state interferes with my concentration, relationships, or daily activities.",
      "I have felt disconnected from myself, other people, or the things that give my life meaning.",
    ],
  },
] as const;

export const totalQuestionCount = assessmentSections.reduce(
  (total, section) => total + section.questions.length,
  0,
);

export function resultLevel(score: number, max: number): ResultLevel {
  const ratio = score / max;
  if (ratio <= 1 / 3) return "low";
  if (ratio <= 2 / 3) return "notice";
  return "support";
}

export function domainInterpretation(score: number, max: number) {
  const level = resultLevel(score, max);
  if (level === "low") return "This area looks relatively settled right now.";
  if (level === "notice") return "There are a few signs here worth gently noticing.";
  return "This area may be weighing on you and could benefit from support.";
}

export function overallInterpretation(score: number) {
  if (score <= 20) return "You seem to be coping steadily";
  if (score <= 40) return "A few areas may need your attention";
  return "Some extra support could feel helpful";
}
