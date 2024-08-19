import {CHECKOUT_ACTION_TYPE} from '../actions/checkOutAction';

const INITIAL_STATE = {
  checkout: [],
};

const CheckoutReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case CHECKOUT_ACTION_TYPE.CREATE:
      return {
        checkout: [...state.checkout, actions.payload],
      };

    default:
      return state;
  }
};

export default CheckoutReducer;
