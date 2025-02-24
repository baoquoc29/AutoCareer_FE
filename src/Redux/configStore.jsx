import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {UserReducer} from "./reducers/UserReducer";
import {LoadingReducer} from "./reducers/LoadingReducer";
import {CandidateReducer} from "./reducers/CandidateReducer";
import {IndustryReducer} from "./reducers/IndustryReducer";
import {SubAdminReducer} from "./reducers/SubAdminReducer";
import {EmployeeReducer} from "./reducers/EmployeeReducer";
import {BusinessReducer} from "./reducers/BusinessReducer";
import {PortalReducer} from "./reducers/PortalReducer";
import {JobReducer} from "./reducers/JobReducer";
import {LocationReducer} from "./reducers/LocationReducer";
import {CooperationReducer} from "./reducers/CooperationReducer";
import {AdminBusinessReducer} from "./reducers/AdminBusinessReducer";
import {AdminUniversityReducer} from "./reducers/AdminUniversityReducer";
import {AdminJobReducer} from "./reducers/AdminJobReducer";
import {AdminWorkshopReducer} from "./reducers/AdminWorkshopReducer";
import {NotificationReducer} from "./reducers/NotificationReducer";
import {MessageReducer} from "./reducers/MessageReducer";
import {MatchingReducer} from "./reducers/MatchingReducer";


const rootReducer = combineReducers({
    UserReducer,
    LoadingReducer,
    PortalReducer,
    IndustryReducer,
    MessageReducer,
    JobReducer,
    SubAdminReducer,
    EmployeeReducer,
    CandidateReducer,
    MatchingReducer,
    BusinessReducer,
    LocationReducer,
    CooperationReducer,
    AdminBusinessReducer,
    AdminUniversityReducer,
    AdminJobReducer,
    AdminWorkshopReducer,
    NotificationReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


export default store;