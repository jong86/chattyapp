[1mdiff --git a/chatty_server/server.js b/chatty_server/server.js[m
[1mindex 659c244..645cebe 100644[m
[1m--- a/chatty_server/server.js[m
[1m+++ b/chatty_server/server.js[m
[36m@@ -36,13 +36,13 @@[m [mwss.on('connection', (socket) => {[m
     [m
     switch(data.type) {[m
       case 'postMessage':[m
[31m-      data.type = 'incomingMessage';[m
[31m-      break;[m
[32m+[m[32m        data.type = 'incomingMessage';[m
[32m+[m[32m        break;[m
       case 'postNotification':[m
[31m-      data.type = 'incomingNotification';[m
[31m-      break;[m
[32m+[m[32m        data.type = 'incomingNotification';[m
[32m+[m[32m        break;[m
       default:[m
[31m-      console.error("Unknown event type:", data.type);[m
[32m+[m[32m        console.error("Unknown event type:", data.type);[m
     }[m
     [m
     broadcast(JSON.stringify(data));[m
[1mdiff --git a/src/Message.jsx b/src/Message.jsx[m
[1mindex f808e2b..434611c 100644[m
[1m--- a/src/Message.jsx[m
[1m+++ b/src/Message.jsx[m
[36m@@ -1,10 +1,12 @@[m
 import React, {Component} from 'react';[m
[32m+[m[32mimport randomColor from './helpers.js';[m
 [m
 class Message extends Component {[m
   render() {[m
[32m+[m[32m    const color = randomColor();[m
     return ([m
       <div className="message">[m
[31m-        <span className="message-username">[m
[32m+[m[32m        <span className="message-username" style='color: {color};'>[m
           { this.props.username }[m
         </span>[m
         <span className="message-content">[m
