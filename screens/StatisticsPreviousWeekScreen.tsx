import PieChartRenderer from "../components/PieChartRenderer";

export default function StatisticsPreviousWeekScreen() {
  const now = new Date();
  return (
      <PieChartRenderer start={new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14)} end={new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)} />
    );
}