import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Pressable, View, Text, StyleSheet } from "react-native";
import {} from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../NavContainer";

export default function CreateHouseholdScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {
    control,
    handleSubmit,
    //formState: {},
  } = useForm();

  const onCreateHouseholdPressed = (data: FieldValues) => {
    //TODO: add dispatch from CreateHouseholdSlice
    console.log("you have pressed create household" + data.householdName);
    navigation.navigate("MegaNavigationGod");
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomInput
          name="householdName"
          placeholder="Name of household"
          control={control}
        ></CustomInput>
        <Pressable
          style={styles.pressable}
          onPress={handleSubmit(onCreateHouseholdPressed)}
        >
          <Text>Create Household</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  pressable: {
    fontSize: 70,
    fontWeight: "bold",
    width: 200,
    height: 50,
    color: "blue",
    backgroundColor: "white",
    borderRadius: 5,
    margin: 2,
    borderColor: "red",
  },
});
