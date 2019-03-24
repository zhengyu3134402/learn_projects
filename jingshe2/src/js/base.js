import "../css/base.less"
import Vue from 'vue'
import Vuex from 'vuex'
import createStore from "../lib/base_store";



Vue.use(Vuex);

const myStore = createStore();

let Base = {
    template: `
        <div>
            <slot name="body_html"></slot>
        </div>
          `,
    computed: {

    }
};

new Vue({
    el: "#app",
    store: myStore,
    template: `<app></app>`,
    components: {
        'app': Base,
    },
});

export default Base