import React, { useContext, useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { EventsContext } from "@/contexts/EventsContext";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AppText from "@/components/AppText";
import AppView from "@/components/AppView";
import { ConfirmDialog } from "react-native-simple-dialogs";

export default function EventDetails() {
  //#region constants
  const { id } = useLocalSearchParams();
  const { events, deleteEvent } = useContext(EventsContext);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [coords, setCoords] = useState(null);
  const router = useRouter();

  //#region Setup
  // find event with given id
  const event = events.find((event) => event.id === id);

  useEffect(() => {
    if (!event.location) return;

    // check permissions and geocode event location for map
    const fetchCoords = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      try {
        const geocoded = await Location.geocodeAsync(event.location);
        if (geocoded.length > 0) {
          setCoords({
            latitude: geocoded[0].latitude,
            longitude: geocoded[0].longitude,
          });
        }
      } catch (error) {
        console.log(`Geocoding error: ${error}`);
      }
    };

    fetchCoords();
  }, [event.location]);
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
        <View style={{ margin: 10 }}>
          <View style={styles.eventCard}>
            <AppText style={styles.title}>{event.title}</AppText>
            <AppText style={styles.eventText}>{`Date: ${event.date}`}</AppText>
            <AppText style={styles.eventText}>{`Time: ${event.time}`}</AppText>
            <AppText
              style={styles.eventText}
            >{`Location: ${event.location}`}</AppText>
            <AppText
              style={[styles.eventText, { marginTop: 5 }]}
            >{`${event.description}`}</AppText>
          </View>
          {coords && (
            <MapView
              style={styles.map}
              initialRegion={{
                ...coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={coords} title={event.location} />
            </MapView>
          )}
          <Button
            title="Edit Event"
            // show delete confirmation dialog
            onPress={() => {
              router.push(`./edit/${id}`);
            }}
          />
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
  eventCard: {
    //flex: 1,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    paddingBottom: 5,
  },
  eventText: {
    fontSize: 20,
  },
  map: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
});

/* dialog guides: 
1. https://www.npmjs.com/package/react-native-simple-dialogs#confirm-dialog
2. https://andreadams.com.br/react-native-confirm-dialog-how-to-implement-in-your-app/ */
