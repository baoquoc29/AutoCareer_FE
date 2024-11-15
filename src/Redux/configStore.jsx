import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import createMiddleWareSaga from 'redux-saga';
import {rootSaga} from "./actions/rootSaga";



const middlewareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({

});

const store = legacy_createStore(rootReducer, applyMiddleware(middlewareSaga));


middlewareSaga.run(rootSaga);
export default store;