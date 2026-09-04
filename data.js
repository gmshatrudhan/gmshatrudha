/* ==========================================================================
   STUDYVERSE — SITE CONTENT
   --------------------------------------------------------------------------
   👉 EDIT THIS FILE to customize the whole site. No other file needs editing
      for content changes. All text below is SAMPLE / PLACEHOLDER content —
      swap in your real subjects, notes, questions and notices.
   ========================================================================== */

const SITE = {
  name: "StudyVerse",
  tagline: "Learn smarter. Score higher.",
  blurb: "All-in-one study hub — syllabus, notes, tests and past papers."
};

/* ----------------------------- 6 SUBJECTS ------------------------------- */
/* Each subject needs: id, name, icon (key from the ICONS map in main.js),
   color (accent), blurb, chapters (count) and notes (count).              */
const SUBJECTS = [
  { id: "math",    name: "Mathematics",      icon: "calc",  color: "#22d3ee", blurb: "Algebra, trigonometry, calculus & more.", chapters: 8,  notes: 24 },
  { id: "physics", name: "Physics",          icon: "atom",  color: "#a78bfa", blurb: "Mechanics, electricity, waves & modern physics.", chapters: 7,  notes: 21 },
  { id: "chemistry", name: "Chemistry",      icon: "flask", color: "#f472b6", blurb: "Reactions, bonding, organic & physical chemistry.", chapters: 6,  notes: 18 },
  { id: "biology", name: "Biology",          icon: "dna",   color: "#4ade80", blurb: "Cell biology, genetics, physiology & ecology.", chapters: 8,  notes: 20 },
  { id: "english", name: "English",          icon: "globe", color: "#fbbf24", blurb: "Grammar, comprehension, essays & literature.", chapters: 5,  notes: 15 },
  { id: "cs",      name: "Computer Science", icon: "code",  color: "#fb7185", blurb: "Programming, web tech, networking & databases.", chapters: 7,  notes: 22 }
];

/* ------------------------------- SYLLABUS ------------------------------- */
/* Key = subject id. Each entry is a chapter title. Sample placeholders.   */
const SYLLABUS = {
  math: [
    "Chapter 1 · Sets & Logic",
    "Chapter 2 · Real Numbers & Functions",
    "Chapter 3 · Algebra",
    "Chapter 4 · Trigonometry",
    "Chapter 5 · Coordinate Geometry",
    "Chapter 6 · Calculus (Limits & Derivatives)",
    "Chapter 7 · Vectors & Matrices",
    "Chapter 8 · Statistics & Probability"
  ],
  physics: [
    "Chapter 1 · Mechanics & Motion",
    "Chapter 2 · Work, Energy & Power",
    "Chapter 3 · Heat & Thermodynamics",
    "Chapter 4 · Waves & Optics",
    "Chapter 5 · Electricity & Magnetism",
    "Chapter 6 · Modern Physics",
    "Chapter 7 · Semiconductors"
  ],
  chemistry: [
    "Chapter 1 · General Chemistry",
    "Chapter 2 · Atomic Structure",
    "Chapter 3 · Chemical Bonding",
    "Chapter 4 · States of Matter",
    "Chapter 5 · Organic Chemistry",
    "Chapter 6 · Electrochemistry"
  ],
  biology: [
    "Chapter 1 · Cell Biology",
    "Chapter 2 · Genetics & Evolution",
    "Chapter 3 · Plant Physiology",
    "Chapter 4 · Human Physiology",
    "Chapter 5 · Reproduction",
    "Chapter 6 · Ecology & Environment",
    "Chapter 7 · Biotechnology",
    "Chapter 8 · Health & Disease"
  ],
  english: [
    "Chapter 1 · Grammar Essentials",
    "Chapter 2 · Reading Comprehension",
    "Chapter 3 · Essay & Letter Writing",
    "Chapter 4 · Literature",
    "Chapter 5 · Vocabulary Building"
  ],
  cs: [
    "Chapter 1 · Computer Fundamentals",
    "Chapter 2 · Programming in C",
    "Chapter 3 · Data Structures",
    "Chapter 4 · Web Technology",
    "Chapter 5 · Computer Networks",
    "Chapter 6 · Database Management",
    "Chapter 7 · Software Engineering"
  ]
};

