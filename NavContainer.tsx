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
import { hydrateAuthenticationSliceFromSecureStorageThunk } from "./features/authentication/authenticationSlice";
import { useTheme } from "./features/theme/ThemeContext";
import { useAppDispatch } from "./hooks/reduxHooks";
import TopTabNavigator from "./navigation/TopTabsNavigator";
import CreateHouseholdScreen from "./screens/CreateHouseholdScreen";
import EditChoreScreen from "./screens/EditChoreScreen";
import EditHouseholdScreen from "./screens/EditHouseholdScreen";
import HouseholdDetailsScreen from "./screens/HouseholdDetailsScreen";

export type RootStackParamList = {
  Home: { screen: "Chores" | "Statistics" };
  AddChore: undefined;
  ChoreDetails: { choreId: string };
  EditChore: { choreId: string }
  SignIn: undefined;
  SignUp: undefined;
  CreateProfile: undefined;
  CreateHousehold: undefined;
  EditHousehold: undefined;
  HouseholdDetails: undefined;
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
            <Stack.Screen name='Home' component={TopTabNavigator} options={() => ({
              headerShown: false
            })} />
            <Stack.Screen name='AddChore' component={AddChoreScreen} />
            <Stack.Screen name='ChoreDetails' component={ChoreDetailsScreen} />
            <Stack.Screen name="EditChore" component={EditChoreScreen} />
            <Stack.Screen name='SignIn' component={SignInScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='CreateHousehold' component={CreateHouseholdScreen} />
            <Stack.Screen name='CreateProfile' component={CreateProfileScreen} />
            <Stack.Screen name='EditHousehold' component={EditHouseholdScreen} />
            <Stack.Screen name='HouseholdDetails' component={HouseholdDetailsScreen} />
            <Stack.Screen name='SelectProfile' component={SelectProfileScreen} />
            <Stack.Screen name='FinalizeProfile' component={FinalizeProfileScreen} />
            <Stack.Screen name='PendingRequest' component={PendingRequestScreen} />
            <Stack.Screen name='RequestResponse' component={RequestResponseScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
