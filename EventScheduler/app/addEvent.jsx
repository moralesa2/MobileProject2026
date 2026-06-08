import React, { useContext, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { EventsContext } from "@/contexts/EventsContext";
import { Controller, useForm } from "react-hook-form";
import AppText from "@/components/AppText";
import AppView from "@/components/AppView";

export default function AddEvent() {
  const { events, addEvent } = useContext(EventsContext);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    addEvent(data);
    router.replace(`/`);
  };
  //#endregion

  //#region Page View
  // TODO: add edit button which toggles text input avilability to protect from accidental edits
  return (
    <AppView>
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
            rules={{
              required: "Time is required",
            }}
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
              router.replace(`/`);
            }}
          />
        </View>
      </KeyboardAvoidingView>
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
