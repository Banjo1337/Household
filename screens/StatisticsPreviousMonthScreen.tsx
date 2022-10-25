import PieChartRenderer from "../components/PieChartRenderer";

export default function StatisticsPreviousMonthScreen() {
  const now = new Date();
  return (
      <PieChartRenderer start={new Date(now.getFullYear(), now.getMonth() - 2, now.getDate())} end={new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())} />
    );
}