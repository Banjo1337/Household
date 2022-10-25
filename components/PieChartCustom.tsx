// @ts-nocheck
import { Title } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { G, Text } from "react-native-svg";
import { PieChart } from "react-native-svg-charts";

interface Props {
	data: any;
	subtitle: string;
	isSmall: boolean;
}

export default function PieChartCustom({ data, isSmall = true, subtitle }: Props) {
	const styles = StyleSheet.create({
		pieStyle: {
			height: isSmall ? 120 : 200,
			width: isSmall ? 120 : "auto",
			flexGrow: 1,
			marginTop: isSmall ? 20 : 0,
		},
		subtitle: {
			position: "relative",
			top: isSmall ? 145 : 190,
			left: isSmall ? 179 : 185,
			fontWeight: "400",
		},
		miniTitle: {
			position: "relative",
			top: 105,
			left: 0,
			fontWeight: "400",
			fontSize: 15,
		},
		container: {},
	});

	const Labels = ({ slices }) => {
		return slices.map((slice, index) => {
			const { labelCentroid, data } = slice;
			return (
				<G key={index} x={labelCentroid[0]} y={labelCentroid[1]}>
					{!isSmall && (
						<Text
							y={10}
							fontSize={30}
							preserveAspectRatio='xMidYMid slice'
							opacity='1'
							textAnchor='middle'
						>
							{data.emoji}
						</Text>
					)}
				</G>
			);
		});
	};

	return (
		<View style={styles.container}>
			<PieChart
				style={styles.pieStyle}
				valueAccessor={({ item }) => item.value}
				data={data}
				innerRadius={"5%"}
				outerRadius={"95%"}
			>
				<Labels />
				{!isSmall && <Title style={styles.subtitle}>{subtitle}</Title>}
			</PieChart>
		</View>
	);
}
