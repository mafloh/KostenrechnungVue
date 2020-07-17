import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store ({
    strict: true,
    
    state: {
       form: {jahr: null},
       produktKeyForceReload: 0
    },
    mutations: {
        updateJahr (state, value) {
            state.form.jahr = value
        }
    },
    actions: {
        updateJahr (context, jahr) {
                context.commit('updateJahr', jahr)
        }
    },
    getters: {
        jahr: (state) => state.form.jahr
    },
    modules: {}

})