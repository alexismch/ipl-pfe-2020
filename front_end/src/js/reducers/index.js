import { combineReducers } from 'redux';
import authReducer from './auth';
import prefsReducer from "./prefs";
import indicatorsReducer from './indicators';
import selectedPointsReducer from "./selectedPoint";
import widgetReducer from "./widgets";
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
    auth: authReducer,
    userprefs: prefsReducer,
    indicators: indicatorsReducer,
    selectedPoints: selectedPointsReducer,
    widgets: widgetReducer,
    toastr: toastrReducer
});

export default rootReducer