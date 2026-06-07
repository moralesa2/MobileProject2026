import { View, StyleSheet } from "react-native";
import AppText from "@/components/AppText";
import React, { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import AppView from "@/components/AppView";

export default function CalendarView() {
  // fix setSelected does not exist error
  const [selected, setSelected] = useState("");
  const date = new Date();
  return (
    <AppView>
      <Calendar
        style={styles.calendar}
        current={date.toISOString().split("T")[0]} // Set current date
        // Mark specific dates as marked
        markedDates={{
          "2012-03-01": { selected: true, marked: true, selectedColor: "blue" },
          "2012-03-02": { marked: true },
          "2012-03-03": { selected: true, marked: true, selectedColor: "blue" },
        }}
        // Callback that gets called when the user selects a day
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
      />
    </AppView>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 0,
  },
});

// Calendar documentation: https://www.npmjs.com/package/react-native-calendars
