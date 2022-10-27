import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Checkbox, Text, Title } from "react-native-paper";
import { selectChoreById } from "../features/chore/choreSelectors";
import { addChoreCompleted } from "../features/choreCompleted/choreCompletedSlice";
import { ChoreCompletedCreateDto } from "../features/choreCompleted/choreCompletedTypes";
import { selectHousehold } from "../features/household/householdSelectors";
import { selectActiveProfile } from "../features/profile/profileSelector";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";


type Props = NativeStackScreenProps<RootStackParamList, "ChoreDetails">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ChoreDetailsScreen({ route, navigation }: Props) {
  const household = useAppSelector(selectHousehold);
  const [routeId] = useState(route.params.choreId);
  const chore = useAppSelector((state) => selectChoreById(state, routeId));
  const [checked, setChecked] = useState(false);
  const profile = useAppSelector(selectActiveProfile);
  const dispatch = useAppDispatch();

  const onSavePressed = () => {
    if (checked) {
      var dateTime = new Date();
      const choreCompleted: ChoreCompletedCreateDto = {
        completedAt: dateTime.toISOString(),
        profileIdQol: profile.id,
        choreId: chore.id,
        householdId: household.id,
      };
      dispatch(addChoreCompleted(choreCompleted));
      navigation.navigate("Home", { screen: "Chores" });
    }
    else console.log("not changed");
  };
  const onBackPressed = () => {
    navigation.navigate("Home", { screen: "Chores" });
  };
  const onEditPressed = () => {
    navigation.navigate("EditChore", { choreId: chore.id });
  };
  return (
    <>
      <ScrollView >
        <View style={styles.container}>
          <Title>{chore.name}</Title>
          <Text>{chore.description}</Text>
          <Text>The chore is worth <Title>{chore.points}</Title> points.</Text>
          {chore.frequency == 0 ? <Text>This task is do be done once</Text>
            : chore.frequency == 1 ? <Text>It should be done every other <Title>{chore.frequency}</Title> day.</Text>
              : <Text>It should be done every <Title>{chore.frequency}</Title> days.</Text>
          }
        </View>
        <View style={styles.container}>
          <Button onPress={onBackPressed} mode="contained" style={styles.button}>Go back</Button>
          <Button onPress={onEditPressed} mode="contained" style={styles.button}>Edit this chore</Button>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Title>Mark this task as done</Title>
          <Button onPress={onSavePressed}>Save changes</Button>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 30,

  },
  title: {
    fontSize: 50,
    backgroundColor: "black",
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
  button: { backgroundColor: "green", width: 150, height: 50, marginTop: 15 },
  input: {},
  dropDownPicker: {},
});
