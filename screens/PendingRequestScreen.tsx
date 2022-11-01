import { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Surface, Text, Button, Title } from "react-native-paper";
import {
  selectHousehold,
  selectPendingRequestProfiles,
} from "../features/household/householdSelectors";
import { denyPendingRequest } from "../features/household/householdSlice";
import profileSlice, { editProfile } from "../features/profile/profileSlice";
import { Profile } from "../features/profile/profileTypes";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { styles as modalStyles } from "./EditHouseholdScreen";

export default function PendingRequestScreen() {
  const dispatch = useAppDispatch();
  const pendingRequests = useAppSelector(selectPendingRequestProfiles);
  const { name } = useAppSelector(selectHousehold);
  const [isApprove, setIsApprove] = useState(true);
  const [showConfirmationWindow, setShowConfirmationWindow] = useState<boolean>(false);
  const [selectedProfile, setSelectedProfile] = useState({} as Profile);

  function approveRequest() {
    dispatch(
      editProfile({
        profileEditDto: { ...selectedProfile, pendingRequest: false },
        isActiveProfile: false,
        profileId: selectedProfile.id,
      }),
    );
  }

  function denyRequest() {
    dispatch(denyPendingRequest(selectedProfile?.id));
  }

  function openModalAndSetState(profile: Profile, isApprove: boolean) {
    setSelectedProfile(profile);
    setIsApprove(isApprove);
    setShowConfirmationWindow(true);
  }

  const deny = () => <Title style={{ fontWeight: "500", color: "#d64f4f" }}>deny</Title>;
  const approve = () => <Title style={{ fontWeight: "500", color: "#4dc46f" }}>approve</Title>;

  return (
    <View>
      <Title style={styles.title}>Pending request for {name}</Title>
      {pendingRequests.length ? (
        pendingRequests.map((p) => (
          <Surface key={p.id} style={styles.listItem}>
            <Text>{p.alias}</Text>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => openModalAndSetState(p, false)}
                style={[styles.button, { backgroundColor: "#d64f4f" }]}
                mode='contained'
              >
                <Text>🛑</Text>
              </Button>
              <Button
                onPress={() => openModalAndSetState(p, true)}
                style={[styles.button, { backgroundColor: "#4dc46f" }]}
                mode='contained'
              >
                <Text>✅</Text>
              </Button>
            </View>
          </Surface>
        ))
      ) : (
        <Title>No more pending requests</Title>
      )}
      <Modal
        animationType='slide'
        transparent={true}
        visible={showConfirmationWindow}
        onRequestClose={() => {
          setShowConfirmationWindow(false);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Title style={modalStyles.modalText}>
              Are your sure you want to {isApprove ? approve() : deny()} "{selectedProfile.alias}"?
            </Title>
            <View style={styles.buttonContainer}>
              <Button mode='contained' onPress={() => setShowConfirmationWindow(false)}>
                <Text>No</Text>
              </Button>
              <Button mode='contained' onPress={isApprove ? approveRequest : denyRequest}>
                <Text>Yes</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
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
    height: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
  },
  button: {
    marginHorizontal: 15,
  },
  title: {
    textAlign: "center",
  },
});
