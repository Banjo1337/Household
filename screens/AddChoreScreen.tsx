import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Pressable, View, StyleSheet, Text, Image } from "react-native";
import { Title } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../NavContainer";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import * as Sharing from "expo-sharing";
import DropDownPicker from "react-native-dropdown-picker";

export default function AddChoreScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  const [openPoint, setOpenPoint] = useState(false);
  const [openFrequency, setOpenFrequency] = useState(false);
  const [frequencyValue, setFrequencyValue] = useState("1");
  const [pointValue, setPointValue] = useState("2");
  const onOpenFrequency = useCallback(() => {
    setOpenPoint(false);
  }, []);

  const onOpenPoint = useCallback(() => {
    setOpenFrequency(false);
  }, []);
  const [frequencyItems, setFrequencyItems] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
  ]);
  const [pointItems, setPointItems] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "4", value: "4" },
    { label: "6", value: "6" },
    { label: "8", value: "8" },
  ]);

  const [recording, setRecording] = useState<Audio.Recording | any>();
  const [recordings, setRecordings] = React.useState([]);
  const [, setMessage] = React.useState("");
  const [image, setImage] = useState<string | null>(null);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined!);
    await recording!.stopAndUnloadAsync();

    let updatedRecordings: any = [...recordings];
    const { sound, status } = await recording!.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording!.getURI(),
    });
    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis: number) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine: any, index) => {
      return (
        <View>
          <Text>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Pressable onPress={() => recordingLine.sound.replayAsync()}>
            <Text>Play</Text>
          </Pressable>
          <Pressable onPress={() => Sharing.shareAsync(recordingLine.file)}>
            <Text>Stop</Text>
          </Pressable>
        </View>
      );
    });
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onAddChorePressed = (data: FieldValues) => {
    console.log(data.title + data.description + frequencyValue + pointValue);
    navigation.navigate("Chores");
  };

  return (
    <View>
      <Title>Add Chore</Title>
      <CustomInput placeholder="Title" name="title" control={control} />
      <CustomInput
        placeholder="Description"
        name="description"
        control={control}
      />
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            alignSelf: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Text>Frequency of chore</Text>
          <DropDownPicker
            listMode="FLATLIST"
            open={openFrequency}
            onOpen={onOpenFrequency}
            itemKey="value"
            value={frequencyValue}
            items={frequencyItems}
            setOpen={setOpenFrequency}
            setValue={setFrequencyValue}
            setItems={setFrequencyItems}
          />
        </View>
        <View
          style={{
            width: "50%",
            alignSelf: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Text>Difficulty of chore</Text>
          <DropDownPicker
            modalTitle="Select how difficult this task is"
            listMode="FLATLIST"
            open={openPoint}
            onOpen={onOpenPoint}
            value={pointValue}
            itemKey="value"
            items={pointItems}
            setOpen={setOpenPoint}
            setValue={setPointValue}
            setItems={setPointItems}
            closeOnBackPressed={true}
            closeAfterSelecting={true}
            dropDownContainerStyle={{}}
          />
        </View>
      </View>
      <View style={styles.container}>
        <Pressable
          style={styles.pressable}
          onPress={recording ? stopRecording : startRecording}
        >
          {recording ? (
            <Text>"Stop Recording"</Text>
          ) : (
            <Text>"Start Recording"</Text>
          )}
        </Pressable>
        {getRecordingLines()}
      </View>
      <Pressable style={styles.pressable} onPress={pickImage}>
        <Text>Pick Image</Text>
      </Pressable>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Pressable
          onPress={handleSubmit(onAddChorePressed)}
          style={styles.pressable}
        >
          <Text
            style={{
              color: "black",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            Save
          </Text>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Text
            style={{
              color: "black",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            Close
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "gray",
    margin: 10,
  },
  pressable: {
    fontSize: 50,
    fontWeight: "bold",
    width: "50%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    margin: 2,
    borderColor: "black",
  },

  input: {
    height: 200,
    backgroundColor: "black",
  },
});
