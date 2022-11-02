import { Drawer, Switch, Text } from "react-native-paper";
import { Modal, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Dispatch } from "react";
import { useTheme } from "../features/theme/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../NavContainer";
import { useAppDispatch } from "../hooks/reduxHooks";
import { logout } from "../features/authentication/authenticationSlice";
import { useResetAndDeHydrateProfile } from "../hooks/useResetAndDehydrateProfile";
interface Props {
  visible: boolean;
  setVisible: Dispatch<React.SetStateAction<boolean>>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
export default function BudgetHambugerMenu({
  visible: showBudgetHambugerMenu,
  setVisible: setShowBudgetHambugerMenu,
  navigation,
}: Props) {
  const { darkmode, setDarkmode, systemTheme, setSystemTheme, currentTheme } = useTheme();
  const dispatch = useAppDispatch();
  const resetAndDeHydrateProfile = useResetAndDeHydrateProfile();
  const iconSettings = {
    color: currentTheme.dark ? "white" : "black",
    size: 20,
  };
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={showBudgetHambugerMenu}
      onRequestClose={() => {
        setShowBudgetHambugerMenu(false);
      }}
    >
      <View
        style={[styles.budgetHambugerMenu, { backgroundColor: currentTheme.colors.background }]}
      >
        <Drawer.Section title='Navigation'>
          <TouchableOpacity
            style={[styles.menuListItem, { borderColor: currentTheme.colors.border }]}
            onPress={() => {
              setShowBudgetHambugerMenu(false);
              navigation.navigate("HouseholdDetails");
            }}
          >
            <Text>Household details </Text>
            <MaterialCommunityIcons name='account-details' {...iconSettings} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuListItem, { borderColor: currentTheme.colors.border }]}
            onPress={() => {
              setShowBudgetHambugerMenu(false);
              navigation.navigate("SelectProfile");
            }}
          >
            <Text>Switch profile</Text>
            <MaterialCommunityIcons name='account-cancel' {...iconSettings} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuListItem, { borderColor: currentTheme.colors.border }]}
            onPress={() => {
              setShowBudgetHambugerMenu(false);
              navigation.navigate("EditProfile");
            }}
          >
            <Text>Edit profile</Text>
            <MaterialCommunityIcons name='account-cog' {...iconSettings} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuListItem, { borderColor: currentTheme.colors.border }]}
            onPress={() => {
              resetAndDeHydrateProfile();
              dispatch(logout());
              setShowBudgetHambugerMenu(false);
              navigation.navigate("SignIn");
            }}
          >
            <Text>Logout</Text>
            <MaterialCommunityIcons name='account-switch' {...iconSettings} />
          </TouchableOpacity>
        </Drawer.Section>
        <Drawer.Section title='Theme'>
          <View style={[styles.switchContainer, { borderColor: currentTheme.colors.border }]}>
            <Text>System theme</Text>
            <Switch value={systemTheme} onValueChange={setSystemTheme} />
          </View>
          <View style={[styles.switchContainer, { borderColor: currentTheme.colors.border }]}>
            <Text>Darkmode</Text>
            <Switch value={darkmode} onValueChange={setDarkmode} disabled={systemTheme} />
          </View>
        </Drawer.Section>
        <Drawer.Section title='For Jimmy'>
          <TouchableOpacity
            style={[styles.menuListItem, { borderColor: currentTheme.colors.border }]}
            onPress={() => {
              resetAndDeHydrateProfile();
              dispatch(logout());
              setShowBudgetHambugerMenu(false);
              navigation.navigate("MegaNavigationGod");
            }}
          >
            <Text>NavScreen</Text>
            <MaterialCommunityIcons name='account-cowboy-hat' {...iconSettings} />
          </TouchableOpacity>
        </Drawer.Section>
      </View>
      <Pressable
        onPress={() => setShowBudgetHambugerMenu(false)}
        style={{
          position: "absolute",
          height: "100%",
          width: "60%",
          right: 0,
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  budgetHambugerMenu: {
    height: "100%",
    position: "absolute",
    width: "40%",
  },
  menuListItem: {
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginVertical: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  switchContainer: {
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
