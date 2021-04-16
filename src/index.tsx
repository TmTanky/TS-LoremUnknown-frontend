import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'fontsource-roboto';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store/store'


// CSS
import './index.css'

ReactDOM.render(
  <>
    <PersistGate persistor={persistor} >
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </>,
  document.getElementById('root')
);
