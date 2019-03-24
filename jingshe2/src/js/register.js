import "../css/register.less"
import Vue from 'vue'
import Vuex from 'vuex'

import createStore from '../lib/register_store'

Vue.use(Vuex);
const myStore = createStore();




let Head = {
    template:`
        <div>
            <div class="head">
                <ul>
                    <li>1.填写信息</li>
                    <li>2.激活</li>
                    <li>3.上传头像</li>
                    <li>4.生日、性别</li>
                    <li>5.选择、设置个人偏好</li>
                </ul>
            </div>
        </div>
    `
};



let Body_info = {
  template:`
    <div>
        <ul>
            <li>
                <span>用户名</span><input type="text">
            </li>
            <li>
                <span>密码</span><input type="password">
            </li>
            <li>
                <span>确认密码</span><input type="password">
            </li>
            <li>
                <span>邮箱</span><input type="text">
            </li>
        </ul>
    </div>
  `
};


let Body_activation = {
    template:`
        <div>
            <ul>
                <li>
                    验证码图片
                </li>
                <li>
                    <span>请填写验证码：</span>
                    <input type="text">
                </li>
            </ul>
        </div>
    `
};


let Body_photo = {
  template:`
        <div>
            <ul>
                <li>
                    <h4>请上传您的头像</h4>
                    <input type="file">
                </li>
            </ul>
            
        </div>
  `
};

let Body_age_gender = {
    template:`
        <div>
            <ul>
                <li>
                    <span>请选择您的性别</span>
                    <input type="radio" name="gender">男
                    <input type="radio" name="gender">女
                    <input type="radio" name="gender">保密
                </li>
            </ul>
        </div>
    `
};

let Body_person_hobby = {
    template:`
        <div>
            <ul>
                <li>选择设置个人偏好</li>
            </ul>
        </div>
    `
};


let Body = {
    template:`
        <div class="body">  
            <form action="">
                <body_info></body_info>
                <body_activation></body_activation>
                <body_photo></body_photo>
                <body_age_gender></body_age_gender>
                <body_person_hobby></body_person_hobby>
                <input type="button" value="下一步">
            </form>
        </div>  
    `,
    components:{
        'body_info':Body_info,
        'body_activation':Body_activation,
        'body_photo':Body_photo,
        'body_age_gender':Body_age_gender,
        'body_person_hobby':Body_person_hobby
    }
};


let App = {
    template: `
        <div>
            <h1 class="head">欢迎来到注册页面</h1>
            <div class="main">
                <my-head></my-head>
                <my-body></my-body>
            </div>
        </div>
          `,
    computed: {
    },
    components:{
        "my-head":Head,
        "my-body":Body
    }
};

new Vue({
    el: "#app",
    store: myStore,
    template: `<app></app>`,
    components: {
        'app': App,
    },
});
