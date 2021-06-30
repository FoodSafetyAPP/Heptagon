import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import Reducer from './Reducer';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, Reducer);

const middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware));

export const store = createStore(persistedReducer, devTools);
export const persistor = persistStore(store);
