import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store';
import { Provider } from 'react-redux';

export const MyContext = React.createContext(null);

const renderEntireTree = (state) => {
  ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
      <App dispatch={store.dispatch.bind(store)} state={state} store={store}/>
    </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}

renderEntireTree(store.getState());

store.subscribe( () => {
  let state = store.getState();
  renderEntireTree(state);
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
