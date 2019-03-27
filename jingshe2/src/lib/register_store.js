import Vuex from 'vuex'
import Vue from 'vue'

function createStore() {
    return new Vuex.Store({
    state: {
        flag_num:1,
        flag_username:0,
        flag_re_password:0,
        flag_mail:0,
        head:{
            username:'',
            error_username:false,
            error_password:false,
            error_mail:false,
            password:'',
            re_password:'',
            mail:'',
            style_li_1:{"background":"white", "show":true},
            style_li_2:{"background":"#B4A490", "show": false},
            style_li_3:{"background":"#B4A490", "show": false},
            style_li_4:{"background":"#B4A490", "show":false},
            style_li_5:{"background":"#B4A490", "show":false},
            form_submit:false
        },
    },
    mutations: {
        make_sure_mail:function (state) {
            state.head.flag_mail = 1;
            return state.head.flag_mail
        },
        make_sure_re_password:function (state) {
            state.head.flag_re_password = 1;
            return state.head.flag_re_password
        },
        make_sure_username:function (state) {
            state.head.flag_username = 1;
            return state.head.flag_username
        },

        make_mail_error_false:function (state) {
            state.head.error_mail = false;
            return state.head.error_mail
        },
        show_mail_error:function (state) {
            state.head.error_mail = true;
            state.head.flag_mail = 0;
            return state.head.error_mail
        },
        update_mail:function (state, payload) {
            state.head.mail = payload;
            return state.head.mail
        },
        make_re_password_error_false:function (state) {
            state.head.error_password = false;
            return state.head.error_password
        },
        show_error_password:function (state, payload) {
            state.head.error_password = payload;
            state.head.flag_re_password = 0;
            return state.head.error_password
        },
        update_re_password:function (state, payload) {
            state.head.re_password = payload;
            return state.head.re_password
        },
        update_password:function (state, payload) {
            state.head.password = payload;
            return state.head.password
        },
        make_username_error_false:function (state) {
            state.head.error_username = false;
            return state.head.error_username
        },
        show_username_error:function (state ,payload) {
            state.head.error_username = payload;
            state.head.flag_username = 0;
            return state.head.error_username
        },
        update_username:function (state, payload) {
            state.head.username = payload;
            return state.head.username
        },
        make_flag_num_5:function (state, payload) {
            state.flag_num = payload;
            state.head.form_submit = true;
            return state.flag_num
        },
        make_flag_num_1:function (state, payload) {
            state.flag_num = payload;
            return state.flag_num
        },
        step_ok:function (state, payload) {
            state.flag_num += payload;
            if (state.flag_num === 1){
                // console.log(state.flag_num);
                state.head.style_li_2 = {"background":"#B4A490", "show":false};
                state.head.style_li_1 = {"background":"white", "show":true};
                state.head.style_li_3 = {"background":"#B4A490", "show":false};
                state.head.style_li_4 = {"background":"#B4A490", "show":false};
                state.head.style_li_5 = {"background":"#B4A490", "show":false};


                return state.head.style_li_1
            }
            else if (state.flag_num === 2){
                // console.log(state.flag_num);
                state.head.style_li_2 = {"background":"white", "show":true};
                state.head.style_li_1 = {"background":"white", "show":false};
                state.head.style_li_3 = {"background":"#B4A490", "show":false};
                state.head.style_li_4 = {"background":"#B4A490", "show":false};
                state.head.style_li_5 = {"background":"#B4A490", "show":false};


                return state.head.style_li_2
            }
            else if(state.flag_num === 3){
                // console.log(state.flag_num);
                state.head.style_li_2 = {"background":"white", "show":false};
                state.head.style_li_1 = {"background":"white", "show":false};
                state.head.style_li_3 = {"background":"white", "show":true};
                state.head.style_li_4 = {"background":"#B4A490", "show":false};
                state.head.style_li_5 = {"background":"#B4A490", "show":false};
                return state.head.style_li_3
            }
            else if(state.flag_num === 4){
                // console.log(state.flag_num);
                state.head.style_li_2 = {"background":"white", "show":false};
                state.head.style_li_1 = {"background":"white", "show":false};
                state.head.style_li_3 = {"background":"white", "show":false};
                state.head.style_li_4 = {"background":"white", "show":true};
                state.head.style_li_5 = {"background":"#B4A490", "show":false};
                return state.head.style_li_4
            }
            else if(state.flag_num === 5){
                // console.log(state.flag_num);
                state.head.style_li_2 = {"background":"white", "show":false};
                state.head.style_li_1 = {"background":"white", "show":false};
                state.head.style_li_3 = {"background":"white", "show":false};
                state.head.style_li_4 = {"background":"white", "show":false};
                state.head.style_li_5 = {"background":"white", "show":true};
                return state.head.style_li_5
            }

        }
    },
    getters: {},
    actions: {}
    });
}

export default createStore;