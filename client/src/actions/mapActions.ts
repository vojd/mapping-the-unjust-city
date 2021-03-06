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

export interface ToggleActionData {
  value: string;
  isOn: boolean;
}

export interface ToggleAction {
  type: string;
  data: ToggleActionData;
}

export const toggleTagVisibilityAction = ( val: string, isOn: boolean ) => ({
  type: actionTypes.TOGGLE_TAG_VISIBILITY,
  data: <ToggleActionData> {
    value: val,
    isOn
  }
});

export const toggleOwnerVisibilityAction = (val: string, isOn: boolean) => ({
  type: actionTypes.TOGGLE_OWNER_VISIBILITY,
  data: <ToggleActionData> {
    value: val,
    isOn
  }
});

export const toggleFilterBoxOpenAction = () => ({
  type: actionTypes.TOGGLE_FILTER_BOX_OPEN,
  data: null
});
