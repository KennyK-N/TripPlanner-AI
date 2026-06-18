const chatSchema = {
  type: "json_schema",
  json_schema: {
    name: "trip_plan_chat",
    strict: true,
    schema: {
      type: "object",
      properties: {
        text: {
          type: "string",
        },
      },
      required: ["text"],
      additionalProperties: false,
    },
  },
};

export default chatSchema;
