import { Stack } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import EventsProvider from "@/contexts/EventsContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth, AuthProvider } from "@/contexts/AuthContext";
import { HeaderBackButton, HeaderButton } from "@react-navigation/elements";
import AppText from "@/components/AppText";

const HeaderLogout = () => {
  const { user, logout } = useAuth();

  return user ? (
    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
      <AppText style={styles.logoutText}>Logout</AppText>
    </TouchableOpacity>
  ) : null;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <EventsProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            headerRight: () => <HeaderLogout />,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Home Screen",
              ...defaultOptions,
            }}
          />
          <Stack.Screen
            name="events/index"
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
            name="events/edit/[id]"
            options={{
              title: "Edit Event",
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
    </AuthProvider>
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
  logoutButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

// screen options
const defaultOptions = {
  headerShown: true,
  headerTitleAlign: "center",
  headerBackVisible: false,
  headerStyle: styles.headerContainer,
  headerTitleStyle: styles.headerText,
};
