export type Path = {
  id: string;
  title: string;
  nextTask: {
    route: string;
  };
  // Don't think we need this for back navigation - can be handled by remixJs
  prevTask?: {
    route: string;
  };
};

export type TaskConfig = {
  paths: Array<Path>;
};

const taskConfig: TaskConfig = {
  paths: [
    {
      id: "register",
      title: "Register Interest",
      nextTask: {
        route: "studyPlan",
      },
    },
    {
      id: "study-plan",
      title: "Study Plans",
      nextTask: {
        route: "contactDetails",
      },
      prevTask: {
        route: "_index",
      },
    },
    {
      id: "contact-details",
      title: "Contact Details",
      nextTask: {
        route: "home",
      },
      prevTask: {
        route: "studyPlan",
      },
    },
  ],
};

export const getTaskConfigDao = (): TaskConfig => {
  return taskConfig;
};
