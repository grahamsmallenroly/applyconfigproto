import { StudyPlansTask } from "./task";

export const studyPlansTask: StudyPlansTask = {
  id: "studyPlans",
  title: "Study Plans",

  intendedStartDate: "",
  level: "FOUNDATION",
  courses: [],
  selectedCourse: { id: "", label: "", description: "", level: "FOUNDATION" },
  nextTask: {
    route: "contact-details",
  },
  previousTask: {
    route: "home",
  },
  completed: false,
};
