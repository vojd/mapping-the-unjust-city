import { MapNode } from '../components/UndergroundLines';
import { ToggleActionData } from '../actions/mapActions';
import { MapState } from '../interfaces/MapInterfaces';

const toggleNodeOnSoldYear = (node: MapNode,
                              soldYears: {[key: string]: boolean},
                              setAllToVisible: boolean) => {

  if (setAllToVisible) {
    node.isVisible = true;
  } else {
    // Toggle selected to invisible
  // node.isVisible = node.sold ? soldYears[node.sold] === false : true;
    // Toggle selected to visible
    node.isVisible = node.sold ? soldYears[node.sold] : false;
  }

  return node;
};

const toggleNodesRecursively = (branches: MapNode[][],
                                soldYears: {[key: string]: boolean},
                                setAllToVisible: boolean): MapNode[][] => {

  return branches.map((branch) => {
    return branch.map((node) => {

      if (node.branches) {
        console.log('\t has branch', node.branches);
        node.branches = toggleNodesRecursively(node.branches, soldYears, setAllToVisible);
      }
      return toggleNodeOnSoldYear(node, soldYears, setAllToVisible);
    });
  });
};

export const toggleNodesBySoldYear = (state: MapState,
                                      action: ToggleActionData,
                                      soldYears: {[key: string]: boolean} ) => {
  console.log('toggle nodes by sold year', soldYears);

  // If no checkbox is checked, show all
  let setAllToVisible = Object.keys(soldYears).map(key => {
    return soldYears[key];
  }).every(v => !v);

  Object.keys(state.nodes).forEach((key: string) => {
    state.nodes[key].forEach((node: MapNode) => {
      node = toggleNodeOnSoldYear(node, soldYears, setAllToVisible);
      if (node.branches) {
        node.branches = toggleNodesRecursively(
            node.branches,
            soldYears,
            setAllToVisible
        );
      }
    });
  });
  return state;
};
