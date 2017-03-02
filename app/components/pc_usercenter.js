import React from 'react';
import 'antd/dist/antd.css';
import PCHeader from './pc_header.js';
import PCFooter from './pc_footer.js';
import {Router, Route, Link, browserHistory} from 'react-router';
import {
    Row,
    Col,
    Upload,
    Menu,
    Icon,
    Tabs,
    Card,
    message,
    Form,
    Input,
    Button,
    Modal,
    Checkbox
} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
export default class PCUserCenter extends React.Component{
  constructor(){
      super();
      this.state={
        usercollection: '',
       usercomments: '',
       previewImage: '',
       previewVisible: false
      }
  };

  componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
		});

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
		});

	};

  render(){
    const prop = {
    action: '/upload.do',
    listType: 'picture',
    defaultFileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }, {
      uid: -2,
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };
  	const {usercollection,usercomments} = this.state;
  const usercollectionList = usercollection.length ?
		usercollection.map((uc,index)=>(
				<Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
					<p>{uc.Title}</p>
				</Card>
		))
		:
		'您还没有收藏任何的新闻，快去收藏一些新闻吧。';

    const usercommentsList = usercomments.length ?
    		usercomments.map((comment,index)=>(
    				<Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
    					<p>{comment.Comments}</p>
    				</Card>
    		))
    		:
    		'您还没有发表过任何评论。';

     return(
       <div>
         <PCHeader></PCHeader>
         <Col span={2}></Col>
         <Col span={20}>
           <Tabs type="card" className="card_top">
             <TabPane tab="我的收藏列表" key="1">
               <div class="comment">
                 <Row>
                   <Col span={24}>
                     {usercollectionList}
                   </Col>
                 </Row>
               </div>
             </TabPane>
                <TabPane tab="我的评论列表" key="2">
                  <div class="comment">
              <Row>
                <Col span={24}>
                  {usercommentsList}
                </Col>
              </Row>
            </div>
                </TabPane>

                   <TabPane tab="我的头像设置" key="3">
                     <div className="card_top">
       <Upload {...prop}>
         <Button>
           <Icon type="upload" /> upload
         </Button>
       </Upload>
       <br />
       <br />
       
     </div>
            </TabPane>
           </Tabs>
         </Col>
         <Col span={2}></Col>

       </div>


     )
  }
}
