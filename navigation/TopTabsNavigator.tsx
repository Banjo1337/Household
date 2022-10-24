import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import { View, Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import ChoresScreen from "../screens/Chores";
import StatisticsScreen from "../screens/StatisticsScreen";

export type TopTabParamsList = {
  Chores: undefined;
  Statistics: undefined;
};

const Tabs = createMaterialTopTabNavigator<TopTabParamsList>();

export default function TopTabNavigator() {
  return (
    <Tabs.Navigator tabBar={CustomTabBar}>
      <Tabs.Screen name="Chores" component={ChoresScreen} />
      <Tabs.Screen name="Statistics" component={StatisticsScreen} />
    </Tabs.Navigator>
  );
}

function CustomTabBar(props: MaterialTopTabBarProps) {
  const { index, routes } = props.state;
  return (
    <View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text>HusHållet</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 30,
        }}
      >
        <Pressable
          onPress={
            index > 0 ? () => props.jumpTo(routes[index - 1].key) : () => null
          }
        >
          <AntDesign name="left" size={24} color="black" />
        </Pressable>
        <Text>{props.state.routeNames[index]}</Text>
        <Pressable
          onPress={
            index < props.state.routeNames.length - 1
              ? () => props.jumpTo(routes[index + 1].key)
              : () => null
          }
        >
          <AntDesign name="right" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
