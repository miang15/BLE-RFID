import { CATEGORY_ACTION_TYPES } from "../type/actionTypes";

const INITIAL_STATE = {
    categories: [],
}

const CategoryReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case CATEGORY_ACTION_TYPES.CREATE:
            return {
                categories: [...state.categories, actions.payload],
            }

        case CATEGORY_ACTION_TYPES.DELETE:
            return {
                categories: state.categories.filter(
                    item => item?.category_id !== actions.payload?.category_id
                ),
            }

        case CATEGORY_ACTION_TYPES.UPDATE: {
            const clone = [...state.categories]
            state.categories.filter(
                (item, index) =>
                    item?.category_id === actions.payload?.category_id &&
                    (clone[index] = actions.payload)
            )

            return {
                categories: clone,
            }
        }
        case CATEGORY_ACTION_TYPES.GET_ALL:
            return {
                categories: actions.payload,
            }

        default:
            return state
    }
}

export default CategoryReducer