import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  Pressable as Button,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Title } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../NavContainer";

export default function CreateHouseholdScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  const onCreateHouseholdPressed = (data: FieldValues) => {
    //TODO: add dispatch from CreateHouseholdSlice
    console.log("you have pressed create household" + data.householdName);
    navigation.navigate("MegaNavigationGod");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Title style={styles.title}>Create Household Screen</Title>
        <CustomInput
          style={styles.input}
          name="householdname"
          placeholder="Name of household"
          control={control}
          rules={{
            required: "Name of household is required",
            maxLength: { value: 50, message: "Cant be more than 50 letters" },
          }}
        ></CustomInput>
        <Button
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
    backgroundColor: "green",
    padding: 20,
  },
  title: {
    backgroundColor: "white",
  },
  button: { backgroundColor: "hotpink" },
  input: { backgroundColor: "brown" },
});
