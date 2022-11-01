import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Image, Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

import CustomInput from "../components/CustomInput";
import PendingRequestButton from "../components/PendingRequestButton";
import ProfileListItem from "../components/ProfileListItem";
import SwitchToPause from "../components/SwitchToPause";
import {
  selectHousehold,
  selectPendingRequestProfilesCount,
  selectProfileByHousehold,
} from "../features/household/householdSelectors";
import { deleteHouseholdThunk, editHouseholdThunk } from "../features/household/householdSlice";
import { deleteProfile, editProfile } from "../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";

export function ContainAdminFalse() {
  const members = useAppSelector(selectProfileByHousehold);
  var r = [];
  members.forEach((element) => {
    if (element.isAdmin == false) {
      r.push(element);
    }
  });
  if (r.length >= 1) {
    return true;
  } else {
    return false;
  }
}

export function ContainTwoAdmin() {
  const members = useAppSelector(selectProfileByHousehold);
  var r = [];
  members.forEach((element) => {
    if (element.isAdmin == true) {
      r.push(element);
    }
  });
  if (r.length >= 2) {
    return true;
  } else {
    return false;
  }
}

export default function EditHouseholdScreen(Props: NativeStackScreenProps<RootStackParamList>) {
  const dispatch = useAppDispatch();
  const household = useAppSelector(selectHousehold);
  const members = useAppSelector(selectProfileByHousehold);
  const pendingRequestCount = useAppSelector(selectPendingRequestProfilesCount);
  //const pauses = useAppSelector(selectPauses);
  //console.log(members);
  //console.log(pauses);

  const [modalAddAdminVisible, setModalAddAdminVisible] = useState(false);
  const [modalRemoveAdminVisible, setModalRemoveAdminVisible] = useState(false);

  const membersContainsNonAdmin = ContainAdminFalse();
  const membersContainsAtLeastTwoAdmin = ContainTwoAdmin();

  const currentProfileId = useAppSelector((state) => state.profileReducer.profile).id;

  const {
    control,
    handleSubmit,
    //formState: {},
  } = useForm();

  const onEditHouseholdPressed = (data: FieldValues) => {
    const name = String(data.householdName);
    dispatch(
      editHouseholdThunk({
        householdEditDto: { name: name },
        householdId: household.id,
      }),
    );
  };

  var householdPicture = "../assets/house-cartoon.png";

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.icons}>
          <Image source={require(householdPicture)} style={styles.householdPicture} />
          {pendingRequestCount ? (
            <PendingRequestButton
              navigation={Props.navigation}
              pendingRequestCount={pendingRequestCount}
            />
          ) : null}
        </View>

        <View style={styles.householdNameAndCode}>
          <View>
            <Text>Household's name: </Text>
            <Text style={styles.showProperty}>{household.name}</Text>
          </View>
          <View>
            <Text>Household code: </Text>
            <Text style={styles.showProperty}>{household.code}</Text>
          </View>
        </View>

        <Text style={{ marginTop: 15 }}>Household's admin: </Text>
        <View style={styles.avatarIcon}>
          {members.map((member, memberindex) => {
            if (member.isAdmin) {
              return <ProfileListItem profile={member} key={memberindex} />;
            }
          })}
        </View>

        <Modal
          animationType='slide'
          transparent={true}
          visible={modalAddAdminVisible}
          onRequestClose={() => {
            setModalAddAdminVisible(!modalAddAdminVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Click profile to add as admin</Text>
              <View style={styles.avatarIcon}>
                {membersContainsNonAdmin ? (
                  members.map((member, memberindex) => {
                    if (member.isAdmin === false) {
                      return (
                        <Pressable
                          onPress={() =>
                            dispatch(
                              editProfile({
                                profileEditDto: { isAdmin: true, alias: member.alias },
                                profileId: member.id,
                                isActiveProfile: false,
                              }),
                            )
                          }
                          key={memberindex}
                        >
                          <ProfileListItem profile={member} />
                        </Pressable>
                      );
                    }
                  })
                ) : (
                  <Text style={{ color: "red" }}>All members are already admin!</Text>
                )}
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalAddAdminVisible(!modalAddAdminVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalRemoveAdminVisible}
          onRequestClose={() => {
            setModalRemoveAdminVisible(!modalRemoveAdminVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Click admin profile to remove</Text>
              <View style={styles.avatarIcon}>
                {membersContainsAtLeastTwoAdmin ? (
                  members.map((member, memberindex) => {
                    if (member.isAdmin) {
                      return (
                        <Pressable
                          onPress={() =>
                            dispatch(
                              editProfile({
                                profileEditDto: {
                                  isAdmin: false,
                                  avatar: member.avatar,
                                  alias: member.alias,
                                },
                                profileId: member.id,
                                isActiveProfile: false,
                              }),
                            )
                          }
                          key={memberindex}
                        >
                          <ProfileListItem profile={member} />
                        </Pressable>
                      );
                    }
                  })
                ) : (
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "red" }}>
                      If you remove this admin the household will be deleted!
                    </Text>
                    <Text style={{ color: "red" }}>Do you want to delete this household?</Text>
                  </View>
                )}
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}
              >
                {!membersContainsAtLeastTwoAdmin && (
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalRemoveAdminVisible(!modalRemoveAdminVisible);
                      dispatch(
                        deleteProfile({ profileId: currentProfileId, isActiveProfile: false }),
                      );
                      dispatch(deleteHouseholdThunk(household.id));
                      Props.navigation.navigate("MegaNavigationGod");
                    }}
                  >
                    <Text style={styles.textStyle}>Delete Household</Text>
                  </Pressable>
                )}
                {!membersContainsAtLeastTwoAdmin && (
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalRemoveAdminVisible(!modalRemoveAdminVisible)}
                  >
                    <Text style={styles.textStyle}>Close and keep household</Text>
                  </Pressable>
                )}
                {membersContainsAtLeastTwoAdmin && (
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalRemoveAdminVisible(!modalRemoveAdminVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </Modal>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <Button mode={"contained"} onPress={() => setModalAddAdminVisible(true)}>
            Add Admin
          </Button>
          <Button mode={"outlined"} onPress={() => setModalRemoveAdminVisible(true)}>
            Remove Admin
          </Button>
        </View>

        <Text style={{ marginTop: 20 }}>Change household's name: </Text>
        <CustomInput
          name='householdName'
          placeholder='Enter a new household name'
          control={control}
        ></CustomInput>
        <Button
          style={{ marginTop: 5 }}
          mode='contained'
          onPress={handleSubmit(onEditHouseholdPressed)}
        >
          Submit
        </Button>

        <Text style={{ marginTop: 20 }}>Household members: </Text>
        <View style={styles.avatarIcon}>
          {members.map((member, memberindex) => {
            return (
              <View key={memberindex}>
                <ProfileListItem profile={member} />
                <SwitchToPause profile={member} />
              </View>
            );
          })}
        </View>
        <Button onPress={() => Props.navigation.goBack()} style={{ marginVertical: 40 }}>
          Close
        </Button>
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
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
  avatarIcon: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#F194FF",
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
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  householdNameAndCode: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
