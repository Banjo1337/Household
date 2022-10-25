import PieChartRenderer from "../components/PieChartRenderer";

export default function StatisticCurrentWeekScreen() {
  const now = new Date();
  return (
      <PieChartRenderer start={new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)} end={now} />
    );
}