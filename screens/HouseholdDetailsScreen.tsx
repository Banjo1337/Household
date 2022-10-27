import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Modal,
  Dimensions,
} from "react-native";
//import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

import { Feather } from "@expo/vector-icons";

import {
  selectHousehold,
  selectProfileByHousholdId,
} from "../features/household/householdSelectors";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";
import ProfileListItem from "../components/ProfileListItem";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HouseholdDetailsScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const currentProfileId = useAppSelector((state) => state.profileReducer.profile).id;
  const household = useAppSelector(selectHousehold);
  const members = useAppSelector(selectProfileByHousholdId);
  console.log(members);
  //console.log(membersOnPause);
  const [modalLeaveVisible, setModalLeaveVisible] = useState(false);

  var householdPicture = "../assets/house-cartoon.png";

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Image source={require(householdPicture)} style={styles.householdPicture} />
            <View style={{ alignItems: "flex-end", padding: 10 }}>
              <Pressable
                onPress={() => navigation.navigate("EditHousehold")}
                style={{ padding: 10 }}
              >
                <Feather name='settings' size={35} color='black' />
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
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {members.map((member, memberindex) => {
                        if (member.id == currentProfileId) {
                          return <ProfileListItem profile={member} key={memberindex} />;
                        }
                      })}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setModalLeaveVisible(!modalLeaveVisible);
                          navigation.navigate("SelectProfile");
                          //Add logic to remove member from household. If member is the last admin the household will be deleted
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
          <View style={styles.avatarIcon}>
            {members.map((member, memberindex) => {
              if (member.isAdmin) {
                return (
                    <ProfileListItem profile={member} key={memberindex} />
                );
              }
            })}
          </View>

          <Text>Household code: </Text>
          <Text style={styles.showProperty}>{household.code}</Text>
          <Text>Household members: </Text>
          <View style={styles.avatarIcon}>
            {members.map((member, memberindex) => {
              return <ProfileListItem profile={member} key={memberindex} />;
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
  avatarIcon: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
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
