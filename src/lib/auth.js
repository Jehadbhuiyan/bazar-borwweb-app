import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_URL);
const db = client.db("bazar_dor");

export const auth = betterAuth({
     baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    "https://ehadbhuiyan-bazar-borwweb-app-dsf7-git-main-jehadbhuiyan.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SICRET,
    },
    github: {
    clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
    clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SICTET,
  },
  },

  
  database: mongodbAdapter(db, {
    client,
  }),
});
