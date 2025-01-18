import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function initializeFirestoreStructure() {
  const docRef = doc(db, "media", "data");

  try {
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Initialize Firestore structure
      const initialData = {
        likes: {}, // Empty likes map
        comments: {}, // Empty comments map
      };

      await setDoc(docRef, initialData);
      console.log("Firestore structure initialized successfully!");
    }
  } catch (error) {
    console.error("Error initializing Firestore structure:", error);
    throw new Error("Failed to initialize Firestore.");
  }
}
