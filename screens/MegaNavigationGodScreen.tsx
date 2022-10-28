import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

export default function MegaNavigationGodScreen(
  Props: NativeStackScreenProps<RootStackParamList, "MegaNavigationGod">
) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
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
        >ChoreDetails
        </Button>
        <Button
          mode="contained"
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
          onPress={() => Props.navigation.navigate("CreateProfile")}
        >
          CreateProfile
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
          onPress={() => Props.navigation.navigate("EditProfile")}
        >
          FinalizeProfile
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("PendingRequest")}
        >
          PendingRequest
        </Button>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => Props.navigation.navigate("RequestResponse")}
        >
          RequestResponse
        </Button>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    marginTop: 25,
    width: "100%",
  },
  scrollview: {
    width: "80%",
  },
});
