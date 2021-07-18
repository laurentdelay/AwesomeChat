import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { View } from "react-native";
import CustomButton from "~/components/CustomButton";
import CustomLink from "~/components/CustomLink";
import ModificationModal from "~/components/ModificationModal";
import ProfilePic from "~/components/ProfilePic";
import { useAuth } from "~/contexts/AuthContext";
import { imageStorageRef, TaskStates, UploadTask } from "~/utils/firebase";
import { profileStyles } from "..";
import ProgressBar from "./ProgressBar";

type ProfilePictureChangeProps = {
  handleClose: () => void;
};

const ProfilePictureChange = ({ handleClose }: ProfilePictureChangeProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadingProgress, setUploadingProgress] = useState<number>(0);
  const [uploadTask, setUploadTask] = useState<UploadTask | null>(null);
  const [localImage, setLocalImage] = useState<string>("");

  const openImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Vous devez autoriser l'accés aux photos pour changer d'avatar.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) {
      return;
    }
    setLocalImage(pickerResult.uri);
  };

  const handleAvatarSave = async () => {
    setIsLoading(true);

    try {
      if (user === null) return;

      const userId = user.uid;

      const picBlob = await (await fetch(localImage)).blob();

      const newUploadTask = imageStorageRef.child(userId).put(picBlob);
      newUploadTask.on(
        "state_change",
        (snapshot) => {
          if (snapshot.state === TaskStates.CANCELED) {
            setUploadingProgress(0);
            setIsLoading(false);
            return;
          }
          setUploadingProgress(
            Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          );
        },
        (error) => {
          setIsLoading(false);
        },
        async () => {
          const imageUrl = await newUploadTask.snapshot.ref.getDownloadURL();

          await user.updateProfile({ photoURL: imageUrl });

          setIsLoading(false);
          handleClose();
        }
      );
      setUploadTask(newUploadTask);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleAvatarDelete = async () => {
    try {
      await user?.updateProfile({ photoURL: null });
      handleClose();
    } catch (error) {}
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
      title="Modifier l'avatar"
    >
      <ProfilePic
        picUri={localImage === "" ? user?.photoURL : localImage}
        hasChanged={localImage !== ""}
      />

      {!isLoading && (
        <>
          <CustomButton onPress={openImagePicker} loading={isLoading}>
            Choisir une image
          </CustomButton>
          <View style={profileStyles.modalButtons}>
            <CustomButton onPress={handleAvatarSave} loading={isLoading}>
              Enregistrer
            </CustomButton>
            <CustomButton
              onPress={() => {
                setLocalImage("");
                handleClose();
              }}
            >
              Annuler
            </CustomButton>
          </View>
          {user?.photoURL !== null && (
            <CustomLink
              title={"Supprimer l'avatar"}
              color={"alert"}
              onPress={handleAvatarDelete}
            />
          )}
        </>
      )}

      {isLoading && (
        <>
          <ProgressBar progress={uploadingProgress} />
          <CustomButton
            preset="outlined"
            onPress={() => {
              uploadTask?.cancel();
            }}
          >
            Annuler
          </CustomButton>
        </>
      )}
    </ModificationModal>
  );
};

export default ProfilePictureChange;
