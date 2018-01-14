import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import counter from './counter'
import prescriptions from './prescriptions';
import doctors from './doctors';
import patients from './patients';
import pharmacies from './pharmacies';

export default combineReducers({
  router: routerReducer,
  prescriptions,
  doctors,
  patients,
  pharmacies,
})
