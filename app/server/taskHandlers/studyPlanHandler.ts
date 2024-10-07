import { SaveTaskData, StudyPlansTask, Task } from "../tasks/task";
import { Request, AbstractHandler } from "./abstractHandler";

class StudyPlanHandler extends AbstractHandler {
  public handle(request: Request): Task | null {
    if (request.path === "study-plan" && this.validPathRequest()) {
      // handle page load
      if (request.method === "GET") {
        return this.getStudyPlan();
      }

      // We shouldn't be able to get here without a taskData. Code smell - interface is wrong.
      if (!request.taskData) {
        throw new Error("No task data provided");
      }

      // handle form save
      return super.saveData(this.saveStudyPlanData, { task: request.taskData });
    }
    // this request can't be satisfied by StudyPlanHandler. Pass the request to next handler
    return super.handle(request); // Pass to the next handler
  }

  private validPathRequest() {
    // specific validation logic
    const isValidRequest = true;
    return isValidRequest;
  }

  private saveStudyPlanData(data: SaveTaskData<Task>): void {}

  // Add additional methods here
  private getStudyPlan() {
    const studyPlanTask: StudyPlansTask = {
      id: "studyPlans",
      title: "Study Plans",
      courses: [],
      nextTask: {
        route: "contact-details",
      },
      previousTask: {
        route: "home",
      },
      completed: false,
    };

    return studyPlanTask;
  }
}
