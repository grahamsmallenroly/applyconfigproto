import { ClientTask, StudyPlansTask, Task } from "../tasks/task";
import { Request, AbstractHandler } from "./abstractHandler";

export class StudyPlanHandler extends AbstractHandler {
  public handle(request: Request): ClientTask<Task> | null {
    if (request.route === "studyPlan" && this.validPathRequest()) {
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
    // this request can't be satisfied by StudyPlanHandler. Pass the request to next handler
    const nextRoute = this.getTaskRoute(request.route).nextRoute;
    return super.handle({ ...request, route: nextRoute }); // Pass to the next handler
  }

  // only public because it's called from the abstract handler
  public validPathRequest() {
    // specific validation logic
    const isValidRequest = true;
    return isValidRequest;
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
