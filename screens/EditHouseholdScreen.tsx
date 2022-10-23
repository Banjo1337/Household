import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Switch } from "react-native-paper";

import CustomInput from "../components/CustomInput";
import {
  editHouseholdThunk,
  selectHousehold,
  selectProfileByHousholdId,
} from "../features/household/householdSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";


export default function EditHouseholdScreen({route,
}: NativeStackScreenProps<RootStackParamList>) {
  //add route.params for householdId instead of "stringPlaceholder";
  const householdId = "stringPlaceholder";
  const dispatch = useAppDispatch();
  const household = useAppSelector(selectHousehold);
  const members = useAppSelector(selectProfileByHousholdId);

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
      })
    );
  };

  //Change the picture to a better one
  var householdPicture = "../assets/household.png";

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require(householdPicture)}
          style={styles.householdPicture}
        />
        <Text>Household's name: </Text>
        <Text style={styles.showProperty}>{household.name}</Text>

        <Text>Change household's name: </Text>
        <CustomInput
          name="householdName"
          placeholder="Enter a new household name"
          control={control}
        ></CustomInput>
        <TouchableOpacity
          style={styles.pressable}
          onPress={handleSubmit(onEditHouseholdPressed)}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
        <Text>Household code: </Text>
        <Text style={styles.showProperty}>{household.code}</Text>
        <Text>Household members: </Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {members.map((member, memberIndex) => {
            return (
              <View style={{ padding: 5 }} key={memberIndex}>
                {/*                 <Image
                  source={require(member.avatar)}
                  style={styles.householdMemberPicture}
                /> */}
                <Text style={{ textAlign: "center" }}>{member.avatar}</Text>
                <Text style={{ textAlign: "center" }}>{member.alias}</Text>
                <Switch></Switch>
              </View>
            );
          })}
        </View>
      </View>
    </View>
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
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  householdMemberPicture: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
});
