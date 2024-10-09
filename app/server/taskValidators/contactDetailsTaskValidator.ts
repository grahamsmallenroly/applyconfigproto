import { RouteValue } from "../types";
import { AbstractTaskValidator } from "./abstractTaskValidator";

// Abstract class to help link handlers and provide default behavior for setting the next handler
export class ContactDetailsTaskValidator extends AbstractTaskValidator {
  // Implement chain of responsibility pattern to determine next valid action
  public nextValidTask(currentRoute: RouteValue): RouteValue {
    if (currentRoute === "contactDetails") {
      if (this.validPathRequest()) {
        return "contactDetails";
      } else {
        return super.nextValidTask(this.getNextRoute(currentRoute));
      }
    }
    return super.nextValidTask(currentRoute);
  }

  public validPathRequest() {
    // specific validation logic
    const isValidRequest = true;
    return isValidRequest;
  }
}
