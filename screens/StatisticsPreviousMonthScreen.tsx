import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PieChartRenderer from "../components/PieChartRenderer";
import { RootStackParamList } from "../NavContainer";

export default function StatisticsPreviousMonthScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const now = new Date();
  return (
      <PieChartRenderer start={new Date(now.getFullYear(), now.getMonth() - 2, now.getDate())} end={new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())} navigation={navigation} />
    );
}