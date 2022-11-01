import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Button, Checkbox, Text, Title } from "react-native-paper";
import { newDateInClientTimezone } from "../app/dateUtils";
import { selectChoreById, selectIsChoreOverdueByChoreId } from "../features/chore/choreSelectors";
import { updateChore } from "../features/chore/choreSlice";
import { ChoreUpdateDto } from "../features/chore/choreTypes";
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
  const isOverDue = useAppSelector((state) => selectIsChoreOverdueByChoreId(state, chore.id));
  const dispatch = useAppDispatch();

  const onCheckedPressed = () => {
    if (checked) {
      var dateTime = newDateInClientTimezone();
      const choreCompleted: ChoreCompletedCreateDto = {
        completedAt: dateTime.toISOString(),
        profileIdQol: profile.id,
        choreId: chore.id,
        householdId: household.id,
      };
      dispatch(addChoreCompleted(choreCompleted));
      if (chore.frequency === 0) {
        const choreUpdateDto: ChoreUpdateDto = {
          name: chore.name,
          points: chore.points,
          description: chore.description,
          pictureUrl: chore.pictureUrl,
          audioUrl: chore.audioUrl,
          frequency: chore.frequency,
          isArchived: true,
          householdId: household.id,
        };
        dispatch(updateChore({ choreUpdateDto, choreId: chore.id }));
      }
      navigation.navigate("Home", { screen: "Chores" });
    } else console.log("not changed");
  };
  const onBackPressed = () => {
    navigation.navigate("Home", { screen: "Chores" });
  };
  const onEditPressed = () => {
    navigation.navigate("EditChore", { choreId: chore.id });
  };
  return (
    <>
      <View style={styles.container}>
        <Title style={styles.title}>{chore.name}</Title>
        <ScrollView
          style={{
            marginTop: 10,
            maxHeight: 150,
            maxWidth: "85%",
            backgroundColor: "white",
            borderRadius: 10,
            borderWidth: 1,
          }}
        >
          <Text style={styles.descriptionField}>
            {chore.description}This task is do be done onceThis task is do be done onceThis task is
            do be done onceThis task is do be done onceThis task is do be done onceThis task is do
            be done onceThis task is do be done onceThis task is do be done onceThis task is do be
            done onceThis task is do be done onceThis task is do be done onceThis task is do be done
            onceThis task is do be done onceThis task is do be done onceThis task is do be done
            onceThis task is do be done onceThis task is do be done onceThis task is do be done
            onceThis task is do be done onceThis task is do be done onceThis task is do be done
            onceThis task is do be done onceThis task is do be done onceThis task is do be done
            onceThis task is do be done onceThis task is do be done onceThis task is do be done
            onceThis task is do be done onceThis task is do be done onceThis task is do be done
            onceThis task is do be done onceThis task is do be done onceThis task is do be done
            onceThis task is do be done onceThis task is do be done onceThis task is do be done
            onceThis task is do be done once
          </Text>
        </ScrollView>
        <Text style={styles.text}>
          The chore is worth <Title style={styles.title}>{chore.points}</Title> points.
        </Text>
        {chore.frequency == 0 ? (
          <Text style={styles.text}>This task is do be done once</Text>
        ) : chore.frequency == 1 ? (
          <Text style={styles.text}>
            It should be done every other<Title style={styles.title}>{chore.frequency} </Title> day.
          </Text>
        ) : (
          <Text style={styles.text}>
            Repeat every <Title style={styles.title}>{chore.frequency}</Title> days.
          </Text>
        )}
        <View>
          {chore.isArchived ? (
            <Text style={styles.text}>
              <Title style={styles.title}>Archived: ✅</Title>
            </Text>
          ) : !isOverDue ? (
            <Text style={styles.text}>
              <Title style={styles.title}>Completed: ✅</Title>
            </Text>
          ) : (
            <Text style={styles.text}>
              <Title style={styles.title}>Not completed. </Title>
            </Text>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onBackPressed} mode='outlined' style={styles.button}>
          <Text style={styles.text}>Go back</Text>
        </Button>
        {profile.isAdmin && (
          <Button onPress={onEditPressed} mode='outlined' style={styles.button}>
            <Text style={styles.text}>Edit</Text>
          </Button>
        )}
      </View>
      <View style={styles.container}>
        <Pressable onPress={onCheckedPressed}>
          <Text style={styles.text}>Mark this chore as complete</Text>
        </Pressable>
        <Checkbox
          color='black'
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  checkbox: {
    width: 50,
    height: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    elevation: 10,
  },
  title: {
    backgroundColor: "white",
    elevation: 10,
    textAlignVertical: "center",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    width: "98%",
    height: 70,
  },
  text: {
    color: "black",
    elevation: 15,
    fontWeight: "bold",
    backgroundColor: "white",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 20,
    height: 70,
    margin: 3,
  },
  descriptionField: {
    fontSize: 15,
    margin: "auto",
    borderwidth: 1,
    borderRadius: 1,
  },
  button: {
    width: "50%",
    height: "auto",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
