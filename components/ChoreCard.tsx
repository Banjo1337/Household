import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text, IconButton } from "react-native-paper";

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
              textAlign: "left",
              marginLeft: 2,
              marginRight: 2,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {chore.name}
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
          {isOverdue && chore.frequency != 0 && (
            <Text
              style={{
                fontSize: 30,
                zIndex: 1,
                position: "absolute",
                justifyContent: "flex-start",
              }}
            >
              ⚠️
            </Text>
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
                marginLeft: 2,
                marginRight: 2,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {editableMode && (
                <>
                  <IconButton
                    icon='clipboard-edit-outline'
                    size={50}
                    onPress={() => navigation.navigate("EditChore", { choreId: chore.id })}
                    style={{
                      zIndex: 1,
                      position: "absolute",
                      justifyContent: "flex-start",
                    }}
                  ></IconButton>
                </>
              )}
              {!chore.isArchived && !editableMode && daysPassedAndFrequency}
              {chore.isArchived && !editableMode && <Text>✅</Text>}
            </Text>
            {avatar?.emoji && !editableMode && (
              <Text
                style={{
                  borderRadius: 50,
                  fontSize: 50,
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
    flexDirection: "row",
    height: 70,
    margin: 6,
    elevation: 5,
  },
});
