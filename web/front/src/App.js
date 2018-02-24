import React, {Component} from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    "helo upp",
    document.getElementById("container")
);

if(module.hot){
    module.hot.accept(()=>{
        /*
        ReactDOM.render(
            "hello hy",
            document.getElementById('container')
        );
        */
    })
};
