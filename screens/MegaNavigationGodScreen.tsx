import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

export default function MegaNavigationGodScreen(
  Props: NativeStackScreenProps<RootStackParamList, "MegaNavigationGod">
) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("Home")}
        >
          Home
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("AddChore")}
        >
          AddChore
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("ChoreDetails")}
        >
          ChoreDetails
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("SignIn")}
        >
          SignIn
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("SignUp")}
        >
          SignUp
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("CreateProfile")}
        >
          CreateProfile
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("CreateHousehold")}
        >
          CreateHousehold
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("EditHousehold")}
        >
          EditHousehold
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("SelectProfile")}
        >
          SelectProfile
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("FinalizeProfile")}
        >
          FinalizeProfile
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("PendingRequest")}
        >
          PendingRequest
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("RequestResponse")}
        >
          RequestResponse
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("Settings")}
        >
          Settings
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => Props.navigation.navigate("Statistics")}
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
