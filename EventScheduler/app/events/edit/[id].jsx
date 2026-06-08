import React, { useContext, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { EventsContext } from "@/contexts/EventsContext";
import { Controller, useForm } from "react-hook-form";
import AppText from "@/components/AppText";
import AppView from "@/components/AppView";
import { ConfirmDialog } from "react-native-simple-dialogs";

export default function EventDetails() {
  //#region constants
  const { id } = useLocalSearchParams();
  const { events, updateEvent } = useContext(EventsContext);
  const router = useRouter();

  //#endregion

  //#region Setup
  // find event with given id
  const event = events.find((event) => event.id === id);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: event.title || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "",
      description: event.description || "",
    },
  });

  const onSubmit = (data) => {
    updateEvent(id, data);
    router.push(`/events/${id}`);
  };
  //#endregion

  //#region Page View
  // TODO: add edit button which toggles text input avilability to protect from accidental edits
  return (
    <AppView>
      {event ? (
        <KeyboardAvoidingView style={styles.content}>
          <ScrollView>
            <AppText style={styles.title}>Edit Event</AppText>
            <Controller
              control={control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Title"
                  autoCapitalize="words"
                  style={styles.eventText}
                  multiline={true}
                  numberOfLines={2}
                />
              )}
            />
            {errors.title && (
              <AppText style={{ color: "red", marginBottom: 10 }}>
                {errors.title.message}
              </AppText>
            )}

            <Controller
              control={control}
              name="date"
              rules={{
                required: "Date is required",
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: "Date must be in YYYY-MM-DD format",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Date"
                  style={styles.eventText}
                  multiline={true}
                  numberOfLines={2}
                />
              )}
            />
            {errors.date && (
              <AppText style={{ color: "red", marginBottom: 10 }}>
                {errors.date.message}
              </AppText>
            )}
            <Controller
              control={control}
              name="time"
              rules={{ required: "Time is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Time"
                  style={styles.eventText}
                  multiline={true}
                  numberOfLines={2}
                />
              )}
            />
            {errors.time && (
              <AppText style={{ color: "red", marginBottom: 10 }}>
                {errors.time.message}
              </AppText>
            )}
            <Controller
              control={control}
              name="location"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Location"
                  style={styles.eventText}
                  multiline={true}
                  numberOfLines={2}
                />
              )}
            />
            {errors.location && (
              <AppText style={{ color: "red", marginBottom: 10 }}>
                {errors.location.message}
              </AppText>
            )}
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Description"
                  style={styles.eventText}
                  multiline={true}
                  numberOfLines={2}
                />
              )}
            />
            {errors.description && (
              <AppText style={{ color: "red", marginBottom: 10 }}>
                {errors.description.message}
              </AppText>
            )}
          </ScrollView>
          <View>
            <Button title="Save" onPress={handleSubmit(onSubmit)} />
            <Button
              title="Cancel"
              onPress={() => {
                router.push(`/events/${id}`);
              }}
            />
          </View>
        </KeyboardAvoidingView>
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
  eventText: {
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
