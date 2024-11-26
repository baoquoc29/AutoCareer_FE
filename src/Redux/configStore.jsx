import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {UserReducer} from "./reducers/UserReducer";
import {SectionReducer} from "./reducers/SectionReducer";
import {LoadingReducer} from "./reducers/LoadingReducer";



const rootReducer = combineReducers({
    UserReducer,
    SectionReducer,
    LoadingReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


export default store;