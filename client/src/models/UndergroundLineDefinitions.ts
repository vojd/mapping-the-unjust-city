import { MapNode } from '../components/UndergroundLines';
import { MapTextAlignment } from '../components/MapText';

const addPropsToNodelist = (nodeList: MapNode[]): MapNode[] => {
  return nodeList.map(n => {
    // Add initial starting positions for the lines originating from T-Centralen
    return Object.assign(n, { x: 0, y: 0 });
  });
};

const getMapNodeDefaults = (name: string,
                            direction: string,
                            lengthMultiplier: number = 1,
                            horizontalText: boolean = false,
                            textAlignment: MapTextAlignment = MapTextAlignment.LEFT,
                            branches?: number[],
                            branchNodes?: MapNode[][]): MapNode => {
  let s = <MapNode> {
    direction,
    name,
    owner: null,
    x: 0, y: 0,
    lengthMultiplier,
    isVisible: true,
    horizontalText,
    textAlignment,
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

const station = (name: string,
                 direction: string,
                 lengthMultiplier: number = 1,
                 branches?: number[],
                 branchNodes?: MapNode[][],
                 horizontalText: boolean = false,
                 textAlignment: MapTextAlignment = MapTextAlignment.LEFT,
                 ): MapNode => {

  return getMapNodeDefaults(name, direction, lengthMultiplier, horizontalText, textAlignment, branches, branchNodes);
};

const stationWithTextLeft = (name: string,
                             direction: string,
                             lengthMultiplier: number = 1,
                             textAlignment: MapTextAlignment = MapTextAlignment.LEFT,
                             branches?: number[],
                             branchNodes?: MapNode[][]): MapNode => {

  return getMapNodeDefaults(name, direction, lengthMultiplier, true, textAlignment, branches, branchNodes);

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
  GREEN_LINE_SKARMABRINK,
  GREEN_LINE_FARSTASTRAND,
  GREEN_LINE_SKARPNACK,
}

const redLineFruangenNodes: MapNode[] = [
  station('Midsommarkransen', 'sw'),
  station('Telefonplan', 'sw'),
  station('Hägerstensåsen', 'sw'),
  station('Västertorp', 'sw'),
  station('Fruängen', 'sw'),
];

const redLineNorsborgNodes: MapNode[] = [
  station('Bredäng', 'sw'),
  station('Sätra', 'sw'),
  station('Skärholmen', 'sw'),
  station('Vårberg', 'sw'),
  station('Vårby Gård', 'sw'),
  station('Fittja', 'sw'),
  station('Alby', 'sw'),
  station('Hallunda', 'sw'),
  station('Norsborg', 'sw'),
];

const redLineMalarhojdenNodes: MapNode[] = [
  station('Aspudden', 'w'),
  station('Örnsberg', 'w'),
  station(
    'Mälarhöjden', 'w', 1,
    [ Branches.RED_LINE_NORSBORG ],
    [ redLineNorsborgNodes ]
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
    'Liljeholmen', 'w', 1,
    [ Branches.RED_LINE_MALARHOJDEN, Branches.RED_LINE_FRUANGEN ],
    [ redLineMalarhojdenNodes, redLineFruangenNodes ]
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
    'Östermalms torg', 'n', 1,
    [ Branches.RED_LINE_MORBY_CENTRUM, Branches.RED_LINE_ROPSTEN ],
    [ redLineMorbyCentrum, redLineRopsten ]
  ),
];

// east from t-centralen
const blueLineKungstradgardenNodes: MapNode[] = [
  station('Kungsträdgården', 'e', 1, undefined, undefined, false, MapTextAlignment.RIGHT),
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
  stationWithTextLeft('Huvudsta', 'w', 3),
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
  stationWithTextLeft('Rådhuset', 'w', 3.25), // NOTE: Re-align Fridhemsplan if you move Rådhuset
  // TODO: Fridhemsplan must be present in both green and blue lines
  // station('Fridhemsplan', 'nw', -1, 1, null, [Branches.GREEN_LINE_ALVIK]),
  station('Fridhemsplan', 'nw', 2),
  station('Stadshagen', 'nw', 2),
  station(
    'Västra skogen', 'nw', 1,
    [ Branches.BLUE_LINE_AKALLA, Branches.BLUE_LINE_HJULSTA ],
    [ blueLineAkallaNodes, blueLineHjulstaNodes ]
  ),
];

const greenLineWestNodes: MapNode[] = [
  station(
      'Hötorget',
      'nw',
      2,
      undefined,
      undefined,
      false,
      MapTextAlignment.TOP
  ), // NOTE: If you move Hotorget, make sure you also move Rådhuset so Fridhemsplan aligns
  station('Rådmansgatan', 'w', .75),
  station('Odenplan', 'w', .75),
  station('S:t Eriksplan', 'w', .75),
  station('Fridhemsplan', 'w'),
  station('Thorildsplan', 'w', .5),
  station('Kristineberg', 'w', .5),
  station('Alvik', 'w', .5),

  station('Stora mossen', 'w', .5),
  station('Abrahamsberg', 'w', .5),
  station('Brommaplan', 'w', .5),
  station('Åkeshov', 'w', .5),

  station('Ängbyplan', 'w', .5),
  station('Islandstorget', 'w', .5),
  station('Blackeberg', 'w', .5),
  station('Råcksta', 'w', .5),
  station('Vällingby', 'w', .5),
  station('Johannelund', 'w', .5),
  station('Hässelby gård', 'w', .5),
  station('Hässelby strand', 'w', .5),
];

const greenLineHagsatraNodes: MapNode[] = [
  stationWithTextLeft('Globen', 'sw'),
  stationWithTextLeft('Enskede gård', 'sw'),
  stationWithTextLeft('Sockenplan', 'sw'),
  stationWithTextLeft('Svedmyra', 'sw'),
  stationWithTextLeft('Stureby', 'sw'),
  stationWithTextLeft('Bandhagen', 'sw'),
  stationWithTextLeft('Högdalen', 'sw'),
  stationWithTextLeft('Rågsved', 'sw'),
  stationWithTextLeft('Hagsätra', 'sw'),
];

const greenLinesSkarpnackNodes: MapNode[] = [
  station('Hammarbyhöjden', 'se'),
  station('Björkhagen', 'se'),
  station('Kärrtorp', 'se'),
  station('Bagarmossen', 'se'),
  station('Skarpnäck', 'se'),
];

const greenLineFarstaNodes: MapNode[] = [
  stationWithTextLeft('Blåsut', 's'),
  stationWithTextLeft('Sandsborg', 's'),
  stationWithTextLeft('Skogskyrkogården', 's'),
  stationWithTextLeft('Tallkrogen', 's'),
  stationWithTextLeft('Gubbängen', 's'),
  stationWithTextLeft('Hökarängen', 's'),
  stationWithTextLeft('Farsta', 's'),
  stationWithTextLeft('Farsta Strand', 's'),
];

const greenLineSouthBoundNodesSkarmabrink: MapNode[] = [
  station(
    'Skarmabrink',
    's',
    1,
    [
      Branches.GREEN_LINE_FARSTASTRAND,
      Branches.GREEN_LINE_SKARPNACK
    ],
    [
      greenLineFarstaNodes,
      greenLinesSkarpnackNodes
    ],
  ),
];

const greenLineSouthBoundNodes: MapNode[] = [
  station('Medborgarplatsen', 's', 4), // pushing it down from slussen
  station('Skanstull', 's'),
  station(
    'Gullmarsplan', 's', 1,
    [ Branches.GREEN_LINE_HAGSATRA, Branches.GREEN_LINE_SKARMABRINK ],
    [ greenLineHagsatraNodes, greenLineSouthBoundNodesSkarmabrink ],
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
