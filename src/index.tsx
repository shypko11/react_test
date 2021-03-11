import React from 'react';
import ReactDOM from 'react-dom';
import Matrix from './App';
import reportWebVitals from './reportWebVitals';

let params = (globalThis as any)._customTableData;
console.log(params);
ReactDOM.hydrate(
 <Matrix data={params}/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
