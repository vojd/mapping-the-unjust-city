import { MapNode } from '../components/UndergroundLines';
import { ToggleActionData } from '../actions/mapActions';
import { MapState } from '../interfaces/MapInterfaces';

const toggleNodeOnPublicPrivate = (node: MapNode,
                                   publicDisplayMode: {[key: string]: boolean}) => {
  let modePublic = publicDisplayMode['Publicly owned'];
  let modePrivate = publicDisplayMode['Privately owned'];
  let modeNone = !publicDisplayMode['Privately owned'] && !publicDisplayMode['Publicly owned'];

  if (modeNone) {
    node.isVisible = true;
    return node;
  }

  if (modePublic && node.ownershipType === 'Publicly owned') {
    node.isVisible = true;
    return node;
  }

  if (modePrivate && node.ownershipType === 'Privately owned') {
    node.isVisible = true;
    return node;
  }

  node.isVisible = false;
  return node;
};

const toggleNodesRecursively = (branches: MapNode[][],
                                publicDisplayMode: {[key: string]: boolean}): MapNode[][] => {

  return branches.map((branch) => {
    return branch.map((node) => {

      if (node.branches) {
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
        node.branches = toggleNodesRecursively(node.branches, publicDisplayMode);
      }
      toggleNodeOnPublicPrivate(node, publicDisplayMode);
    });
  });
  return state;
};
