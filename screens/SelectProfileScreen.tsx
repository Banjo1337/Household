import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { setActiveProfile } from "../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";
import { Profile } from "../features/profile/profileTypes";
import { useState } from "react";
import SelectProfileButton from "../components/SelectProfileButton";
import { useEffect } from "react";
import { hydrateHouseholdSliceFromBackendThunk } from "../features/household/householdSlice";
import { hydrateChoresSliceFromBackendThunk } from "../features/chore/choreSlice";

import { selectAuthUserId } from "../features/authentication/authenticationSelectors";

export default function SelectProfileScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "SelectProfile">) {
  const dispatch = useAppDispatch();
  const authUserId = useAppSelector(selectAuthUserId);
  const [profiles, setProfiles] = useState<Profile[]>();

  useEffect(() => {
    (async function getProfiles() {
      const response = await fetch(
        "https://household-backend.azurewebsites.net/api/V01/profile/GetByUserID/286c4279-bce5-4dbd-830a-10d2aab95ecd",
      );
      if (response.ok) {
        setProfiles(await response.json());
      }
    })();
  }, [authUserId]);

  function handleSelectUser(profile: Profile) {
    dispatch(setActiveProfile(profile));
    dispatch(hydrateHouseholdSliceFromBackendThunk(profile.householdId));
    dispatch(hydrateChoresSliceFromBackendThunk(profile.householdId));

    //dispatch(getAllChoreCompleted(profile.householdId));
    //dispatch(selectChores());
  }

  let mockDataIfProfilesIsEmpty: Profile[];

  if (profiles) {
    mockDataIfProfilesIsEmpty = profiles;
  } else {
    mockDataIfProfilesIsEmpty = [
      {
        id: "1",
        avatar: "fox",
        isAdmin: false,
        householdId: "abc",
        authUserId: "abc",
        alias: "alias",
        pendingRequest: false,
      },
      {
        id: "2",
        avatar: "pig",
        isAdmin: false,
        householdId: "abc",
        authUserId: "abc",
        alias: "alias",
        pendingRequest: false,
      },
      {
        id: "3",
        avatar: "frog",
        isAdmin: false,
        householdId: "abc",
        authUserId: "abc",
        alias: "alias",
        pendingRequest: false,
      },
    ];
  }

  return (
    <View style={styles.profileContainer}>
      {mockDataIfProfilesIsEmpty?.map((p) => (
        <SelectProfileButton key={p.id} profile={p} handleSelectUser={handleSelectUser} />
      ))}
      <View style={[styles.profilePortrait, { backgroundColor: "#474747" }]}>
        <Pressable onPress={() => navigation.navigate("CreateProfile")}>
          <Text style={styles.avatar}>➕</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    height: "100%",
    justifyContent: "space-around",
  },
  profilePortrait: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    marginBottom: 15,
  },
  profilePortraitPressable: {
    height: "100%",
    width: "100%",
  },
  avatar: {
    fontSize: 50,
    textAlign: "center",
  },
});
