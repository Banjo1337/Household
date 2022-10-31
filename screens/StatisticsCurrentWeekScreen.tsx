import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { newDateInClientTimezone } from "../app/dateUtils";
import PieChartRenderer from "../components/PieChartRenderer";
import { RootStackParamList } from "../NavContainer";

export default function StatisticCurrentWeekScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const now = newDateInClientTimezone();
  return (
    <PieChartRenderer
      start={new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)}
      end={now}
      navigation={navigation}
    />
  );
}
