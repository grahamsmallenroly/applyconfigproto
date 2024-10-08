import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { TaskHandlerApi } from "../server/taskHandlers/taskHandlerAPI";
import { ClientTask, SummaryTask } from "~/server/tasks/task";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // this would be an API call in a real app
  const taskHandler = new TaskHandlerApi();

  //   invariant(params.contactId, "Missing contactId param");
  const summaryTask = (await taskHandler.handle({
    method: "GET",
    route: "summary",
  })) as ClientTask<SummaryTask>;
  if (!summaryTask) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ summaryTask: summaryTask });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  //   invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  const toDoActionRoute = formData.get("toDoActionRoute");
  if (!toDoActionRoute) {
    throw new Response("Next Route Not Supplied", { status: 404 });
  }
  console.log("contactDetails nextRoute", toDoActionRoute.valueOf());
  return redirect(`/${toDoActionRoute.valueOf() as string}`);
};

export default function Index() {
  const { summaryTask } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <>
      Summary
      <br />
      <br />
      <Form key={summaryTask.route} id="contact-form" method="post">
        <label>You did these already</label>
        <br />
        <p>
          <span>You need to do this</span>
          {/* <input type="text" name="toDoActionRoute" value={summaryTask?.nextRoute} /> */}
          <input type="text" name="toDoActionRoute" placeholder="applyInterview" />
        </p>
        <input type="hidden" name="route" value={summaryTask.route} />

        <p>
          <button type="submit">Continue</button>
          <button onClick={() => navigate(-1)} type="button">
            Previous
          </button>
        </p>
      </Form>
    </>
  );
}
