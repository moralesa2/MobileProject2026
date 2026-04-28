import { ID, Query } from "react-native-appwrite";
import databaseService from "./databaseService";

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const eventService = {
  // Get Events
  async getEvents(userId) {
    if (!userId) {
      console.error("Error: Missing userId in getEvents()");
      return {
        data: [],
        error: "User ID is missing",
      };
    }

    try {
      const response = await databaseService.listDocuments(dbId, colId, [
        Query.equal("user_id", userId),
      ]);
      return response;
    } catch (error) {
      console.log("Error fetching events:", error.message);
      return { data: [], error: error.message };
    }
  },
  // Add New Event
  async addEvent(user_id, text) {
    if (!text) {
      return { error: "Event text cannot be empty" };
    }

    const data = {
      text: text,
      user_id: user_id,
    };

    const response = await databaseService.createDocument(
      dbId,
      colId,
      data,
      ID.unique(),
    );

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
  // Update Event
  async updateEvent(id, text) {
    const response = await databaseService.updateDocument(dbId, colId, id, {
      text,
    });

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
  // Delete Event
  async deleteEvent(id) {
    const response = await databaseService.deleteDocument(dbId, colId, id);
    if (response?.error) {
      return { error: response.error };
    }

    return { success: true };
  },
};

export default eventService;
