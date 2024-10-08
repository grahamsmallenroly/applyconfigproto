import { ClientTask, ContactDetailsTask, InterviewTask, Task } from "../tasks/task";
import { Request, AbstractHandler } from "./abstractHandler";

export class ContactDetailsHandler extends AbstractHandler {
  public handle(request: Request): ClientTask<Task> | null {
    if (request.route === "contactDetails" && this.validPathRequest()) {
      // handle page load
      if (request.method === "GET") {
        return this.getContactdetails(request.route);
      }

      // We shouldn't be able to get here without a taskData. Code smell - interface is wrong.
      if (!request.clientTask?.taskData) {
        throw new Error("No task data provided");
      }

      // handle form save
      return super.saveData(this.saveApplyInterviewData, request.clientTask);
    }
    // this request can't be satisfied by StudyPlanHandler. Pass the request to next handler
    // const nextRoute = this.getTaskRoute(request.route).nextRoute;
    // return super.handle({ ...request, route: nextRoute }); // Pass to the next handler
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

  private getContactDetailsDao(): ContactDetailsTask | null {
    return null;
    // return {
    // id: "Enroly Apply Interview Id",
    // title: "Enroly Apply Interview",
    // completed: false,
    // };
  }

  private getContactdetails(routeValue: string) {
    const routeData = this.getTaskRoute(routeValue);
    const contactDetails = this.getContactDetailsDao();

    return {
      route: routeData.value,
      title: routeData.title,
      nextRoute: routeData.nextRoute,
      ...(routeData.prevRoute && { prevRoute: routeData.prevRoute }),
      ...(contactDetails && { taskData: contactDetails as ContactDetailsTask }),
      completed: false,
    } as ClientTask<ContactDetailsTask>;
  }
}
