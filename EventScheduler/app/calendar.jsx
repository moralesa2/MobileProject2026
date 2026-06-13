// Event Scheduler - Created by Aubrey Morales 06-12-26
// Calendar displays upcoming events
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import AppText from "@/components/AppText";
import AppView from "@/components/AppView";
import React, { useState, useEffect, useMemo, useContext } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { EventsContext } from "@/contexts/EventsContext";
import { useRouter } from "expo-router";

export default function CalendarView() {
  const [selected, setSelected] = useState("");
  const { events } = useContext(EventsContext);
  const router = useRouter();
  const date = new Date();

  const markedDates = useMemo(() => {
    // mark dates with events
    const marks = {};
    for (const event of events) {
      if (!event.date) {
        continue;
      }
      marks[event.date] = {
        marked: true,
        dotColor: "blue",
        activeOpacity: 0.5,
      };
    }

    // highlight selected date
    if (selected) {
      marks[selected] = {
        ...marks[selected],
        selected: true,
        selectedColor: "blue",
      };
    }

    return marks;
  }, [events, selected]);

  // filter events for selected date
  const selectedDayEvents = useMemo(
    () => events.filter((e) => e.date === selected),
    [events, selected],
  );

  return (
    <AppView>
      <Calendar
        style={styles.calendar}
        current={date.toISOString().split("T")[0]} // current date
        markedDates={markedDates}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
      />
      {/* show events for selected date */}
      {selected ? (
        <View style={styles.selectedDayEvents}>
          <AppText
            style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
          >
            {selected}
          </AppText>
          {/* no events */}
          {selectedDayEvents.length === 0 ? (
            <AppText style={{ fontSize: 16, color: "#666" }}>
              No events on this day.
            </AppText>
          ) : (
            // events
            <FlashList
              data={selectedDayEvents}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.eventCard}>
                  <AppText style={styles.cardTitle}>{item.title}</AppText>
                  <AppText style={styles.cardBody}>
                    {item.time} · {item.location}
                  </AppText>
                </View>
              )}
            />
          )}
        </View>
      ) : null}
    </AppView>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 0,
  },
  selectedDayEvents: {
    flex: 1,
    margin: 15,
  },
  eventCard: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardBody: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

// Calendar documentation: https://www.npmjs.com/package/react-native-calendars
