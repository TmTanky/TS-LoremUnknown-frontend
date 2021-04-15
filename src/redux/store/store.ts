import { createStore, StoreEnhancer,  } from 'redux'

// Root Reducer
import { rootReducer } from '../reducers/rootReducer'



type WindowWithDevTools = Window & {
    __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>
   }
   
   const isReduxDevtoolsExtenstionExist = 
   (arg: Window | WindowWithDevTools): 
     arg is WindowWithDevTools  => {
       return  '__REDUX_DEVTOOLS_EXTENSION__' in arg;
   }
   
   
   export const store = createStore(rootReducer, 
     isReduxDevtoolsExtenstionExist(window) ? 
     window.__REDUX_DEVTOOLS_EXTENSION__() : undefined)