import { combineReducers } from 'redux';
import currentUser from './currentUser';

const rootReducer = combineReducers({ currentUser: currentUser });

export default rootReducer;
