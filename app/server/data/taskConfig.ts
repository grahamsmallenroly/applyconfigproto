export type Path = {
  id: string;
  title: string;
  nextTask: {
    route: string;
  };
  prevTask: {
    route: string;
  };
};

export type TaskConfig = {
  paths: Array<Path>;
};

export const taskConfig: TaskConfig = {
  paths: [
    {
      id: "studyPlan",
      title: "Study Plans",
      nextTask: {
        route: "contact-details",
      },
      prevTask: {
        route: "home",
      },
    },
    {
      id: "contact-details",
      title: "Contact Details",
      nextTask: {
        route: "home",
      },
      prevTask: {
        route: "studyPlans",
      },
    },
  ],
};
