import { ClientTask, ContactDetailsTask, SummaryTask, Task } from "../tasks/task";
import { AbstractTaskValidator } from "../taskValidators/abstractTaskValidator";
import { Request, AbstractHandler } from "./abstractHandler";

export class SummaryHandler extends AbstractHandler {
  constructor(taskValidator: AbstractTaskValidator) {
    super(taskValidator);
  }

  public handle(request: Request): ClientTask<Task> | null {
    // handle page load
    if (request.method === "GET") {
      return this.getTaskSummary(request.route);
    }
    // Won't be saving summary data
    throw new Error("Invalid request");
  }

  private getTaskSummaryDao(): SummaryTask | null {
    // not implemented
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
