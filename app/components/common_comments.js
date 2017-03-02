import React from 'react';
import {Row, Col} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal,
	Card,
	notification
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router'
class CommonComments extends React.Component{
  constructor(){
     super();
     this.state={
       comments:''
     }
  };
  componentDidMount(){
    var myFetchOptions = {
    method: 'GET'
  };

  fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
  .then(response => response.json())
  .then(json => {
     let reverseJson = (json.reverse()).slice(0,10);  //查找前10条
    this.setState({comments: reverseJson});
  });
  };
  handleSubmit(e) {
  e.preventDefault();
  var myFetchOptions = {
    method: 'GET'
  };
  let formData = this.props.form.getFieldsValue();
  fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formData.remark, myFetchOptions)
  .then(response => response.json())
  .then(json => {
    this.componentDidMount();
  })

};
addUserCollection() {
  var myFetchOptions = {
    method: 'GET'
  };
  fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions).
  then(response => response.json()).
  then(json => {
    //收藏成功以后进行一下全局的提醒
    notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
  });
};
     render(){
       	let {getFieldDecorator} = this.props.form;
        const {comments} = this.state;
        const commnetList = comments.length? comments.map((comment, index) => (
      <Card key={index} title={comment.UserName} extra={< a href = "#" > 发布于 {comment.datetime} < /a>}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    : '没有加载到任何评论';
         return(
           <div className="comment">
             <Col span={24}>
               {commnetList}
               <Form onSubmit ={this.handleSubmit.bind(this)}>
							<FormItem label="您的评论">
                {getFieldDecorator('remark', {
           rules: [{ required: true, message: '你倒是写啊大哥' }],
         })(<Input type="textarea" placeholder="写啊你倒是" rows={8} />)}
							</FormItem>
							<Button type="primary" htmlType="submit">提交评论</Button>
							&nbsp;&nbsp;

    							<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
						</Form>
             </Col>
           </div>
         )
     }
};
export default CommonComments = Form.create({})(CommonComments);
