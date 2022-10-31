import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text, Button } from "react-native-paper";

import {
  selectDaysPassedSienceLastDoneAndFrequenceyAsTextByChoreId,
  selectIsChoreOverdueByChoreId,
  selectProfileWhoDidThisChoreByChoreId,
} from "../features/chore/choreSelectors";
import { Chore } from "../features/chore/choreTypes";
import { useAppSelector } from "../hooks/reduxHooks";
import { useAvatar } from "../hooks/useAvatar";

interface Props {
  chore: Chore;
  navigation: any;
  editableMode: boolean;
}

export default function ChoreCard({ chore, navigation, editableMode }: Props) {
  const profileWhoDidThisChore = useAppSelector((state) =>
    selectProfileWhoDidThisChoreByChoreId(state, chore.id),
  );
  const avatar = useAvatar(profileWhoDidThisChore.avatar);
  const daysPassedAndFrequency = useAppSelector((state) =>
    selectDaysPassedSienceLastDoneAndFrequenceyAsTextByChoreId(state, chore.id),
  );
  const isOverdue = useAppSelector((state) => selectIsChoreOverdueByChoreId(state, chore.id));
  return (
    <View style={{ alignItems: "center" }}>
      <Surface style={styles.surface}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChoreDetails", { choreId: chore.id })}
          style={{
            width: "49%",
            alignSelf: "center",
            justifyContent: "center",
            marginLeft: 5,
          }}
        >
          <Text
            style={{
              color: "#E2D1F9",
              textAlign: "left",
              marginLeft: 2,
              marginRight: 2,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {chore.name}
            {isOverdue && chore.frequency != 0 && <Text style={{ fontSize: 30 }}> ⚠️</Text>}
          </Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => navigation.navigate("ChoreDetails", { choreId: chore.id })}
          style={{
            width: "49%",
            alignSelf: "center",
            justifyContent: "center",
            marginRight: 5,
          }}
        >
          {editableMode && (
            <Button
              icon='clipboard-edit-outline'
              textColor='#E2D1F9'
              labelStyle={{ fontSize: 30 }}
              onPress={() => navigation.navigate("EditChore", { choreId: chore.id })}
              style={{
                zIndex: 1,
                position: "absolute",
                justifyContent: "flex-start",
              }}
            ></Button>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#E2D1F9",
                marginLeft: 2,
                marginRight: 2,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                justifyContent: "center",
              }}
            >

              {daysPassedAndFrequency}
              {!daysPassedAndFrequency && <Text>✅</Text>}
            </Text>
            {avatar?.emoji && (
              <Text
                style={{
                  borderRadius: 50,
                  fontSize: 50,
                  borderWidth: 1,
                  borderColor: "white",
                  backgroundColor: avatar?.color,
                }}
              >
                {avatar?.emoji}
              </Text>
            )}
          </View>

        </Pressable>
      </Surface>
    </View>
  );
}
const styles = StyleSheet.create({
  surface: {
    backgroundColor: "#317773",
    flexDirection: "row",
    height: 70,
    margin: 6,
  },
  text: {
    color: "#EEA47FFF",
  },
});
