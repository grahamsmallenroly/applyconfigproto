import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { StudyPlanHandler } from "../server/taskHandlers/studyPlanHandler";
import { ClientTask, RegisterTask, StudyPlansTask } from "~/server/tasks/task";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // this would be an API call in a real app
  const studyPlanHandler = new StudyPlanHandler();

  //   invariant(params.contactId, "Missing contactId param");
  const studyPlanTask = (await studyPlanHandler.handle({
    method: "GET",
    path: "study-plan",
  })) as ClientTask<StudyPlansTask>;
  if (!studyPlanTask) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ studyPlanTask: studyPlanTask });
};

export default function Index() {
  const { studyPlanTask } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <>
      STUDY PLAN
      <br />
      <br />
      <Form key={studyPlanTask.id} id="contact-form" method="post">
        {/* <p>
              <span>Courses</span>

              <input
                aria-label="Courses"
                defaultValue={studyPlanTask.taskData?.courses}
                name="first"
                placeholder="First"
                type="select"
              />
            </p> */}
        <span>Intended Start Date</span>
        <input
          aria-label="Intended Start Date"
          defaultValue={studyPlanTask.taskData?.intendedStartDate}
          name="intendedStartDate"
          placeholder=""
          type="text"
        />
        <p>
          {/* <button type="submit">Continue</button> */}
          <button onClick={() => navigate(-1)} type="button">
            Previous
          </button>
        </p>
      </Form>
    </>
  );
}
