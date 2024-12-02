import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {UserReducer} from "./reducers/UserReducer";
import {SectionReducer} from "./reducers/SectionReducer";
import {LoadingReducer} from "./reducers/LoadingReducer";
import {MajorReducer} from "./reducers/MajorReducer";
import { IndustryReducer } from "./reducers/IndustryReducer";
import {EmployeeReducer} from "./reducers/EmployeeReducer";


const rootReducer = combineReducers({
    UserReducer,
    SectionReducer,
    LoadingReducer,
    MajorReducer,
    IndustryReducer,
    EmployeeReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


export default store;