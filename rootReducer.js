import {combineReducers} from 'redux';

import plantReducer from './plants.reducer';

const rootReducer = combineReducers({
  plants: plantReducer
});

export default rootReducer;