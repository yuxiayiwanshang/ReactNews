import React from 'react';
import 'antd/dist/antd.css';
import PCNewsBlock from './pc_news_block.js';
import PCNewsImgBlock from './pc_news_images_block.js';
import {
    Row,
    Carousel,
    Col,
    Menu,
    Icon,
    Tabs,
    Button
} from 'antd';
const TabPane =Tabs.TabPane;
export default class PCNewsContainer extends React.Component{
  callback(){
     console.log("!")
  };

   render(){
     let setting = {
       dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     autoplay: true
     }; //轮播设置参数

     return(
         <div>
           <Col span={2}></Col>
           <Col span={20} className="container">
             <div className="leftContainer">
               <div className="carousel">
                 <Carousel {...setting} effect="fade">
                   <div><img src="./app/images/CEGQJHUS00AO0001.jpg"></img></div>
                   <div><img src="./app/images/CEH5PF7T00AO0001.jpg"></img></div>
                    <div><img src="./app/images/CEH7LB1500AO0001.jpg"></img></div>
                 </Carousel>
               </div>
               <PCNewsImgBlock  imageWidth="112px" count={6} type={'guoji'} width="400px" cartTitle="国际头条"></PCNewsImgBlock>


             </div>
             <Tabs className="tabs_news" defaultActiveKey="2" onChange={this.callback.bind(this)}>
               <TabPane tab="新闻" key="1">
                 <PCNewsBlock count={20} type="top" width="100%" ></PCNewsBlock>
               </TabPane>
               <TabPane tab="娱乐" key="2">
                 <PCNewsBlock count={20} type={'yule'} width="100%" ></PCNewsBlock>
               </TabPane>
             </Tabs>
             <div>
                 <PCNewsImgBlock  imageWidth="132px" count={8} type={'yule'} width="100%" cartTitle="娱乐消息"> </PCNewsImgBlock>
                 <PCNewsImgBlock  imageWidth="132px" count={16} type={'keji'} width="100%" cartTitle="科技消息"> </PCNewsImgBlock>
             </div>
           </Col>
           <Col span={2}></Col>
         </div>
     )
   }
}
