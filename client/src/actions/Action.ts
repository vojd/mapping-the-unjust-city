export const actionTypes = {
  FETCH_STATION: '@@station/FETCH',
  STATION_FETCHED: '@@station/FETCHED',
  STATION_FETCH_FAILED: '@@station/FETCH_FAILED',

  COMPANY_DETAILS_FETCHED: '@@company_details/FETCHED',
  COMPANY_DETAILS_FETCH_FAILED: '@@company_details/FETCH_FAILED',

  OWNERSHIP_HISTORY_FETCHED: '@@ownership_history/FETCHED',
  OWNERSHIP_HISTORY_FETCHED_FAILED: '@@ownership_history/FETCH_FAILED',

  CURRENT_NODE_CHANGED: '@@current_node/CURRENT_NODE_CHANGED',

  MAP_MOUSE_DOWN: '@@map/MAP_MOUSE_DOWN',
  MAP_MOUSE_UP: '@@map/MAP_MOUSE_UP',
  MAP_MOUSE_MOVE: '@@map/MAP_MOUSE_MOVE',

  MAP_DATA_FETCHED: '@@mapdata/FETCHED',
  MAP_DATA_FETCH_FAILED: '@@mapdata/FETCH_FAILED',

  TOGGLE_TAG_VISIBLE: '@@map/TOGGLE_TAG_VISIBLE',
};
