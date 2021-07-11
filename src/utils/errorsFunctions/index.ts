import { saveErrorCode } from "./uncaughtCodesSave";

export const errorMessages: Record<string, string> = {
  "auth/invalid-email": "Vous devez entrer un email valide",
  "auth/user-not-found": "L'email fourni n'a pas été trouvé.",
  "auth/wrong-password": "Le mot de passe est incorrect.",
  "auth/weak-password": "Mot de passe faible.",
  "auth/too-many-requests":
    "Trop de tentatives: veuillez réessayer dans quelques minutes.",
};

export const parseErrorMessage = (
  { code, message, source }: Record<string, string>,
  defaultMessage: string = "Une erreur est survenue"
): string => {
  if (code === undefined) {
    if (message !== "") return message;

    return defaultMessage;
  }

  if (code === "BAD_USER_INPUT") {
    if (message === "") {
      return source;
    }

    return message;
  }

  const errorMessage = errorMessages[code];

  if (errorMessage !== undefined) return errorMessage;

  saveErrorCode(code);
  return `${defaultMessage}`;
};
