import { MapNode } from '../components/UndergroundLines';
import CompanyDefinitions from './CompanyDefinitions';

const addPropsToNodelist = ( nodeList: MapNode[] ): MapNode[] => {
  return nodeList.map(n => {
    // Add initial starting positions for the lines originating from T-Centralen
    return Object.assign(n, {x: 0, y: 0});
  });
};

const station = ( name: string,
                  direction: string,
                  lengthMultiplier: number = 1,
                  owner?: any,
                  branches?: number[],
                  branchNodes?: MapNode[][] ): MapNode => {
  let s = <MapNode> {
    direction: direction,

    name: name,
    owner: owner ? owner : null,
    x: 0, y: 0,
    lengthMultiplier: lengthMultiplier,
    isVisible: true
  };

  // TODO: Refactor away and replace with actual branch nodes instead, see next if-statement
  if (branches) {
    s.branchIds = branches;
  }

  // Add the actual branch nodes onto this node
  if (branchNodes) {
    s.branches = branchNodes;
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

  GREEN_LINE_WEST,

  GREEN_LINE_SOUTHBOUND,
  GREEN_LINE_HAGSATRA,
  // GREEN_LINE_FARSTASTRAND,
  // GREEN_LINE_SKARPNACK,
}

const redLineFruangenNodes: MapNode[] = [
  station('Midsommarkransen', 'sw'),
  station('Telefonplan', 'sw'),
  station('Hägerstensåsen', 'sw'),
  station('Västertorp', 'sw'),
  station('Fruängen', 'sw'),
];

const redLineNorsborgNodes: MapNode[] = [
  station('Bredäng', 'sw', 1, CompanyDefinitions.FAST_PARTNER),
  station('Sätra', 'sw', 1, CompanyDefinitions.SATRA),
  station('Skärholmen', 'sw', 1, CompanyDefinitions.GROSVENOR),
  station('Vårberg', 'sw', 1, CompanyDefinitions.AGORA),
  station('Vårby Gård', 'sw', 1, CompanyDefinitions.BALDER),
  station('Fittja', 'sw', 1, CompanyDefinitions.FITTJA_CENTRUMFASTIGHETER),
  station('Alby', 'sw', 1, CompanyDefinitions.BOTKYRKABYGGEN),
  station('Hallunda', 'sw', 1, CompanyDefinitions.STERNER),
  station('Norsborg', 'sw', 1, CompanyDefinitions.NORSBORG),
];

const redLineMalarhojdenNodes: MapNode[] = [
  station('Aspudden', 'w'),
  station('Örnsberg', 'w'),
  station(
    'Mälarhöjden', 'w', 1, null,
    [Branches.RED_LINE_NORSBORG],
    [redLineNorsborgNodes]
  ),
];

// red line - south bound from t-centralen
const redLineSouthBound: MapNode[] = [
  station('Gamla stan', 's'),
  station('Slussen', 's'),
  station('Mariatorget', 'w'),
  station('Zinkensdamm', 'w'),
  station('Hornstull', 'w'),
  // NOTE: We're going to Malarhojden because the map takes a turn to south west after Malarhojden
  station(
    'Liljeholmen', 'w', 1, null,
    [Branches.RED_LINE_MALARHOJDEN, Branches.RED_LINE_FRUANGEN],
    [redLineMalarhojdenNodes, redLineFruangenNodes]
  ),
];

const redLineMorbyCentrum: MapNode[] = [
  station('Stadion', 'n', 3),
  station('Tekniska högskolan', 'n'),
  station('Universitetet', 'n'),
  station('Bergshamra', 'n'),
  station('Danderyds sjukhus', 'n'),
  station('Mörby Centrum', 'n'),
];

const redLineRopsten: MapNode[] = [
  station('Karlaplan', 'ne', 2),
  station('Gärdet', 'ne', 2),
  station('Ropsten', 'ne', 2),
];

// north bound from t-centralen
const redLineNorthBound: MapNode[] = [
  station(
    'Östermalms torg', 'n', 1, null,
    [Branches.RED_LINE_MORBY_CENTRUM, Branches.RED_LINE_ROPSTEN],
    [redLineMorbyCentrum, redLineRopsten]
  ),
];

// east from t-centralen
const blueLineKungstradgardenNodes: MapNode[] = [
  station('Kungsträdgården', 'e'),
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

// west from t-centralen, continuing northwest
const blueLineWestBoundNodes: MapNode[] = [
  station('Rådhuset', 'w'),
  // TODO: Fridhemsplan must be present in both green and blue lines
  // station('Fridhemsplan', 'nw', -1, 1, null, [Branches.GREEN_LINE_ALVIK]),
  station('Fridhemsplan', 'nw'),
  station('Stadshagen', 'nw'),
  station(
    'Västra skogen', 'nw', 1, null,
    [Branches.BLUE_LINE_AKALLA, Branches.BLUE_LINE_HJULSTA],
    [blueLineAkallaNodes, blueLineHjulstaNodes]
  ),
];

const greenLineWestNodes: MapNode[] = [
  station('Hötorget', 'nw'),
  station('Rådmansgatan', 'w'),
  station('Odenplan', 'w'),
  station('S:t Eriksplan', 'w'),
  station('Fridshemplan', 'w'),
  station('Thorildsplan', 'w'),
  station('Kristineberg', 'w'),
  station('Alvik', 'w'),

  station('Stora mossen', 'w'),
  station('Abrahamsberg', 'w'),
  station('Brommaplan', 'w'),
  station('Åkeshov', 'w'),

  station('Ängbyplan', 'w'),
  station('Islandstorget', 'w'),
  station('Blackeberg', 'w'),
  station('Råcksta', 'w'),
  station('Vällingby', 'w'),
  station('Johannelund', 'w'),
  station('Hässelby gård', 'w'),
  station('Hässelby strand', 'w'),
];

const greenLineHagsatraNodes: MapNode[] = [
  station('Globen', 'sw'),
  station('Enskede gård', 'sw'),
  station('Sockenplan', 'sw'),
  station('Svedmyra', 'sw'),
  station('Stureby', 'sw'),
  station('Bandhagen', 'sw'),
  station('Högdalen', 'sw'),
  station('Rågsved', 'sw'),
  station('Hagsätra', 'sw'),
];

const greenLineSouthBoundNodes: MapNode[] = [
  station('Medborgarplatsen', 's', 4), // pushing it down from slussen
  station('Skanstull', 's'),
  station(
    'Gullmarsplan', 's', 1, null,
    [Branches.GREEN_LINE_HAGSATRA],
    [greenLineHagsatraNodes]
  ),
];

export const getRedLineNodes = () => {
  return addPropsToNodelist(redLineSouthBound);
};

export const getRedLineNodesNorth = () => {
  return addPropsToNodelist(redLineNorthBound);
};

export const getBlueLineNodesEast = () => {
  return addPropsToNodelist(blueLineKungstradgardenNodes);
};

export const getBlueLineNodesWest = () => {
  return addPropsToNodelist(blueLineWestBoundNodes);
};

export const getGreenLineNodesWest = () => {
  return addPropsToNodelist(greenLineWestNodes);
};

export const getGreenLineNodesSouth = () => {
  return addPropsToNodelist(greenLineSouthBoundNodes);
};
