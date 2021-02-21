import {
  ADD_NEW_LIST_NAME,
  DELETE_LIST,
  ADD_NEW_ITEM_IN_LIST,
  DELETE_LIST_ITEM,
  SELECT_CURRENT_ITEM_FOR_EDITING,
  SELECT_CURRENT_LIST,
  EDIT_ITEM_NAME,
} from "./listActions";

const initialState = {
  lists: null,
  selectedList: null,
  selectedItemId: "",
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_LIST_NAME:
      return {
        ...state,
        lists: { ...state.lists, [action.payload.id]: action.payload },
      };
    case DELETE_LIST:
      const { [action.payload]: remove, ...rest } = state.lists;
      return {
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
            items: { ...state.lists[listId].items, [item.id]: { ...item } },
          },
        },
      };
    case DELETE_LIST_ITEM:
      const listIdValue = action.payload.listId;
      const itemIdValue = action.payload.itemId;
      const { [itemIdValue]: removedItem, ...restItems } = state.lists[
        listIdValue
      ].items;
      console.log(restItems);
      return {
        ...state,
        lists: {
          ...state.lists,
          [listIdValue]: {
            ...state.lists[listIdValue],
            items: { ...restItems },
          },
        },
      };
    case EDIT_ITEM_NAME:
      const idList = action.payload.listId;
      const idItem = action.payload.itemId;
      const newValue = action.payload.inputValue;
      return {
        ...state,
        lists: {
          ...state.lists,
          [idList]: {
            ...state.lists[idList],
            items: {
              ...state.lists[idList].items,
              [idItem]: {
                ...state.lists[idList].items[
                  action.payload.itemId
                ],
                itemName:newValue,
              },
            },
          },
        },
      };
    case SELECT_CURRENT_ITEM_FOR_EDITING:
      return {
        ...state,
        selectedItemId: action.payload,
      };
    case SELECT_CURRENT_LIST:
      return {
        ...state,
        selectedList: action.payload,
      };

    default:
      return state;
  }
};
