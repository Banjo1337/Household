import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
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
    setInput((joinHousehold) => !joinHousehold);
    console.log("toggle pressed" + joinAsUser);
  };
  const [joinAsUser, setInput] = useState(false);

  const onCreateHouseholdPressed = (data: FieldValues) => {
    console.log("you have pressed create household" + data.householdname + data.profilename);
    navigation.navigate("Home", { screen: "Chores" });
  };
  const onJoinHouseholdPressed = (data: FieldValues) => {
    console.log("you have pressed join household" + data.householdname + data.profilename);
    navigation.navigate("PendingRequest");
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <CustomInput
          style={styles.input}
          name='profilename'
          placeholder='Profile name'
          control={control}
          rules={{
            required: "Name of profile is required",
            minLength: { value: 2, message: "At least 2 letters" },
            maxLength: { value: 50, message: "Cant be more than 50 letters" },
          }}
        ></CustomInput>

        <View style={styles.separator}></View>

        <View style={{ marginTop: "15%" }}>
          <Button style={styles.button} onPress={toggleInput}>
            <Text>
              {joinAsUser
                ? "Got a household code already?"
                : "Dont have a household yet? Create one"}
            </Text>
          </Button>
          <View style={{ marginTop: "5%" }}>
            {joinAsUser ? (
              <CustomInput
                style={styles.input}
                name='householdname'
                placeholder='Name of Household'
                control={control}
                rules={{
                  required: "Name of household is required",
                  maxLength: {
                    value: 50,
                    message: "Cant be more than 50 letters",
                  },
                }}
              />
            ) : (
              <CustomInput
                style={styles.input}
                name='householdcode'
                placeholder='Code to the household you want to join'
                control={control}
                rules={{
                  required: "Household Code is required",
                  maxLength: {
                    value: 10,
                    message: "Cant be more than 50 letters",
                  },
                }}
              />
            )}
          </View>
        </View>
        <Button
          style={styles.joinButton}
          onPress={
            joinAsUser
              ? handleSubmit(onCreateHouseholdPressed)
              : handleSubmit(onJoinHouseholdPressed)
          }
        >
          Create profile and {joinAsUser ? "Household" : "join household"}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
  },
  container: {
    alignItems: "center",
    paddingTop: "30%",
    paddingHorizontal: 20,
    height: "100%",
  },
  separator: {
    marginTop: "15%",
    height: 8,
    width: "80%",
    backgroundColor: "#5553",
    borderRadius: 50,
  },
  button: { backgroundColor: "#ccc" },
  joinButton: {
    position: "absolute",
    bottom: 5,
    backgroundColor: "#d0f5",
    width: "95%",
    paddingVertical: 10,
  },
  input: {},
});
