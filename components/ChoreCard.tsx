import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { selectDaysPassedSienceLastDoneAndFrequenceyAsTextByChoreId, selectIsChoreOverdueByChoreId, selectProfileWhoDidThisChoreByChoreId } from "../features/chore/choreSelectors";
import { Chore } from "../features/chore/choreTypes";
import { useAppSelector } from "../hooks/reduxHooks";
import { useAvatar } from "../hooks/useAvatar";

interface Props {
  chore: Chore;
  navigation: any;
  editableMode: boolean;
}

export default function ChoreCard({ chore, navigation, editableMode }: Props) {

  const profileWhoDidThisChore = useAppSelector((state) => selectProfileWhoDidThisChoreByChoreId(state, chore.id));
  const avatar = useAvatar(profileWhoDidThisChore.avatar);
  const daysPassedAndFrequency = useAppSelector((state) => selectDaysPassedSienceLastDoneAndFrequenceyAsTextByChoreId(state, chore.id));
  const isOverdue = useAppSelector((state) => selectIsChoreOverdueByChoreId(state, chore.id))
  return (
    <View style={{ alignItems: "center" }}>
      <Surface style={styles.surface}>
        <Pressable
          onPress={() => navigation.navigate("ChoreDetails", { choreId: chore.id })}
          style={{
            width: "45%",
            alignSelf: "center",
            justifyContent: "center",
            marginLeft: 5,
          }}
        >
          <Text style={{ textAlign: "left", marginLeft: 5 }}>{chore.name}</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("ChoreDetails", { choreId: chore.id })}
          style={{
            width: "45%",
            alignSelf: "center",
            justifyContent: "center",
            marginRight: 5,
          }}
        >
          {editableMode && (
            <Pressable
              onPress={() => navigation.navigate("EditChore", { choreId: chore.id })}
              style={{
                zIndex: 1,
                position: "absolute",
                justifyContent: "center",
              }}
            >
              <Text>Edit</Text>
            </Pressable>
          )}

          <Text style={{ textAlign: "right", marginRight: 5, alignContent: "center" }}>{avatar?.emoji} {daysPassedAndFrequency}
            {(isOverdue && (chore.frequency != 0)) && <Text>⚠️</Text>}
          </Text>
        </Pressable>
      </Surface>
    </View>
  );
}
const styles = StyleSheet.create({
  surface: {
    flexDirection: "row",

    height: 50,
    margin: 6,
  },
});
