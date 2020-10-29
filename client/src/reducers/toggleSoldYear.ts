import { MapNode } from '../components/UndergroundLines';
import { ToggleActionData } from '../actions/mapActions';
import { MapState } from '../interfaces/MapInterfaces';

const toggleNodeOnSoldYear = (node: MapNode,
                              soldYears: {[key: string]: boolean}) => {
  console.log('toggleNodeOnSoldYear', node, node.sold);
  console.log(' s', soldYears);

  node.isVisible = node.sold ? soldYears[node.sold] === false : true;

  return node;
};

const toggleNodesRecursively = (branches: MapNode[][],
                                soldYears: {[key: string]: boolean}): MapNode[][] => {

  return branches.map((branch) => {
    return branch.map((node) => {

      if (node.branches) {
        console.log('\t has branch', node.branches);
        node.branches = toggleNodesRecursively(node.branches, soldYears);
      }
      return toggleNodeOnSoldYear(node, soldYears);
    });
  });
};

export const toggleNodesBySoldYear = (state: MapState,
                                      action: ToggleActionData,
                                      soldYears: {[key: string]: boolean} ) => {
  console.log('toggle nodes by sold year');

  console.log(' state', state);
  console.log(' action', action);
  console.log(' sold years', soldYears);

  Object.keys(state.nodes).forEach((key: string) => {
    state.nodes[key].forEach((node: MapNode) => {
      if (node.branches) {
        node.branches = toggleNodesRecursively(node.branches, soldYears);
      }
    });
  });
  return state;
};
