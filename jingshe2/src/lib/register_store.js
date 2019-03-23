import Vuex from 'vuex'

function createStore() {
    return new Vuex.Store({
    state: {
        name: "register",
    },
    mutations: {},
    getters: {},
    actions: {}
    });
}

export default createStore;