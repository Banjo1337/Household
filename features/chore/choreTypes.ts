export type ChoreState = {
  chores: Chore[];
  isLoading: boolean;
  error: string;
};

export interface Chore {
  id: string;
  name: string;
  points: number;
  description: string;
  pictureUrl: string;
  audioUrl: string;
  frequency: number;
  isArchived: boolean;
  householdId: string;
}

export type ChoreCreateDto = Omit<Chore, "id">;

export type ChoreUpdateDto = Pick<ChoreCreateDto, "householdId"> & Partial<ChoreCreateDto>;
