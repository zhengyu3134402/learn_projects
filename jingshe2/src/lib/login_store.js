import Vuex from 'vuex'

function createStore() {
    return new Vuex.Store({
    state: {
        name: "login",
    },
    mutations: {},
    getters: {},
    actions: {}
    });
}

export default createStore;