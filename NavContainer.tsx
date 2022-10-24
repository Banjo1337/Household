import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AddChoreScreen from "./screens/AddChoreScreen";
import ChoreDetailsScreen from "./screens/ChoreDetailsScreen";
//import ChoresScreen from "./screens/Chores";
import CreateProfileScreen from "./screens/CreateProfileScreen";
import FinalizeProfileScreen from "./screens/FinalizeProfileScreen";
import MegaNavigationGodScreen from "./screens/MegaNavigationGodScreen";
import PendingRequestScreen from "./screens/PendingRequest";
import RequestResponseScreen from "./screens/RequestResponseScreen";
import SelectProfileScreen from "./screens/SelectProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
//import StatisticsScreen from "./screens/StatisticsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { useTheme } from "./features/theme/ThemeContext";
import TopTabNavigator from "./navigation/TopTabsNavigator";
import CreateHouseholdScreen from "./screens/CreateHouseholdScreen";
import EditHouseholdScreen from "./screens/EditHouseholdScreen";

export type RootStackParamList = {
  Home: { screen: "Chores" | "Statistics" };
  AddChore: undefined;
  ChoreDetails: undefined;
  SignIn: undefined;
  SignUp: undefined;
  CreateProfile: undefined;
  CreateHousehold: undefined;
  EditHousehold: undefined;
  SelectProfile: undefined;
  FinalizeProfile: undefined;
  PendingRequest: undefined;
  RequestResponse: undefined;
  Settings: undefined;
  MegaNavigationGod: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function NavContainer() {
  const { currentTheme } = useTheme();
  return (
    <SafeAreaProvider>
      <StatusBar style={currentTheme.dark ? "light" : "dark"} />
      <PaperProvider theme={currentTheme}>
        <NavigationContainer theme={currentTheme}>
          <Stack.Navigator initialRouteName='MegaNavigationGod'>
            <Stack.Screen
              name='MegaNavigationGod'
              component={MegaNavigationGodScreen}
              options={() => ({ title: "This is temporary" })}
            />
            <Stack.Screen name='Home' component={TopTabNavigator} />
            <Stack.Screen name='AddChore' component={AddChoreScreen} />
            <Stack.Screen name='ChoreDetails' component={ChoreDetailsScreen} />
            <Stack.Screen name='SignIn' component={SignInScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='CreateHousehold' component={CreateHouseholdScreen} />
            <Stack.Screen name='CreateProfile' component={CreateProfileScreen} />
            <Stack.Screen name='EditHousehold' component={EditHouseholdScreen} />
            <Stack.Screen name='SelectProfile' component={SelectProfileScreen} />
            <Stack.Screen name='FinalizeProfile' component={FinalizeProfileScreen} />
            <Stack.Screen name='PendingRequest' component={PendingRequestScreen} />
            <Stack.Screen name='RequestResponse' component={RequestResponseScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
            {/*             <Stack.Screen name="Statistics" component={StatisticsScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
