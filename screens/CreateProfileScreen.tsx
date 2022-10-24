import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Title } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../NavContainer";

export default function CreateProfileScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();
  const toggleInput = () => {
    setInput((input) => !input);
    console.log("toggle pressed");
  };
  const [input, setInput] = useState(false);

  const onCreateHouseholdPressed = (data: FieldValues) => {
    console.log(
      "you have pressed create household" +
        data.householdname +
        data.profilename
    );
    navigation.navigate("Home", {screen: "Chores"});
  };
  const onJoinHouseholdPressed = (data: FieldValues) => {
    console.log(
      "you have pressed join household" + data.householdname + data.profilename
    );
    navigation.navigate("PendingRequest");
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Title style={styles.title}>Add Chore</Title>
        <CustomInput
          style={styles.input}
          name="profilename"
          placeholder="Desired profile name"
          control={control}
          rules={{
            required: "Name of profile is required",
            minLength: { value: 2, message: "At least 2 letters" },
            maxLength: { value: 50, message: "Cant be more than 50 letters" },
          }}
        ></CustomInput>
        {/* Detta är en riktig ful lösning för att toggla rätt inputfält. vill egentligen dölja det ena på något snyggare sätt */}
        {input ? (
          <View>
            <Button style={styles.button} onPress={toggleInput}>
              <Text>Got a household code already?</Text>
            </Button>
            <CustomInput
              style={styles.input}
              name="householdname"
              placeholder="Name of Household"
              control={control}
              rules={{
                required: "Name of household is required",
                maxLength: {
                  value: 50,
                  message: "Cant be more than 50 letters",
                },
              }}
            ></CustomInput>
            <Button
              style={styles.button}
              onPress={handleSubmit(onCreateHouseholdPressed)}
            >
              Create Household
            </Button>
          </View>
        ) : (
          <View>
            <Button style={styles.button} onPress={toggleInput}>
              <Text>Dont have a household yet? Create one</Text>
            </Button>
            <CustomInput
              style={styles.input}
              name="householdcode"
              placeholder="Code to the household you want to join"
              control={control}
              rules={{
                required: "Household Code is required",
                maxLength: {
                  value: 10,
                  message: "Cant be more than 50 letters",
                },
              }}
            ></CustomInput>
            <Button
              style={styles.button}
              onPress={handleSubmit(onJoinHouseholdPressed)}
            >
              Join household
            </Button>
          </View>
        )}
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
    backgroundColor: "blue",
  },
  button: { backgroundColor: "hotpink" },

  input: { backgroundColor: "brown" },
  dropDownPicker: { backgroundColor: "yellow" },
});
