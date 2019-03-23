import "../css/index.less"
import Vue from 'vue'
import Vuex from 'vuex'
import createStore from '../lib/index_store'

Vue.use(Vuex);

const myStore = createStore();

let App = {
    template: `
        <div>
            {{name}}
        </div>
          `,
    computed: {
        name: function() {
            return this.$store.state.name;
            },
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




