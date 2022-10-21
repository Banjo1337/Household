import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { Title, Button } from "react-native-paper";
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
  const [frequencyValue, setFrequencyValue] = useState(1);
  const [pointValue, setPointValue] = useState(2);
  const onOpenFrequency = useCallback(() => {
    setOpenPoint(false);
  }, []);

  const onOpenPoint = useCallback(() => {
    setOpenFrequency(false);
  }, []);
  const [frequencyItems, setFrequencyItems] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
  ]);
  const [pointItems, setPointItems] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "4", value: 4 },
    { label: "6", value: 6 },
    { label: "8", value: 8 },
  ]);

  const [recording, setRecording] = useState<Audio.Recording | any>();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
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
          <Button onPress={() => recordingLine.sound.replayAsync()}>
            <Text>Play</Text>
          </Button>
          <Button onPress={() => Sharing.shareAsync(recordingLine.file)}>
            <Text>Stop</Text>
          </Button>
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Title style={styles.title}>Add Chore</Title>
        <CustomInput
          style={styles.input}
          placeholder="Title"
          name="title"
          control={control}
          rules={{
            required: "Title of chore is required",
            minLength: { value: 2, message: "Must be 2 or more letters." },
            maxLength: {
              value: 100,
              message: "Title can be maximum 100 letters.",
            },
          }}
        />
        <CustomInput
          style={styles.input}
          placeholder="Description"
          name="description"
          control={control}
          rules={{
            required: "Description of chore is required",
            minLength: { value: 2, message: "Must be 2 or more letters" },
            maxLength: {
              value: 1000,
              message: "Cannot be longer than 1000 letters",
            },
          }}
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
              style={styles.dropDownPicker}
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
              style={styles.dropDownPicker}
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
          <Button
            style={styles.button}
            onPress={recording ? stopRecording : startRecording}
          >
            {recording ? (
              <Text>"Stop Recording"</Text>
            ) : (
              <Text>"Start Recording"</Text>
            )}
          </Button>
          {getRecordingLines()}
        </View>
        <Button style={styles.button} onPress={pickImage}>
          <Text>Pick Image</Text>
        </Button>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Button
            onPress={handleSubmit(onAddChorePressed)}
            style={styles.button}
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
          </Button>
          <Button style={styles.button}>
            <Text
              style={{
                color: "black",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              Close
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 20,
  },
  title: {
    backgroundColor: "blue",
  },
  button: { backgroundColor: "hotpink" },

  input: { backgroundColor: "brown" },
  dropDownPicker: { backgroundColor: "yellow" },
});
