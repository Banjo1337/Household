import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Modal } from "react-native";
//import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

import { Feather } from "@expo/vector-icons";

import {
  selectHousehold,
  selectProfileByHousholdId,
} from "../features/household/householdSelectors";
import { useAppSelector } from "../hooks/reduxHooks";
import { useAvatar } from "../hooks/useAvatar";
import { RootStackParamList } from "../NavContainer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HouseholdDetailsScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  //add route.params for householdId instead of "stringPlaceholder";
  const householdId = "stringPlaceholder";
  const household = useAppSelector(selectHousehold);
  const members = useAppSelector(selectProfileByHousholdId);
  //console.log(members);
  //console.log(membersOnPause);
  const [modalLeaveVisible, setModalLeaveVisible] = useState(false);

  var householdPicture = "../assets/house-cartoon.png";

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Image source={require(householdPicture)} style={styles.householdPicture} />
            <View>
              <Pressable onPress={() => navigation.navigate("EditHousehold")}>
                <Feather name='settings' size={24} color='black' />
              </Pressable>

              <Modal
                animationType='slide'
                transparent={true}
                visible={modalLeaveVisible}
                onRequestClose={() => {
                  setModalLeaveVisible(!modalLeaveVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Are you sure you want to leave the household?
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      {members.map((member, memberIndex) => {
                        if (member.id == 2) {
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
                    <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setModalLeaveVisible(!modalLeaveVisible);
                          navigation.navigate("MegaNavigationGod");
                        }}
                      >
                        <Text style={styles.textStyle}>Yes</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setModalLeaveVisible(!modalLeaveVisible);
                        }}
                      >
                        <Text style={styles.textStyle}>No</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalLeaveVisible(true)}
              >
                <Text style={styles.textStyle}>Leave household</Text>
              </Pressable>
            </View>
          </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "red",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
