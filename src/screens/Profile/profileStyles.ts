import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",

    padding: 10,
  },
  profileInfo: {
    flex: 1,
    marginTop: 8,
    width: "100%",
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    width: "100%",
  },
  profileHeader: {
    fontSize: 32,
  },
  profileDetail: {
    fontSize: 16,
  },
  modifyButton: {
    marginLeft: 8,
  },
  modalButtons: {
    flexDirection: "row",
  },
});
