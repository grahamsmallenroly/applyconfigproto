import { SaveData } from "../data/database";
import { ClientTask, RegisterTask, StudyPlansTask, TaskData } from "../tasks/task";
import { Request, AbstractHandler } from "./abstractHandler";

export class RegisterHandler extends AbstractHandler {
  public handle(request: Request): ClientTask<TaskData> | null {
    if (request.path === "register" && this.validPathRequest()) {
      // handle page load
      if (request.method === "GET") {
        return this.getRegisterDetails();
      }

      // We shouldn't be able to get here without a taskData. Code smell - interface is wrong.
      if (!request.clientTask?.taskData) {
        throw new Error("No task data provided");
      }

      // handle form save
      return super.saveData(this.saveRegisterData, request.clientTask);
    }
    // this request can't be satisfied by StudyPlanHandler. Pass the request to next handler
    return super.handle(request); // Pass to the next handler
  }

  private validPathRequest() {
    // specific validation logic
    const isValidRequest = true;
    return isValidRequest;
  }

  private saveRegisterData(data: ClientTask<TaskData>): void {
    SaveData(data);
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
  private getRegisterDetails() {
    // server stateModel
    const registerDetails = this.getRegisterDetailsDao();
    const registerTask: ClientTask<RegisterTask> = {
      id: "register",
      title: "Register",
      ...(registerDetails && { taskData: registerDetails as RegisterTask }),
      nextTask: { route: "study-plans" },
      completed: false,
    };
    return registerTask;
  }
}
