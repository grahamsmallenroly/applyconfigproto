import { ClientTask, ContactDetailsTask, SummaryTask, Task } from "../tasks/task";
import { Request, AbstractHandler } from "./abstractHandler";

export class SummaryHandler extends AbstractHandler {
  public handle(request: Request): ClientTask<Task> | null {
    if (request.route === "summary" && this.validPathRequest()) {
      // handle page load
      if (request.method === "GET") {
        return this.getTaskSummary(request.route);
      }
      // Won't be saving summary data
    }
    return null;
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

  private getTaskSummaryDao(): SummaryTask | null {
    return null;
    // return {
    // id: "Enroly Apply Interview Id",
    // title: "Enroly Apply Interview",
    // completed: false,
    // };
  }

  private getTaskSummary(routeValue: string) {
    const routeData = this.getTaskRoute(routeValue);
    const summary = this.getTaskSummaryDao();

    return {
      route: routeData.value,
      title: routeData.title,
      nextRoute: routeData.nextRoute,
      ...(routeData.prevRoute && { prevRoute: routeData.prevRoute }),
      ...(summary && { taskData: summary as SummaryTask }),
      completed: false,
    } as ClientTask<ContactDetailsTask>;
  }
}
