import { InputError } from "../errorTypes";
import { auth } from "../firebase";
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
}: SignUpInputs) => {
  if (password !== confirmPassword) {
    throw new InputError(
      "password_confirm",
      "Les mots de passe ne correspondent pas."
    );
  }

  await auth.createUserWithEmailAndPassword(email, password);
};

export const logout = async () => {
  await auth.signOut();
};

export const resetPassword = async ({ email }: ResetPasswordInputs) => {
  await auth.sendPasswordResetEmail(email);
};
