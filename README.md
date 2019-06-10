Chatty App
=====================

Single page app built with ReactJS. This app communicates with a server using WebSockets for multi-user real-time updates.

### Getting Started

* Install dependencies in the root directory as well as the chatty_server directory using the npm install command.
* Start the WebSockets server in the chatty_server directory using the ```npm start``` command.
* Start the app server in the root directory using the ```npm start``` command.
* Go to http://localhost:3000/ in your browser.

![image](https://github.com/jgrimshaw/Chatty-App/blob/master/docs/Screen%20Shot%202019-06-09%20at%205.34.37%20PM.png?raw=true)

### Dependencies

#### Client
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0"
* css-loader
* eslint
* eslint-plugin-react
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server
* react
* react-dom
* prop-types

#### Server
* uuid
* express
* ws