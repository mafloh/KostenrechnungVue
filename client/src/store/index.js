import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store ({
    strict: true,
    
    state: {
       form: {jahr: null},
       calculateResults: {extraEinnahmen: {}, wartungsvertraege: {}}
    },
    mutations: {
        updateJahr (state, value) {
            state.form.jahr = value
        }, 
        updateExtraEinnahmen (state, value) {
            state.calculateResults.extraEinnahmen = value
        }, 
        updateWartungsvertraege (state, value) {
            state.calculateResults.wartungsvertraege = value
        }
    },
    actions: {
        updateJahr (context, jahr) {
                context.commit('updateJahr', jahr)
        },
        updateExtraEinnahmen (context, value) {
            context.commit('updateExtraEinnahmen', value)
        },
        updateWartungsvertraege (context, value) {
            context.commit('updateWartungsvertraege', value)
        }
    },
    getters: {
        jahr: (state) => state.form.jahr,
        extraEinnahmen: (state) => state.calculateResults.extraEinnahmen,
        wartungsvertraege: (state) => state.calculateResults.wartungsvertraege
    },
    modules: {}

})