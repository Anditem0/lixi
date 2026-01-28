
export enum AppState {
  HOME = 'HOME',
  SCRATCH = 'SCRATCH',
  RESULT = 'RESULT'
}

export interface LixiItem {
  id: string;
  title: string;
  icon: string;
  amount: number;
}

export interface GameState {
  view: AppState;
  selectedLixi: LixiItem | null;
  isMuted: boolean;
}
