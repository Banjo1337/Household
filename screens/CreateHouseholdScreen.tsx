import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { createHouseholdThunk } from "../features/household/householdSlice";
import { HouseholdCreateDto } from "../features/household/householdTypes";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useSetAndHydrateProfile } from "../hooks/useSetAndHydrateProfile";
import { RootStackParamList } from "../NavContainer";

export default function CreateHouseholdScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  const setAndHydrateProfile = useSetAndHydrateProfile();
  const dispatch = useAppDispatch();

  const onCreateHouseholdPressed = (data: FieldValues) => {
    const sendThis: HouseholdCreateDto = { name: data.name };
    const jsonResult = dispatch(createHouseholdThunk(sendThis));
    console.log(jsonResult);

    navigation.navigate("EditProfile", { isAdmin: true });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Title style={styles.title}>Create Household Screen</Title>
        <CustomInput
          name='name'
          placeholder='Name of household to create'
          control={control}
          rules={{
            required: "Name of household is required",
            maxLength: {
              value: 50,
              message: "Cant be more than 50 letters",
            },
          }}
        />
        <Button
          mode={"contained"}
          style={styles.button}
          onPress={handleSubmit(onCreateHouseholdPressed)}
        >
          <Text>Create Household</Text>
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
  input: {
    backgroundColor: "brown",
  },
});
