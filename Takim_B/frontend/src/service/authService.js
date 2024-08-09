import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";

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
