import { actionTypes } from './Action';

export const mapMouseDown = (e: MouseEvent | TouchEvent) => ({
  type: actionTypes.MAP_MOUSE_DOWN,
  event: e
});

export const mapMouseUp = () => ({
  type: actionTypes.MAP_MOUSE_UP,
  data: {
  }
});

export const mapMouseMove = (e: MouseEvent | TouchEvent) => ({
  type: actionTypes.MAP_MOUSE_MOVE,
  event: e
});
