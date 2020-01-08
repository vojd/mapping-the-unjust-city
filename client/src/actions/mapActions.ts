import { actionTypes } from './Action';
import { Centre } from '../models/models';

export const mapMouseDown = ( e: MouseEvent | TouchEvent ) => ({
  type: actionTypes.MAP_MOUSE_DOWN,
  event: e
});

export const mapMouseUp = ( e: MouseEvent | TouchEvent ) => ({
  type: actionTypes.MAP_MOUSE_UP,
  data: e
});

export const mapMouseMove = ( e: MouseEvent | TouchEvent ) => ({
  type: actionTypes.MAP_MOUSE_MOVE,
  event: e
});

export interface MapDataFetchedAction {
  result: Centre[];
}

export interface ToggleAction {
  value: string;
  isOn: boolean;
}

export const toggleTagVisibleAction = ( val: string, isOn: boolean ) => ({
  type: actionTypes.TOGGLE_TAG_VISIBLE,
  data: <ToggleAction> {
    value: val,
    isOn
  }
});
