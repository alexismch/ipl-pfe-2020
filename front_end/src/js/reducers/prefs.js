import * as actionTypes from "../constants/action_types";

const initialState = {
    
};

export default function(state=initialState, action) {
    switch(action.type) {
      case actionTypes.VARIABLESAVED:
        return { 
          ...state, 
          ...action.payload
        };
      default:
        return state;
    }
  }