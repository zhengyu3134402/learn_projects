import "../css/personal_page.less"
import Vue from 'vue'
import Vuex from 'vuex'
import createStore from '../lib/personal_page_store'

Vue.use(Vuex);

const myStore = createStore();

let Explain = {

    template:`
        <div>
            <ul>
                <li>系统消息,通知</li>
                <li>动态信息展示</li>
                <li>景点推荐</li>
                <li>游记推荐</li>
                <li>发布内容和搜索内容快捷入口</li>
                <li>我说</li>
            </ul>
        </div>
    `

};





let App = {
    template: `
        <div>
            <h1>欢迎来到个人首页</h1>
            <explain></explain>
        </div>
          `,
    computed: {

    },
    components:{
        'explain':Explain
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




