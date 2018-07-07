import { MapNode, UndergroundManager } from './UndergroundLines';

const addPropsToNodelist = (nodeList: MapNode[]): MapNode[] => {
    return nodeList.map(n => {
        return Object.assign(n, {x: 0, y: 0});
    });
};

const enum Branches {
    RED_LINE_SOUTHBOUND,
    RED_LINE_NORSBORG,
    RED_LINE_FRUANGEN,
}

const redLineFruangenNodes: MapNode[] = [
    {
        filled: -1,
        direction: 'sw',

        name: 'Midsommarkransen',
        x: 0, y: 0,
    },
    {
        filled: -1,
        direction: 'sw',

        name: 'Telefonplan',
        x: 0, y: 0,
    },
    {
        filled: -1,
        direction: 'sw',

        name: 'Hägerstensåsen',
        x: 0, y: 0,
    },
    {
        filled: -1,
        direction: 'sw',

        name: 'Västertorp',
        x: 0, y: 0,
    },
    {
        filled: -1,
        direction: 'sw',

        name: 'Fruängen',
        x: 0, y: 0,
    },
];

const redLineNorsborgNodes: MapNode[] = [
    {
        filled: -1,
        direction: 'w',

        name: 'Aspudden',
        x: 0, y: 0,
    },
    {
        filled: -1,
        direction: 'w',

        name: 'Örnsberg',
        x: 0, y: 0,
    },
];

const redLineSouthBound: MapNode[] = [
    // red line - south bound from t-centralen
    {
        filled: -1,
        direction: 's',

        name: 'Gamla stan',
        x: 0, y: 0,
    },
    {
        filled: 1.0,
        direction: 'w',

        name: 'Slussen',
        x: 0, y: 0,
    },
    {
        filled: -1, // negative means non-circular station
        direction: 'w',
        name: 'Mariatorget',
        x: 0, y: 0,
    },
    {
        filled: -1, // negative means non-circular station
        direction: 'w',
        name: 'Zinkensdamm',
        x: 0, y: 0,
    },
    {
        filled: -1, // negative means non-circular station
        direction: 'w',
        name: 'Hornstull',
        x: 0, y: 0,
    },
    {
        filled: -1, // negative means non-circular station
        direction: 'w',
        name: 'Liljeholmen',

        branch: [Branches.RED_LINE_NORSBORG, Branches.RED_LINE_FRUANGEN],
        x: 0, y: 0,
    },
];

export const getRedLineNodes = (undergroundManager: UndergroundManager) => {

    undergroundManager.register(Branches.RED_LINE_SOUTHBOUND, redLineSouthBound);
    undergroundManager.register(Branches.RED_LINE_NORSBORG, redLineNorsborgNodes);
    undergroundManager.register(Branches.RED_LINE_FRUANGEN, redLineFruangenNodes);

    const nodes: MapNode[] = addPropsToNodelist(redLineSouthBound);
    return nodes;
};
