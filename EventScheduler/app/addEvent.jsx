import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { EventsContext } from "@/contexts/EventsContext";
import { router } from "expo-router";
import { Keyboard } from "react-native";
import AppView from "@/components/AppView";

export default function AddEvent() {
  const { addEvent } = useContext(EventsContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (
      title.trim() &&
      description.trim() &&
      date.trim() &&
      time.trim() &&
      location.trim()
    ) {
      const newEvent = {
        id: Math.random().toString(),
        title,
        date,
        time,
        location,
        description,
      };
      addEvent(newEvent);
      setTitle("");
      setDate("");
      setTime("");
      setDescription("");
      setDescription("");
      setError(false);
      router.push("/");
    } else {
      setError(true);
    }
  };

  return (
    <AppView>
      {/*<Text style={styles.title}>Add New Event</Text>*/}
      <View style={{ flex: 1, padding: 20 }}>
        <TextInput
          placeholder="Enter Title"
          value={title}
          onChangeText={setTitle}
          style={styles.inputBox}
          multiline={true}
          numberOfLines={2}
        />
        <TextInput
          placeholder="Enter Date"
          value={date}
          onChangeText={setDate}
          style={styles.inputBox}
          multiline={true}
          numberOfLines={1}
        />
        <TextInput
          placeholder="Enter Time"
          value={time}
          onChangeText={setTime}
          style={styles.inputBox}
          multiline={true}
          numberOfLines={1}
        />
        <TextInput
          placeholder="Enter Location"
          value={location}
          onChangeText={setLocation}
          style={styles.inputBox}
          multiline={true}
          numberOfLines={2}
        />
        <TextInput
          placeholder="Enter Description"
          value={description}
          onChangeText={setDescription}
          style={[styles.inputBox, { height: 100 }]}
          multiline={true}
          numberOfLines={4}
        />
        <View style={{ marginVertical: 15 }}>
          <Button title="Add Event" color="#4a86e8" onPress={handleSubmit} />
        </View>
        {error ? (
          <Text style={styles.errorText}>Please fill out all fields.</Text>
        ) : null}
      </View>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9ead3",
  },
  footer: {
    backgroundColor: "#4a86e8",
    flexDirection: "row",
    padding: 20,
    width: "100%",
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 24,
    alignSelf: "center",
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
