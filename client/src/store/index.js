import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store ({
    strict: true,
    
    state: {
       form: {jahr: null},
       calculateResults: {extraEinnahmen: {}, terraSchueler: {}, terraWeb: {}, sonstige: {}}
    },
    mutations: {
        updateJahr (state, value) {
            state.form.jahr = value
        }, 
        updateExtraEinnahmen (state, value) {
            state.calculateResults.extraEinnahmen = value
        }
    },
    actions: {
        updateJahr (context, jahr) {
                context.commit('updateJahr', jahr)
        },
        updateExtraEinnahmen (context, value) {
            context.commit('updateExtraEinnahmen', value)
        }
    },
    getters: {
        jahr: (state) => state.form.jahr,
        extraEinnahmen: (state) => state.calculateResults.extraEinnahmen
    },
    modules: {}

})