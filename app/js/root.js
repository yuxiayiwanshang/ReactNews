import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import MobileNewsDetails from '../components/mobile_news_details.js';
import MediaQuery from 'react-responsive';  //响应式开发 media
import  'antd/dist/antd.css';
import PCIndex  from '../components/pc_index.js';
import PCNewsDetail  from '../components/pc_news_detail.js';
import MobileIndex  from '../components/mobile_index.js';
import MobileUserCenter  from '../components/mobile_usercenter.js';
import PCUserCenter from '../components/pc_usercenter.js';
let app = document.getElementById('app');
export default class Root extends React.Component{
  render(){
     return (
       <div>
         <MediaQuery query='(min-device-width: 1224px)'>
              <Router  history ={hashHistory}>
              <Route path="/" component={PCIndex}></Route>
              <Route path="details/:uniquekey" component={PCNewsDetail}></Route>
                <Route path="/user" component={PCUserCenter}></Route>
           </Router>

         </MediaQuery>
         <MediaQuery query='(max-device-width: 1224px)'>
           <Router  history ={hashHistory}>
           <Route path="/" component={MobileIndex}></Route>
           <Route path="details/:uniquekey" component={MobileNewsDetails}></Route>
             <Route path="/user" component={MobileUserCenter}></Route>
           </Router>
         </MediaQuery>
       </div>
     )
  }
}
ReactDOM.render(<Root/>, app);
