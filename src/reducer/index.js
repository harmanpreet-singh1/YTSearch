/**
 * Main file for reducers. Created this file just for maintaining scalibility of the application.
 * No matter how much big application is, we can create new reducers and add in the combineReducers function
 * for accessing all the properties from one common reducer.
 */
import { combineReducers } from 'redux';
import YTSearchReducer, {
  types as YTSearchTypes,
  selectors as YTSearchSelectors,
  actions as YTSearchActions
} from './youtube_reducer';

const rootReducer = combineReducers({
  YTSearchReducer
});

export default rootReducer;
export { 
  YTSearchSelectors, 
  YTSearchActions, 
  YTSearchTypes 
};
