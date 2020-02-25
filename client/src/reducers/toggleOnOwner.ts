import { ToggleAction, ToggleActionData } from '../actions/mapActions';
import { MapNode } from '../components/UndergroundLines';
import { MapState } from '../interfaces/MapInterfaces';

const toggleNodeOnOwner = ( node: MapNode, tagsToShow: string[] ): MapNode => {
  // console.log(node.name);
  // If the list is empty then we'll show everything
  if (tagsToShow.length === 0) {
    node.isVisible = true;
    return node;
  }

  if (node.owner && tagsToShow.indexOf(node.owner.name) > -1) {
    node.isVisible = true;
  } else {
    node.isVisible = false;
  }

  return node;
};

const toggleNodesRecursively = ( branches: MapNode[][],
                                 data: ToggleActionData,
                                 tagsToShow: string[] ): MapNode[][] => {

  return branches.map(( branch ) => {
    return branch.map(( node ) => {

      if (node.branches) {
        console.log('\t has branch', node.branches);
        node.branches = toggleNodesRecursively(node.branches, data, tagsToShow);
      }
      return toggleNodeOnOwner(node, tagsToShow);
    });
  });
};

export const addToggleOwnerStateToNodes = ( state: MapState,
                                            action: ToggleAction,
                                            ownersToShow: string[] ): MapState => {

  console.log('addToggleOwnerStateToNodes', action, ownersToShow);

  const data = action.data;

  // Iterate over all the underground lines by key
  Object.keys(state.nodes).forEach(( key: string ) => {
    // for each underground line defined by key like: { redLineNodes: [] }
    state.nodes[key].forEach(( node: MapNode ) => {

      node = toggleNodeOnOwner(node, ownersToShow);

      // act on this nodes children ( branches )
      if (node.branches) {
        node.branches = toggleNodesRecursively(node.branches, data, ownersToShow);
      }
    });
  });

  return state;
};

export const createNewOwnerList = ( visibleOwners: string[], owner: string ): string[] => {
  const id = visibleOwners.indexOf(owner);
  if (id > -1) {
    visibleOwners.splice(id, 1);
    return visibleOwners;
  } else {
    visibleOwners.push(owner);
    return visibleOwners;
  }
};
