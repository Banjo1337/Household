import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";

export default function ParsingJoinHouseholdScreen({
  route,
  navigation,
}: // eslint-disable-next-line @typescript-eslint/no-unused-vars
NativeStackScreenProps<RootStackParamList, "ParsingJoinHouseholdScreen">) {
  const dispatch = useAppDispatch();

  const [household, setHousehold] = useState();
  const [foundHouseholdBool, setHouseholdFound] = useState(false);

  useEffect(() => {
    (async function getHousehold() {
      console.log("Initiate fetch...");
      const response = await fetch(
        "https://household-backend.azurewebsites.net/api/V01/household/GetHouseholdByHouseholdCode/" +
          route.params.householdCode,
      );
      console.log("Fetch complete?");
      if (response.ok) {
        console.log("Response OK. Setting values...");
        setHousehold(await response.json());
        setHouseholdFound(true);
      }
    })();
  });

  return (
    <View style={styles.container}>
      {!foundHouseholdBool ? (
        <>
          <Text style={styles.title}>
            A notification to join has been sent to household owner(s) of (householdname)
          </Text>
          <Text style={styles.bread}>Please wait...</Text>

          <Button
            style={styles.cancelBtn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            Cancel
          </Button>
          <Button
            style={[styles.cancelBtn, { bottom: 100 }]}
            onPress={() => {
              console.log(foundHouseholdBool);
            }}
          >
            Found it?
          </Button>
        </>
      ) : (
        <>
          <Text>You have successfully joined </Text>
        </>
      )}
    </View>
  );
  /* return (
    <View>
      <Text>(admin) has accepted your invitation!</Text>
    </View>
  ); */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 100,
    fontSize: 26,
    textAlign: "center",
  },
  bread: {
    marginTop: 25,
    fontSize: 16,
  },
  cancelBtn: {
    position: "absolute",
    bottom: 30,
  },
});
