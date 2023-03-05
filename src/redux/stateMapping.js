export const stateMapping = (state) => ({
  userAuth: state.userReducer.user,
  lists: state.listReducer.lists,
  selectedList: state.listReducer.selectedList,
  selectedItemId: state.listReducer.selectedItemId,
  // selectedItemObject: state.listReducer.selectedList.items[state.listReducer.selectedItemId],
  selectedItemObject:state.listReducer.lists[state.listReducer.selectedList.id].items[state.listReducer.selectedItemId],
});
