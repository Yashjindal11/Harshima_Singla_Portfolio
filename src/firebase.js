// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWlKeLZNA0V1AyjdsuoZCJbQzcWKyLufU",
  authDomain: "harshima-portfolio.firebaseapp.com",
  projectId: "harshima-portfolio",
  storageBucket: "harshima-portfolio.firebasestorage.app",
  messagingSenderId: "221886497973",
  appId: "1:221886497973:web:626ebce9d0a327cd15aafc",
  measurementId: "G-G8T5H0KJCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function logemailClick(email) {
    try{
        await addDoc(collection(db, "emailClicks"), {
            email,
            clickedAt: serverTimestamp()
        });
        console.log("Email logged!");
    }
    catch (err) {
        console.error("Error logging click: ", err);
    }
}

export async function logMessageSubmission(formData = {}) {
  try {
    await addDoc(collection(db, "contactMessages"), {
      ...formData,
      submittedAt: serverTimestamp()
    });
    console.log("✅ Message stored in Firestore!");
    return true;
  } catch (err) {
    console.error("❌ Error saving message:", err);
    return false;
  }
}