export interface Submission {
  id: number;
  problemId: number;
  problemTitle: string;
  language: string;
  status:
    | "Accepted"
    | "Wrong Answer"
    | "Time Limit Exceeded"
    | "Runtime Error"
    | "Compilation Error"
    | "Memory Limit Exceeded";
  timestamp: Date;
  runtime: number; // in ms
  memory: number; // in MB
  codeSnippet: string;
  testsPassed: number;
  totalTests: number;
  userId: string;
  userName: string;
}
