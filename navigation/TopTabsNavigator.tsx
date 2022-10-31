import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import { View, Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ChoresScreen from "../screens/Chores";
import StatisticsCurrentWeekScreen from "../screens/StatisticsCurrentWeekScreen";
import StatisticsPreviousWeekScreen from "../screens/StatisticsPreviousWeekScreen";
import StatisticsPreviousMonthScreen from "../screens/StatisticsPreviousMonthScreen";
import { useAppSelector } from "../hooks/reduxHooks";
import { selectStatAvailability } from "../features/choreCompleted/choreCompletedSelectors";
import { StatisticsAvailability } from "../features/choreCompleted/choreCompletedTypes";

export type TopTabParamsList = {
  Chores: undefined;
  StatisticsCurrentWeek: undefined;
  StatisticsPreviousWeek: undefined;
  StatisticsPreviousMonth: undefined;
};

const Tabs = createMaterialTopTabNavigator<TopTabParamsList>();

export default function TopTabNavigator() {
  const statAvailability = useAppSelector(selectStatAvailability);
  return (
    <Tabs.Navigator tabBar={CustomTabBar} backBehavior={"order"}>
      <Tabs.Screen name="Chores" component={ChoresScreen} options={{ swipeEnabled: statAvailability.StatisticsCurrentWeek }} />
      <Tabs.Screen name="StatisticsCurrentWeek" component={StatisticsCurrentWeekScreen} options={{ lazy:true, swipeEnabled: statAvailability.StatisticsPreviousWeek }} />
      <Tabs.Screen name="StatisticsPreviousWeek" component={StatisticsPreviousWeekScreen} options={{ lazy:true, swipeEnabled: statAvailability.StatisticsPreviousMonth }} />
      <Tabs.Screen name="StatisticsPreviousMonth" component={StatisticsPreviousMonthScreen} options={{ lazy:true }} />
    </Tabs.Navigator>
  );
}

function CustomTabBar(props: MaterialTopTabBarProps) {
  const { index, routes } = props.state;
  const statAvailability = useAppSelector(selectStatAvailability);
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
            index < props.state.routeNames.length - 1 && statAvailability[routes[index + 1].name as keyof StatisticsAvailability]
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
