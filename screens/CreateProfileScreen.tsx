import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { selectAuthUserId } from "../features/authentication/authenticationSelectors";
import { selectHousehold } from "../features/household/householdSelectors";
import { createProfile } from "../features/profile/profileSlice";
import { ProfileCreateDto } from "../features/profile/profileTypes";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";

export default function CreateProfileScreen(
  Props: NativeStackScreenProps<RootStackParamList, "CreateProfile">,
) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  const dispatch = useAppDispatch();
  const household = useAppSelector(selectHousehold);
  const authUser = useAppSelector(selectAuthUserId);

  const onCreateProfilePressed = (data: FieldValues) => {
    const sendThisProfile: ProfileCreateDto = {
      isAdmin: true,
      alias: data.profileName,
      authUserId: authUser,
    };
    sendThisProfile.householdId = household.id;
    const result = dispatch(createProfile(sendThisProfile));

    result.then(() => {
      Props.navigation.navigate("EditProfile");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile</Text>
      <CustomInput
        name='profileName'
        placeholder='Name of profile to create'
        control={control}
        rules={{
          required: "Name of profile is required",
          maxLength: {
            value: 10,
            message: "Cant be more than 10 letters",
          },
        }}
      />
      <Button
        mode={"elevated"}
        style={styles.button}
        onPress={handleSubmit(onCreateProfilePressed)}
      >
        <Text style={styles.text}>Create Profile</Text>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: "45%",
  },
  button: { width: "50%", height: 50, justifyContent: "center", margin: 10 },
  title: {
    fontSize: 40,
  },
  text: {
    elevation: 2,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 18,
    height: "auto",
  },
});
