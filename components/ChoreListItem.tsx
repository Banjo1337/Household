import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { Chore } from "../features/chore/choreTypes";

interface Props {
  chore: Chore;
  navigation: any;
  editableMode: boolean;
}

export default function ChoreListItem({ chore, navigation, editableMode }: Props) {
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
              key={chore.id}
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

          <Text style={{ textAlign: "right", marginRight: 5, alignContent: "center" }}>Frekvens: {chore.frequency}  </Text>
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
