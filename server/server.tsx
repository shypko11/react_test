
import React from "react";
import Matrix from '../src/App';
import {renderToString} from 'react-dom/server';
// const renderToString = require("react-dom/server");
// const matrix = require("../src/App");
// import ReactDOM from 'react-dom';
// require('jsx-node/node-require').install();
const http = require('http');

 
http.createServer(function(request:any, response: any){
    const app = renderToString(<Matrix/>);
    response.end(`
    <!DOCTYPE html>
    <html lang="en">
       <head>
         <meta charset="utf-8" />
         <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <meta name="theme-color" content="#000000" />
         <meta
            name="description"
            content="Web site created using create-react-app"
         />
         <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
         <title>React App</title>
       </head>
       <body>
         <div id="root">
           ${app}
         </div>
         <div id="rot">fvfbgbgbgbg</div>
       </body>
     </html>`);
}).listen(8080);






