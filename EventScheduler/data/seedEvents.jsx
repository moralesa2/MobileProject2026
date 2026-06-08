import * as Crypto from "expo-crypto";
const id1 = Crypto.randomUUID();
const id2 = Crypto.randomUUID();

const events = [
  {
    id: id1,
    title: "Breakfast At Mucho Gusto",
    date: "2026-06-18",
    time: "10:00 AM",
    location: "67 Oakway Ctr, Eugene, OR 97401",
    description: "This is a sample event description for Event 1.",
  },
  {
    id: id2,
    title: "Bowling",
    date: "2026-06-25",
    time: "2:00 PM",
    location: "1170 Highway 99 N, Eugene, OR 97402-2013",
    description: "This is a sample event description for Event 2.",
  },
];

export default events;
