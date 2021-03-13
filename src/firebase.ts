import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_SENDER_ID,
    appId: process.env.VUE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection('users');
const globalStatsCollection = db.collection('globalStats');
const casesStatsCollection = db.collection('casesStats');
const deathsStatsCollection = db.collection('deathsStats');
const recoveredStatsCollection = db.collection('recoveredStats');

export {
    db,
    auth,
    usersCollection,
    globalStatsCollection,
    casesStatsCollection,
    deathsStatsCollection,
    recoveredStatsCollection
}