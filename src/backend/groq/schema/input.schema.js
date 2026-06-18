const inputSchema = {
  type: "json_schema",

  json_schema: {
    name: "trip_plan_prompt",

    strict: true,

    schema: {
      type: "object",

      properties: {
        itinerary: {
          type: "array",

          items: {
            type: "object",

            properties: {
              title: {
                type: "string",
                description: "Short theme for the day.",
              },

              subtitles: {
                type: "array",

                items: {
                  type: "string",
                  description: "Short label for the matching activity.",
                },

                minItems: 1,
                maxItems: 3,
              },

              date: {
                type: "string",
                format: "date",
              },

              places: {
                type: "array",

                items: {
                  type: "string",
                  description: "Specific attraction, restaurant, or area.",
                },

                minItems: 1,
                maxItems: 3,
              },

              summary: {
                type: "string",
                description: "Brief overview of the day.",
              },

              description: {
                type: "array",

                items: {
                  type: "string",
                  description: "Brief description of the matching activity.",
                },

                minItems: 1,
                maxItems: 3,
              },

              coordinates: {
                type: "array",

                items: {
                  type: "array",

                  items: {
                    type: "number",
                  },

                  minItems: 2,
                  maxItems: 2,
                },

                minItems: 1,
                maxItems: 3,
              },

              time: {
                type: "array",

                items: {
                  type: "string",

                  pattern:
                    "^([01][0-9]|2[0-3]):[0-5][0-9]-([01][0-9]|2[0-3]):[0-5][0-9]$",

                  description:
                    "Activity time block in HH:mm-HH:mm format, such as 09:00-10:30.",
                },

                minItems: 1,
                maxItems: 3,
              },
            },

            required: [
              "title",
              "subtitles",
              "date",
              "places",
              "summary",
              "description",
              "coordinates",
              "time",
            ],

            additionalProperties: false,
          },
        },
      },

      required: ["itinerary"],

      additionalProperties: false,
    },
  },
};

export default inputSchema;
