import { RouteValue } from "../types";

export type Task = {
  //   id: string;
  //   title: string;
  //   nextTask: TaskIdentifier;
  //   previousTask: TaskIdentifier;
  //   completed: boolean;
};

type CourseLevel = "FOUNDATION" | "UNDERGRADUATE" | "POSTGRADUATE";

type Course = { id: string; label: string; description: string; level: CourseLevel };

export interface ClientTask<Task> {
  route: RouteValue;
  title: string;
  nextRoute: RouteValue;
  prevRoute?: RouteValue;
  completed: boolean;
  taskData?: Task;
}

// The problem with these type is the optional properties.
// I am setting them because
export type StudyPlansTask = Task & {
  courses: Array<Course>;
  intendedStartDate: string;
  level: CourseLevel;
  selectedCourse: Course;
};

export type RegisterTask = Task & {
  email: string;
  // what do we call you?
  familiarName: string;
  consent: boolean;
};

export type InterviewTask = Task & {
  id: string;
  title: string;
  completed: boolean;
};

export type ContactDetailsTask = Task & {
  id: string;
  addressLine1: string;
  completed: boolean;
};

export type SummaryTask = Task & {
  completedTasks: Array<Task>;
  nextTask: Task;
};
