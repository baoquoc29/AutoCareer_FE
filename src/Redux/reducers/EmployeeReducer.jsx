import {CREATE_EMPLOYEE, DELETE_EMPLOYEE, SET_EMPLOYEE, SET_EMPLOYEE_ID, UPDATE_EMPLOYEE} from "../types/EmployeeType";

const initialState = {
    employees: [],
    employeeId: null,
}

export const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYEE:
            return {
                ...state,
                employees: action.payload,
            };
        case SET_EMPLOYEE_ID:
            return {
                ...state,
                employeeId: action.payload,
            };
        case CREATE_EMPLOYEE:
            return {
                ...state,
            };
        case UPDATE_EMPLOYEE:
            return {
                ...state,
            };
        case DELETE_EMPLOYEE:
            return {
                ...state,
            };
        default:
            return {...state}
    }
}