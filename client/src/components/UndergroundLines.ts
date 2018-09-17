export interface MapNode {
    filled: number;
    direction: string;

    name: string;
    owner: string;
    branch?: number[];
    x: number;
    y: number;
}

interface UndergroundLine {
    id: number;
    nodes: MapNode[];
}

export class UndergroundManager {

    lines: UndergroundLine[] = [];

    register(id: number, nodes: MapNode[]) {
        this.lines.push({
            id: id,
            nodes: nodes
        });
    }

    getNodesById(id: number): MapNode[] {
        const line = this.lines.filter(n => n.id === id)[0];
        return line.nodes;
    }
}
