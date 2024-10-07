import { ClientTask, TaskData } from "../tasks/task";

// Handler interface defining the method and chain responsibility
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: Request): ClientTask<TaskData> | null;
}

// This will do for now but this should be defined elsewehere
export interface Request {
  method: "GET" | "POST";
  path: string;
  clientTask?: ClientTask<TaskData>;
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
  public handle(request: Request): ClientTask<TaskData> | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }

  public saveData(
    saveDataFunction: (saveDataTask: ClientTask<TaskData>) => void,
    saveTaskData: ClientTask<TaskData>
  ): ClientTask<TaskData> | null {
    saveDataFunction(saveTaskData);
    return this.handle({
      method: "GET",
      path: saveTaskData.nextTask?.route || "",
    });
  }
}
