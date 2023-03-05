import { listActions } from "./actionEnums";

const initialState = {
  lists: null,
  selectedList: '',
  selectedItemId: '',
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case listActions.FETCH_USER_LISTS:
      return {
        ...state,
        lists: action.payload,
      };
    case listActions.CLEAR_STATE:
      return {
        state: initialState,
      };
    case listActions.ADD_NEW_LIST_NAME:
      return {
        ...state,
        lists: { ...state.lists, [action.payload.id]: action.payload },
      };
    case listActions.DELETE_LIST:
      const { [action.payload]: remove, ...rest } = state.lists;
      return {
        ...state,
        lists: { ...rest },
      };
    case listActions.ADD_NEW_ITEM_IN_LIST:
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
    case listActions.SELECT_CURRENT_LIST:
      return {
        ...state,
        selectedList: action.payload,
      };
    case listActions.DELETE_LIST_ITEM:
      const listIdValue = action.payload.listId;
      const itemIdValue = action.payload.itemId;
      const { [itemIdValue]: removedItem, ...restItems } = state.lists[listIdValue].items;
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
    case listActions.EDIT_ITEM_NAME:
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
              [idItem]: Object.assign(state.lists[idList].items[idItem], {
                itemName: newValue,
              }),
            },
          },
        },
      };
    case listActions.TOGGLE_CHECK_STATUS:
      const idList2 = action.payload.listId;
      const idItem2 = action.payload.itemId;
      const status = action.payload.status;
      return {
        ...state,
        lists: {
          ...state.lists,
          [idList2]: {
            ...state.lists[idList2],
            items: {
              ...state.lists[idList2].items,
              [idItem2]: Object.assign(state.lists[idList2].items[idItem2], {
                check: status,
              }),
            },
          },
        },
      };
    case listActions.CHANGE_ITEM_QUANTITY:
      const idList3 = action.payload.listId;
      const idItem3 = action.payload.itemId;
      const quantity = action.payload.quantity;
      return {
        ...state,
        lists: {
          ...state.lists,
          [idList3]: {
            ...state.lists[idList3],
            items: {
              ...state.lists[idList3].items,
              [idItem3]: Object.assign(state.lists[idList3].items[idItem3], {
                quantity: quantity,
              }),
            },
          },
        },
      };
    case listActions.SELECT_CURRENT_ITEM_FOR_EDITING:
      return {
        ...state,
        selectedItemId: action.payload,
      };

    default:
      return state;
  }
};
