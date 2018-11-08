import { MapNode, UndergroundManager } from '../components/UndergroundLines';
import CompanyDefinitions from './CompanyDefinitions';

const addPropsToNodelist = ( nodeList: MapNode[] ): MapNode[] => {
  return nodeList.map(n => {
    return Object.assign(n, {x: 0, y: 0});
  });
};

const enum Branches {
  RED_LINE_NORTHBOUND,
  RED_LINE_MORBY_CENTRUM,
  RED_LINE_ROPSTEN,

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

// red line - south bound from t-centralen
const redLineSouthBound: MapNode[] = [
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

const station = ( name: string,
                  direction: string,
                  filled: number = -1,
                  lengthMultiplier: number = 1,
                  owner?: any,
                  branches?: number[] ): MapNode => {
  let s = <MapNode> {
    filled: filled,
    direction: direction,

    name: name,
    owner: owner ? owner : null,
    x: 0, y: 0,
    lengthMultiplier: lengthMultiplier,
  };

  if (branches) {
    s.branch = branches;
  }
  return s;
};

// north bound from t-centralen
const redLineNorthBound: MapNode[] = [
  station('Östermalms torg', 'n', -1, 1, null, [
    Branches.RED_LINE_MORBY_CENTRUM,
    Branches.RED_LINE_ROPSTEN,
  ]),
];

const redLineMorbyCentrum: MapNode[] = [
  station( 'Stadion', 'n', -1, 3),
  station( 'Tekniska högskolan', 'n', ),
  station( 'Universitetet', 'n', ),
  station( 'Bergshamra', 'n', ),
  station( 'Danderyds sjukhus', 'n', ),
  station( 'Mörby Centrum', 'n', ),
];

const redLineRopsten: MapNode[] = [
  station('Karlaplan', 'ne', -1, 2),
  station('Gärdet', 'ne', -1, 2),
  station('Ropsten', 'ne', -1, 2),
];

export const getRedLineNodes = ( undergroundManager: UndergroundManager ) => {

  // NOTE: Register them in the same order as the enum
  undergroundManager.register(Branches.RED_LINE_SOUTHBOUND, redLineSouthBound);
  undergroundManager.register(Branches.RED_LINE_MALARHOJDEN, redLineMalarhojdenNodes);
  undergroundManager.register(Branches.RED_LINE_NORSBORG, redLineNorsborgNodes);
  undergroundManager.register(Branches.RED_LINE_FRUANGEN, redLineFruangenNodes);

  const nodes: MapNode[] = addPropsToNodelist(redLineSouthBound);
  return nodes;
};

export const getRedLineNodesNorth = ( undergroundManager: UndergroundManager ) => {
  undergroundManager.register(Branches.RED_LINE_NORTHBOUND, redLineNorthBound);
  undergroundManager.register(Branches.RED_LINE_MORBY_CENTRUM, redLineMorbyCentrum);
  undergroundManager.register(Branches.RED_LINE_ROPSTEN, redLineRopsten);
  return addPropsToNodelist(redLineNorthBound);
};
