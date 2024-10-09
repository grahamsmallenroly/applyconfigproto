import { RouteValue } from "../types";
import { AbstractTaskValidator } from "./abstractTaskValidator";

// Abstract class to help link handlers and provide default behavior for setting the next handler
export class InterviewTaskValidator extends AbstractTaskValidator {
  // Implement chain of responsibility pattern to determine next valid action
  public nextValidTask(currentRoute: RouteValue): RouteValue {
    if (currentRoute === "applyInterview") {
      if (this.validPathRequest()) {
        return "applyInterview";
      } else {
        return super.nextValidTask(this.getNextRoute(currentRoute));
      }
    }
    return super.nextValidTask(currentRoute);
  }

  public validPathRequest() {
    // specific validation logic
    // const isValidRequest = false;
    const isValidRequest = true;
    return isValidRequest;
  }
}
