import React, { useContext, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { EventsContext } from "@/contexts/EventsContext";
import { Controller, useForm } from "react-hook-form";
import AppText from "@/components/AppText";
import AppView from "@/components/AppView";

export default function AddEvent() {
  const { events, addEvent } = useContext(EventsContext);
  const router = useRouter();
  const placeholderTextColor = "rgba(0, 0, 0, 0.5)";

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
          <Controller
            control={control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Title"
                placeholderTextColor={placeholderTextColor}
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
                placeholder="Date (YYYY-MM-DD)"
                placeholderTextColor={placeholderTextColor}
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
                placeholderTextColor={placeholderTextColor}
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
                placeholderTextColor={placeholderTextColor}
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
                placeholderTextColor={placeholderTextColor}
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <AppText style={styles.buttonText}>Save</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.replace(`/`);
            }}
          >
            <AppText style={styles.buttonText}>Cancel</AppText>
          </TouchableOpacity>
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
    padding: 10,
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
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  button: {
    padding: 10,
    width: "100%",
    backgroundColor: "#4a86e8",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "semi-bold",
  },
});

/* dialog guides: 
1. https://www.npmjs.com/package/react-native-simple-dialogs#confirm-dialog
2. https://andreadams.com.br/react-native-confirm-dialog-how-to-implement-in-your-app/ */
