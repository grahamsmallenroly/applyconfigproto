import { ClientTask, Task } from "../tasks/task";
import { Request } from "./abstractHandler";
import { ContactDetailsHandler } from "./contactDetailsHandler";
import { SummaryHandler } from "./summaryHandler";
import { InterviewHandler } from "./interviewHandler";
import { RegisterHandler } from "./registerHandler";
import { StudyPlanHandler } from "./studyPlanHandler";
import { StudyPlanTaskValidator } from "../taskValidators/studyPlanTaskValidator";
import { InterviewTaskValidator } from "../taskValidators/interviewTaskValidator";
import { ContactDetailsTaskValidator } from "../taskValidators/contactDetailsTaskValidator";

export class TaskHandlerApi {
  private registerHandler: RegisterHandler;
  private studyPlanHandler: StudyPlanHandler;
  private interviewHandler: InterviewHandler;
  private contactDetailsHandler: ContactDetailsHandler;
  private summaryHandler: SummaryHandler;

  private studyPlanTaskValidator: StudyPlanTaskValidator;
  private interviewTaskValidator: InterviewTaskValidator;
  private contactDetailsTaskValidator: ContactDetailsTaskValidator;

  constructor() {
    this.studyPlanTaskValidator = new StudyPlanTaskValidator();
    this.interviewTaskValidator = new InterviewTaskValidator();
    this.contactDetailsTaskValidator = new ContactDetailsTaskValidator();

    //register the chain of responsibility
    // not using a working version of this yet
    this.studyPlanTaskValidator.setNext(this.interviewTaskValidator).setNext(this.contactDetailsTaskValidator);

    this.registerHandler = new RegisterHandler(this.studyPlanTaskValidator);
    this.studyPlanHandler = new StudyPlanHandler(this.studyPlanTaskValidator);
    this.interviewHandler = new InterviewHandler(this.studyPlanTaskValidator);
    this.contactDetailsHandler = new ContactDetailsHandler(this.studyPlanTaskValidator);
    this.summaryHandler = new SummaryHandler(this.studyPlanTaskValidator);
  }

  public handle(request: Request): ClientTask<Task> | null {
    // Regular route handling
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
