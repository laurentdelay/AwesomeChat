import { InputError } from "../errorTypes";
import { auth, userStore } from "../firebase";
import {
  ResetPasswordInputs,
  SignInInputs,
  SignUpInputs,
} from "../types/authTypes";

export const login = async ({ email = "", password = "" }: SignInInputs) => {
  await auth.signInWithEmailAndPassword(email, password);
};

export const register = async ({
  email = "",
  password = "",
  confirmPassword = "",
  displayName = "",
}: SignUpInputs) => {
  if (password !== confirmPassword) {
    throw new InputError(
      "password_confirm",
      "Les mots de passe ne correspondent pas."
    );
  }

  const verifiedDN = displayName || email.split("@")[0];
  const { user } = await auth.createUserWithEmailAndPassword(email, password);

  user?.sendEmailVerification();
  user?.updateProfile({ displayName: verifiedDN });
  userStore
    .doc(user?.uid)
    .set({ displayName: verifiedDN, profilePic: user?.photoURL });
};

export const logout = async () => {
  await auth.signOut();
};

export const resetPassword = async ({ email }: ResetPasswordInputs) => {
  await auth.sendPasswordResetEmail(email);
};
