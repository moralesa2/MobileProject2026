import React, { createContext, useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import * as Crypto from "expo-crypto";
import seedEvents from "@/data/seedEvents";
// guide: https://medium.com/@nnaemekaonyeji27/using-sqlite-in-expo-build-fast-offline-ready-apps-1f1ecc532d71

//#region Context/DB Setup
export const EventsContext = createContext();

const DB_NAME = "events_db";
console.log(`Opening database: ${DB_NAME}`);
const db = SQLite.openDatabaseSync(DB_NAME);
console.log("Database opened successfully.");

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  //#endregion

  //#region DB Initialization & loading
  useEffect(() => {
    const initDB = async () => {
      try {
        console.log("Initializing DB...");
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS events (
            id          TEXT PRIMARY KEY NOT NULL,
            title       TEXT,
            date        TEXT,
            time        TEXT,
            location    TEXT,
            description TEXT
          );
        `);
        console.log("DB initialized successfully.");

        // seed data if table is empty
        const { count } = await db.getFirstAsync(
          "SELECT COUNT(*) as count FROM events;",
        );

        console.log(`Current event count: ${count}`);
        if (count === 0) {
          try {
            console.log("Seeding events...");
            for (const event of seedEvents) {
              await db.runAsync(
                `INSERT INTO events (id, title, date, time, location, description)
               VALUES (?, ?, ?, ?, ?, ?);`,
                [
                  event.id,
                  event.title,
                  event.date,
                  event.time,
                  event.location,
                  event.description,
                ],
              );
            }
            console.log("Events seeded successfully.");
          } catch (error) {
            console.log(`Problem seeding events: ${error}`);
          }
        }
        console.log("Loading events...");
        await loadEvents();
        console.log("Events loaded successfully.");
      } catch (error) {
        console.log(`Problem initialising DB: ${error}`);
      }
    };
    initDB();
  }, []);

  const loadEvents = async () => {
    try {
      const rows = await db.getAllAsync(
        "SELECT * FROM events ORDER BY date ASC;",
      );
      setEvents(rows);
    } catch (error) {
      console.log(`Problem loading events: ${error}`);
    }
  };
  //#endregion

  //#region Event Methods
  const addEvent = async (newEvent) => {
    const id = Crypto.randomUUID();
    console.log(`Adding event with ID: ${id}`);
    try {
      await db.runAsync(
        `INSERT INTO events (id, title, date, time, location, description)
         VALUES (?, ?, ?, ?, ?, ?);`,
        [
          id,
          newEvent.title,
          newEvent.date,
          newEvent.time,
          newEvent.location,
          newEvent.description,
        ],
      );
      console.log("Event added successfully.");
      await loadEvents();
    } catch (error) {
      console.log(`Problem adding event: ${error}`);
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    console.log(`Updating event with ID: ${id}`);
    try {
      await db.runAsync(
        `UPDATE events SET title = ?, date = ?, time = ?, location = ?, description = ? WHERE id = ?;`,
        [
          updatedEvent.title,
          updatedEvent.date,
          updatedEvent.time,
          updatedEvent.location,
          updatedEvent.description,
          id,
        ],
      );
      console.log("Event updated successfully.");
      await loadEvents();
    } catch (error) {
      console.log(`Problem updating event: ${error}`);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await db.runAsync("DELETE FROM events WHERE id = ?;", [id]);
      await loadEvents();
    } catch (error) {
      console.log(`Problem deleting event: ${error}`);
    }
  };
  //#endregion

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
