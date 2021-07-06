import { SignInInputs, SignUpInputs } from "../types/authTypes";
import { login, register } from ".";
import { auth } from "../firebase";

describe("authFunctions", () => {
  const testUser: SignInInputs = {
    email: "test@mail.com",
    password: "password",
  };

  beforeAll(async (done) => {
    await auth.createUserWithEmailAndPassword(
      testUser.email,
      testUser.password
    );

    done();
  });

  afterAll(async () => {
    await auth.signInWithEmailAndPassword(testUser.email, testUser.password);
    await auth.currentUser?.delete();
  });

  describe.skip("login", () => {
    afterEach(async () => {
      auth.signOut();
    });

    it("should throw an input error for inexisting user", async () => {
      const wrongEmail = { ...testUser, email: "wrong@mail.com" };

      try {
        await login(wrongEmail);
        fail();
      } catch (error) {
        expect(error.code).toBe("auth/user-not-found");
      }
    });

    it("should throw an input error for wrong password", async () => {
      const wrongPassword = { ...testUser, password: "wrongpass" };

      try {
        await login(wrongPassword);
        fail();
      } catch (error) {
        expect(error.code).toBe("auth/wrong-password");
      }
    });

    it("should return a succes code for succesful login", async () => {
      expect(await login(testUser)).toBe("OK");
      expect(auth.currentUser).not.toBeUndefined();
      expect(auth.currentUser?.email).toBe(testUser.email);
    });
  });

  describe("register", () => {
    const newTestUser: SignUpInputs = {
      email: "new@mail.com",
      password: "password",
      confirmPassword: "password",
    };

    afterEach(async () => {
      await auth.currentUser?.delete();
    });

    it("should throw an input error for passwords not matching", async () => {
      const wrongPasswords = {
        ...newTestUser,
        confirmPassword: "wrongpass",
      };

      try {
        await register(wrongPasswords);
        fail();
      } catch (error) {
        expect(error.code).toBe("BAD_USER_INPUT");
        expect(error.source).toBe("password_confirm");
      }
    });

    it("should throw an error for bad email format", async () => {
      const badEmail = { ...newTestUser, email: "notAMail" };

      try {
        await register(badEmail);

        fail();
      } catch (error) {
        expect(error.code).toBe("auth/invalid-email");
      }
    });

    it("should throw an error for already existing user", async () => {
      const existingUser = { ...newTestUser, email: testUser.email };

      try {
        await register(existingUser);

        fail();
      } catch (error) {
        expect(error.code).toBe("auth/existing-user");
      }
    });

    it("should return a succes code for succesful register", async () => {
      expect(await register(newTestUser)).toBe("OK");
      expect(auth.currentUser).not.toBeUndefined();
      expect(auth.currentUser?.email).toBe(newTestUser.email);
    });
  });
});
