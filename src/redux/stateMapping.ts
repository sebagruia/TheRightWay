export const stateMapping = (state:any) => ({
  userAuth: state.userReducer.user,
  lists: state.listReducer.lists,
  selectedList: state.listReducer.selectedList,
  selectedItemObject: state.listReducer.selectedItemObject,
});
