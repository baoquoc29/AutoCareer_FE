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
import {PortalReducer} from "./reducers/PortalReducer";
import {JobReducer} from "./reducers/JobReducer";
import {InstructionalReducer} from "./reducers/InstructionalReducer";
import {LocationReducer} from "./reducers/LocationReducer";
import {CooperationReducer} from "./reducers/CooperationReducer";
import {AdminBusinessReducer} from "./reducers/AdminBusinessReducer";
import {AdminUniversityReducer} from "./reducers/AdminUniversityReducer";
import {AdminJobReducer} from "./reducers/AdminJobReducer";
import {AdminWorkshopReducer} from "./reducers/AdminWorkshopReducer";
import {NotificationReducer} from "./reducers/NotificationReducer";


const rootReducer = combineReducers({
    UserReducer,
    SectionReducer,
    LoadingReducer,
    PortalReducer,
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
    CooperationReducer,
    AdminBusinessReducer,
    AdminUniversityReducer,
    AdminJobReducer,
    AdminWorkshopReducer,
    NotificationReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


export default store;