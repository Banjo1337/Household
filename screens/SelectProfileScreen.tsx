import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Text, Title, Button } from "react-native-paper";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";
import { Profile } from "../features/profile/profileTypes";
import { useState } from "react";
import SelectProfileButton from "../components/SelectProfileButton";
import { useEffect } from "react";
import { selectAuthUserId } from "../features/authentication/authenticationSelectors";
import { useSetAndHydrateProfile } from "../hooks/useSetAndHydrateProfile";
import { selectActiveProfile } from "../features/profile/profileSelector";
import useModalStyles from "../hooks/useModalStyles";


export default function SelectProfileScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "SelectProfile">) {
  const authUserId = useAppSelector(selectAuthUserId);
  const profile = useAppSelector(selectActiveProfile);
  const [profiles, setProfiles] = useState<Profile[]>();
  const setAndHydrateProfile = useSetAndHydrateProfile();
  const [showProfilePending, setShowProfilePending] = useState(false);
  const modalStyles = useModalStyles();

  useEffect(() => {
    (async function getProfiles() {
      const response = await fetch(
        "https://household-backend.azurewebsites.net/api/V01/profile/GetByUserID/" + authUserId,
      );
      if (response.ok) {
        setProfiles(await response.json());
      }
    })();
  }, [authUserId, profile]);

  function handleSelectUser(profile: Profile) {
    if (profile.pendingRequest) {
      setShowProfilePending(true);
    } else {
      setAndHydrateProfile(profile)
        .then(() => navigation.navigate("Home", {screen: "Chores"}));
    }
  }

  return (
    <View style={styles.profileContainer}>
      {profiles?.map((p) => (
        <SelectProfileButton key={p.id} profile={p} handleSelectUser={handleSelectUser} />
      ))}
      <View style={[styles.profilePortrait, { backgroundColor: "#474747" }]}>
        <TouchableOpacity onPress={() => navigation.navigate("JoinOrCreateHouseholdPrompt")}>
          <Text style={styles.avatar}>➕</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={showProfilePending}
        onRequestClose={() => {
          setShowProfilePending(false);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Title style={modalStyles.modalText}>This profile is still pending</Title>
            <Button mode='contained' onPress={() => setShowProfilePending(false)}>
              <Text>Ok!</Text>
            </Button>
          </View>
        </View>
      </Modal>
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
