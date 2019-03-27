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
                <span>用户名</span><input type="text" v-model="username" v-on:blur="check_username">
                <span v-if="error_username">输入用户名小于6位，请重新输入！</span>
            </li>
            <li class="clearfloat">
                <span>密码</span><input type="password" v-model="password">
            </li>
            <li class="clearfloat">
                <span>确认密码</span><input type="password" v-model="re_password" v-on:blur="check_re_password">
                <span v-if="error_password">密码输入不一致</span>
            </li>
            <li class="clearfloat" >
                <span>邮箱</span><input type="text" v-model="mail" v-on:blur="check_mail">
                <span v-if="error_mail">输入邮箱格式不正确</span>
            </li>
        </ul>
    </div>
  `,
    watch:{
      mail:function () {
          return this.$store.commit("make_mail_error_false")
      },
      username:function () {
          return this.$store.commit("make_username_error_false")
      },
      re_password:function () {
          return this.$store.commit("make_re_password_error_false")
      }
    },
    methods: {
        check_re_password: function () {
            if (this.$store.state.head.password !== this.$store.state.head.re_password) {
                return this.$store.commit('show_error_password', true)
            }else{
                return this.$store.commit('make_sure_re_password')
            }
        },
        check_username: function () {
            if (this.$store.state.head.username.length < 6) {
                return this.$store.commit('show_username_error', true)
            } else {
                return this.$store.commit('make_sure_username')
            }
        },
        check_mail: function () {
            let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (reg.test(this.$store.state.head.mail)) {
                return this.$store.commit("make_sure_mail")
            } else {
                return this.$store.commit("show_mail_error")
            }
        }
    },
        computed: {
            error_mail:function () {
                return this.$store.state.head.error_mail
            },
            error_password: function () {
                return this.$store.state.head.error_password
            },
            error_username: function () {
                return this.$store.state.head.error_username
            },
            username: {
                get() {

                    return this.$store.state.head.username
                },
                set(value) {
                    // console.log(value);
                    this.$store.commit("update_username", value)
                }
            },
            password: {
                get() {

                    return this.$store.state.head.password
                },
                set(value) {
                    // console.log(value);
                    this.$store.commit("update_password", value)
                }
            },
            re_password: {
                get() {

                    return this.$store.state.head.re_password
                },
                set(value) {
                    // console.log(value);
                    this.$store.commit("update_re_password", value)
                }
            },
            mail: {
                get() {

                    return this.$store.state.head.mail
                },
                set(value) {
                    // console.log(value);
                    this.$store.commit("update_mail", value)
                }
            }
        }

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
                <input type="button" value="上一步" v-on:click="back">
                <input type="button" value="下一步" v-on:click="next">
                <input type="submit" v-if="form_submit">
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
            if(this.$store.state.flag_num === 5){
                return this.$store.commit("make_flag_num_5", 5)
            }else {
                if (this.$store.state.head.flag_username && this.$store.state.head.flag_re_password && this.$store.state.head.flag_mail){
                    return this.$store.commit('step_ok', 1)
                }
                else{
                    return 0
                }
            }
        },
        back:function () {
            if(this.$store.state.flag_num < 2){
                return this.$store.commit("make_flag_num_1", 1)
            }else {
                return this.$store.commit("step_ok", -1)
            }
        }
    },

    computed: {
        show_info:function () {
            return this.$store.state.head.style_li_1.show
        },
        show_activation:function () {
            return this.$store.state.head.style_li_2.show
        },
        show_photo:function () {
            return this.$store.state.head.style_li_3.show
        },
        show_age_gender:function () {
            return this.$store.state.head.style_li_4.show
        },
        show_person_hobby:function () {

            return this.$store.state.head.style_li_5.show
        },
        form_submit:function () {

            return this.$store.state.head.form_submit
        }





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
