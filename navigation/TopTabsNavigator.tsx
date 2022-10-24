import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import { Button } from "react-native-paper";
import ChoresScreen from "../screens/Chores";
import StatisticsScreen from "../screens/StatisticsScreen";

type TopTabParamsList = {
Chores: undefined;
Stats: undefined;
}

const Tabs = createMaterialTopTabNavigator<TopTabParamsList>();

export default function TopTabNavigator(){
    return (
      <Tabs.Navigator tabBar={CustomTabBar}>
        <Tabs.Screen name="Chores" component={ChoresScreen} />
        <Tabs.Screen name="Stats" component={StatisticsScreen} />
      </Tabs.Navigator>
    );
}

function CustomTabBar(props: MaterialTopTabBarProps){
  const{index, routeNames} = props.state;
  
  console.log(props.state.index);
  console.log(props.state.routeNames);
  return (
    <View>
      <Button title=">" onPress={()=> props.navigation.navigate(routeNames[index+1])}/>
    </View>
  );
}
