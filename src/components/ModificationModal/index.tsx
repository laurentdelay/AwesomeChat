import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { primaryColor } from "~/utils/colors";

type ModificationModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};
const ModificationModal = ({
  onClose,
  visible,
  title,
  children,
}: ModificationModalProps) => {
  return (
    <Modal
      animationType={"slide"}
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalView}>
        <View style={modalStyles.modalControls}>
          <Text style={modalStyles.title}>{title}</Text>

          <Pressable onPress={onClose} style={modalStyles.closeButton}>
            <Ionicons
              name="ios-close-circle-outline"
              size={32}
              color="#eeeeee"
            />
          </Pressable>
        </View>
        <View style={modalStyles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
};

export default ModificationModal;

const modalStyles = StyleSheet.create({
  modalView: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#eeeeee",
    height: "80%",
    width: "90%",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 100,

    alignSelf: "center",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },

  modalControls: {
    position: "relative",
    top: 0,

    width: "100%",
    maxHeight: 50,

    borderTopStartRadius: 10,
    borderTopEndRadius: 10,

    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: primaryColor,
  },

  title: {
    marginLeft: 6,
    color: "#eeeeee",
    fontSize: 18,
  },
  closeButton: {
    marginRight: 6,
  },

  modalContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
