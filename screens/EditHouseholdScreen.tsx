import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useReducer, useState } from "react";
import { Field, FieldValue, FieldValues, useForm } from "react-hook-form";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Title, TextInput } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../NavContainer";

export default function EditHouseholdScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const {
    control,
    handleSubmit,
    //formState: {},
  } = useForm();

  const onEditHouseholdPressed = (data: FieldValues) => {
    //TODO: add dispatch from EditHouseholdSlice
    console.log("you have pressed edit household" + data.householdName);  
    navigation.navigate("MegaNavigationGod");
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput>Current Household name: XXXXX</TextInput>
        <CustomInput
          name="householdName"
          placeholder="Enter a new household name"
          control={control}
        ></CustomInput>
        <Pressable
          style={styles.pressable}
          onPress={handleSubmit(onEditHouseholdPressed)}
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
