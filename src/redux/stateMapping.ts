export const stateMapping = (state: any) => ({
  userAuth: state.userReducer.user,
  userError: state.userReducer.error,
  lists: state.listReducer.lists,
  listItemsOnline: state.listReducer.listItemsOnline,
  listItemsForOfflineMode: state.listReducer.listItemsForOfflineMode,
  selectedList: state.listReducer.selectedList,
  selectedItemObject: state.listReducer.selectedItemObject,
  sortType: state.listReducer.sortType,
  googleCalendarAccessToken: state.userReducer.googleCalendarAccessToken,
});
