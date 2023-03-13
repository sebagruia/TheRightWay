export const stateMapping = (state:any) => ({
  userAuth: state.userReducer.user,
  lists: state.listReducer.lists,
  selectedList: state.listReducer.selectedList,
  selectedItemObject: state.listReducer.selectedItemObject,
  // selectedItemObject: state.listReducer.selectedList.items[state.listReducer.selectedItemId],
  // selectedItemObject:state.listReducer.lists[state.listReducer.selectedList.id].items[state.listReducer.selectedItemId],
});
