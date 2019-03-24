import Vuex from 'vuex'

function createStore() {
    return new Vuex.Store({
    state: {
        name: "base",
    },
    mutations: {},
    getters: {},
    actions: {}
    });
}

export default createStore;