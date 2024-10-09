import { ClientTask, StudyPlansTask, Task } from "../tasks/task";
import { AbstractTaskValidator } from "../taskValidators/abstractTaskValidator";
import { Request, AbstractHandler } from "./abstractHandler";

export class StudyPlanHandler extends AbstractHandler {
  constructor(taskValidator: AbstractTaskValidator) {
    super(taskValidator);
  }

  public handle(request: Request): ClientTask<Task> | null {
    // handle page load
    if (request.method === "GET") {
      return this.getStudyPlan(request.route);
    }

    // We shouldn't be able to get here without a taskData. Code smell - interface is wrong.
    if (!request.clientTask?.taskData) {
      throw new Error("No task data provided");
    }

    // handle form save
    return super.saveData(this.saveStudyPlanData, request.clientTask);
  }

  private saveStudyPlanData(data: ClientTask<Task>): ClientTask<Task> {
    return data;
  }

  // Add additional methods here
  private getStudyPlan(routeValue: string) {
    // promoting code reuse - nice!
    const routeData = this.getTaskRoute(routeValue);

    const studyPlanTask: ClientTask<StudyPlansTask> = {
      route: routeData.value,
      title: routeData.title,
      taskData: {
        courses: [],
        intendedStartDate: "",
        level: "FOUNDATION",
        selectedCourse: { id: "", label: "", description: "", level: "FOUNDATION" },
      },
      nextRoute: routeData.nextRoute,
      ...(routeData.prevRoute && { prevRoute: routeData.prevRoute }),
      completed: false,
    };

    return studyPlanTask;
  }
}
