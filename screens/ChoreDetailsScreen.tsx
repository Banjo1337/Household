import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Checkbox, Text, Title } from "react-native-paper";
import { selectChoreById } from "../features/chore/choreSelectors";
import { selectHousehold } from "../features/household/householdSelectors";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";


type Props = NativeStackScreenProps<RootStackParamList, "ChoreDetails">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ChoreDetailsScreen({ route, navigation }: Props) {
  const household = useAppSelector(selectHousehold);
  const [routeId] = useState(route.params.choreId);
  const chore = useAppSelector((state) => selectChoreById(state, routeId));
  const [checked, setChecked] = useState(chore.isArchived);
  const dispatch = useAppDispatch();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    setCurrentDate(
      year + '/' + month + '/' + date
      + ' ' + hours + ':' + min + ':' + sec
    );
  }, []);

  const onSavePressed = () => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    // const choreCompleted: ChoreCompletedCreateDto = {
    //   completedAt: dateTime,
    //   profileIdQol: profile.i,
    //   choreId: chore.id,
    //   householdId: household.id,
    // }
    console.log(dateTime);
    // dispatch(addChoreCompleted(choreCompleted))
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
          <Text>The chore is worth <Title>{chore.frequency}</Title> points.</Text>
          <Text>It should be done every <Title>{chore.points}</Title> day.</Text>
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
