import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { ClientTask, InterviewTask } from "~/server/tasks/task";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { TaskHandlerApi } from "../server/taskHandlers/taskHandlerAPI";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // this would be an API call in a real app
  const taskHandler = new TaskHandlerApi();

  //   invariant(params.contactId, "Missing contactId param");
  const interviewTask = (await taskHandler.handle({
    method: "GET",
    route: "applyInterview",
  })) as ClientTask<InterviewTask>;
  if (!interviewTask) {
    throw new Response("interviewTask Not Found", { status: 404 });
  }
  return json({ interviewTask: interviewTask });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  //   invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log("updates", updates);

  // Should be a web api call
  const taskHandler = new TaskHandlerApi();

  const response = await taskHandler.handle({
    method: "POST",
    route: "applyInterview",
    clientTask: {
      route: "applyInterview",
      title: "Apply Interview",
      nextRoute: "contactDetails",
      prevRoute: "studyPlan",
      completed: true,
      taskData: {
        id: "Enroly Apply Interview Id",
        title: "Enroly Apply Interview",
        completed: false,
      },
    },
  });
  const nextRoute = response?.nextRoute;
  if (!nextRoute) {
    throw new Response("Next Route Not Supplied", { status: 404 });
  }
  return redirect(`/${nextRoute.valueOf() as string}`);
};

export default function Index() {
  const { interviewTask } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <>
      INTERVIEW
      <br />
      <br />
      <Form key={interviewTask.route} id="contact-form" method="post">
        <span>Interview Title</span>
        <label>{interviewTask.taskData?.title}</label>
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
