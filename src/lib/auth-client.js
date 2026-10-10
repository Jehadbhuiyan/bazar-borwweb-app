import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
      trustedOrigins: [
    "https://ehadbhuiyan-bazar-borwweb-app-dsf7-git-main-jehadbhuiyan.vercel.app/",
    // custom domain থাকলে সেটাও দাও
  ],
  
})

export const { signIn, signUp, useSession } = createAuthClient()