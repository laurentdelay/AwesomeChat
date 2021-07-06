import { InputError } from "../errorTypes";
import { auth } from "../firebase";
import { SignInInputs, SignUpInputs } from "../types/authTypes";

const succesMessage = "succesMessage";

export const login = async ({ email = "", password = "" }: SignInInputs) => {
  await auth.signInWithEmailAndPassword(email, password);

  return succesMessage;
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

  return succesMessage;
};

export const logout = async () => {
  auth.signOut();

  return succesMessage;
};
