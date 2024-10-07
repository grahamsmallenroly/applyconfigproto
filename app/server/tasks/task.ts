type TaskDetails = {
  [key: string]: string | boolean | number | object;
};

type TaskIdentifier = {
  route: string;
};

export type TaskData = {
  //   id: string;
  //   title: string;
  //   nextTask: TaskIdentifier;
  //   previousTask: TaskIdentifier;
  //   completed: boolean;
};

type CourseLevel = "FOUNDATION" | "UNDERGRADUATE" | "POSTGRADUATE";

type Course = { id: string; label: string; description: string; level: CourseLevel };

export interface ClientTask<Task> {
  id: string;
  title: string;
  nextTask: TaskIdentifier;
  previousTask?: TaskIdentifier;
  completed: boolean;
  taskData?: Task;
}

// The problem with these type is the optional properties.
// I am setting them because
export type StudyPlansTask = TaskData & {
  courses: Array<Course>;
  intendedStartDate: string;
  level: CourseLevel;
  selectedCourse: Course;
};

export type RegisterTask = TaskData & {
  email: string;
  // what do we call you?
  familiarName: string;
  consent: boolean;
};
