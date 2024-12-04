import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {UserReducer} from "./reducers/UserReducer";
import {SectionReducer} from "./reducers/SectionReducer";
import {LoadingReducer} from "./reducers/LoadingReducer";
import {MajorReducer} from "./reducers/MajorReducer";
import { IndustryReducer } from "./reducers/IndustryReducer";
import {WorkShopReducer} from "./reducers/WorkShopReducer";


const rootReducer = combineReducers({
    UserReducer,
    SectionReducer,
    LoadingReducer,
    WorkShopReducer,
    MajorReducer,
    IndustryReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


export default store;