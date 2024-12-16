import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {UserReducer} from "./reducers/UserReducer";
import {SectionReducer} from "./reducers/SectionReducer";
import {LoadingReducer} from "./reducers/LoadingReducer";
import {MajorReducer} from "./reducers/MajorReducer";
import {UniversityReducer} from "./reducers/UniversityReducer";
import { IndustryReducer } from "./reducers/IndustryReducer";
import {WorkShopReducer} from "./reducers/WorkShopReducer";
import {SubAdminReducer} from "./reducers/SubAdminReducer";
import {EmployeeReducer} from "./reducers/EmployeeReducer";
import {BusinessReducer} from "./reducers/BusinessReducer";
import {PortalReducer} from "./reducers/PortalReducer";


const rootReducer = combineReducers({
    UserReducer,
    SectionReducer,
    LoadingReducer,
    PortalReducer,
    WorkShopReducer,
    MajorReducer,
    IndustryReducer,
    SubAdminReducer,
    EmployeeReducer,
    UniversityReducer,
    BusinessReducer,

});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


export default store;