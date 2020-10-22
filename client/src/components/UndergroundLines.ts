import { MapTextAlignment } from './MapText';

export interface MapNodeTag {
  name: string;
}

export interface MapNode {
  filled: number;
  direction: string;

  name: string;
  owner?: {
    name: string;
    slug: string;
  } | null;
  tags: MapNodeTag[];

  branchIds?: number[];
  branches?: MapNode[][]; // the actual branch nodes

  x: number;
  y: number;
  lengthMultiplier?: number; // length multiplier, undefined = 1
  horizontalText: boolean;
  textAlignment: MapTextAlignment;
  isVisible: boolean;
}
