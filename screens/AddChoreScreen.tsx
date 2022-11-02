import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { createChore } from "../features/chore/choreSlice";
import { ChoreCreateDto } from "../features/chore/choreTypes";
import { selectHousehold } from "../features/household/householdSelectors";
import { useTheme } from "../features/theme/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";

export default function AddChoreScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  const [openPoint, setOpenPoint] = useState(false);
  const [openFrequency, setOpenFrequency] = useState(false);
  const [frequencyValue, setFrequencyValue] = useState(1);
  const [pointValue, setPointValue] = useState(2);
  const dispatch = useAppDispatch();
  const household = useAppSelector(selectHousehold);

  const onOpenFrequency = useCallback(() => {
    setOpenPoint(false);
  }, []);
  const onOpenPoint = useCallback(() => {
    setOpenFrequency(false);
  }, []);
  const onClosePressed = () => {
    navigation.navigate("Home", { screen: "Chores" });
  };
  const dropDownFrequencyValues = [...Array(31)].map((_, i) => {
    i++;
    return { label: String(i - 1), value: i - 1 };
  });
  const dropDownPointValues = [...Array(5)].map((_, i) => {
    i++;
    return { label: String(i), value: i };
  });
  const { currentTheme } = useTheme();

  const onAddChorePressed = (data: FieldValues) => {
    const choreCreateDto: ChoreCreateDto = {
      name: data.name,
      points: pointValue,
      description: data.description,
      frequency: frequencyValue,
      pictureUrl: "",
      audioUrl: "",
      isArchived: false,
      householdId: household.id,
    };
    dispatch(createChore(choreCreateDto));
    navigation.navigate("Home", { screen: "Chores" });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Chore</Text>
      <View>
        <CustomInput
          placeholder='Name'
          name='name'
          defaultValue={""}
          control={control}
          rules={{
            required: "Name of chore is required",
            minLength: { value: 2, message: "Must be 2 or more letters." },
            maxLength: {
              value: 100,
              message: "Name can be maximum 100 letters.",
            },
          }}
        />
        <CustomInput
          placeholder='Description'
          name='description'
          defaultValue={""}
          control={control}
          rules={{
            required: "Description of chore is required",
            minLength: { value: 2, message: "Must be 2 or more letters" },
            maxLength: {
              value: 1000,
              message: "Cannot be longer than 1000 letters",
            },
          }}
          multiline={true}
          numOfLines={5}
        />
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            width: "45%",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", marginTop: 7 }}>Frequency of chore</Text>
          <DropDownPicker
            listMode='SCROLLVIEW'
            open={openFrequency}
            onOpen={onOpenFrequency}
            itemKey='value'
            value={frequencyValue}
            items={dropDownFrequencyValues}
            setOpen={setOpenFrequency}
            setValue={setFrequencyValue}
            closeOnBackPressed={true}
            closeAfterSelecting={true}
            theme={currentTheme.dark ? "DARK" : "LIGHT"}
          />
        </View>
        <View
          style={{
            width: "45%",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", marginTop: 7 }}>Difficulty of chore</Text>
          <DropDownPicker
            modalTitle='Select how difficult this task is'
            listMode='SCROLLVIEW'
            open={openPoint}
            onOpen={onOpenPoint}
            value={pointValue}
            itemKey='value'
            items={dropDownPointValues}
            setOpen={setOpenPoint}
            setValue={setPointValue}
            closeOnBackPressed={true}
            closeAfterSelecting={true}
            dropDownContainerStyle={{}}
            theme={currentTheme.dark ? "DARK" : "LIGHT"}
          />
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Button mode='contained' onPress={handleSubmit(onAddChorePressed)} style={styles.button}>
          <Text style={styles.text}>Save</Text>
        </Button>
        <Button mode='contained-tonal' style={styles.button} onPress={onClosePressed}>
          <Text style={styles.text}>Close</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 30,
    height: "100%",
  },
  title: {
    fontSize: 50,
  },
  section: {
    borderRadius: 20,
  },
  sectionLight: {
    backgroundColor: "#aaa",
  },
  sectionDark: {
    backgroundColor: "#333",
  },
  button: { width: "50%", height: "auto", justifyContent: "center", margin: 10 },
  text: {
    elevation: 2,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 20,
    height: "auto",
  },
});
