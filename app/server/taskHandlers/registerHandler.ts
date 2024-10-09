import { ClientTask, RegisterTask, Task } from "../tasks/task";
import { AbstractTaskValidator } from "../taskValidators/abstractTaskValidator";
import { Request, AbstractHandler } from "./abstractHandler";

export class RegisterHandler extends AbstractHandler {
  constructor(taskValidator: AbstractTaskValidator) {
    super(taskValidator);
  }

  public handle(request: Request): ClientTask<Task> | null {
    // handle page load
    if (request.method === "GET") {
      return this.getRegisterDetails(request.route);
    }

    // We shouldn't be able to get here without a taskData. Code smell - interface is wrong.
    if (!request.clientTask?.taskData) {
      throw new Error("No task data provided");
    }

    // handle form save
    return super.saveData(this.saveRegisterData, request.clientTask);
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
