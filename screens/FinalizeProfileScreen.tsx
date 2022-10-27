import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../NavContainer";
import { View, StyleSheet, Modal } from "react-native";
import { Title, Button, Text } from "react-native-paper";
import { styles as modalStyles } from "./EditHouseholdScreen";
import { editProfile } from "../features/profile/profileSlice";
import AvatarSelectorItem from "../components/AvatarSelectorItem";
import { Avatar, Avatars } from "../features/profile/profileTypes";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { selectActiveProfile } from "../features/profile/profileSelector";
import { selectProfileByHousholdId } from "../features/household/householdSelectors";

export default function FinalizeProfileScreen(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Props: NativeStackScreenProps<RootStackParamList, "FinalizeProfile">,
) {
  const dispatch = useAppDispatch();
  const [deleteProfileWarning, setDeleteProfileWarning] = useState(false);
  const profile = useAppSelector(selectActiveProfile);
  const householdProfiles = useAppSelector(selectProfileByHousholdId);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(profile.avatar);
  const availableAvatars = Object.keys(Avatars)
    .filter((a) => !householdProfiles.map((p) => p.avatar).includes(a as Avatar))
    .concat(profile.avatar)
    .map((a, index) => (
      <AvatarSelectorItem
        key={index}
        avatar={a as Avatar}
        selectedAvatar={selectedAvatar}
        handlePress={setSelectedAvatar}
      />
    ));

  type FormValue = {
    name: string;
  };
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<FormValue>({ defaultValues: { name: profile.alias } });

  function submitProfileChanges(data: FormValue) {
    dispatch(
      editProfile({
        profileEditDto: {
          alias: data.name,
          avatar: selectedAvatar,
        },
        profileId: profile.id,
      }),
    );
  }

  function handleDelete() {
    console.log("deleting");
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Select your avatar:</Title>
      <View style={styles.avatarContainer}>{availableAvatars}</View>
      <Title style={styles.title}>Enter your new name:</Title>
      <View style={styles.formContainer}>
        <CustomInput
          placeholder='Name'
          name='name'
          control={control}
          defaultValue={control._defaultValues.name && ""}
          rules={{
            required: "Name is required",
            minLength: { value: 2, message: "Must be 2 or more letters." },
            maxLength: {
              value: 20,
              message: "Name can be maximum 20 letters.",
            },
          }}
        />
        <Button mode='contained' onPress={handleSubmit(submitProfileChanges)}>
          <Title style={styles.title}>Save</Title>
        </Button>
      </View>
      <Button
        style={[styles.deleteButton, {marginTop: 50}]}
        mode='contained'
        onPress={() => setDeleteProfileWarning((prevState) => !prevState)}
      >
        <Title style={styles.title}>Delete profile</Title>
      </Button>
      <Modal
        animationType='slide'
        transparent={true}
        visible={deleteProfileWarning}
        onRequestClose={() => {
          setDeleteProfileWarning((prevState) => !prevState);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Title style={modalStyles.modalText}>
              This will <Title style={styles.boldWarningTitle}>permanently</Title> delete your
              profile, are you sure you want to{" "}
              <Title style={styles.boldWarningTitle}>delete your profile</Title>
              {" "}and all statistics associated with it?
            </Title>
            <View style={styles.modalButtonContainer}>
              <Button
                mode='contained'
                onPress={() => setDeleteProfileWarning((prevState) => !prevState)}
              >
                <Text>No, take me back</Text>
              </Button>
              <Button
                style={styles.deleteButton}
                mode='contained'
                onPress={handleDelete}
              >
                <Text>Yes, delete</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "90%",
    height: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  formContainer: {
    height: 200,
    justifyContent: "space-around",
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    flexWrap: "wrap",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontWeight: "400",
    marginVertical: 20,
  },
  deleteButton: {
    backgroundColor: "#ed5c65",

  },
  boldWarningTitle: {
    fontWeight: "700",
    color: "#ed5c65",
    textDecorationLine: "underline",
  },
  modalButtonContainer: {
    flexDirection: "row",
  },
});
