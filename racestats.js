function validateRaceStats(data) {
  const required = [
    "race_id",
    "race_type",
    "swimmer_name",
    "finish_time",
    "position"
  ];

  // Check required fields
  for (const key of required) {
    if (!(key in data)) {
      return { valid: false, error: `Missing required field: ${key}` };
    }
  }

  // Type checks
  if (typeof data.race_id !== "string") return { valid: false, error: "race_id must be a string" };
  if (typeof data.race_type !== "string") return { valid: false, error: "race_type must be a string" };
  if (typeof data.swimmer_name !== "string") return { valid: false, error: "swimmer_name must be a string" };
  if (typeof data.finish_time !== "number") return { valid: false, error: "finish_time must be a number" };
  if (!Number.isInteger(data.position)) return { valid: false, error: "position must be an integer" };

  // Optional fields
  if ("average_speed" in data && typeof data.average_speed !== "number")
    return { valid: false, error: "average_speed must be a number" };

  if ("max_speed" in data && typeof data.max_speed !== "number")
    return { valid: false, error: "max_speed must be a number" };

  if ("coach_boosts" in data && !Number.isInteger(data.coach_boosts))
    return { valid: false, error: "coach_boosts must be an integer" };

  if ("race_date" in data && isNaN(Date.parse(data.race_date)))
    return { valid: false, error: "race_date must be a valid date-time string" };

  return { valid: true };
}
