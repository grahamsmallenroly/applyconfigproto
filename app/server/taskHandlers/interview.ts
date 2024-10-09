import { ClientTask, InterviewTask, Task } from "../tasks/task";
import { Request, AbstractHandler } from "./abstractHandler";

export class InterviewHandler extends AbstractHandler {
  public handle(request: Request): ClientTask<Task> | null {
    if (request.route === "applyInterview" && this.validPathRequest()) {
      // handle page load
      if (request.method === "GET") {
        return this.getInterview(request.route);
      }

      // We shouldn't be able to get here without a taskData. Code smell - interface is wrong.
      if (!request.clientTask?.taskData) {
        throw new Error("No task data provided");
      }

      // handle form save
      return super.saveData(this.saveApplyInterviewData, request.clientTask);
    }
    // this request can't be satisfied by StudyPlanHandler. Pass the request to next handler
    const nextRoute = this.getTaskRoute(request.route).nextRoute;
    return super.handle({ ...request, route: nextRoute }); // Pass to the next handler
  }

  // only public because it's called from the abstract handler
  // for the prototype, we'll just return false
  public validPathRequest() {
    const isValidRequest = true;
    return isValidRequest;
  }

  private saveApplyInterviewData(data: ClientTask<Task>): ClientTask<Task> {
    return data;
  }

  private getInterviewDetailsDao(): InterviewTask | null {
    return null;
    // return {
    // id: "Enroly Apply Interview Id",
    // title: "Enroly Apply Interview",
    // completed: false,
    // };
  }

  private getInterview(route: string) {
    const routeData = this.getTaskRoute(route);
    const interviewData = this.getInterviewDetailsDao();

    return {
      route: routeData.value,
      title: routeData.title,
      nextRoute: routeData.nextRoute,
      ...(routeData.prevRoute && { prevRoute: routeData.prevRoute }),
      ...(interviewData && { taskData: interviewData as InterviewTask }),
      completed: false,
    } as ClientTask<InterviewTask>;
  }
}
