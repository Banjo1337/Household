import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, TouchableHighlight, View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
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
          <Pressable onPress={()=> Props.navigation.navigate("Settings")}>
            <Title
              style={{
                color: "black",
                textAlignVertical: "center",
                textAlign: "center",
                justifyContent: "center",
                fontSize: 30,
                backgroundColor: "white",
                width: 350,
                height: 50,
                elevation: 5,
              }}
            >
              Household
            </Title>
          </Pressable>
          <Title
            style={{
              color: "black",
              textAlignVertical: "center",
              textAlign: "center",
              justifyContent: "center",
              fontSize: 20,
              backgroundColor: "white",
              width: 350,
              height: 30,
              elevation: 1,
            }}
          >
            {household.name}
          </Title>
          <Title
            style={{ textAlign: "center", backgroundColor: "white", color: "black", elevation: 5 }}
          >
            Code: {household.code}
          </Title>
        </View>
        <View
          style={{
            justifyContent: "center",
            height: "75%",
            borderColor: "white",
            borderRadius: 2,
            borderWidth: 2,
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
        </View>

        {profile.isAdmin && (
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Button
              mode='outlined'
              style={{
                width: "50%",
                alignSelf: "flex-end",
                height: 50,
                justifyContent: "flex-end",
                backgroundColor: "white",
              }}
              onPress={onAddChorePressed}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                Add Chore
              </Text>
            </Button>
            <Button
              mode='outlined'
              style={{
                width: "50%",
                height: 50,
                alignSelf: "flex-end",
                justifyContent: "flex-end",
                backgroundColor: "white",
              }}
              onPress={toggleIsEditable}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                Edit Chore
              </Text>
            </Button>
          </View>
        )}
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
  title: {
    backgroundColor: "white",
  },
  card: {},
  button: { backgroundColor: "hotpink" },
  input: { backgroundColor: "brown" },
});
