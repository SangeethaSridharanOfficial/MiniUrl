import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import {initDatas} from './middlewares/initDatas';
import MiniUrl from './components/MiniUrl';
import urlStore from './reducers/urlStore';
import './styles/main.scss';

const sagaMiddleware = createSagaMiddleware(),
store = createStore(urlStore, composeWithDevTools(applyMiddleware(sagaMiddleware)));

// sagaMiddleware.run(initDatas);

ReactDOM.render(
  <Provider store={store}>
        <MiniUrl />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
