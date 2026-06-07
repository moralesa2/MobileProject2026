import { Account, Client, Databases } from "react-native-appwrite";

const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: "event-scheduler-android",
  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: {
    events: process.env.EXPO_PUBLIC_APPWRITE_COL_EVENTS_ID,
  },
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const database = new Databases(client);

const account = new Account(client);

export { account, client, config, database };
