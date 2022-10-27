import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { Household } from "../features/household/householdTypes";
import { RootStackParamList } from "../NavContainer";

type Props = NativeStackScreenProps<RootStackParamList, "CreateProfile">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CreateProfileScreen({ route, navigation }: Props) {
  const [household, setHousehold] = useState<Household>();
  const [color, setColor] = useState("#aaa");
  const [emoji, setEmoji] = useState();
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  useEffect(() => {
    (async function getHousehold() {
      console.log("Initiate fetch...");
      const response = await fetch(
        "https://household-backend.azurewebsites.net/api/V01/household/GetHouseholdById/" +
          route.params.householdId,
      );
      console.log("Fetch complete");
      if (response.ok) {
        setHousehold(await response.json());
      }
    })();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text variant='headlineSmall' style={{ marginTop: 50 }}>
            You are underway to join
          </Text>
          <Text variant='headlineMedium'>{household?.name}</Text>

          <Text>Profile Name</Text>
          <CustomInput control={control} name={"profilename"} placeholder={"Name your profile"} />
          <Text style={{ marginTop: 50 }}>Available Avatars:</Text>
          <Text style={{ marginTop: 25 }}>(List em here...)</Text>
          <View style={[styles.profilePortrait, { backgroundColor: color }]}>
            <TouchableOpacity>
              <Text style={styles.avatar}>{emoji}</Text>
            </TouchableOpacity>
          </View>
          <Button mode='contained' style={styles.joinButton}>
            Finalize & Join(UNFINISHED)
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: Dimensions.get("window").height - 100,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    height: "100%",
  },
  joinButton: {
    position: "absolute",
    bottom: 5,
  },
  profilePortrait: {
    marginTop: 30,
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
  },
  avatar: {
    fontSize: 50,
    textAlign: "center",
  },
});
