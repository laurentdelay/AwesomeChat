import { errorsStore } from "../firebase";

export const saveErrorCode = async (errorCode: string): Promise<void> => {
  try {
    // search for the code in store
    const foundCodes = await errorsStore.where("code", "==", errorCode).get();

    // store the code if it doesn't already exist
    if (foundCodes.empty) {
      errorsStore.add({ code: errorCode });
    }
  } catch (error) {
    console.error(error);
  }
};
