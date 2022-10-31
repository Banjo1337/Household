import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableHighlight, View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import ChoreCard from "../components/ChoreCard";
import {
  selectChoresToShowInChoreScreen,
  selectProfileWhoDidThisChoreByChoreId,
} from "../features/chore/choreSelectors";

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
          <Title
            style={{
              color: "#E2D1F9",
              textAlignVertical: "center",
              textAlign: "center",
              justifyContent: "center",
              fontSize: 30,
              backgroundColor: "#317773",
              width: 350,
              height: 50,
            }}
          >
            Household:{household.name}
          </Title>
          <Title style={{ textAlign: "center", backgroundColor: "#E2D1F9", color: "#317773" }}>

            Code: {household.code}
          </Title>
        </View>
        <View
          style={{
            justifyContent: "center",
            height: "75%",
            borderColor: "#E2D1F9",
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
              mode='contained'
              style={{
                width: "50%",
                alignSelf: "flex-end",
                justifyContent: "flex-end",
                backgroundColor: "#317773",
              }}
              onPress={onAddChorePressed}
            >
              <Text
                style={{
                  color: "#E2D1F9",
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
              mode='contained'
              style={{
                width: "50%",
                alignSelf: "flex-end",
                justifyContent: "flex-end",
                backgroundColor: "#317773",
              }}
              onPress={toggleIsEditable}
            >
              <Text
                style={{
                  color: "#E2D1F9",
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
