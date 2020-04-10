import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import striregUtils from "./utils/striregUtils";
import memoryUtils from "./utils/memoryUtils";

//因为一开始进入页面的时候 就要先去读取存储在内存中的用户属性 所以 要在第一次加载页面的时候就要去读取这些要存储在内存中的属性
const user =  striregUtils.getUser();
memoryUtils.user = user;
ReactDOM.render(<App />, document.getElementById('root'));

