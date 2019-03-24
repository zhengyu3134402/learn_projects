import Vuex from 'vuex'

function createStore() {
    return new Vuex.Store({
    state: {
        name: "personal_page",
    },
    mutations: {},
    getters: {},
    actions: {}
    });
}

export default createStore;