// Event Scheduler - Created by Aubrey Morales 06-12-26
// Display upcoming events in list form
import React, { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { EventsContext } from "@/contexts/EventsContext";
// custom components
import AppText from "@/components/AppText";
import AppView from "@/components/AppView";
import { useAuth } from "@/contexts/AuthContext";

export default function Events() {
  const { events } = useContext(EventsContext);
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("./auth/login");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <AppView>
      <View style={styles.content}>
        {events.map((event) => (
          <View style={styles.eventContainer} key={event.id}>
            <TouchableOpacity
              style={styles.eventTitleContainer}
              onPress={() => {
                router.push(`./events/${event.id}`);
              }}
            >
              <AppText style={styles.eventTitle}>{event.title}</AppText>
              <AppText style={styles.eventDetails}>{event.location}</AppText>
            </TouchableOpacity>
          </View>
        ))}
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
    marginTop: 10,
    borderRadius: 5,
  },
  eventTitleContainer: {
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
    fontSize: 24,
    paddingBottom: 5,
  },
  eventTitle: {
    fontSize: 24,
    paddingBottom: 5,
  },
  eventDetails: {
    fontSize: 16,
  },
  inputError: {
    fontSize: 14,
    color: "#3B1C32",
    paddingHorizontal: 10,
    textAlign: "right",
    alignSelf: "stretch",
  },
});
