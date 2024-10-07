import { ClientTask, StudyPlansTask, TaskData } from "../tasks/task";
import { Request, AbstractHandler } from "./abstractHandler";

export class StudyPlanHandler extends AbstractHandler {
  public handle(request: Request): ClientTask<TaskData> | null {
    if (request.path === "study-plan" && this.validPathRequest()) {
      // handle page load
      if (request.method === "GET") {
        return this.getStudyPlan(request.path);
      }

      // We shouldn't be able to get here without a taskData. Code smell - interface is wrong.
      if (!request.clientTask?.taskData) {
        throw new Error("No task data provided");
      }

      // handle form save
      return super.saveData(this.saveStudyPlanData, request.clientTask);
    }
    // this request can't be satisfied by StudyPlanHandler. Pass the request to next handler
    return super.handle(request); // Pass to the next handler
  }

  private validPathRequest() {
    // specific validation logic
    const isValidRequest = true;
    return isValidRequest;
  }

  private saveStudyPlanData(data: ClientTask<TaskData>): void {}

  // Add additional methods here
  private getStudyPlan(pathId: string) {
    // promoting code reuse - nice!
    const path = this.getTaskPath(pathId);

    const studyPlanTask: ClientTask<StudyPlansTask> = {
      id: path.id,
      title: path.title,
      taskData: {
        courses: [],
        intendedStartDate: "",
        level: "FOUNDATION",
        selectedCourse: { id: "", label: "", description: "", level: "FOUNDATION" },
      },
      nextTask: {
        route: path.nextTask?.route,
      },
      ...(path.prevTask && { previousTask: { route: path.prevTask.route } }),
      completed: false,
    };

    return studyPlanTask;
  }
}
