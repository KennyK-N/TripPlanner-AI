export default function buildTripPlannerPrompt({
  startDate,
  endDate,
  toCity,
  toCountry,
  interests = [],
}) {
  const normalizedInterests = Array.isArray(interests)
    ? interests
        .filter(
          (interest) =>
            typeof interest === "string" && interest.trim().length > 0,
        )
        .map((interest) => interest.trim())
        .slice(0, 10)
    : [];

  return `
Generate a practical travel itinerary.

Trip:
- Dates: ${startDate} to ${endDate}, inclusive
- Destination: ${toCity}, ${toCountry}
- Interests: ${JSON.stringify(normalizedInterests)}

Rules:
1. Return only valid JSON matching the provided schema.

2. Generate exactly one itinerary item for each calendar date.

3. Generate only 1 to 3 scheduled activities per day.
   - Do not include hotels.
   - Do not fill the entire day.
   - Leave free time for meals, transportation, rest, and spontaneous exploration.
   - Use a lighter schedule on the first and last day.

4. These arrays are connected by index and must have the same number of entries:
   - subtitles
   - places
   - description
   - coordinates
   - time

5. Each index represents one activity:
   - subtitles[i] is a short activity label.
   - places[i] is the specific location.
   - description[i] briefly explains the activity.
   - coordinates[i] contains the location coordinates.
   - time[i] contains the activity time block.

6. Use time blocks in exactly this format:
   HH:mm-HH:mm

   Valid examples:
   - "09:00-10:30"
   - "13:15-15:00"

7. Time blocks must:
   - Use a 24-hour clock.
   - Be ordered chronologically.
   - Not overlap.
   - Allow realistic travel time between activities.

8. Coordinates must:
   - Use this order: [longitude, latitude]
   - Contain exactly two numbers.
   - Never contain strings.
   - Never merge longitude and latitude into one value.
   - Never use placeholder values such as [0, 0].

   Correct example:
   [-123.1207, 49.2827]

   Incorrect examples:
   ["-123.120749.2827"]
   ["-123.1207", "49.2827"]
   [49.2827, -123.1207]

9. Keep locations geographically close when possible.

10. If interests are provided, include at least one suitable activity for each interest across the complete trip.

11. Keep text brief:
   - subtitles: at most 6 words each
   - summary: at most 20 words
   - description: at most 25 words each

12. Do not invent locations or events.
`.trim();
}
