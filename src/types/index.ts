export interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
  rollNumber?: number;
}

export interface Session {
  id: string;
  teacherId: string;
  teacherName: string;
  studentIds: number[];
  studentNames: string[];
  title: string;
  description: string;
  scheduledTime: Date;
  duration: number; // in minutes
  meetingLink?: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface RollNumberRange {
  start: number;
  end: number;
}

export interface StudentList {
  rollNumber: number;
  name: string;
  email: string;
}
