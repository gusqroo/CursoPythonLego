export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // Markdown-like or text
  codeSnippet?: string;
  challenge?: {
    description: string;
    initialCode: string;
    expectedKeywords: string[]; // Simple validation
    successMessage: string;
  };
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: 'python' | 'setup' | 'motor' | 'sensor' | 'project' | 'logic' | 'loop' | 'function';
  lessons: Lesson[];
}

export interface UserProgress {
  completedLessons: string[]; // IDs of completed lessons
  currentModuleId: string;
  currentLessonId: string;
  coins: number; // Gamification
}

export type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};