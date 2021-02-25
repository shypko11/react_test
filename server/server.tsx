
import React from "react";
import Matrix from '../src/App';
import {renderToString} from 'react-dom/server';
const http = require('http');
const qs = require('qs');
 
http.createServer(function(request:any, response: any){
    let rowsData;
    let urlParams;
    let globalParams;
    if(request.url.indexOf("closest=") !== -1 ){
      urlParams = convert(request.url);
      rowsData = generateTable(urlParams.x, urlParams.y);
      if(urlParams && rowsData){
        globalParams = {
          x: urlParams.x,
          y: urlParams.y,
          closest: urlParams.closest,
          tableData : rowsData,
        }
      }
    }
    if(!globalParams){
      globalParams = {
        x: 0,
        y: 0,
        closest: 0,
        tableData : undefined
      }
    } 
    const app = renderToString(<Matrix data={globalParams}/>);
    response.end(`
    <!DOCTYPE html>
    <html lang="en">
       <head>
         <meta charset="utf-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <meta name="theme-color" content="#000000" />
         <meta name="description" content="Web site created using create-react-app"/>
         <script>  globalThis._customTableData = ${JSON.stringify(globalParams)} </script>
         <style>
         body {
          background-image: url(../src/img/React-icon.png);
          background-position-x: center;
          background-repeat: no-repeat;
          background-position-y: inherit;
        }
        
        #table_container {
          display: flex;
          justify-content: center;
          font-family: Arial, Helvetica, sans-serif;
        }
        
        #form_wrap {
          background-color: rgb(97 219 251);
          padding: 40px;
          border-radius: 10px;
          width: 260px;
        }
        
        label {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        
        label span {
          padding: 5px 0;
          font-size: 20px;
          color: #424275;
          font-weight: bold;
          font-family: Arial;
        }
        
        .button {
          display: block;
          width: 100%;
          height: 30px;
          border: none;
          margin-bottom: 10px;
          background-color: rgb(66 66 117);
          color: white;
          border-radius: 5px;
          font-size: 18px;
          font-weight: bold;
        }
        
        .button:hover {
          background-color: rgb(87 87 144);
        }
        
        .button:focus,
        form input {
          outline: none;
          border: none;
        }
        
        .button:active {
          background-color: #6a6ab8;
        }
        
        form {
          width: 100%;
        }
        
        form label {
          padding: 0 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        
        form input {
          margin-bottom: 10px;
          border-radius: 5px;
          height: 20px;
          border: none;
          width: 100%;
        }
        
        table {
          margin-top: 30px;
          border-collapse: collapse;
          position: relative;
        }
        
        table th {
          height: 30px;
          border: 1px solid black;
          width: 50px;
          background-color: white;
        }
        
        div {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }
        
        .light {
          background-color: yellowgreen;
        }
        
        .base {
          background-color: rgb(247 255 140);
        }
        
        .base:hover,
        .light:hover,
        .light:hover {
          background-color: green;
        }
        
        th {
          position: relative;
        }
        
        th .percent {
          position: absolute;
          width: 100%;
          background-color: blue;
          bottom: 0;
          left: 0;
          opacity: 50%;
          z-index: 0;
        }
        
        th .value {
          z-index: 2;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 8px;
          left: 0;
        }
         </style>
         <title>React App</title>
       </head>
       <body>
         <div id="root">${app}</div>
         <script src="http://localhost:3000/static/js/bundle.js"></script>
         <script src="http://localhost:3000/static/js/vendors~main.chunk.js"></script>
         <script src="http://localhost:3000//static/js/main.chunk.js"></script>
       </body>
     </html>`);
}).listen(8080);

function convert (url: string){
  let newStrArr = url.slice(2);
  let result = qs.parse(newStrArr);
  return result;
}

function generateTable(x: number, y: number){
    if(!x && !y){
      return;
    }
    let localRows = [];
    let counter = 0;
      for (let i = 0; i < x; i++) {
        let sum = 0;
        let column = [];
        for (let j = 0; j < y; j++) {
          let value = randomNumber(999, 100);
          column[j] = {
            id: counter++,
            amount: value,
            lighted: false,
            percent: "",
            showPercent: false
          };
          sum += value;
        }
        for(let k = 0; k < column.length; k++){
          let perc: number = (column[k].amount / sum) * 100;
          let percentValue: string = Math.round(perc) + "%";
          column[k] = {
            ...column[k],
            percent: percentValue
          }
        }
        localRows.push(column);
      }
      return localRows;
}

function randomNumber(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}