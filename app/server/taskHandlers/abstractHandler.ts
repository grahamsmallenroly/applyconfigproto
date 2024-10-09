import { ClientTask, Task } from "../tasks/task";
import { ClientRoute, getTaskConfigDao } from "../data/taskConfig";
import { RouteValue } from "../types";
import { AbstractTaskValidator } from "../taskValidators/abstractTaskValidator";

// Handler interface defining the method and chain responsibility
interface Handler {
  saveData(
    saveDataFunction: (saveDataTask: ClientTask<Task>) => ClientTask<Task>,
    saveTaskData: ClientTask<Task>
  ): ClientTask<Task> | null;

  getTaskRoute(routeValue: string): ClientRoute;
}

// This will do for now but this should be defined elsewehere
export interface Request {
  method: "GET" | "POST";
  route: RouteValue;
  clientTask?: ClientTask<Task>;
}

export abstract class AbstractHandler implements Handler {
  private taskValidator: AbstractTaskValidator;

  constructor(taskValidator: AbstractTaskValidator) {
    this.taskValidator = taskValidator;
  }

  public saveData(
    saveDataFunction: (saveDataTask: ClientTask<Task>) => ClientTask<Task>,
    saveTaskData: ClientTask<Task>
  ): ClientTask<Task> | null {
    const savedData = saveDataFunction(saveTaskData);

    // BEFORE RETURNING THE SAVED RESOURCE, CHECK IF THE NEXT ROUTE IS VALID
    // AND UPDATE NEXT ROUTE IF NOT
    // USE CHAIN OF RESPONSIBILITY PATTERN TO DO THIS
    savedData.nextRoute = this.taskValidator.nextValidTask(saveTaskData.nextRoute);
    return savedData;
  }

  // public nextValidTask(currentTaskRoute: string): ClientRoute {
  //   const currentRoute = this.getTaskRoute(currentTaskRoute);
  //   const nextRoute = getTaskConfigDao().routes.find((route) => route.value === currentRoute.nextRoute) as ClientRoute;

  //   this.taskValidator.nextValidTask(nextRoute.nextRoute);
  //   if (nextRoute) {
  //     return nextRoute;
  //   }

  //   return currentRoute;
  // }

  public getTaskRoute(routeValue: string): ClientRoute {
    return getTaskConfigDao().routes.find((route) => route.value === routeValue) as ClientRoute;
  }
}
