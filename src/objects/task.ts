export const task = {
  id: "task",
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    completed: { type: "boolean" },
    dueDate: { type: "string" },
    priority: { type: "string" },
  },
  required: ["id", "title", "completed"],
  additionalProperties: false,
};
