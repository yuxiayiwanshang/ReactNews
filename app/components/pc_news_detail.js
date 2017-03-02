import React from 'react';
import 'antd/dist/antd.css';
import {Row,Col,BackTop} from 'antd';
import PCHeader from './pc_header.js';
import CommonComments from './common_comments.js';
import PCNewsImgBlock from './pc_news_images_block.js';
export default class PCNewsDetail extends React.Component{
   constructor(){
      super();
      this.state = {
         newsItem:'',
         newsType:''
      }
   };
   componentWillMount(){
        let type =['top','shehui','guonei','guoji','yule','tiyu'];
         let num = parseInt(Math.random() *type.length)
       this.setState({
          newsType:type[num]
       })
   }
   componentDidMount(){
     //页面加载完生产
     let myFetchoptions = {
        type:'GET'
     };
     fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="
     + this.props.params.uniquekey, myFetchoptions)
           .then(response =>response.json())
            .then(json=>{
               this.setState(
                 {newsItem:json}
               );
               document.title = this.state.newsItem.title +'-- React News | 由童一倾力打造';
            })
   };
   createMarkup(){
      return {__html: this.state.newsItem.pagecontent}
   };
   render(){
     return(
         //详情页
         <div>
           <PCHeader></PCHeader>
           <Row>
             <Col span={2}></Col>
              <Col span={14} className="container">
                <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                <hr/>
                <CommonComments uniquekey={this.props.params.uniquekey}></CommonComments>
            </Col>
               <Col span={6}>
                  <PCNewsImgBlock  imageWidth="132px" count={8} type={this.state.newsType} width="100%" cartTitle="相关新闻"> </PCNewsImgBlock>

             </Col>
                <Col span={2}></Col>
           </Row>
           <BackTop></BackTop>
         </div>
     )
   }

}
