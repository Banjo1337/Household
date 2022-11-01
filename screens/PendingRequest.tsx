import { View, StyleSheet } from "react-native";
import { Surface, Text, Button, Title } from "react-native-paper";
import { selectPendingRequestProfiles } from "../features/household/householdSelectors";
import { denyPendingRequest } from "../features/household/householdSlice";
import { editProfile } from "../features/profile/profileSlice";
import { Profile } from "../features/profile/profileTypes";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

export default function PendingRequestScreen() {
  const dispatch = useAppDispatch();
  const pendingRequests = useAppSelector(selectPendingRequestProfiles);

  function approveRequest(profile: Profile) {
    dispatch(
      editProfile({
        profileEditDto: { ...profile, pendingRequest: false },
        isActiveProfile: false,
        profileId: profile.id,
      }),
    );
  }

  function denyRequest(profileId: string) {
    dispatch(denyPendingRequest(profileId));
  }
  return (
    <View>
      {pendingRequests.length ? 
      pendingRequests.map((p) => (
        <Surface key={p.id} style={styles.listItem}>
          <Text>{p.alias}</Text>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => denyRequest(p.id)}
              style={[styles.button, { backgroundColor: "#d64f4f" }]}
              mode='contained'
              >
              <Text>🛑</Text>
            </Button>
            <Button
              onPress={() => approveRequest(p)}
              style={[styles.button, { backgroundColor: "#4dc46f" }]}
              mode='contained'
            >
              <Text>✅</Text>
            </Button>
          </View>
        </Surface>
      )) 
      :
        <Title>No more pending requests</Title>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "95%",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
  },
  button: {
    marginHorizontal: 15,
  },
});
