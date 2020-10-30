import { MapNode } from '../components/UndergroundLines';
import { ToggleActionData } from '../actions/mapActions';
import { MapState } from '../interfaces/MapInterfaces';

const toggleNodeOnPublicPrivate = (node: MapNode,
                                   publicDisplayMode: {[key: string]: boolean}) => {
  let keyPublic = 'public';
  let keyPrivate = 'private';
  console.log(' toggling node', node.private);

  node.isVisible = false;

  // are all false? show everything
  if (!publicDisplayMode[keyPrivate] && !publicDisplayMode[keyPublic]) {
    node.isVisible = true;
  }
  if (publicDisplayMode[keyPrivate] && node.private) {
    node.isVisible = true;
  }
  if (publicDisplayMode[keyPublic] && !node.private) {
    node.isVisible = true;
  }
  return node;
};

const toggleNodesRecursively = (branches: MapNode[][],
                                publicDisplayMode: {[key: string]: boolean}): MapNode[][] => {

  return branches.map((branch) => {
    return branch.map((node) => {

      if (node.branches) {
        console.log('\t', node.name, ' has branch ', node.branches);
        node.branches = toggleNodesRecursively(node.branches, publicDisplayMode);
      }
      return toggleNodeOnPublicPrivate(node, publicDisplayMode);
    });
  });
};

export const toggleNodesOnPublicPrivate = (state: MapState,
                                           action: ToggleActionData,
                                           publicDisplayMode: {[key: string]: boolean} ) => {

  Object.keys(state.nodes).forEach((key: string) => {
    state.nodes[key].forEach((node: MapNode) => {
      if (node.branches) {
        console.log('n ', node, ' has branch', node.branches);
        node.branches = toggleNodesRecursively(node.branches, publicDisplayMode);
      }
      toggleNodeOnPublicPrivate(node, publicDisplayMode);
    });
  });
  return state;
};
