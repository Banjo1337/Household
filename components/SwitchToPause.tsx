import { Switch } from "react-native-paper";
import { Modal, Platform, Pressable, View, Text } from "react-native";
import { Profile } from "../features/profile/profileTypes";
import React, { useState } from "react";
import { styles } from "../screens/EditHouseholdScreen";

interface Props {
  profile: Profile;
}

export default function SwitchToPause({ profile }: Props) {
  const [enabled, setEnabled] = useState(false);
    const [modalPauseVisible, setModalPauseVisible] = useState(false);

  const toggleSwitch = () => {
    setEnabled((oldValue) => !oldValue);
    setModalPauseVisible(!modalPauseVisible);
  };
  const thumbColorOn = Platform.OS === "android" ? "#0cd1e8" : "#f3f3f3";
  const thumbColorOff = Platform.OS === "android" ? "#f04141" : "#f3f3f3";
  const trackColorOn = Platform.OS === "android" ? "#98e7f0" : "#0cd1e8";
  const trackColorOff = Platform.OS === "android" ? "#f3adad" : "#f04141";

  return (
    <View>
      <Switch
        value={enabled}
        onValueChange={toggleSwitch}
        thumbColor={enabled ? thumbColorOn : thumbColorOff}
        trackColor={{ false: trackColorOff, true: trackColorOn }}
      />
      {enabled && (
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalPauseVisible}
          onRequestClose={() => {
            setModalPauseVisible(!modalPauseVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Define the pause</Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalPauseVisible(!modalPauseVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      {!enabled && (
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalPauseVisible}
          onRequestClose={() => {
            setModalPauseVisible(!modalPauseVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Remove the pause</Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalPauseVisible(!modalPauseVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
