import { EMPLOYEE_ACTION_TYPES } from "../type/actionTypes";


const INITIAL_STATE = {
    employees: [],
}

const EmployeeReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case EMPLOYEE_ACTION_TYPES.CREATE:
            return {
                employees: [...state.employees, actions.payload],
            }

        case EMPLOYEE_ACTION_TYPES.DELETE:
            return {
                employees: state.employees.filter(
                    (item) =>
                        item?.employee_id !== actions?.payload?.employee_id
                ),
            }

        case EMPLOYEE_ACTION_TYPES.UPDATE: {
            const clone = [...state.employees]
            state.employees.filter(
                (item, index) =>
                    item?.employee_id === actions.payload?.employee_id &&
                    (clone[index] = actions.payload)
            )

            return {
                employees: clone,
            }
        }
        case EMPLOYEE_ACTION_TYPES.GET_ALL:
            return {
                employees: actions.payload,
            }

        default:
            return state
    }
}

export default EmployeeReducer