// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


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

export async function saveNewsletterEmail(newemail) {
  try {
    await addDoc(collection(db, "newsletter"), {
      email: newemail,
      subscribedAt: serverTimestamp()
    });
    console.log("✅ Email saved to newsletter collection");
  } catch (error) {
    console.error("❌ Error saving email:", error);
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

// export async function fetchBlogs() {
//   try {
//     const blogsCol = collection(db, "blogs");
//     const blogsSnapshot = await getDocs(blogsCol);
//     const blogList = blogsSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     return blogList;
//   } catch (err) {
//     console.error("❌ Error fetching bilog:", err);
//     return [];
//   }
// }

export async function fetchBlogs() {
  try {
    const blogsCol = collection(db, "blogs");
    const blogsSnapshot = await getDocs(blogsCol);
    const blogList = blogsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return blogList;
  } catch (err) {
    console.error("❌ Error fetching blog:", err);
    return [];
  }
}