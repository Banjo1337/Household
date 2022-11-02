import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import ChoreCard from "../components/ChoreCard";
import { selectChoresToShowInChoreScreen } from "../features/chore/choreSelectors";

import { selectHousehold } from "../features/household/householdSelectors";
import { selectActiveProfile } from "../features/profile/profileSelector";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";
//import { TopTabParamsList } from "../navigation/TopTabsNavigator";

//type Props = NativeStackScreenProps<RootStackParamList>;

export default function ChoresScreen(Props: NativeStackScreenProps<RootStackParamList>) {
  const [editableMode, setEditableMode] = useState(false);
  const household = useAppSelector(selectHousehold);
  const chores = useAppSelector(selectChoresToShowInChoreScreen);
  const profile = useAppSelector(selectActiveProfile);

  const onAddChorePressed = () => {
    Props.navigation.navigate("AddChore");
  };

  const toggleIsEditable = () => {
    setEditableMode((current: boolean) => !current);
  };

  return (
    <>
      <View style={{ justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.settingsText}
            onPress={() => Props.navigation.navigate("Settings")}
          >
            <Text
              style={{
                textAlignVertical: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 30,
                elevation: 5,
                padding: 10,
              }}
            >
              {household.name} ⚙️
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            height: "85%",
            marginTop: 20,
          }}
        >
          <FlatList
            data={chores}
            renderItem={({ item }) => (
              <TouchableHighlight>
                <View>
                  <ChoreCard
                    chore={item}
                    navigation={Props.navigation}
                    editableMode={editableMode}
                  ></ChoreCard>
                </View>
              </TouchableHighlight>
            )}
          />
          {profile.isAdmin && (
            <View style={{ flexDirection: "row", justifyContent: "center", margin: 10 }}>
              <Button mode='contained' style={styles.button} onPress={onAddChorePressed}>
                <Text style={styles.text}>Add Chore</Text>
              </Button>
              <Button mode='contained-tonal' style={styles.button} onPress={toggleIsEditable}>
                <Text style={styles.text}>Edit Chore</Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },
  button: { width: "50%", height: 50, justifyContent: "center", margin: 7 },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    height: "auto",
  },
  settingsText: {
    elevation: 3,
    borderWidth: 1,
    borderColor: "white",
  },
});
