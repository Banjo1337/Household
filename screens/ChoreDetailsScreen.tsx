import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Surface, Text, Title } from "react-native-paper";
import { newDateInClientTimezone } from "../app/dateUtils";
import { selectChoreById, selectIsChoreOverdueByChoreId } from "../features/chore/choreSelectors";
import { updateChore } from "../features/chore/choreSlice";
import { addChoreCompleted } from "../features/choreCompleted/choreCompletedSlice";
import { ChoreCompletedCreateDto } from "../features/choreCompleted/choreCompletedTypes";
import { selectHousehold } from "../features/household/householdSelectors";
import { selectActiveProfile } from "../features/profile/profileSelector";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";

type Props = NativeStackScreenProps<RootStackParamList, "ChoreDetails">;

export default function ChoreDetailsScreen({ route, navigation }: Props) {
  const household = useAppSelector(selectHousehold);
  const [routeId] = useState(route.params.choreId);
  const chore = useAppSelector((state) => selectChoreById(state, routeId));
  const profile = useAppSelector(selectActiveProfile);
  const isOverDue = useAppSelector((state) => selectIsChoreOverdueByChoreId(state, chore.id));
  const dispatch = useAppDispatch();

  const submitCompleteChore = () => {
    var dateTime = newDateInClientTimezone();
    const choreCompleted: ChoreCompletedCreateDto = {
      completedAt: dateTime.toISOString(),
      profileIdQol: profile.id,
      choreId: chore.id,
      householdId: household.id,
    };

    dispatch(addChoreCompleted(choreCompleted));
    if (chore.frequency === 0) {
      dispatch(
        updateChore({
          choreUpdateDto: {
            ...chore,
            isArchived: true,
          },
          choreId: chore.id,
        }),
      );
    }

    navigation.navigate("Home", { screen: "Chores" });
  };
  const onBackPressed = () => {
    navigation.navigate("Home", { screen: "Chores" });
  };
  const onEditPressed = () => {
    navigation.navigate("EditChore", { choreId: chore.id });
  };

  const profilezz = useAppSelector((state) => state.profileReducer.profile);
  console.log(profilezz);
  return (
    <Surface style={styles.container}>
      <Title style={styles.title}>{chore.name}</Title>
      {chore.description && (
        <>
          <ScrollView style={styles.descriptionField}>
            <Text>{chore.description}</Text>
          </ScrollView>
          <View style={styles.segment}></View>
        </>
      )}
      <Text style={styles.text}>
        The chore is worth <Title style={styles.title}>{chore.points}</Title> points.
      </Text>
      <View style={styles.segment}></View>
      {chore.frequency == 0 ? (
        <Text style={styles.text}>This is a one-and-done task.</Text>
      ) : chore.frequency == 1 ? (
        <Text style={styles.text}>Do this task every day.</Text>
      ) : (
        <Text style={styles.text}>
          Repeat this task every <Title style={styles.title}>{chore.frequency}</Title> days.
        </Text>
      )}
      <View style={styles.segment}></View>
      <View>
        {chore.isArchived ? (
          <Text style={styles.text}>Archived: ✅</Text>
        ) : !isOverDue && chore.frequency !== 0 ? (
          <Text style={styles.text}>Completed: ✅</Text>
        ) : (
          <Text style={styles.text}>Not completed.</Text>
        )}
      </View>
      <View style={styles.segment}></View>
      <View style={styles.buttonContainer}>
        <Button onPress={onBackPressed} mode='contained' style={styles.button}>
          <Text style={styles.text}>Go back</Text>
        </Button>
        {profile.isAdmin && (
          <Button onPress={onEditPressed} mode='contained-tonal' style={styles.button}>
            <Text style={styles.text}>Edit</Text>
          </Button>
        )}
      </View>
      <Button onPress={submitCompleteChore} mode='elevated' style={styles.completeChore}>
        <Text style={styles.text}>Mark this chore as complete</Text>
      </Button>
    </Surface>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    elevation: 3,
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
    borderRadius: 5,
  },
  segment: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  title: {
    textAlignVertical: "center",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 30,
    height: 70,
  },
  text: {
    fontWeight: "400",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 20,
    height: 70,
    padding: 3,
  },
  descriptionField: {
    marginVertical: 10,
    maxHeight: 150,
  },
  button: { width: "50%", height: 50, justifyContent: "center", margin: 7 },

  completeChore: {
    marginTop: 10,
    height: 70,
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#5fd980",
  },
});
