//注册登陆模块
import React from 'react';
import 'antd/dist/antd.css';
import {Router, Route, Link, History,browserHistory} from 'react-router'
import {
    Row,
    Col,
    Menu,
    Icon,
    Tabs,
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
class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
        };
    }; //构造函数初始化
    componentWillMount(){
      //在完成首次渲染之前调用，此时仍可以修改组件的state。 REACT生命周期
      if(localStorage.userid!=''){
        this.setState({
          hasLogined:true
        })
          this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
      }
    }
 setModal2Visible(value){
    this.setState({modalVisible:value});
 };
 handleClick(e){
     if(e.key == 'register'){
        this.setState({current:'register'});
        this.setModal2Visible(true);
    }else{
        this.setState({current:e.key});
    }
 };
 callback(key){
     if(key ==1){
       this.setState({
         action:'login'
       })
     }
       else if(key ==2) {
         this.setState({
           action:'register'
         })
       }
     };
     loginOut(e){
       e.preventDefault();
       localStorage.userNickName = '';
       localStorage.userid = '';
       this.setState({hasLogined:false})
        window.location.hash = '#'
     };
 handleSubmit(e){
    //向api提交data
    e.preventDefault();
    let myFetchoptions = {
         method:'GET'
    };
    let formData = this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+ formData.userName +"&password="
    +formData.password+"&r_userName=" + formData.r_userName + "&r_password="
  + formData.r_password + "&r_confirmPassword="
  + formData.r_confirmPassword, myFetchoptions).then(response =>response.json()).
    then(json=>{
    this.setState({userNickName:json.NickUserName,userid:json.UserId});
    localStorage.userNickName = json.NickUserName;
    localStorage.userid = json.UserId;
    });
    if(this.state.action =="login"){
      this.setState({hasLogined:true})
    };
  message.success('请求成功');
  this.setModal2Visible(false);
 }

    render() {
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined
            ? <Menu.Item key="logout" className="register">
                    <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                    &nbsp;&nbsp;<Link target="_blank" to={`/user`}>
                        <Button type="dashed" htmlType="button">个人中心</Button>
                    </Link>
                    &nbsp;&nbsp;

                    <Button type="ghost" htmlType="button" onClick={this.loginOut.bind(this)}>退出</Button>
                </Menu.Item>
            : <Menu.Item key="register" className="register">
                <Icon type="logout"/>注册／登录
            </Menu.Item> //state.hasLogined判断是否登录
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href='/' className='logo'>
                            <img src='./app/images/news_1.png' alt='logo'/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]}
                          onClick={this.handleClick.bind(this)}>
                            <Menu.Item key="top"><Icon type="appstore"/>头条</Menu.Item>
                            <Menu.Item key="shehui"><Icon type="appstore"/>社会</Menu.Item>
                            <Menu.Item key="guonei"><Icon type="appstore"/>国内</Menu.Item>
                            <Menu.Item key="guoji"><Icon type="appstore"/>国际</Menu.Item>
                            <Menu.Item key="yule"><Icon type="appstore"/>娱乐</Menu.Item>
                            <Menu.Item key="tiyu"><Icon type="appstore"/>体育</Menu.Item>
                            <Menu.Item key="shishang"><Icon type="appstore"/>时尚</Menu.Item>
                            <Menu.Item key="keji"><Icon type="appstore"/>科技</Menu.Item>
                            {userShow}
                        </Menu>
                        <Modal title="用户中心" wrapClassName="vertical-center-modal"
                          visible={this.state.modalVisible}
                          onOk={() => this.setModal2Visible(false)}
                           onCancel={() => this.setModal2Visible(false)} okText="关闭">
                            <Tabs defaultActiveKey="1" type="card" onChange={this.callback.bind(this)}>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit.bind(this)} horizontal>
                                        <FormItem ladel="账户">
                                          {getFieldDecorator('r_userName',
                                            {rules: [{ required: true, message: 'Please input your username!' }],})
                                            (<Input addonBefore={<Icon type="user" />} placeholder="请输入你的账户" />)}
                                        </FormItem>
                                        <FormItem ladel="密码">
                                          {getFieldDecorator('r_password',
                                            {rules: [{ required: true, message: 'Please input your Password!' }],})
                                            (<Input type="password" addonBefore={<Icon type="user" />} placeholder="请输入你的密码" />)}

                                        </FormItem>
                                        <FormItem ladel="确认密码">
                                          {getFieldDecorator('r_confirmPassword',
                                            {rules: [{ required: true, message: 'Please input your Password!' }],})
                                            (<Input type="password" addonBefore={<Icon type="user" />} placeholder="请再次输入密码" />)}
                                        </FormItem>
                                        <Button htmlType="submit" type="primary">注册</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="登录" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this)} horizontal>
                                        <FormItem ladel="账户">
                                          {getFieldDecorator('userName',
                                            {rules: [{ required: true, message: 'Please input your username!' }],})
                                            (<Input addonBefore={<Icon type="user" />} placeholder="请输入你的账户" />)}
                                        </FormItem>
                                        <FormItem ladel="密码">
                                          {getFieldDecorator('password',
                                            {rules: [{ required: true, message: 'Please input your Password!' }],})
                                            (<Input type="password" addonBefore={<Icon type="user" />} placeholder="请输入你的密码" />)}
                                        </FormItem>
                                        <Button htmlType="submit" type="primary">登录</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}
export default PCHeader = Form.create({})(PCHeader);
