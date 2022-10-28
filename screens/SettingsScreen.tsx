import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button, Switch, Text } from "react-native-paper";
import { logout } from "../features/authentication/authenticationSlice";
import { useTheme } from "../features/theme/ThemeContext";
import { useAppDispatch } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";

export default function SettingsScreen(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Props: NativeStackScreenProps<RootStackParamList, "Settings">,
) {
  const { darkmode, setDarkmode, systemTheme, setSystemTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onLogoutPressed = () => {
    dispatch(logout());
  };
  return (
    <View>
      <View style={styles.switchContainer}>
        <Text variant='titleMedium'>System theme</Text>
        <Switch value={systemTheme} onValueChange={setSystemTheme} />
      </View>

      <View style={styles.switchContainer}>
        <Text variant='titleMedium'>Darkmode</Text>
        <Switch value={darkmode} onValueChange={setDarkmode} disabled={systemTheme} />
      </View>

      <View>
        <Button onPress={onLogoutPressed}>Log out</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    marginHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
