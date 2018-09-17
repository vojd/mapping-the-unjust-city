import { MapNode, UndergroundManager } from './UndergroundLines';

const addPropsToNodelist = (nodeList: MapNode[]): MapNode[] => {
  return nodeList.map(n => {
    return Object.assign(n, {x: 0, y: 0});
  });
};

const enum Branches {
  RED_LINE_SOUTHBOUND,
  RED_LINE_MALARHOJDEN,
  RED_LINE_NORSBORG,
  RED_LINE_FRUANGEN,
}

const redLineFruangenNodes: MapNode[] = [
  {
    filled: -1,
    direction: 'sw',

    name: 'Midsommarkransen',
    owner: '',
    x: 0, y: 0,
  },
  {
    filled: -1,
    direction: 'sw',

    name: 'Telefonplan',
    owner: '',
    x: 0, y: 0,
  },
  {
    filled: -1,
    direction: 'sw',

    name: 'Hägerstensåsen',
    owner: '',
    x: 0, y: 0,
  },
  {
    filled: -1,
    direction: 'sw',

    name: 'Västertorp',
    owner: '',
    x: 0, y: 0,
  },
  {
    filled: -1,
    direction: 'sw',

    name: 'Fruängen',
    owner: 'Citycon',
    x: 0, y: 0,
  },
];

const redLineMalarhojdenNodes: MapNode[] = [
  {
    filled: -1,
    direction: 'w',

    name: 'Aspudden',
    owner: '',
    x: 0, y: 0,
  },
  {
    filled: -1,
    direction: 'w',

    name: 'Örnsberg',
    owner: '',
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'w',

    name: 'Mälarhöjden',
    owner: '',
    x: 0, y: 0,
    branch: [Branches.RED_LINE_NORSBORG]
  },
];

const redLineNorsborgNodes: MapNode[] = [
  {
    filled: -1,
    direction: 'sw',

    name: 'Bredäng',
    owner: 'FastPartner',
    x: 0, y: 0,
  },
  {
    filled: -1,
    direction: 'sw',

    name: 'Sätra',
    owner: 'Sätra Förvaltnings AB',
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Skärholmen',
    owner: 'Grosvenor Fund Management',
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Vårberg',
    owner: 'Agora',
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Vårby Gård',
    owner: 'Balder',
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Fittja',
    owner: 'Fittja Centrumfastigheter',
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Alby',
    owner: 'Botkyrkabyggen',
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Hallunda',
    owner: 'Sterner Stenhus Fastigheter AB',
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Norsborg',
    owner: 'Bolaget Norsborg',
    x: 0, y: 0,
  },
];

const redLineSouthBound: MapNode[] = [
  // red line - south bound from t-centralen
  {
    filled: -1,
    direction: 's',

    name: 'Gamla stan',
    owner: '',
    x: 0, y: 0,
  },
  {
    filled: 1.0,
    direction: 'w',

    name: 'Slussen',
    owner: '',
    x: 0, y: 0,
  },
  {
    filled: -1, // negative means non-circular station
    direction: 'w',
    name: 'Mariatorget',
    owner: '',
    x: 0, y: 0,
  },
  {
    filled: -1, // negative means non-circular station
    direction: 'w',
    name: 'Zinkensdamm',
    owner: '',
    x: 0, y: 0,
  },
  {
    filled: -1, // negative means non-circular station
    direction: 'w',
    name: 'Hornstull',
    owner: '',
    x: 0, y: 0,
  },
  {
    filled: -1, // negative means non-circular station
    direction: 'w',
    name: 'Liljeholmen',
    owner: '',

    branch: [Branches.RED_LINE_MALARHOJDEN, Branches.RED_LINE_FRUANGEN],
    x: 0, y: 0,
  },
];

export const getRedLineNodes = (undergroundManager: UndergroundManager) => {

  // NOTE: Register them in the same order as the enum
  undergroundManager.register(Branches.RED_LINE_SOUTHBOUND, redLineSouthBound);
  undergroundManager.register(Branches.RED_LINE_MALARHOJDEN, redLineMalarhojdenNodes);
  undergroundManager.register(Branches.RED_LINE_NORSBORG, redLineNorsborgNodes);
  undergroundManager.register(Branches.RED_LINE_FRUANGEN, redLineFruangenNodes);

  const nodes: MapNode[] = addPropsToNodelist(redLineSouthBound);
  return nodes;
};
