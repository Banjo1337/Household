import { View, StyleSheet, FlatList } from "react-native";
import PieChartCustom from "../components/PieChartCustom";
import { Text, Button } from "react-native-paper";
import { useAppSelector } from "../hooks/reduxHooks";
import {
	selectChoreCompletedStatisticsListForAllChores,
	selectChoreCompletedStatisticsForAllChores,
	selectChoreCompletedStatisticsForOneChore,
	selectChoreCompleted,
} from "../features/choreCompleted/choreCompletedSelectors";
import { StatisticsList } from "../features/choreCompleted/choreCompletedTypes";
import { selectChores } from "../features/chore/choreSelectors";

interface Props {
	start: Date;
	end: Date;
}

export default function PieChartRenderer({ start, end }: Props) {
	const statsForEachChore = useAppSelector((state) =>
		selectChoreCompletedStatisticsListForAllChores(state, start, end)
	);

	const statsAllChores = useAppSelector((state) =>
		selectChoreCompletedStatisticsForAllChores(state, start, end)
	);

	function renderItem(item: StatisticsList) {
		return item.data.length ? (
			<View style={styles.pieContainerContainer}>
				<PieChartCustom data={item.data} subtitle={item.name} isSmall={true} />
				<Text style={styles.miniPieTitle}>{item.name}</Text>
			</View>
		) : (
			<></>
		);
	}

	return (
		<View>
			{statsAllChores && (
				<View style={styles.bigPieContainer}>
					<PieChartCustom data={statsAllChores} subtitle='Total' isSmall={false} />
				</View>
			)}
			{statsForEachChore && (
				<View style={styles.miniPieContainer}>
					<FlatList
						numColumns={3}
						data={statsForEachChore}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => renderItem(item)}
						contentContainerStyle={{ height: 500 }}
						columnWrapperStyle={styles.columStyle}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	pieContainerContainer: {
		justifyContent: "space-around",
	},
	bigPieContainer: {
		marginTop: 15,
	},
	miniPieContainer: {
		marginTop: 130,
		marginLeft: 10,
		marginRight: 10,
	},
	miniPieTitle: {
		position: "relative",
		textAlign: "center",
	},
	columStyle: {
		justifyContent: "space-evenly",
	},
});
