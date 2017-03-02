//注册登陆模块
import React from 'react';
import 'antd/dist/antd.css';
import {Router, Route, Link, browserHistory} from 'react-router'
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
class MobileHeader extends React.Component {
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
    } //构造函数初始化
    componentWillMount(){
      //在完成首次渲染之前调用，此时仍可以修改组件的state。 REACT生命周期
      if(localStorage.userid!=''){
        this.setState({
          hasLogined:true
        })

        let at  = localStorage.userNickName.slice(0,3);
          this.setState({userNickName:at,userid:localStorage.userid});
      }
    }
    setModal2Visible(value) {
        this.setState({modalVisible: value});
    };
    handleClick(e) {
        if (e.key == 'register') {
            this.setState({current: 'register'});
            this.setModal2Visible(true);
        } else {
            this.setState({current: e.key});
        }
    };
    login() {
        this.setModal2Visible(true);
    };
    callback(key) {
        if (key == 1) {
            this.setState({action: 'login'})
        } else if (key == 2) {
            this.setState({action: 'register'})
        }
    };
    handleSubmit(e) {
        //向api提交data
        e.preventDefault();
        let myFetchoptions = {
            method: 'GET'
        };
        let formData = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchoptions).
        then(response => response.json()).
        then(json => {
            this.setState({userNickName: json.NickUserName, userid: json.UserId});
            localStorage.userNickName = json.NickUserName;
            localStorage.userid = json.UserId;
        });
        if (this.state.action == "login") {
            this.setState({hasLogined: true})
        };
        message.success('请求成功');
        this.setModal2Visible(false);
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined
            ? <Link to={`/user`}><span className="userNameIcon">{this.state.userNickName}</span><Icon type="user"/></Link>
            : <Icon type="setting" className="settingIcon" onClick={this.login.bind(this)}/>
        return (
            <div id="mobileheader">
                <header>
                    <a href='/'>
                        <img src='./app/images/news_1.png' alt='logo'/>
                        <span>ReactNews</span>
                    </a>

                    <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onOk={() => this.setModal2Visible(false)} onCancel={() => this.setModal2Visible(false)} okText="关闭">
                        <Tabs defaultActiveKey="1" type="card" onChange={this.callback.bind(this)}>
                            <TabPane tab="注册" key="2">
                                <Form onSubmit={this.handleSubmit.bind(this)} horizontal>
                                    <FormItem ladel="账户">
                                        {getFieldDecorator('r_userName', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your username!'
                                                }
                                            ]
                                        })(
                                            <Input addonBefore={< Icon type = "user" />} placeholder="请输入你的账户"/>
                                        )}
                                    </FormItem>
                                    <FormItem ladel="密码">
                                        {getFieldDecorator('r_password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your Password!'
                                                }
                                            ]
                                        })(
                                            <Input type="password" addonBefore={< Icon type = "user" />} placeholder="请输入你的密码"/>
                                        )}

                                    </FormItem>
                                    <FormItem ladel="确认密码">
                                        {getFieldDecorator('r_confirmPassword', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your Password!'
                                                }
                                            ]
                                        })(
                                            <Input type="password" addonBefore={< Icon type = "user" />} placeholder="请再次输入密码"/>
                                        )}
                                    </FormItem>
                                    <Button htmlType="submit" type="primary">注册</Button>
                                </Form>
                            </TabPane>
                            <TabPane tab="登录" key="1">
                                <Form onSubmit={this.handleSubmit.bind(this)} horizontal>
                                    <FormItem ladel="账户">
                                        {getFieldDecorator('userName', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your username!'
                                                }
                                            ]
                                        })(
                                            <Input addonBefore={< Icon type = "user" />} placeholder="请输入你的账户"/>
                                        )}
                                    </FormItem>
                                    <FormItem ladel="密码">
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your Password!'
                                                }
                                            ]
                                        })(
                                            <Input type="password" addonBefore={< Icon type = "user" />} placeholder="请输入你的密码"/>
                                        )}
                                    </FormItem>
                                    <Button htmlType="submit" type="primary">登录</Button>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Modal>
                    {userShow}
                </header>
            </div>
        )
    }
}
export default MobileHeader = Form.create({})(MobileHeader);
