import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { EventsContext } from "@/contexts/EventsContext";
import events from "../data/seedEvents";
// custom components
import AppText from "@/components/AppText";
import BottomNav from "@/components/BottomNav";

export default function Events() {
  //const { events } = useContext(EventsContext);
  const router = useRouter();
  const event = events[0]; // setup; display first event in seeded data

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.eventContainer}>
          <TouchableOpacity
            style={styles.eventTitleContainer}
            onPress={() => {
              router.push(`./events/${event.id}`);
            }}
          >
            <AppText style={styles.eventTitle}>{event.title}</AppText>
          </TouchableOpacity>
          <AppText style={undefined}>{event.location}</AppText>
        </View>
        {/* {
          // apply styling to each event
          events.map((event) => (
            // set iterator to given event id
            <View style={styles.eventContainer} key={event.id}>
              <TouchableOpacity
                style={styles.eventTitleContainer}
                onPress={() => {
                  router.push(`./events/${event.id}`);
                }}
              >
                <AppText style={styles.eventTitle}>{event.title}</AppText>
              </TouchableOpacity>
              <AppText style={undefined}>{event.location}</AppText>
            </View>
          ))
        } */}
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#d9ead3",
  },
  content: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  eventContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
    maxHeight: "15%",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  eventTitleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
  },
  eventTitle: {
    fontSize: 24,
    paddingBottom: 5,
  },
  inputError: {
    fontSize: 14,
    color: "#3B1C32",
    paddingHorizontal: 10,
    textAlign: "right",
    alignSelf: "stretch",
  },
});
