import { MapNode, MapNodeTag } from '../components/UndergroundLines';

export interface UndergroundNodes {
    redLineNodes: MapNode[];
    redLineNodesNorth: MapNode[];
    blueLineNodesEast: MapNode[];
    blueLineNodesWest: MapNode[];
    greenLineNodesWest: MapNode[];
    greenLineNodesSouth: MapNode[];
}

export interface MapProps {
  mouseDown: Function;
  mouseUp: Function;
  mouseMove: Function;

  panX: number;
  panY: number;

  fetchMapData: Function;
  fetchTagData: Function;
  fetchCompanies: Function;

  nodes: UndergroundNodes;

  tags: MapNodeTag[];
  companies: any[];

  toggleTagVisible: Function;
  toggleTagVisibilityOnOwner: Function;
}

export interface MapState {
  isMoving: boolean;
  panX: number;
  panY: number;
  scaleFactor: number;
  mat: number[];

  previousMouseCoords: {
    x: number;
    y: number;
  };

  nodes: UndergroundNodes;

  tags: any[];
  visibleTags: string[];
  visibleOwners: string[];
  companies: any[];
  soldYears: {
    [key: string]: boolean;
  };
  isFilterBoxOpen: boolean;
  language: string;
}