/* ------------------------------ STUDY NOTES ----------------------------- */
const NOTES = [
  { subject: "math",    title: "Algebra — Complete Solved Notes",        pages: 24, date: "Aug 2026", tag: "Solved" },
  { subject: "math",    title: "Calculus: Limits & Derivatives",         pages: 18, date: "Jul 2026", tag: "Summary" },
  { subject: "physics", title: "Mechanics — Full Chapter Notes",         pages: 22, date: "Aug 2026", tag: "Handwritten" },
  { subject: "physics", title: "Electricity & Magnetism Key Points",     pages: 15, date: "Jul 2026", tag: "Summary" },
  { subject: "chemistry", title: "Organic Chemistry Reactions Map",      pages: 12, date: "Aug 2026", tag: "Solved" },
  { subject: "chemistry", title: "Atomic Structure — Quick Revision",    pages: 9,  date: "Jun 2026", tag: "Summary" },
  { subject: "biology", title: "Cell Biology — Diagrams & Notes",        pages: 20, date: "Aug 2026", tag: "Handwritten" },
  { subject: "biology", title: "Genetics & Evolution Summary",           pages: 14, date: "Jul 2026", tag: "Summary" },
  { subject: "english", title: "Grammar Rules — Complete Guide",         pages: 16, date: "Aug 2026", tag: "Solved" },
  { subject: "cs",      title: "Programming in C — Notes & Examples",    pages: 25, date: "Aug 2026", tag: "Solved" },
  { subject: "cs",      title: "Data Structures Cheat Sheet",            pages: 10, date: "Jul 2026", tag: "Summary" }
];

/* ------------------------------- MCQ / TEST ----------------------------- */
/* Sample quiz. Add as many as you like; 'answer' is the index (0-based)
   of the correct option.                                                 */
const MCQS = [
  {
    subject: "math",
    q: "What is the approximate value of π (pi)?",
    options: ["3.14", "2.71", "1.62", "9.81"],
    answer: 0,
    explain: "π ≈ 3.14159 — the ratio of a circle's circumference to its diameter."
  },
  {
    subject: "chemistry",
    q: "What is the chemical symbol for gold?",
    options: ["Gd", "Au", "Ag", "Go"],
    answer: 1,
    explain: "Gold's symbol is Au, from the Latin word 'aurum'."
  },
  {
    subject: "physics",
    q: "At sea level, water boils at what temperature?",
    options: ["90°C", "100°C", "110°C", "80°C"],
    answer: 1,
    explain: "Water boils at 100°C at standard atmospheric pressure."
  },
  {
    subject: "biology",
    q: "Which organ pumps blood around the human body?",
    options: ["Lungs", "Liver", "Heart", "Brain"],
    answer: 2,
    explain: "The heart is the muscular organ that pumps blood."
  },
  {
    subject: "cs",
    q: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Utility"],
    answer: 0,
    explain: "CPU = Central Processing Unit — the 'brain' of a computer."
  },
  {
    subject: "math",
    q: "What is the value of 7 × 8?",
    options: ["54", "56", "64", "48"],
    answer: 1,
    explain: "7 × 8 = 56."
  }
];

/* ---------------------------- OLD QUESTIONS ----------------------------- */
const OLD_QUESTIONS = [
  { subject: "math",    year: "2080", title: "Mathematics — Final Examination",  meta: "Model Set A · 1.2k downloads" },
  { subject: "math",    year: "2079", title: "Mathematics — Final Examination",  meta: "Model Set B · 980 downloads" },
  { subject: "physics", year: "2080", title: "Physics — Final Examination",      meta: "Model Set A · 860 downloads" },
  { subject: "chemistry", year: "2080", title: "Chemistry — Final Examination",  meta: "Model Set A · 720 downloads" },
  { subject: "biology", year: "2079", title: "Biology — Final Examination",      meta: "Model Set B · 640 downloads" },
  { subject: "english", year: "2080", title: "English — Final Examination",      meta: "Model Set A · 1.1k downloads" },
  { subject: "cs",      year: "2079", title: "Computer Science — Final Exam",    meta: "Model Set A · 530 downloads" }
];

/* ------------------------------ SUBJECTIVE ------------------------------ */
const SUBJECTIVE = [
  { subject: "math",    question: "Prove that the sum of angles in a triangle is 180°.", marks: 5 },
  { subject: "physics", question: "State and explain Newton's three laws of motion with examples.", marks: 8 },
  { subject: "chemistry", question: "Explain the difference between ionic and covalent bonds with examples.", marks: 6 },
  { subject: "biology", question: "Describe the structure and function of the human heart.", marks: 8 },
  { subject: "english", question: "Write an essay on the importance of education in modern society.", marks: 10 },
  { subject: "cs",      question: "Explain the difference between a compiler and an interpreter.", marks: 5 }
];

/* ------------------------------- NOTICES -------------------------------- */
const NOTICES = [
  { date: "Sep 01, 2026", badge: "Exam",    title: "Final Examination Routine Published",      text: "The final exam schedule for all subjects is now available. Check the notice board for details." },
  { date: "Aug 22, 2026", badge: "New",     title: "New Study Notes Uploaded",                 text: "Fresh chapter-wise notes for Physics and Chemistry have been added to the library." },
  { date: "Aug 10, 2026", badge: "Result",  title: "Mock Test Results Announced",              text: "Results for the August mock test are out. Congratulations to all top scorers!" },
  { date: "Jul 28, 2026", badge: "Notice",  title: "Important Update: Revised Syllabus",       text: "A few chapters have been revised. Make sure to review the updated syllabus section." }
];
