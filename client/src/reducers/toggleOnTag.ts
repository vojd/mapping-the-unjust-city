import { ToggleAction, ToggleActionData } from '../actions/mapActions';
import { MapState } from '../pages/MapComponent';
import { MapNode } from '../components/UndergroundLines';

const toggleNodeOnTag = ( node: MapNode, tagsToShow: string[] ): MapNode => {
  // If the list is empty then we'll show everything
  if (tagsToShow.length === 0) {
    node.isVisible = true;
    return node;
  }

  if (node.tags && node.tags.filter(t => tagsToShow.indexOf(t.name) > -1).length > 0) {
    node.isVisible = true;
  } else {
    node.isVisible = false;
  }
  // node.isVisible = node.tags && node.tags.filter(t => tagsToShow.indexOf(t.name) > -1).length > 0;
  return node;
};

const toggleNodesRecursively = ( branches: MapNode[][],
                                 data: ToggleActionData,
                                 tagsToShow: string[] ): MapNode[][] => {

  return branches.map(( branch ) => {
    return branch.map(( node ) => {

      if (node.branches) {
        console.log('\t has branch', node);
        node.branches = toggleNodesRecursively(node.branches, data, tagsToShow);
      }
      return toggleNodeOnTag(node, tagsToShow);
    });
  });
};

// TODO: Doesn't handle all levels of branching, must be recursive
export const addToggleStateToNodes = ( state: MapState,
                                       action: ToggleAction,
                                       tagsToShow: string[] ): MapState => {

  const data = action.data;

  // Iterate over all the underground lines by key
  Object.keys(state.nodes).forEach(( key: string ) => {
    // for each underground line defined by key like: { redLineNodes: [] }
    state.nodes[key].forEach(( node: MapNode ) => {

      // act on this nodes children ( branches )
      if (node.branches) {
        node.branches = toggleNodesRecursively(node.branches, data, tagsToShow);
      }
    });
  });

  return state;
};

export const createNewTagList = ( visibleTags: string[], tag: string ): string[] => {
  const id = visibleTags.indexOf(tag);
  if (id > -1) {
    visibleTags.splice(id, 1);
    return visibleTags;
  } else {
    visibleTags.push(tag);
    return visibleTags;
  }
};
