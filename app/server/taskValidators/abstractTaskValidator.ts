import { ClientRoute, getTaskConfigDao } from "../data/taskConfig";
import { RouteValue } from "../types";

// Handler interface defining the method and chain responsibility
interface TaskValidator {
  setNext(handler: TaskValidator): TaskValidator;
  nextValidTask(route: RouteValue): RouteValue;
  getNextRoute(routeValue: RouteValue): RouteValue | null;
}

// Abstract class to help link handlers and provide default behavior for setting the next handler
export abstract class AbstractTaskValidator implements TaskValidator {
  private nextHandler: TaskValidator | null = null;

  // Sets the next handler in the chain
  public setNext(taskValidator: TaskValidator): TaskValidator {
    this.nextHandler = taskValidator;
    return taskValidator;
  }

  public nextValidTask(route: RouteValue | null): RouteValue {
    //const configNextRoute = this.getNextRoute(route);
    if (route && this.nextHandler) {
      return this.nextHandler.nextValidTask(route);
    }
    // Default to summary
    return "summary";
  }

  public getNextRoute(routeValue: RouteValue): RouteValue | null {
    const currentRoute = this.getRoute(routeValue);
    if (!currentRoute?.nextRoute) {
      return null;
    }
    const configNextRouteValue = this.getRoute(currentRoute.nextRoute).value;
    return configNextRouteValue;
  }

  private getRoute(routeValue: RouteValue): ClientRoute {
    const clientRoute = getTaskConfigDao().routes.find((route) => route.value === routeValue);
    if (!clientRoute) {
      throw new Error(`Route not found: ${routeValue}`);
    }
    return clientRoute;
  }
}
