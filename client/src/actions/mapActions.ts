import { actionTypes } from './Action';

export const mapMouseDown = (e: MouseEvent | TouchEvent) => ({
  type: actionTypes.MAP_MOUSE_DOWN,
  event: e
});

export const mapMouseUp = (e: MouseEvent | TouchEvent ) => ({
  type: actionTypes.MAP_MOUSE_UP,
  data: e
});

export const mapMouseMove = (e: MouseEvent | TouchEvent) => ({
  type: actionTypes.MAP_MOUSE_MOVE,
  event: e
});
