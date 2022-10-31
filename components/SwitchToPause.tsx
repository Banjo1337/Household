import { Switch, Text } from "react-native-paper";
import { Modal, Platform, Pressable, View, StyleSheet, TouchableOpacity } from "react-native";
import { Profile } from "../features/profile/profileTypes";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import { FieldValues, useForm } from "react-hook-form";
import { createPause, updatePause } from "../features/pause/pauseSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { selectHousehold } from "../features/household/householdSelectors";
import { newDateInClientTimezone } from "../app/dateUtils";
import {PauseCreateDto, PauseUpdateDto} from "../features/pause/pauseTypes";
import { selectCurrentlyPausedByProfileId } from "../features/pause/pauseSelectors";

interface Props {
  profile: Profile;
}

export default function SwitchToPause({ profile }: Props) {
  const dispatch = useAppDispatch();
  const household = useAppSelector(selectHousehold);
  const pause = useAppSelector((state) => selectCurrentlyPausedByProfileId(state, profile.id));
  const isPaused = () => {
    if (pause.length>0){
      return true;
    }
    return false;
  }; 
  
  const [enabled, setEnabled] = useState(isPaused);
  const [modalPauseVisible, setModalPauseVisible] = useState(false);

  const todaysDate = newDateInClientTimezone();

  const {
    control,
    handleSubmit,
    //formState: {},
  } = useForm();

  const onDefinePauseDurationPressed = (data: FieldValues) => {
    const duration = Number(data.duration);
    const startPauseDate = todaysDate;
    const pauseDuration = startPauseDate.getDate() + duration;
    const initialDate = newDateInClientTimezone();
    initialDate.setDate(pauseDuration);
    const endPauseDate = initialDate;

    const pauseCreateDto : PauseCreateDto  = {
        startDate: todaysDate.toISOString(),
        endDate: endPauseDate.toISOString(),
        householdId: household.id,
        profileIdQol: profile.id,
    };
    dispatch(createPause(pauseCreateDto));
  };

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
              <Text>
                the pause will start today, {todaysDate.getDate()}/{todaysDate.getMonth() + 1}/
                {todaysDate.getFullYear()}
              </Text>
              <Text>Duration of the pause in days? </Text>
              <CustomInput
                name='duration'
                placeholder='Duration of the pause'
                control={control}
              ></CustomInput>
              <TouchableOpacity
                style={styles.pressable}
                onPress={handleSubmit(onDefinePauseDurationPressed)}
              >
                <Text style={{fontSize: 15}}>Validate</Text>
              </TouchableOpacity>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalPauseVisible(!modalPauseVisible);
                }}
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
              <Text style={styles.modalText}>The ongoing pause is now stopped</Text>
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalPauseVisible(!modalPauseVisible);
                  if (pause.length>0) {
                    const pauseId = pause[0].id;
                    const pauseUpdateDto: PauseUpdateDto = {
                      endDate: newDateInClientTimezone().toISOString(),
                      householdId: household.id,
                    };
                    dispatch(updatePause({ pauseUpdateDto, pauseId }));
                  }
                }}
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pressable: {
    fontSize: 70,
    fontWeight: "bold",
    width: 200,
    height: 50,
    color: "blue",
    backgroundColor: "white",
    borderRadius: 5,
    margin: 2,
    borderColor: "red",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
