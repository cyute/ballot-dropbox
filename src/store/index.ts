import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import user from './user/reducer';
import map from './map/reducer';
import dropbox from './dropbox/reducer';

export const rootReducer = combineReducers({ user, map, dropbox });

export default createStore(rootReducer, compose(applyMiddleware(thunk), devToolsEnhancer({})));
