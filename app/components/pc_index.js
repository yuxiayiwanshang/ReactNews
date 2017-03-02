import React from 'react';
import PCHeader from './pc_header.js';
import PCFooter from './pc_footer.js';
import 'antd/dist/antd.css';
import {Row, Col} from 'antd';
import PCNewsContainer from './pc_newsContainer.js';
export default class PCIndex extends React.Component{
  render(){
     return (
         <div>
           <PCHeader></PCHeader>
           <PCNewsContainer></PCNewsContainer>
         </div>
     )
  }
}
