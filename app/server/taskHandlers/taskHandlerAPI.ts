import { ClientTask, Task } from "../tasks/task";
import { Request } from "./abstractHandler";
import { ContactDetailsHandler } from "./contactDetailsHandler";
import { SummaryHandler } from "./contactDetailsHandler copy";
import { InterviewHandler } from "./interview";
import { RegisterHandler } from "./registerHandler";
import { StudyPlanHandler } from "./studyPlanHandler";

export class TaskHandlerApi {
  private registerHandler: RegisterHandler;
  private studyPlanHandler: StudyPlanHandler;
  private interviewHandler: InterviewHandler;
  private contactDetailsHandler: ContactDetailsHandler;
  private summaryHandler: SummaryHandler;

  constructor() {
    this.registerHandler = new RegisterHandler();
    this.studyPlanHandler = new StudyPlanHandler();
    this.interviewHandler = new InterviewHandler();
    this.contactDetailsHandler = new ContactDetailsHandler();
    this.summaryHandler = new SummaryHandler();

    //register the chain of responsibility
    this.registerHandler
      .setNext(this.studyPlanHandler)
      .setNext(this.interviewHandler)
      .setNext(this.contactDetailsHandler)
      .setNext(this.summaryHandler);
  }

  public handle(request: Request): ClientTask<Task> | null {
    // this.registerHandler.setNext(this.studyPlanHandler).setNext(this.interviewHandler);
    console.log("TaskHandlerApi handle", JSON.stringify(request));

    if (request.route === "_index") {
      return this.registerHandler.handle(request);
    }

    if (request.route === "studyPlan") {
      // return
      return this.studyPlanHandler.handle(request);
    }

    if (request.route === "applyInterview") {
      // return this.interviewHandler.handle(request);
      return this.interviewHandler.handle(request);
    }

    if (request.route === "contactDetails") {
      // return this.interviewHandler.handle(request);
      return this.contactDetailsHandler.handle(request);
    }

    if (request.route === "summary") {
      // return this.interviewHandler.handle(request);
      return this.summaryHandler.handle(request);
    }
    return null;
  }
}
