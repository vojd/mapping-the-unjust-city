import { MapNode, UndergroundManager } from '../components/UndergroundLines';
import CompanyDefinitions from './CompanyDefinitions';

const addPropsToNodelist = ( nodeList: MapNode[] ): MapNode[] => {
  return nodeList.map(n => {
    return Object.assign(n, {x: 0, y: 0});
  });
};

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

const enum Branches {
  RED_LINE_NORTHBOUND,
  RED_LINE_MORBY_CENTRUM,
  RED_LINE_ROPSTEN,

  RED_LINE_SOUTHBOUND,
  RED_LINE_MALARHOJDEN,
  RED_LINE_NORSBORG,
  RED_LINE_FRUANGEN,

  BLUE_LINE_KUNGSTRADGARDEN,

  BLUE_LINE_WESTBOUND,
  BLUE_LINE_AKALLA,
  BLUE_LINE_HJULSTA,
}

const redLineFruangenNodes: MapNode[] = [
  station('Midsommarkransen', 'sw'),
  station('Telefonplan', 'sw'),
  station('Hägerstensåsen', 'sw'),
  station('Västertorp', 'sw'),
  station('Fruängen', 'sw', 1),
];

const redLineMalarhojdenNodes: MapNode[] = [
  station('Aspudden', 'w'),
  station('Örnsberg', 'w'),
  station('Mälarhöjden', 'w', -1, 1, null, [Branches.RED_LINE_NORSBORG]),
];

const redLineNorsborgNodes: MapNode[] = [
  station('Bredäng', 'sw', -1, 1, CompanyDefinitions.FAST_PARTNER),
  station('Sätra', 'sw', -1, 1, CompanyDefinitions.SATRA),
  station('Skärholmen', 'sw', -1, 1, CompanyDefinitions.GROSVENOR),
  station('Vårberg', 'sw', -1, 1, CompanyDefinitions.AGORA),
  station('Vårby Gård', 'sw', -1, 1, CompanyDefinitions.BALDER),
  station('Fittja', 'sw', -1, 1, CompanyDefinitions.FITTJA_CENTRUMFASTIGHETER),
  station('Alby', 'sw', -1, 1, CompanyDefinitions.BOTKYRKABYGGEN),
  station('Hallunda', 'sw', -1, 1, CompanyDefinitions.STERNER),
  station('Norsborg', 'sw', -1, 1, CompanyDefinitions.NORSBORG),
];

// red line - south bound from t-centralen
const redLineSouthBound: MapNode[] = [
  station('Gamla stan', 's'),
  station('Slussen', 's'),
  station('Mariatorget', 'w'),
  station('Zinkensdamm', 'w'),
  station('Hornstull', 'w'),
  station('Liljeholmen', 'w', -1, 1, null, [Branches.RED_LINE_MALARHOJDEN, Branches.RED_LINE_FRUANGEN]),
];

// north bound from t-centralen
const redLineNorthBound: MapNode[] = [
  station('Östermalms torg', 'n', -1, 1, null, [
    Branches.RED_LINE_MORBY_CENTRUM,
    Branches.RED_LINE_ROPSTEN,
  ]),
];

const redLineMorbyCentrum: MapNode[] = [
  station('Stadion', 'n', -1, 3),
  station('Tekniska högskolan', 'n'),
  station('Universitetet', 'n'),
  station('Bergshamra', 'n'),
  station('Danderyds sjukhus', 'n'),
  station('Mörby Centrum', 'n'),
];

const redLineRopsten: MapNode[] = [
  station('Karlaplan', 'ne', -1, 2),
  station('Gärdet', 'ne', -1, 2),
  station('Ropsten', 'ne', -1, 2),
];

// east from t-centralen
const blueLineKungstradgardenNodes: MapNode[] = [
  station('Kungsträdgården', 'e'),
];

// west from t-centralen, continuing northwest
const blueLineWestBoundNodes: MapNode[] = [
  station('Rådhuset', 'w'),
  station('Fridhemsplan', 'nw'),
  station('Stadshagen', 'nw'),
  station('Västra skogen', 'nw', -1, 1, null, [Branches.BLUE_LINE_AKALLA, Branches.BLUE_LINE_HJULSTA]),
];

const blueLineAkallaNodes: MapNode[] = [
  station('Solna centrum', 'nw'),
  station('Näckrosen', 'nw'),
  station('Hallonbergen', 'nw'),
  station('Kista', 'nw'),
  station('Husby', 'nw'),
  station('Akalla', 'nw'),
];

const blueLineHjulstaNodes: MapNode[] = [
  station('Huvudsta', 'w'),
  station('Solna strand', 'nw'),
  station('Sundbybergs centrum', 'nw'),
  station('Duvbo', 'nw'),
  station('Rissne', 'nw'),
  station('Rinkeby', 'nw'),
  station('Tensta', 'nw'),
  station('Hjulsta', 'nw'),
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

export const getBlueLineNodesEast = ( undergroundManager: UndergroundManager ) => {
  // NOTE: Register them in the same order as the enum
  undergroundManager.register(Branches.BLUE_LINE_KUNGSTRADGARDEN, blueLineKungstradgardenNodes);
  return addPropsToNodelist(blueLineKungstradgardenNodes);
};

export const getBlueLineNodesWest = ( undergroundManager: UndergroundManager ) => {
  undergroundManager.register(Branches.BLUE_LINE_WESTBOUND, blueLineWestBoundNodes);
  undergroundManager.register(Branches.BLUE_LINE_AKALLA, blueLineAkallaNodes);
  undergroundManager.register(Branches.BLUE_LINE_HJULSTA, blueLineHjulstaNodes);

  const nodes: MapNode[] = addPropsToNodelist(blueLineWestBoundNodes);
  return nodes;
};