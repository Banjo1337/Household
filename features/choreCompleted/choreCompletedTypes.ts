export interface ChoreCompletedState {
	completedChores: ChoreCompleted[];
	isLoading: boolean;
	error: string;
}

export interface ChoreCompleted {
	id: string;
	choreId: string;
	profileIdQol: string;
	householdId: string;
	completedAt: string;
}

export interface ChoreCompletedCreateDto {
	completedAt: string;
	profileIdQol: string;
	choreId: string;
	householdId: string;
}

export interface StatisticsList {
	id: string;
	name: string;
	data: Statistics[];
}

export interface Statistics {
	key: string;
	value: number;
	emoji: string;
	svg: {
		fill: string;
	};
}

export interface StatisticsAvailability {
	StatisticsCurrentWeek: boolean,
    StatisticsPreviousWeek: boolean,
    StatisticsPreviousMonth: boolean
}
