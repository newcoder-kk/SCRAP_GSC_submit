import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const serviceAccount = require('../creds.json')

// Initialize Firebase
const app = initializeApp(serviceAccount);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
