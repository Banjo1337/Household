import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Modal, StyleSheet, View } from "react-native";
import { Button, ProgressBar, Text, Title } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { Household } from "../features/household/householdTypes";
import { selectActiveProfile } from "../features/profile/profileSelector";
import { createProfile } from "../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";
import { styles as modalStyles } from "./EditHouseholdScreen";

type FormValue = {
  name: string;
};

export default function ParsingJoinHouseholdScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ParsingJoinHousehold">) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<FormValue>();
  const dispatch = useAppDispatch();
  const { householdCode } = route.params;
  const profile = useAppSelector(selectActiveProfile);
  const [household, setHousehold] = useState<Household>();
  const [foundHouseholdBool, setHouseholdFound] = useState(false);
  const [searching, setSearching] = useState(true);
  const [showRequestSent, setShowRequestSent] = useState(false);

  useEffect(() => {
    (async function getHousehold() {
      const response = await fetch(
        "https://household-backend.azurewebsites.net/api/V01/household/GetHouseholdByHouseholdCode/" +
          householdCode,
      );
      if (response.ok) {
        setSearching(false);
        setHousehold(await response.json());
        setHouseholdFound(true);
      } else {
        setSearching(false);
      }
    })();
  }, [householdCode]);

  const onJoinHouseholdPressed = (data: FieldValues) => {
    dispatch(
      createProfile({
        alias: data.name,
        isAdmin: false,
        householdId: household?.id,
        authUserId: profile.authUserId,
      }),
    );

    setShowRequestSent(true);
  };

  return (
    <View style={styles.container}>
      {!foundHouseholdBool && searching && (
        <>
          <Text>Searching...</Text>
          <ProgressBar indeterminate={true} style={{ width: "50%" }} />
        </>
      )}
      {!foundHouseholdBool && !searching && (
        <>
          <Text style={styles.title}>No household by the code {householdCode} was found!</Text>

          <Button
            mode='contained'
            style={styles.cancelBtn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            Return & Try Again
          </Button>
        </>
      )}
      {foundHouseholdBool && !searching && (
        <>
          <Text variant='titleMedium'>This code belongs to</Text>
          <Text variant='headlineMedium' style={{ textAlign: "center" }}>
            {household?.name}
          </Text>
          <CustomInput
            placeholder='Name'
            name='name'
            control={control}
            rules={{
              required: "Name is required",
              minLength: { value: 2, message: "Must be 2 or more letters." },
              maxLength: {
                value: 20,
                message: "Name can be maximum 20 letters.",
              },
            }}
          />
          <Button
            mode='contained'
            onPress={handleSubmit(onJoinHouseholdPressed)}
            style={{ marginTop: 100 }}
          >
            Ask to join!
          </Button>
        </>
      )}
      <Modal
        animationType='slide'
        transparent={true}
        visible={showRequestSent}
        onRequestClose={() => {
          navigation.navigate("SelectProfile");
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Title style={modalStyles.modalText}>Your request has been sent</Title>
            <Button mode='contained' onPress={() => navigation.navigate("SelectProfile")}>
              <Text>Ok!</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
  },
  cancelBtn: {
    position: "absolute",
    bottom: 30,
  },
});
