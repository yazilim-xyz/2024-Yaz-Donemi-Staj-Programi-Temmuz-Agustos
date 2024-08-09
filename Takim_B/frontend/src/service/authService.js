import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = (email, password, username) => {
  return createUserWithEmailAndPassword(auth, email, password).then((authUser) => {
    return updateProfile(authUser.user, { displayName: username });
  });
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const checkAdmin = async (email) => {
  const adminDocRef = doc(db, "admins", email);
  const adminDoc = await getDoc(adminDocRef);

  if (adminDoc.exists() && adminDoc.data().isAdmin) {
    return true; // Admin olarak tanımlanmış
  } else {
    return false; // Admin değil
  }
};
