import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, TouchableOpacity } from "react-native";
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
import { getAllChoreCompleted } from "../features/choreCompleted/choreCompletedSlice";
import { hydratePauseSliceFromBackendThunk } from "../features/pause/pauseSlice";

export default function SelectProfileScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "SelectProfile">) {
  const dispatch = useAppDispatch();
  const authUserId = useAppSelector(selectAuthUserId);
  const [profiles, setProfiles] = useState<Profile[]>();

  useEffect(() => {
    (async function getProfiles() {
      const response = await fetch(
        "https://household-backend.azurewebsites.net/api/V01/profile/GetByUserID/" + authUserId,
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
    dispatch(getAllChoreCompleted(profile.householdId));
    dispatch(hydratePauseSliceFromBackendThunk(profile.householdId));

    navigation.goBack();
  }

  return (
    <View style={styles.profileContainer}>
      {profiles?.map((p) => (
        <SelectProfileButton key={p.id} profile={p} handleSelectUser={handleSelectUser} />
      ))}
      <View style={[styles.profilePortrait, { backgroundColor: "#474747" }]}>
        <TouchableOpacity onPress={() => navigation.navigate("CreateProfile")}>
          <Text style={styles.avatar}>➕</Text>
        </TouchableOpacity>
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
