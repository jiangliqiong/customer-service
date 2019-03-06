/*import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from '../middleware/promise'

export default function(data, reducers) {
  var reducer = combineReducers(reducers);
  var finalCreateStore = applyMiddleware(promiseMiddleware)(createStore);
  var store = finalCreateStore(reducer, data);

  return store;
}
*/
