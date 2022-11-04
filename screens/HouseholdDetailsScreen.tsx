import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";

import { Feather } from "@expo/vector-icons";

import ProfileListItem from "../components/ProfileListItem";
import {
  selectHousehold,
  selectProfileByHousehold,
} from "../features/household/householdSelectors";
import { deleteHouseholdThunk } from "../features/household/householdSlice";
import { deleteProfile } from "../features/profile/profileSlice";
import { useTheme } from "../features/theme/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";
import { ContainTwoAdmin } from "../screens/EditHouseholdScreen";

export function CurrentProfileisAdmin() {
  const members = useAppSelector(selectProfileByHousehold);
  const currentProfileId = useAppSelector((state) => state.profileReducer.profile).id;
  var currentProfile = members.find((element) => element.id == currentProfileId);
  if (currentProfile?.isAdmin) {
    return true;
  } else {
    return false;
  }
}

export default function HouseholdDetailsScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const currentProfileId = useAppSelector((state) => state.profileReducer.profile).id;
  const household = useAppSelector(selectHousehold);
  const members = useAppSelector(selectProfileByHousehold);
  const [modalLeaveVisible, setModalLeaveVisible] = useState(false);
  const membersContainsAtLeastTwoAdmin = ContainTwoAdmin();
  const currentProfileisAdmin = CurrentProfileisAdmin();
  const dispatch = useAppDispatch();
  const { currentTheme } = useTheme();

  var householdPicture = "../assets/house-cartoon.png";

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
          <Image source={require(householdPicture)} style={styles.householdPicture} />
          <View style={{ alignItems: "flex-end", padding: 10 }}>
            {currentProfileisAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate("EditHousehold")}
                style={{ padding: 10 }}
              >
                <Feather name='settings' size={35} color={currentTheme.dark ? "white" : "black"} />
              </TouchableOpacity>
            )}
            <Modal
              animationType='slide'
              transparent={true}
              visible={modalLeaveVisible}
              onRequestClose={() => {
                setModalLeaveVisible(!modalLeaveVisible);
              }}
            >
              <View style={styles.centeredView}>
                {membersContainsAtLeastTwoAdmin && (
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
                          dispatch(deleteProfile({ profileId: currentProfileId }));    
                          navigation.navigate("SelectProfile");
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
                )}
                {!membersContainsAtLeastTwoAdmin && (
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      You are the last admin. The household will be deleted if you leave!
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
                          dispatch(deleteProfile({ profileId: currentProfileId }));
                          dispatch(deleteHouseholdThunk(household.id));
                          navigation.navigate("SelectProfile");
                        }}
                      >
                        <Text style={styles.textStyle}>Leave and delete it</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setModalLeaveVisible(!modalLeaveVisible);
                        }}
                      >
                        <Text style={styles.textStyle}>Stay and keep it</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
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

        <View
          style={{ width: "90%", flex: 1, flexDirection: "row", justifyContent: "space-between" }}
        >
          <View>
            <Text>Household's name: </Text>
            <Text style={[styles.showProperty, currentTheme.dark ? { borderColor: "white" } : {}]}>
              {household.name}
            </Text>
          </View>
          <View>
            <Text>Household code: </Text>
            <Text style={[styles.showProperty, currentTheme.dark ? { borderColor: "white" } : {}]}>
              {household.code}
            </Text>
          </View>
        </View>

        <Text style={{ marginTop: 20 }}>Household's admin: </Text>
        <View style={styles.avatarIcon}>
          {members.map((member, memberindex) => {
            if (member.isAdmin) {
              return <ProfileListItem profile={member} key={memberindex} />;
            }
          })}
        </View>

        <Text style={{ marginTop: 20 }}>Household members: </Text>
        <View style={styles.avatarIcon}>
          {members.map((member, memberindex) => {
            return <ProfileListItem profile={member} key={memberindex} />;
          })}
        </View>
        <Button
          mode={"contained"}
          style={{ marginVertical: 40 }}
          onPress={() => navigation.goBack()}
        >
          Close
        </Button>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
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
