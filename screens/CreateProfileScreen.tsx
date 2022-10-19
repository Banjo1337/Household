import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Pressable, View, Text, StyleSheet } from "react-native";
import {} from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../NavContainer";

export default function CreateProfileScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {
    control,
    handleSubmit,
    //formState: {},
  } = useForm();
  const toggleInput = () => {
    setInput((input) => !input);
    console.log("toggle pressed");
  };
  const [input, setInput] = useState(false);

  const onCreateHouseholdPressed = (data: FieldValues) => {
    console.log("you have pressed create household" + data.householdName);
    navigation.navigate("Chores");
  };
  const onJoinHouseholdPressed = (data: FieldValues) => {
    console.log("you have pressed join household" + data.householdCode);
    navigation.navigate("PendingRequest");
  };
  return (
    <View style={styles.container}>
      <CustomInput
        name="username"
        placeholder="Desired profile name"
        control={control}
      ></CustomInput>
      {/* Detta är en riktig ful lösning för att toggla rätt inputfält. vill egentligen dölja det ena på något snyggare sätt */}
      {input ? (
        <View>
          <Pressable style={styles.pressable} onPress={toggleInput}>
            <Text>Got a household code already?</Text>
          </Pressable>
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
      ) : (
        <View>
          <Pressable style={styles.pressable} onPress={toggleInput}>
            <Text>Dont have a household yet? Create one</Text>
          </Pressable>
          <CustomInput
            name="householdCode"
            placeholder="Code to the household you want to join"
            control={control}
          ></CustomInput>
          <Pressable
            style={styles.pressable}
            onPress={handleSubmit(onJoinHouseholdPressed)}
          >
            <Text>Join household</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "green",
    margin: 10,
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
