Shifts = new Ground.Collection('shifts');

Shift = Astro.Class.create({
  name: "Shift",
  fields: {
    title: String,
    location: String,
    startTime: Date,
    endTime: Date,
    clockInTime: Date,
    clockOutTime: Date,
    job: String
  }
})

export { Shifts, Shift }