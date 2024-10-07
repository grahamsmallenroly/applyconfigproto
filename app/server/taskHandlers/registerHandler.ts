import { SaveData } from "../data/database";
import { SaveTaskData, StudyPlansTask, Task } from "../tasks/task";
import { Request, AbstractHandler } from "./abstractHandler";

export class RegisterHandler extends AbstractHandler {
  public handle(request: Request): Task | null {
    if (request.path === "register" && this.validPathRequest()) {
      // handle page load
      if (request.method === "GET") {
        return this.getRegisterDetails();
      }

      // We shouldn't be able to get here without a taskData. Code smell - interface is wrong.
      if (!request.taskData) {
        throw new Error("No task data provided");
      }

      // handle form save
      return super.saveData(this.saveRegisterData, { task: request.taskData });
    }
    // this request can't be satisfied by StudyPlanHandler. Pass the request to next handler
    return super.handle(request); // Pass to the next handler
  }

  private validPathRequest() {
    // specific validation logic
    const isValidRequest = true;
    return isValidRequest;
  }

  private saveRegisterData(data: SaveTaskData<Task>): void {
    SaveData(data);
  }

  private getRegisterDetailsDao() {
    return null;
  }

  // Add additional methods here
  private getRegisterDetails() {
    // server stateModel
    const registerDetails = this.getRegisterDetailsDao();
    if (registerDetails) {
      return registerDetails;
    }
    return null;
  }
}
