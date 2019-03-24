import "../css/login.less"
import Vue from 'vue'
import Vuex from 'vuex'
// import createStore from '../lib/login_store'
import Base from './base'
Vue.use(Vuex);

// const myStore = createStore();



let Login = {
    template:`
        <div>
            <ul>
                <li>
                    <span>用户名</span>
                    <input type="text">
                </li>
                <li>
                    <span>密码</span>
                    <input type="password">
                </li>
                <li>
                    <input type="checkbox">
                    <span>自动登录</span>
                    
                    <input type="checkbox">
                    <span>记住密码</span>
                </li>
                <li>
                    <input type="submit" value="登录">
                    <input type="button" value="注册">
                </li>
            </ul>
        </div>
    `
};









