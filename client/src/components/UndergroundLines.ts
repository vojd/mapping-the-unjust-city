export interface MapNodeTag {
  name: string;
  isActive: boolean;
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

  branch?: number[];
  x: number;
  y: number;
  lengthMultiplier?: number; // length multiplier, undefined = 1
}

interface UndergroundLine {
  id: number;
  nodes: MapNode[];
}

export class UndergroundManager {

  lines: UndergroundLine[] = [];

  register( id: number, nodes: MapNode[] ) {
    this.lines.push({
      id: id,
      nodes: nodes
    });
  }

  /**
   * Return the lines beloning to a particular branch id
   * @param {number} id
   * @returns {MapNode[]}
   */
  getNodesByBranchId( id: number ): MapNode[] {
    const line = this.lines.filter(n => n.id === id)[0];
    return line.nodes;
  }
}
