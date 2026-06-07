import * as Crypto from "expo-crypto";
const id1 = Crypto.randomUUID();
const id2 = Crypto.randomUUID();

const events = [
  {
    id: id1,
    title: "Event 1",
    date: "2026-08-08",
    time: "10:00 AM",
    location: "123 Main St, Springfield",
    description: "This is a sample event description for Event 1.",
  },
  {
    id: id2,
    title: "Event 2",
    date: "2026-08-09",
    time: "2:00 PM",
    location: "456 Elm St, Springfield",
    description: "This is a sample event description for Event 2.",
  },
];

export default events;

// sample events from Eugene Weekly: https://calendar.eugeneweekly.com/calendars/all-events/
