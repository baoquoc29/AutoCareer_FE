import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {UserReducer} from "./reducers/UserReducer";
import {SectionReducer} from "./reducers/SectionReducer";
import {LoadingReducer} from "./reducers/LoadingReducer";
import {MajorReducer} from "./reducers/MajorReducer";
import {UniversityReducer} from "./reducers/UniversityReducer";
import {WorkShopReducer} from "./reducers/WorkShopReducer";
import {IndustryReducer} from "./reducers/IndustryReducer";
import {SubAdminReducer} from "./reducers/SubAdminReducer";
import {EmployeeReducer} from "./reducers/EmployeeReducer";
import {BusinessReducer} from "./reducers/BusinessReducer";
import {JobReducer} from "./reducers/JobReducer";
import {InstructionalReducer} from "./reducers/InstructionalReducer";
import {LocationReducer} from "./reducers/LocationReducer";


const rootReducer = combineReducers({
    UserReducer,
    SectionReducer,
    LoadingReducer,
    WorkShopReducer,
    MajorReducer,
    IndustryReducer,
    JobReducer,
    SubAdminReducer,
    EmployeeReducer,
    UniversityReducer,
    BusinessReducer,
    LocationReducer,
    InstructionalReducer,

});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


export default store;