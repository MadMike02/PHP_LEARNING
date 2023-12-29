import _ from 'lodash';
import './style.css';
import Icon from './facebook.svg';
import Data from './data.xml';
import Notes from './data.csv';

import yaml from './data.yaml';

import printMe from './print.js';

function component() {
    const element = document.createElement('div');
  
     // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

     // Add the image to our existing div.
    // const myIcon = new Image();
    // myIcon.src = Icon;

    // element.appendChild(myIcon);

    // //data files
    // console.log(Data);
    // console.log(Notes);
    // console.log(yaml);

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
  
    element.appendChild(btn);
  
    return element;
  }
  
  document.body.appendChild(component());