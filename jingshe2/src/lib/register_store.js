import Vuex from 'vuex'

function createStore() {
    return new Vuex.Store({
    state: {
        head:{
            flag_num:1,
            style_li_1:{"background":"green"},
            style_li_2:{"background":"#B4A490"},
            style_li_3:{"background":"#B4A490"},
            style_li_4:{"background":"#B4A490"},
            style_li_5:{"background":"#B4A490"}
        },
        show_info:{
            "show":true
        },
        show_activation:{
            "show":false
        },
        show_photo:{
            "show":false
        },
        show_age_gender:{
            "show":false
        },
        show_person_hobby:{
            "show":false
        },

    },
    mutations: {
        step_ok:function (state, payload) {
            state.head.flag_num += payload;
            if (state.head.flag_num === 2){
                return state.head.style_li_2 = {"backgroundColor":"green"};
            }
            else if(state.head.flag_num === 3){
                return state.head.style_li_3 = {"backgroundColor":"green"};
            }
            else if(state.head.flag_num === 4){
                return state.head.style_li_4 = {"backgroundColor":"green"};
            }
            else if(state.head.flag_num === 5){
                return state.head.style_li_5 = {"backgroundColor":"green"};
            }

        }
    },
    getters: {},
    actions: {}
    });
}

export default createStore;