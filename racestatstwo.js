const raceStats = {
  race_id: "race_2026_001",
  race_type: "100m-freestyle",
  swimmer_name: "Shane Choi",
  finish_time: 53420,
  position: 2,
  average_speed: 1.87,
  max_speed: 2.15,
  coach_boosts: 1,
  race_date: new Date().toISOString()
};

const result = validateRaceStats(raceStats);
console.log(result); // { valid: true }
