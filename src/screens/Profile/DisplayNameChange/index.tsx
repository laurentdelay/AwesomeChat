import React, { useState } from "react";
import { View } from "react-native";
import ControlledTextInput from "~/components/ControlledTextInput";
import CustomButton from "~/components/CustomButton";
import ModificationModal from "~/components/ModificationModal";
import { useAuth } from "~/contexts/AuthContext";
import { useForm } from "~/hooks/useForm";
import { profileStyles } from "../profileStyles";

type DisplayNameChangeProps = {
  handleClose: () => void;
};

type ProfileUpdateInput = { displayName: string };

const DisplayNameChange = ({ handleClose }: DisplayNameChangeProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { fields, updateValue } = useForm<ProfileUpdateInput>({
    defaultValues: { displayName: user?.displayName || "" },
  });

  const handleDisplayNameSave = async () => {
    setIsLoading(true);
    try {
      await user?.updateProfile({ displayName: fields.displayName });
    } catch (error) {}

    await setIsLoading(false);
    handleClose();
  };

  return (
    <ModificationModal
      visible={true}
      onClose={
        !isLoading
          ? handleClose
          : () => {
              alert("Chargement en cours...");
            }
      }
      title="Modifier le pseudo"
    >
      <ControlledTextInput<ProfileUpdateInput>
        label="Pseudo"
        name="displayName"
        value={fields.displayName}
        onInputChange={updateValue}
        style={{ width: "80%" }}
      />
      <View style={profileStyles.modalButtons}>
        <CustomButton onPress={handleDisplayNameSave} loading={isLoading}>
          Enregistrer
        </CustomButton>
        <CustomButton
          preset="outlined"
          onPress={() => {
            updateValue("displayName", user?.displayName || "");
            if (!isLoading) handleClose();
          }}
        >
          Annuler
        </CustomButton>
      </View>
    </ModificationModal>
  );
};

export default DisplayNameChange;
