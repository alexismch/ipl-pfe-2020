import * as actionTypes from "../constants/action_types";

const initialState = {
    isAuthenticated : false, 
    since : new Date(),
    errorMessage : "",
    token: "",
    role: "",
    originalPath: "/",
    displayName: ""
};

export default function(state=initialState, action) {
    switch(action.type) {
      case actionTypes.AUTHENTICATED:
        return { 
          ...state, 
          isAuthenticated: true, 
          errorMessage: "",
          since: new Date(),
          token: action.payload.token, 
          role : action.payload.role, 
          displayName : action.payload.displayName
        };
      case actionTypes.UNAUTHENTICATED:
        return { 
          ...state, 
          isAuthenticated: false, 
          errorMessage: "",
          token: "",
          role: "",
          displayName : ""
        };
      case actionTypes.AUTHENTICATION_ERROR:
        return { 
          ...state, 
          errorMessage: action.payload
        };
        case actionTypes.ENTERED:
          return {
            ...state,
            originalPath: action.payload
          }
      default:
        return state;
    }
  }