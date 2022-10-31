import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { selectAuthUserId } from "../features/authentication/authenticationSelectors";
import { selectHousehold } from "../features/household/householdSelectors";
import { selectActiveProfile } from "../features/profile/profileSelector";
import { createProfile } from "../features/profile/profileSlice";
import { ProfileCreateDto } from "../features/profile/profileTypes";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useSetAndHydrateProfile } from "../hooks/useSetAndHydrateProfile";
import { RootStackParamList } from "../NavContainer";

export default function CreateProfileScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "CreateProfile">) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  const setAndHydrateProfile = useSetAndHydrateProfile();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectActiveProfile);
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
      navigation.navigate("EditProfile");
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Title style={styles.title}>Create Profile Screen</Title>
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
          mode={"contained"}
          style={styles.button}
          onPress={handleSubmit(onCreateProfilePressed)}
        >
          <Text>Create Profile</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {},
  button: {},
  input: {},
});
