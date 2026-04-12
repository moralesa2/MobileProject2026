import React, { createContext, useState, useEffect } from "react";
// data storage & management
import AsyncStorage from "@react-native-async-storage/async-storage";
// seeded events data
import seedEvents from "@/data/seedEvents";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  // add seeded data to events
  useEffect(() => {
    setEvents(seedEvents);
  }, []);

  // load events array from async storage
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await AsyncStorage.getItem("events");
        if (eventsData != null) {
          const parsedEvents = JSON.parse(eventsData);
          setEvents(parsedEvents);
        }
      } catch (error) {
        console.log(`There was a problem loading events: ${error}`);
      }
    };
    loadEvents();
  }, []);

  //#region Event(s) Methods
  // store events array in async storage
  const storeEvents = async (updatedEvents) => {
    try {
      const stringifyEvents = JSON.stringify(updatedEvents);
      await AsyncStorage.setItem("events", stringifyEvents);
    } catch (error) {
      console.log(`There was a problem storing events: ${error}`);
    }
  };

  // add a single event to array
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => {
      try {
        // append new event to events array
        const updatedEvents = [...prevEvents, newEvent];
        // store new events array
        storeEvents(updatedEvents);
        // setEvents uses this new array
        return updatedEvents;
      } catch (error) {
        console.log(`There was a problem adding the event: ${error}`);
      }
    });
  };

  // update a single event in the array
  const updateEvent = (id, updatedEvent) => {
    setEvents((prevEvents) => {
      try {
        const updatedEvents = prevEvents.map((event) =>
          // finds event with given id and overwrites w/updated event info
          event.id === id ? { ...event, ...updatedEvent } : event
        );
        storeEvents(updatedEvents);
        return updatedEvents;
      } catch (error) {
        console.log(`There was a problem updating the event: ${error}`);
      }
    });
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => {
      try {
        // create new array from elements without matching id
        const updatedEvents = prevEvents.filter((event) => event.id !== id);
        storeEvents(updatedEvents);
        return updatedEvents;
      } catch (error) {
        console.log(`There was a problem deleting the event: ${error}`);
      }
    });
  };
  //#endregion

  return (
    <EventsContext.Provider
      value={{
        events,
        addEvent,
        deleteEvent,
        updateEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
