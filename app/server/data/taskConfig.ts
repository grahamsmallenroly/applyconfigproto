import { RouteValue } from "../types";

export type ClientRoute = {
  value: RouteValue;
  title: string;
  nextRoute: RouteValue;
  // Don't think we need this for back navigation - can be handled by remixJs
  prevRoute?: RouteValue;
};

export type TaskConfig = {
  routes: Array<ClientRoute>;
};

const taskConfig: TaskConfig = {
  routes: [
    {
      value: "_index",
      title: "Register Interest",
      nextRoute: "studyPlan",
    },
    {
      value: "studyPlan",
      title: "Study Plans",
      nextRoute: "applyInterview",
      prevRoute: "_index",
    },
    // in the prototype, we are skipping the apply interview details
    {
      value: "applyInterview",
      title: "Apply Interview Details",
      nextRoute: "contactDetails",
      prevRoute: "studyPlan",
    },
    {
      value: "contactDetails",
      title: "Contact Details",
      nextRoute: "summary",
      prevRoute: "applyInterview",
    },
    {
      value: "summary",
      title: "Task Summary",
      nextRoute: "unknown",
      prevRoute: "contactDetails",
    },
  ],
};

export const getTaskConfigDao = (): TaskConfig => {
  return taskConfig;
};
