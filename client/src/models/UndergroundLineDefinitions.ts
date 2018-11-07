import { MapNode, UndergroundManager } from '../components/UndergroundLines';
import CompanyDefinitions from './CompanyDefinitions';

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
    owner: null,
    x: 0, y: 0,
  },
  {
    filled: -1,
    direction: 'sw',

    name: 'Telefonplan',
    owner: null,
    x: 0, y: 0,
  },
  {
    filled: -1,
    direction: 'sw',

    name: 'Hägerstensåsen',
    owner: null,
    x: 0, y: 0,
  },
  {
    filled: -1,
    direction: 'sw',

    name: 'Västertorp',
    owner: null,
    x: 0, y: 0,
  },
  {
    filled: -1,
    direction: 'sw',

    name: 'Fruängen',
    owner: CompanyDefinitions.CITYCON,
    x: 0, y: 0,
  },
];

const redLineMalarhojdenNodes: MapNode[] = [
  {
    filled: -1,
    direction: 'w',

    name: 'Aspudden',
    owner: null,
    x: 0, y: 0,
  },
  {
    filled: -1,
    direction: 'w',

    name: 'Örnsberg',
    owner: null,
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'w',

    name: 'Mälarhöjden',
    owner: null,
    x: 0, y: 0,
    branch: [Branches.RED_LINE_NORSBORG]
  },
];

const redLineNorsborgNodes: MapNode[] = [
  {
    filled: -1,
    direction: 'sw',

    name: 'Bredäng',
    owner: CompanyDefinitions.FAST_PARTNER,
    x: 0, y: 0,
  },
  {
    filled: -1,
    direction: 'sw',

    name: 'Sätra',
    owner: CompanyDefinitions.SATRA,
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Skärholmen',
    owner: CompanyDefinitions.GROSVENOR,
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Vårberg',
    owner: CompanyDefinitions.AGORA,
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Vårby Gård',
    owner: CompanyDefinitions.BALDER,
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Fittja',
    owner: CompanyDefinitions.FITTJA_CENTRUMFASTIGHETER,
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Alby',
    owner: CompanyDefinitions.BOTKYRKABYGGEN,
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Hallunda',
    owner: CompanyDefinitions.STERNER,
    x: 0, y: 0,
  },

  {
    filled: -1,
    direction: 'sw',

    name: 'Norsborg',
    owner: CompanyDefinitions.NORSBORG,
    x: 0, y: 0,
  },
];

const redLineSouthBound: MapNode[] = [
  // red line - south bound from t-centralen
  {
    filled: -1,
    direction: 's',

    name: 'Gamla stan',
    owner: null,
    x: 0, y: 0,
  },
  {
    filled: 1.0,
    direction: 'w',

    name: 'Slussen',
    owner: null,
    x: 0, y: 0,
  },
  {
    filled: -1, // negative means non-circular station
    direction: 'w',
    name: 'Mariatorget',
    owner: null,
    x: 0, y: 0,
  },
  {
    filled: -1, // negative means non-circular station
    direction: 'w',
    name: 'Zinkensdamm',
    owner: null,
    x: 0, y: 0,
  },
  {
    filled: -1, // negative means non-circular station
    direction: 'w',
    name: 'Hornstull',
    owner: null,
    x: 0, y: 0,
  },
  {
    filled: -1, // negative means non-circular station
    direction: 'w',
    name: 'Liljeholmen',
    owner: null,

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
