import React, { useContext, useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { EventsContext } from "@/contexts/EventsContext";
//custom components
import AppText from "@/components/AppText";
import AppView from "@/components/AppView";
// choice confirmation
import { ConfirmDialog } from "react-native-simple-dialogs";

export default function EventDetails() {
  //#region constants
  const { id } = useLocalSearchParams();
  const { events, deleteEvent, updateEvent } = useContext(EventsContext);
  const router = useRouter();
  const [title, setTitle] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  // confirm dialog
  const [dialogVisible, setDialogVisible] = useState(false);
  //#endregion

  //#region Setup
  // find event with given id
  const event = events.find((event) => event.id === id);

  useEffect(() => {
    // if event exists set properties
    if (event) {
      setTitle(event.title || "");
      setDate(event.date || "");
      setTime(event.time || "");
      setDescription(event.description || "");
      setLocation(event.location || "");
    }
  }, [event]);
  //#endregion

  //#region Handle delete & confirmation dialog
  // delete event
  const handleDelete = (id) => {
    setDialogVisible(false);
    console.log("Delete touched!");
    if (id) {
      deleteEvent(id);
    } else {
      console.log(`Delete failed, id is ${id}.`);
    }
  };
  //#endregion

  //#region Page View
  // TODO: add edit button which toggles text input avilability to protect from accidental edits
  return (
    <AppView>
      {event ? (
        <View style={styles.content}>
          <AppText style={styles.title}>Edit Event</AppText>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={title}
            style={styles.habitText}
            multiline={true}
            numberOfLines={2}
          />
          <TextInput
            value={date}
            onChangeText={setDate}
            placeholder={date}
            style={styles.habitText}
            multiline={true}
            numberOfLines={1}
          />
          <TextInput
            value={time}
            onChangeText={setTime}
            placeholder={time}
            style={styles.habitText}
            multiline={true}
            numberOfLines={1}
          />
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder={location}
            style={styles.habitText}
            multiline={true}
            numberOfLines={2}
          />
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder={description}
            style={styles.habitText}
            multiline={true}
            numberOfLines={4}
          />

          <View style={{ marginBottom: 15 }}>
            <Button
              title="Save Changes"
              onPress={() => {
                updateEvent(id, { title, date, time, location, description });
                router.push("/");
              }}
            />
          </View>

          <View style={{ marginBottom: 15 }}>
            <Button
              title="Delete Event"
              // show delete confirmation dialog
              onPress={() => {
                setDialogVisible(true);
              }}
            />
            <ConfirmDialog
              style={styles.dialog}
              title="Delete Event?"
              // hide dialog
              onTouchOutside={() => {
                setDialogVisible(false);
              }}
              // from state
              visible={dialogVisible}
              positiveButton={{
                title: "Delete",
                onPress: () => {
                  // delete event after confirmation
                  handleDelete(id);
                  router.push("/");
                },
              }}
              negativeButton={{
                title: "Cancel",
                onPress: () => {
                  // hide dialog after cancelled
                  console.log("Cancel touched!");
                  setDialogVisible(false);
                },
              }}
            />
          </View>
        </View>
      ) : (
        <AppText>Event not found</AppText>
      )}
    </AppView>
  );
  //#endregion
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9ead3",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    paddingBottom: 5,
  },
  habitText: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 20,
    backgroundColor: "white",
    textAlignVertical: "top",
  },
});

/* dialog guides: 
1. https://www.npmjs.com/package/react-native-simple-dialogs#confirm-dialog
2. https://andreadams.com.br/react-native-confirm-dialog-how-to-implement-in-your-app/ */
