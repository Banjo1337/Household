import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../NavContainer";

export default function JoinOrCreateHouseholdPromptScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  const toggleInput = () => {
    setInput((joinHousehold) => !joinHousehold);
    console.log("toggle pressed" + joinAsAdmin);
  };

  const [joinAsAdmin, setInput] = useState(false);

  const onCreateHouseholdPressed = (data: FieldValues) => {
    console.log("you have pressed create household" + data.householdname + data.profilename);
    navigation.navigate("CreateHousehold");
  };
  const onJoinHouseholdPressed = (data: FieldValues) => {
    console.log("you have pressed join household" + data.householdname + data.profilename);
    navigation.navigate("ParsingJoinHouseholdScreen", { householdCode: data.householdCode });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View>
          <View style={{ marginTop: "5%" }}>
            <Text style={{ fontSize: 24, marginLeft: 20 }}>
              {joinAsAdmin ? "" : "Code to Household"}
            </Text>
            {joinAsAdmin ? (
              <>
                <Text>Continue onto next screen to create a household!</Text>
              </>
            ) : (
              <CustomInput
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
        <Button onPress={toggleInput} mode={"outlined"} style={{ marginTop: "5%" }}>
          {joinAsAdmin ? "Got a household code already?" : "Dont have a household yet? Create one"}
        </Button>
        <Button
          style={styles.joinButton}
          mode='contained'
          onPress={
            joinAsAdmin
              ? handleSubmit(onCreateHouseholdPressed)
              : handleSubmit(onJoinHouseholdPressed)
          }
        >
          {joinAsAdmin ? "Create household" : "join household"}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: Dimensions.get("window").height - 100,
    // The above equaction will have to be adjusted based on if we're gonna use the toptabs bar. Keep this in mind.
  },
  container: {
    alignItems: "center",
    paddingTop: "30%",
    paddingHorizontal: 20,
    height: "100%",
  },
  joinButton: {
    position: "absolute",
    bottom: 5,
    width: "95%",
  },
});
