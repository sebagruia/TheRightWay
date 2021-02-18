import {
  ADD_NEW_LIST_NAME,
  SET_LIST_IN_USE_ID,
  DELETE_LIST,
  ADD_NEW_ITEM_IN_LIST,
} from "./listActions";

const initialState = {
  lists: null,
  listIdInUse: "",
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_LIST_NAME:
      return {
        ...state,
        lists: { ...state.lists, [action.payload.id]: action.payload },
      };
    // case SET_LIST_IN_USE_ID:
    //     return{
    //         ...state, listIdInUse:action.payload
    //     }
    case DELETE_LIST:
      // const {[action.payload] : remove, ...rest} = state.lists;
      const { [action.payload]: remove, ...rest } = state.lists;
      return {
        // ...state, lists:state.lists.filter(item=>item.id !== action.payload)
        ...state,
        lists: { ...rest },
      };
    case ADD_NEW_ITEM_IN_LIST:
      const listId = action.payload.listId;
      const item = action.payload.item;
      return {
        ...state,
        lists: {
          ...state.lists,
          [listId]: {
            ...state.lists[listId],
            items: { ...state.lists[listId].items, [item.id]: {...item} },
          },
        },
      };
    default:
      return state;
  }
};
