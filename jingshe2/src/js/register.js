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
                    <li v-bind:style="style_li_1">1.填写信息</li>
                    <li v-bind:style="style_li_2">2.激活</li>
                    <li v-bind:style="style_li_3">3.上传头像</li>
                    <li v-bind:style="style_li_4">4.生日、性别</li>
                    <li v-bind:style="style_li_5">5.选择、设置个人偏好</li>
                </ul>
                
            </div>
        </div>
    `,

    computed:{
        style_li_1:function () {
            return this.$store.state.head.style_li_1
        },
        style_li_2:function () {
            return this.$store.state.head.style_li_2
        },
        style_li_3:function () {
            return this.$store.state.head.style_li_3
        },
        style_li_4:function () {
            return this.$store.state.head.style_li_4
        },
        style_li_5:function () {
            return this.$store.state.head.style_li_5
        },

    }
};



let Body_info = {
  template:`
    <div>
        <ul>
            <li class="clearfloat">
                <span>用户名</span><input type="text">
            </li>
            <li class="clearfloat">
                <span>密码</span><input type="password">
            </li>
            <li class="clearfloat">
                <span>确认密码</span><input type="password">
            </li>
            <li class="clearfloat">
                <span>邮箱</span><input type="text">
            </li>
        </ul>
    </div>
  `,

};


let Body_activation = {
    template:`
        <div>
            <ul>
                <li>
                    <img src="" alt="11">
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
                    <span>请选择您的性别</span><br>
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
        <div >  
            <form action="">
                <body_info class="body_info" v-if="show_info"></body_info>
                <body_activation class="body_activation" v-if="show_activation"></body_activation>
                <body_photo class="body_photo" v-if="show_photo"></body_photo>
                <body_age_gender class="body_age_gender" v-if="show_age_gender"></body_age_gender>
                <body_person_hobby class="body_person_hobby" v-if="show_person_hobby"></body_person_hobby>
                <input type="button" value="下一步" v-on:click="next">
            </form>
        </div>  
    `,
    components:{
        'body_info':Body_info,
        'body_activation':Body_activation,
        'body_photo':Body_photo,
        'body_age_gender':Body_age_gender,
        'body_person_hobby':Body_person_hobby
    },
    methods:{
        next:function () {
            return this.$store.commit('step_ok', 1)
        }
    },

    computed: {
        show_info:function () {
            return this.$store.state.show_info.show
        },
        show_activation:function () {
            return this.$store.state.show_activation.show
        },
        show_photo:function () {
            return this.$store.state.show_photo.show
        },
        show_age_gender:function () {
            return this.$store.state.show_age_gender.show
        },
        show_person_hobby:function () {

            return this.$store.state.show_person_hobby.show
        },





    }
};


let App = {
    template: `
        <div>
            <h1 class="welcome">欢迎来到注册页面</h1>
            <div class="main ">
                <my-head class="my_head" ref="m"></my-head>
                <my-body class="my-body"></my-body>
                
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
