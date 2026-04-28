import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import EventsProvider from "@/contexts/EventsContext";
import { HeaderBackButton } from "@react-navigation/elements";

export default function RootLayout() {
  return (
    <EventsProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Events",
            ...defaultOptions,
          }}
        />
        <Stack.Screen
          name="events/[id]"
          options={{
            title: "Event Details",
            ...defaultOptions,
          }}
        />
        <Stack.Screen
          name="addEvent"
          options={{
            title: "Add Event",
            ...defaultOptions,
          }}
        />
        <Stack.Screen
          name="calendar"
          options={{
            title: "Calendar",
            ...defaultOptions,
          }}
        />
      </Stack>
    </EventsProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#4a86e8",
    alignContent: "center",
  },
  headerText: {
    color: "white",
    fontSize: 30,
  },
});

// screen options
const defaultOptions = {
  headerShown: true,
  headerTitleAlign: "center",
  headerStyle: styles.headerContainer,
  headerTitleStyle: styles.headerText,
  backButtonEnabled: false,
};
