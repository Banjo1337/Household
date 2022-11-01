export type PauseState = {
  pauses: Pause[];
  isLoading: boolean;
  error: string;
};

export interface Pause {
  id: string;
  startDate: string;
  endDate: string;
  householdId: string;
  profileIdQol: string;
}

export type PauseCreateDto = Omit<Pause, "id">;

export type PauseUpdateDto = Pick<PauseCreateDto, "householdId"> & Partial<PauseCreateDto>;

export type pausePercentageDictionary = {
  fox: number;
  pig: number;
  frog: number;
  chicken: number;
  octopus: number;
  dolphin: number;
  owl: number;
  unicorn: number;
};
