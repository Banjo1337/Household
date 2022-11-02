import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { selectChoreById } from "../features/chore/choreSelectors";
import { deleteChore, updateChore } from "../features/chore/choreSlice";
import { ChoreUpdateDto } from "../features/chore/choreTypes";
import { selectHousehold } from "../features/household/householdSelectors";
import { useTheme } from "../features/theme/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";
type Props = NativeStackScreenProps<RootStackParamList, "EditChore">;

export default function EditChoreScreen({ route, navigation }: Props) {
  const { currentTheme } = useTheme();
  const [routeId] = useState(route.params.choreId);
  const chore = useAppSelector((state) => selectChoreById(state, routeId));
  const [openPoint, setOpenPoint] = useState(false);
  const [openFrequency, setOpenFrequency] = useState(false);
  const [frequencyValue, setFrequencyValue] = useState(chore.frequency);
  const [pointValue, setPointValue] = useState(chore.points);
  const dispatch = useAppDispatch();
  const household = useAppSelector(selectHousehold);

  const dropDownFrequencyValues = [...Array(31)].map((_, i) => {
    i++;
    return { label: String(i - 1), value: i - 1 };
  });
  const dropDownPointValues = [...Array(5)].map((_, i) => {
    i++;
    return { label: String(i), value: i };
  });

  const onOpenFrequency = useCallback(() => {
    setOpenPoint(false);
  }, []);

  const onOpenPoint = useCallback(() => {
    setOpenFrequency(false);
  }, []);

  const onClosePressed = () => {
    navigation.navigate("Home", { screen: "Chores" });
  };

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm({ defaultValues: chore });

  const onEditChorePressed = (data: ChoreUpdateDto) => {
    data.frequency = frequencyValue;
    data.points = pointValue;
    dispatch(updateChore({ choreUpdateDto: data, choreId: chore.id }));
    navigation.goBack();
  };
  const createThreeButtonAlert = () =>
    Alert.alert("Delete", "Are you sure??", [
      { text: "Cancel" },
      {
        text: "Archive it instead.",
        onPress: () => {
          const choreUpdateDto: ChoreUpdateDto = {
            name: chore.name,
            points: chore.points,
            description: chore.description,
            frequency: chore.frequency,
            pictureUrl: chore.pictureUrl,
            audioUrl: chore.audioUrl,
            isArchived: true,
            householdId: household.id,
          };
          dispatch(updateChore({ choreUpdateDto: choreUpdateDto, choreId: chore.id }));
          navigation.goBack();
        },
      },
      {
        text: "Delete the chore!",
        onPress: () => {
          dispatch(deleteChore(chore.id));
          navigation.goBack();
        },
      },
    ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Chore</Text>
      <View>
        <CustomInput
          style={styles.input}
          defaultValue={chore?.name && ""}
          placeholder='Name'
          name='name'
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
          defaultValue={chore?.description && ""}
          placeholder='Description'
          name='description'
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
      <View style={{ display: "flex", flexDirection: "row", marginVertical: 30 }}>
        <View
          style={{
            width: "45%",
            paddingHorizontal: 10,
          }}
        >
          <Text>Frequency of chore</Text>
          <DropDownPicker
            placeholder={String(chore.frequency)}
            style={styles.dropDownPicker}
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
            paddingHorizontal: 10,
          }}
        >
          <Text>Difficulty of chore</Text>
          <DropDownPicker
            placeholder={String(chore.points)}
            style={styles.dropDownPicker}
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
        <Button mode='outlined' onPress={handleSubmit(onEditChorePressed)} style={styles.button}>
          <Text style={styles.text}>Save</Text>
        </Button>
        <Button mode='outlined' onPress={onClosePressed} style={styles.button}>
          <Text style={styles.text}>Close</Text>
        </Button>
      </View>
      <Button
        mode='outlined'
        style={(styles.button, { width: "70%" })}
        onPress={createThreeButtonAlert}
      >
        <Text style={styles.text}>Delete the chore</Text>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 50,
  },
  section: {
    borderRadius: 20,
    marginVertical: 10,
    padding: 30,
  },
  sectionLight: {
    backgroundColor: "#aaa",
  },
  sectionDark: {
    backgroundColor: "#333",
  },
  text: {
    color: "black",
    elevation: 2,
    fontWeight: "bold",
    backgroundColor: "white",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 20,
    height: 70,
  },
  input: { backgroundColor: "white", borderWidth: 2 },

  dropDownPicker: {},
  button: { width: "50%", height: "auto", justifyContent: "center", backgroundColor: "white" },
});
