import {combineReducers} from 'redux';

import plantReducer from '../reducers/plants.reducer';

const rootReducer = combineReducers({
  plants: plantReducer
});

export default rootReducer;