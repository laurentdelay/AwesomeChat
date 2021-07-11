import { errorMessages, parseErrorMessage } from "./errorsFunctions";

describe.only("utils", () => {
  describe("errorParsing", () => {
    describe("parseErrorMessage", () => {
      it("should return the provided message when no code is provided", () => {
        const message = "This is an error";
        expect(parseErrorMessage({ message })).toBe(message);
      });

      it("should return a predefined message with no code and no message", () => {
        const message = "";
        const defaultMessage = "Default Message";

        expect(parseErrorMessage({ message })).not.toBe(message);
        expect(parseErrorMessage({ message }, defaultMessage)).toBe(
          defaultMessage
        );
      });

      it("should return a parsed message for listed codes", () => {
        const error = {
          code: "auth/invalid-email",
          message: "firebase message",
        };

        const defaultMessage = "default message";

        const parsedMessage = parseErrorMessage(error, defaultMessage);
        expect(parsedMessage).not.toBe(error.message);
        expect(parsedMessage).toBe(errorMessages[error.code]);
      });

      it("should return the code and default message for unlisted codes", () => {
        const error = {
          code: "unlisted code",
          message: "random message",
        };

        const defaultMessage = "default message";

        const parsedMessage = parseErrorMessage(error, defaultMessage);
        expect(parsedMessage).not.toBe(error.message);
        expect(parsedMessage).toMatch(defaultMessage);
        expect(parsedMessage).toMatch(error.code);
      });

      it("should return the provided message for BAD_USER_INPUT code", () => {
        const error = {
          code: "BAD_USER_INPUT",
          message: "Wrong inputs",
          source: "input",
        };

        expect(parseErrorMessage(error)).toBe(error.message);
      });

      it("should return the provided source for BAD_USER_INPUT code with empty message", () => {
        const error = {
          code: "BAD_USER_INPUT",
          message: "",
          source: "input",
        };

        expect(parseErrorMessage(error)).toBe(error.source);
      });
    });
  });
});
