import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AddChoreScreen from "./screens/AddChoreScreen";
import ChoreDetailsScreen from "./screens/ChoreDetailsScreen";
//import ChoresScreen from "./screens/Chores";
import JoinOrCreateHouseholdPromptScreen from "./screens/JoinOrCreateHouseholdPromptScreen";
import MegaNavigationGodScreen from "./screens/MegaNavigationGodScreen";
import PendingRequestScreen from "./screens/PendingRequest";
import SelectProfileScreen from "./screens/SelectProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
//import StatisticsScreen from "./screens/StatisticsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { hydrateAuthenticationSliceFromSecureStorageThunk } from "./features/authentication/authenticationSlice";
import { useTheme } from "./features/theme/ThemeContext";
import { useAppDispatch } from "./hooks/reduxHooks";
import TopTabNavigator from "./navigation/TopTabsNavigator";
import CreateHouseholdScreen from "./screens/CreateHouseholdScreen";
import EditHouseholdScreen from "./screens/EditHouseholdScreen";
import ParsingJoinHouseholdScreen from "./screens/ParsingJoinHouseholdScreen";

export type RootStackParamList = {
  Home: { screen: "Chores" | "Statistics" };
  AddChore: undefined;
  ChoreDetails: { choreId: string };
  SignIn: undefined;
  SignUp: undefined;
  CreateProfile: undefined;
  CreateHousehold: undefined;
  JoinOrCreateHouseholdPrompt: undefined;
  EditHousehold: undefined;
  SelectProfile: undefined;
  FinalizeProfile: undefined;
  PendingRequest: undefined;
  ParsingJoinHouseholdScreen: { householdCode: string };
  Settings: undefined;
  MegaNavigationGod: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function NavContainer() {
  const { currentTheme } = useTheme();
  const dispatch = useAppDispatch();
  dispatch(hydrateAuthenticationSliceFromSecureStorageThunk());
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
            <Stack.Screen
              name='JoinOrCreateHouseholdPrompt'
              component={JoinOrCreateHouseholdPromptScreen}
            />
            <Stack.Screen name='EditHousehold' component={EditHouseholdScreen} />
            <Stack.Screen name='SelectProfile' component={SelectProfileScreen} />
            <Stack.Screen name='PendingRequest' component={PendingRequestScreen} />
            <Stack.Screen
              name='ParsingJoinHouseholdScreen'
              component={ParsingJoinHouseholdScreen}
            />
            <Stack.Screen name='Settings' component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
