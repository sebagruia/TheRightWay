
export const stateMapping = (state:any) => ({
  userAuth: state.userReducer.user,
  userError: state.userReducer.error,
  lists: state.listReducer.lists,
  listItems:state.listReducer.listItems,
  selectedList: state.listReducer.selectedList,
  selectedItemObject: state.listReducer.selectedItemObject,
  sortType:state.listReducer.sortType,
});
