import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { newDateInClientTimezone } from "../app/dateUtils";
import { selectAuthUserId, selectToken } from "../features/authentication/authenticationSelectors";
import { RootStackParamList } from "../NavContainer";
import { useAppSelector } from "../hooks/reduxHooks";

export default function MegaNavigationGodScreen(
  Props: NativeStackScreenProps<RootStackParamList, "MegaNavigationGod">,
) {
  const token: string = useAppSelector(selectToken);
  const authUserId: string = useAppSelector(selectAuthUserId);

  const dateTime = newDateInClientTimezone().toISOString();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <Text>{dateTime}</Text>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("Home", { screen: "Chores" })}
        >
          Chores
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("AddChore")}
        >
          AddChore
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("ChoreDetails", { choreId: "" })}
        >
          ChoreDetails
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("EditChore", { choreId: "" })}
        >
          EditChore
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("SignIn")}
        >
          SignIn
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("SignUp")}
        >
          SignUp
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("JoinOrCreateHouseholdPrompt")}
        >
          JoinOrCreateHouseholdPrompt
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("CreateHousehold")}
        >
          CreateHousehold
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("EditHousehold")}
        >
          EditHousehold
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("HouseholdDetails")}
        >
          HouseholdDetails
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("SelectProfile")}
        >
          SelectProfile
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("EditProfile", { isAdmin: false })}
        >
          EditProfile
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("PendingRequest")}
        >
          PendingRequest
        </Button>
        {/* <Text>Requires props!</Text>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("ParsingJoinHouseholdScreen")}
        >
          ParsingJoinHouseholdScreen(param)
        </Button> */}
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("Settings")}
        >
          Settings
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("Home", { screen: "Statistics" })}
        >
          Statistics
        </Button>
        <Text>authUserId: {authUserId}</Text>
        <Text>Token: {token}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    marginVertical: 15,
    width: "100%",
  },
  scrollview: {
    width: "80%",
  },
});
