const CODE_EXICUTION_STATUSES = [
  {
    id: 1,
    description: "In Queue",
  },
  {
    id: 2,
    description: "Processing",
  },
  {
    id: 3,
    description: "Accepted",
  },
  {
    id: 4,
    description: "Wrong Answer",
  },
  {
    id: 5,
    description: "Time Limit Exceeded",
  },
  {
    id: 6,
    description: "Compilation Error",
  },
  {
    id: 7,
    description: "Runtime Error (SIGSEGV)",
  },
  {
    id: 8,
    description: "Runtime Error (SIGXFSZ)",
  },
  {
    id: 9,
    description: "Runtime Error (SIGFPE)",
  },
  {
    id: 10,
    description: "Runtime Error (SIGABRT)",
  },
  {
    id: 11,
    description: "Runtime Error (NZEC)",
  },
  {
    id: 12,
    description: "Runtime Error (Other)",
  },
  {
    id: 13,
    description: "Internal Error",
  },
  {
    id: 14,
    description: "Exec Format Error",
  },
];

const CODING_LANGUAGES = [
  { id: 63, name: "JavaScript (Node.js 12.14.0)", label: "javascript" },
  { id: 93, name: "JavaScript (Node.js 18.15.0)", label: "javascript" },
  { id: 74, name: "TypeScript (3.7.4)", label: "typescript" },
  { id: 94, name: "TypeScript (5.0.3)", label: "typescript" },
  { id: 75, name: "C (Clang 7.0.1)", label: "c" },
  { id: 76, name: "C++ (Clang 7.0.1)", label: "cpp" },
  { id: 48, name: "C (GCC 7.4.0)", label: "c" },
  { id: 52, name: "C++ (GCC 7.4.0)", label: "cpp" },
  { id: 49, name: "C (GCC 8.3.0)", label: "c" },
  { id: 53, name: "C++ (GCC 8.3.0)", label: "cpp" },
  { id: 50, name: "C (GCC 9.2.0)", label: "c" },
  { id: 54, name: "C++ (GCC 9.2.0)", label: "cpp" },
  { id: 91, name: "Java (JDK 17.0.6)", label: "java" },
  { id: 62, name: "Java (OpenJDK 13.0.1)", label: "java" },
  { id: 70, name: "Python (2.7.17)", label: "python" },
  { id: 92, name: "Python (3.11.2)", label: "python" },
  { id: 71, name: "Python (3.8.1)", label: "python" },
];

export { CODE_EXICUTION_STATUSES, CODING_LANGUAGES };
