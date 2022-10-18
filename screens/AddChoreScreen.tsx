import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Pressable, View, StyleSheet, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Title } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../NavContainer";

export default function AddChoreScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
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

  const onAddChorePressed = (data: FieldValues) => {
    console.log(data.title + data.description + frequencyValue + pointValue);
    navigation.navigate("Chores");
  };

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  return (
    <View>
      <Title>Add Chore</Title>
      <CustomInput placeholder="Title" name="title" control={control} />

      <CustomInput
        placeholder="Description"
        name="description"
        control={control}
      />

      <Pressable
        style={styles.pressable}
        onPress={handleSubmit(onAddChorePressed)}
      >
        <Text>Add Chore</Text>
      </Pressable>
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
          <Text>Difficulty of view</Text>
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
    width: 100,
    height: 30,
    backgroundColor: "gray",
    borderRadius: 5,
    margin: 2,
    borderColor: "black",
  },
  input: {
    height: 200,
    backgroundColor: "black",
  },
});
