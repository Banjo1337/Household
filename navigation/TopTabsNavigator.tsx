import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {NavigationContainer} from "@react-navigation/native";
import ChoresScreen from "../screens/Chores";
import EditHouseholdScreen from "../screens/EditHouseholdScreen";

type TopTabParamsList = {
Chores: undefined;
Edit: undefined;
}

const Tabs = createMaterialTopTabNavigator<TopTabParamsList>();

export default function TopTabNavigator(){
    return (
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen name="Chores" component={ChoresScreen} />
          <Tabs.Screen name="Edit" component={EditHouseholdScreen} />
        </Tabs.Navigator>
      </NavigationContainer>
    );
}

