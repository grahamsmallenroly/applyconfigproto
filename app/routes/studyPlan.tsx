import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { TaskHandlerApi } from "../server/taskHandlers/taskHandlerAPI";
import { ClientTask, StudyPlansTask } from "~/server/tasks/task";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // this would be an API call in a real app
  const taskHandler = new TaskHandlerApi();

  //   invariant(params.contactId, "Missing contactId param");
  const studyPlanTask = (await taskHandler.handle({
    method: "GET",
    route: "studyPlan",
  })) as ClientTask<StudyPlansTask>;
  if (!studyPlanTask) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ studyPlanTask: studyPlanTask });
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
    route: "studyPlan",
    clientTask: {
      route: "studyPlan",
      title: "study-plan title",
      nextRoute: "applyInterview",
      prevRoute: "_index",
      completed: true,
      taskData: {
        courses: updates.courses
          ? [{ id: "courseId", label: "courseLabel", description: "courseDescription", level: "FOUNDATION" }]
          : [],
        intendedStartDate: updates.intendedStartDate ?? "intendedStartDate",
        level: updates.level ?? "FOUNDATION",
        selectedCourse: updates.selectedCourse
          ? {
              id: "selectedCourseId",
              label: "selectedCourseLabel",
              description: "selectedCourseDescription",
              level: "FOUNDATION",
            }
          : "",
      },
    },
  });
  //THIS NEEDS TO CHANGE _ THE API SHOULD RETURN REGISTER TASK NOT STUDYPLAN TASK
  const nextRoute = response?.nextRoute;
  if (!nextRoute) {
    throw new Response("Next Route Not Supplied", { status: 404 });
  }
  return redirect(`/${nextRoute.valueOf() as string}`);
};

export default function Index() {
  const { studyPlanTask } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <>
      STUDY PLAN
      <br />
      <br />
      <Form key={studyPlanTask.route} id="contact-form" method="post">
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
        <input type="hidden" name="route" value={studyPlanTask.route} />
        <input type="hidden" name="nextRoute" value={studyPlanTask?.nextRoute} />

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
