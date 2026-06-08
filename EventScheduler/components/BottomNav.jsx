import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AppText from "./AppText";

export default function BottomNav() {
  return (
    <View style={styles.nav}>
      <TouchableOpacity
        onPress={() => {
          router.push("/");
        }}
      >
        <AppText style={styles.text}>Home</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push(`/events/addEvent`);
        }}
      >
        <AppText style={styles.text}>Add Event</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push(`/calendar`);
        }}
      >
        <AppText style={styles.text}>Calendar</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "#4a86e8",
    flexDirection: "row",
    padding: 20,
    paddingBottom: 40,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
