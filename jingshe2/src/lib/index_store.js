import Vuex from 'vuex'

function createStore() {
    return new Vuex.Store({
    state: {
        name: "index",
    },
    mutations: {},
    getters: {},
    actions: {}
    });
}

export default createStore;