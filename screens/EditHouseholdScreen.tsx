import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Switch } from "react-native-paper";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

import CustomInput from "../components/CustomInput";
import {
  selectHousehold,
  selectProfileByHousholdId,
} from "../features/household/householdSelectors";
import { editHouseholdThunk } from "../features/household/householdSlice";
import { selectPauses } from "../features/pause/pauseSelectors";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useAvatar } from "../hooks/useAvatar";
import { RootStackParamList } from "../NavContainer";

export default function EditHouseholdScreen({ route }: NativeStackScreenProps<RootStackParamList>) {
  //add route.params for householdId instead of "stringPlaceholder";
  const householdId = "stringPlaceholder";
  const dispatch = useAppDispatch();
  const household = useAppSelector(selectHousehold);
  const members = useAppSelector(selectProfileByHousholdId);
  const membersOnPause = useAppSelector(selectPauses);
  console.log(members);
  console.log(membersOnPause);
  const [enabled, setEnabled] = useState(false);
  const {
    control,
    handleSubmit,
    //formState: {},
  } = useForm();

  const onEditHouseholdPressed = (data: FieldValues) => {
    const name = data.housholdName;
    dispatch(
      editHouseholdThunk({
        householdEditDto: { name: name },
        householdId: householdId,
      }),
    );
  };

  var householdPicture = "../assets/house-cartoon.png";

  const toggleSwitch = () => {
    setEnabled((oldValue) => !oldValue);
  };

  const thumbColorOn = Platform.OS === "android" ? "#0cd1e8" : "#f3f3f3";
  const thumbColorOff = Platform.OS === "android" ? "#f04141" : "#f3f3f3";
  const trackColorOn = Platform.OS === "android" ? "#98e7f0" : "#0cd1e8";
  const trackColorOff = Platform.OS === "android" ? "#f3adad" : "#f04141";

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image source={require(householdPicture)} style={styles.householdPicture} />
          <Text>Household's name: </Text>
          <Text style={styles.showProperty}>{household.name}</Text>
          <Text>Household's admin: </Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {members.map((member, memberIndex) => {
              if (member.isAdmin) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const { emoji, color } = useAvatar(member.avatar);
                return (
                  <View style={{ padding: 5 }} key={memberIndex}>
                    <Text style={styles.avatar}>{emoji}</Text>
                    <Text style={{ textAlign: "center", backgroundColor: color }}>
                      {member.alias}
                    </Text>
                  </View>
                );
              }
            })}
          </View>

          {/* Conditional rendering needed here to render only if user is admin */}
          <Text>Change household's name: </Text>
          <CustomInput
            name='householdName'
            placeholder='Enter a new household name'
            control={control}
          ></CustomInput>
          <TouchableOpacity style={styles.pressable} onPress={handleSubmit(onEditHouseholdPressed)}>
            <Text>Submit</Text>
          </TouchableOpacity>

          <Text>Household code: </Text>
          <Text style={styles.showProperty}>{household.code}</Text>
          <Text>Household members: </Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {members.map((member, memberIndex) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const { emoji, color } = useAvatar(member.avatar);
              return (
                <View style={{ padding: 5 }} key={memberIndex}>
                  <Text style={styles.avatar}>{emoji}</Text>
                  <Text style={{ textAlign: "center", backgroundColor: color }}>
                    {member.alias}
                  </Text>
                  <Switch
                    value={enabled}
                    onValueChange={toggleSwitch}
                    thumbColor={enabled ? thumbColorOn : thumbColorOff}
                    trackColor={{ false: trackColorOff, true: trackColorOn }}
                  />
                  {enabled ? (member.isAdmin = true) : (member.isAdmin = false)}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  pressable: {
    fontSize: 70,
    fontWeight: "bold",
    width: 200,
    height: 50,
    color: "blue",
    backgroundColor: "white",
    borderRadius: 5,
    margin: 2,
    borderColor: "red",
  },
  showProperty: {
    alignItems: "center",
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "black",
  },
  householdPicture: {
    width: 1445 * 0.08,
    height: 1250 * 0.08,
    borderRadius: 5,
  },
  householdMemberPicture: {
    width: 50,
    height: 50,
    margin: 0,
    borderRadius: 20,
  },
  avatar: {
    fontSize: 50,
    textAlign: "center",
  },
});
