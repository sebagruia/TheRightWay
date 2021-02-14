import {combineReducers} from "redux";

import {userReducer} from "./user/userReducer";
import {listReducer} from "./list/listReducer";

const rootReducer = combineReducers({userReducer, listReducer});

export default rootReducer;