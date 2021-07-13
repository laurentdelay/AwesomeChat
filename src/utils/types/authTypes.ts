export type SignInInputs = {
  email: string;
  password: string;
};

export type SignUpInputs = {
  email: string;
  displayName: string;
  password: string;
  confirmPassword: string;
};

export type ResetPasswordInputs = {
  email: string;
};
