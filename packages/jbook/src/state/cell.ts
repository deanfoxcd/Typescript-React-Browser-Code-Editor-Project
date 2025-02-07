export type CellTypes = 'code' | 'text';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}
