import { ColorValue } from "react-native";

export const primaryColor: ColorValue = "#0099ff";
export const secondaryColor: ColorValue = "#ffffff";
export const alertColor: ColorValue = "#ff0000";
export const warningColor: ColorValue = "#fa9923";
export const successColor: ColorValue = "#00ff00";

export type ColorsName =
  | "primary"
  | "secondary"
  | "alert"
  | "warning"
  | "success";

const themeColors: Record<ColorsName, ColorValue> = {
  primary: primaryColor,
  secondary: secondaryColor,
  alert: alertColor,
  warning: warningColor,
  success: successColor,
};

export default themeColors;
