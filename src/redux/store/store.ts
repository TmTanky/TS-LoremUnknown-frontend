import { compose, createStore } from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Root Reducer
import { rootReducer } from '../reducers/rootReducer'

const persistConfig = {
  key: 'root',
  storage
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)

declare global {
  interface Window {
     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
    
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(persistedReducer, composeEnhancers())
export const persistor = persistStore(store as any)