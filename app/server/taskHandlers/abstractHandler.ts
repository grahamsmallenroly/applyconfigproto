import { ClientTask, Task } from "../tasks/task";
import { ClientRoute, getTaskConfigDao } from "../data/taskConfig";
import { RouteValue } from "../types";
import { json } from "@remix-run/node";

// Handler interface defining the method and chain responsibility
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: Request): ClientTask<Task> | null;
}

// This will do for now but this should be defined elsewehere
export interface Request {
  method: "GET" | "POST";
  route: RouteValue;
  clientTask?: ClientTask<Task>;
}

// Abstract class to help link handlers and provide default behavior for setting the next handler
export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  // Sets the next handler in the chain
  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  // Passes the request to the next handler if available
  public handle(request: Request): ClientTask<Task> | null {
    console.log(`AbstractHandler handle: ${JSON.stringify(request)}`);
    if (this.nextHandler) {
      return this.nextHandler.handle({ route: request.route, method: "GET" });
    }
    return null;
  }

  public saveData(
    saveDataFunction: (saveDataTask: ClientTask<Task>) => ClientTask<Task>,
    saveTaskData: ClientTask<Task>
  ): ClientTask<Task> | null {
    const savedData = saveDataFunction(saveTaskData);

    // BEFORE YOU RETURN THIS YOU WILL NEED TO CHECK THE NEXT ROUTE IS STILL VALID
    // AND UPDATE NEXT ROUTE IF NOT
    // MAYBE USE CHAIN OF RESPONSIBILITY PATTERN TO DO THIS
    return savedData;
  }

  public getTaskRoute(routeValue: string): ClientRoute {
    return getTaskConfigDao().routes.find((route) => route.value === routeValue) as ClientRoute;
  }
}
