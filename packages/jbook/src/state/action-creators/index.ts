import { Dispatch } from 'react';
import { ActionType } from '../action-types';
import {
  Action,
  DeleteCellAction,
  Direction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from '../actions';
import { Cell, CellTypes } from '../cell';
import bundle from '../../bundler';
import axios from 'axios';

export function updateCell(id: string, content: string): UpdateCellAction {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
}

export function moveCell(id: string, direction: Direction): MoveCellAction {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
}

export function deleteCell(id: string): DeleteCellAction {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
}

export function insertCellAfter(
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
}

export function createBundle(cellId: string, input: string) {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          error: result.err,
        },
      },
    });
  };
}

export function fetchCells() {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');

      dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
}

// } catch (err) {
//   if (err instanceof Error) {
//     dispatch({
//       type: ActionType.SAVE_CELLS_ERROR,
//       payload: err.message,
//     });
//   }
// }
