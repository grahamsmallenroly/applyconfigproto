import { ClientTask, RegisterTask, Task } from "../tasks/task";
import { Request, AbstractHandler } from "./abstractHandler";

export class RegisterHandler extends AbstractHandler {
  public handle(request: Request): ClientTask<Task> | null {
    console.log("RegisterHandler handle", JSON.stringify(request));
    if (request.route === "_index" && this.validPathRequest()) {
      // handle page load
      if (request.method === "GET") {
        return this.getRegisterDetails(request.route);
      }

      // We shouldn't be able to get here without a taskData. Code smell - interface is wrong.
      if (!request.clientTask?.taskData) {
        throw new Error("No task data provided");
      }

      // handle form save
      console.log("RegisterHandler saveRegisterData");
      return super.saveData(this.saveRegisterData, request.clientTask);
    }
    // this request can't be satisfied by StudyPlanHandler. Pass the request to next handler
    console.log("RegisterHandler route:", request.route);
    const nextRoute = this.getTaskRoute(request.route).nextRoute;
    console.log("RegisterHandler next route:", nextRoute);

    return super.handle({ ...request, route: nextRoute }); // Pass to the next handler
  }

  public validPathRequest() {
    // specific validation logic
    const isValidRequest = true;
    return isValidRequest;
  }

  private saveRegisterData(data: ClientTask<Task>): ClientTask<Task> {
    return data;
  }

  private getRegisterDetailsDao(): RegisterTask | null {
    return null;
    // return {
    //   email: "bobbob@bob.com",
    //   familiarName: "Bob",
    //   consent: true,
    // };
  }

  // Add additional methods here
  private getRegisterDetails(routeValue: string) {
    const routeData = this.getTaskRoute(routeValue);

    // server stateModel
    const registerDetails = this.getRegisterDetailsDao();
    const registerTask: ClientTask<RegisterTask> = {
      route: routeData.value,
      title: routeData.title,
      nextRoute: routeData.nextRoute,
      prevRoute: routeData.prevRoute,
      ...(registerDetails && { taskData: registerDetails as RegisterTask }),
      completed: false,
    };
    return registerTask;
  }
}
