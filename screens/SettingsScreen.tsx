import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import { Text, Switch } from "react-native-paper";
import { useTheme } from "../features/theme/ThemeContext";
import { RootStackParamList } from "../NavContainer";

export default function SettingsScreen(Props: NativeStackScreenProps<RootStackParamList, "Settings">) {
    const { darkmode, setDarkmode, systemTheme, setSystemTheme} = useTheme();
    
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