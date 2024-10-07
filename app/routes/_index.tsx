import { json, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { RegisterHandler } from "../server/taskHandlers/registerHandler";
import { RegisterTask } from "~/server/tasks/task";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // this would be an API call in a real app
  const registerHandler = new RegisterHandler();

  //   invariant(params.contactId, "Missing contactId param");
  const registerTask = (await registerHandler.handle({
    method: "GET",
    path: "register",
  })) as RegisterTask;
  if (!registerTask) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ registerTask: registerTask });
};

export default function Index() {
  const { registerTask } = useLoaderData<typeof loader>();

  return (
    <>
      <p id="index-page">
        This is the register your interest welcome page
        <br />
      </p>
      <p>
        <span>Your Email: </span>
        <span> ${registerTask.email}</span>
      </p>

      <p>
        <span>What do we call you : </span>
        <span> ${registerTask.familiarName}</span>
      </p>
    </>
  );
}
