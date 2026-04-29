import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { EventsContext } from "@/contexts/EventsContext";
import events from "../data/seedEvents";
// custom components
import AppText from "@/components/AppText";
import AppView from "@/components/AppView";

export default function Events() {
  //const { events } = useContext(EventsContext);
  const router = useRouter();
  const event = events[0]; // setup; display first event in seeded data

  return (
    <AppView>
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
    </AppView>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    marginBottom: 10,
  },
  eventContainer: {
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  eventTitleContainer: {
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
