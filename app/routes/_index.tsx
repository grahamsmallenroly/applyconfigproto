import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { RegisterHandler } from "../server/taskHandlers/registerHandler";
import { ClientTask, RegisterTask } from "~/server/tasks/task";
import { Form, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // this would be an API call in a real app
  const registerHandler = new RegisterHandler();

  //   invariant(params.contactId, "Missing contactId param");
  const registerTask = (await registerHandler.handle({
    method: "GET",
    path: "register",
  })) as ClientTask<RegisterTask>;
  if (!registerTask) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ registerTask: registerTask });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  //   invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log("updates", updates);

  const registerHandler = new RegisterHandler();

  await registerHandler.handle({
    method: "POST",
    path: "register",
    clientTask: {
      id: "fixThisId",
      title: "fixThisTitle",
      nextTask: { route: "fixThisRoute" },
      completed: true,
      taskData: {
        email: updates.email ?? "email not set",
        familiarName: updates.familiarName ?? "familiarName",
        consent: true,
      },
    },
  });
  //await updateContact(params.contactId, updates);
  const nextRoute = formData.get("nextRoute");
  if (!nextRoute) {
    throw new Response("Next Route Not Supplied", { status: 404 });
  }

  return redirect(nextRoute.valueOf() as string);
};

export default function Index() {
  const { registerTask } = useLoaderData<typeof loader>();

  return (
    <>
      <p id="index-page">
        This is the register your interest welcome page
        <br />
      </p>

      <div>
        <Form key={registerTask.id} id="contact-form" method="post">
          <p>
            <span>Your Email</span>
            <input
              aria-label="Your Email"
              defaultValue={registerTask.taskData?.email}
              name="email"
              placeholder="First"
              type="text"
            />
          </p>
          <p>
            <span>What do we call you</span>
            <input
              aria-label="What do we call you"
              defaultValue={registerTask.taskData?.familiarName}
              name="familiarName"
              placeholder="Last"
              type="text"
            />
          </p>
          <input type="hidden" name="id" value={registerTask.id} />
          <input type="hidden" name="nextRoute" value={registerTask.nextTask.route} />
          <p>
            <button type="submit">Continue</button>
            {/* <button type="button">Cancel</button> */}
          </p>
        </Form>
      </div>
      {/* <p>
        <span>Your Email: </span>
        <span> {registerTask.taskData?.email}</span>
      </p> */}

      {/* <p>
        <span>What do we call you : </span>
        <span> {registerTask.taskData?.familiarName}</span>
      </p> */}
    </>
  );
}
