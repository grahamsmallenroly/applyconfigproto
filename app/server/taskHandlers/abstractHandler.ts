import { SaveTaskData, Task } from "../tasks/task";

// Handler interface defining the method and chain responsibility
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: Request): Task | null;
}

// This will do for now but this should be defined elsewehere
export interface Request {
  method: "GET" | "POST";
  path: string;
  taskData?: Task;
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
  public handle(request: Request): Task | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }

  public saveData(
    saveDataFunction: (saveDataTask: SaveTaskData<Task>) => void,
    saveTaskData: SaveTaskData<Task>
  ): Task | null {
    saveDataFunction(saveTaskData);
    return this.handle({
      method: "GET",
      path: saveTaskData.task.nextTask?.route || "",
    });
  }
}
