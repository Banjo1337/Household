import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { createHouseholdThunk } from "../features/household/householdSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useResetAndDeHydrateProfile } from "../hooks/useResetAndDehydrateProfile";
import { RootStackParamList } from "../NavContainer";

export default function JoinOrCreateHouseholdPromptScreen(
  Props: NativeStackScreenProps<RootStackParamList>,
) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();
  const dispatch = useAppDispatch();
  const resetState = useResetAndDeHydrateProfile();
  resetState();
  const toggleInput = () => {
    setInput((joinHousehold) => !joinHousehold);
    console.log("toggle pressed" + joinAsAdmin);
  };

  const [joinAsAdmin, setInput] = useState(false);

  const onCreateHouseholdPressed = (data: FieldValues) => {
    console.log("you have pressed create a household with name " + data.householdName);
    const result = dispatch(createHouseholdThunk({ name: data.householdName }));

    result.then(() => {
      Props.navigation.navigate("CreateProfile");
    });
  };

  const onJoinHouseholdPressed = (data: FieldValues) => {
    Props.navigation.navigate("ParsingJoinHousehold", { householdCode: data.householdCode });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text variant='headlineMedium' style={styles.headlineText}>
          Be ready to create a profile shortly!
        </Text>
        <View>
          <View style={{ marginTop: "5%" }}>
            <Text variant='headlineSmall' style={{ marginLeft: 20 }}>
              {joinAsAdmin ? "Name of Household" : "Code to Household"}
            </Text>
            {joinAsAdmin ? (
              <>
                <CustomInput
                  name='householdName'
                  placeholder='Name of household to create'
                  control={control}
                  rules={{
                    required: "Household Name is required",
                    maxLength: {
                      value: 20,
                      message: "Cant be more than 20 letters",
                    },
                  }}
                />
              </>
            ) : (
              <CustomInput
                name='householdCode'
                placeholder='Code to the household you want to join'
                control={control}
                rules={{
                  required: "Household Code is required",
                  maxLength: {
                    value: 10,
                    message: "Cant be more than 10 letters",
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
    paddingTop: "20%",
    paddingHorizontal: 20,
    height: "100%",
  },
  headlineText: {
    textAlign: "center",
  },
  joinButton: {
    position: "absolute",
    bottom: 5,
    width: "95%",
  },
});
