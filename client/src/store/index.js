import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store ({
    strict: true,
    
    state: {
       form: {jahr: 2020},
       calculateResults: {extraEinnahmen: {}, wartungsvertraege: {}, personal: {}},
       kalkulierteKosten: {kalkulierteKosten: {}},
       login: {password: ''}
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
        }, 
        updatePersonal (state, value) {
            state.calculateResults.personal = value
        },
        updateKalkulierteKosten (state, value) {
            state.kalkulierteKosten.kalkulierteKosten = value
        },
        updatePassword (state, value) {
            localStorage.setItem('password', value)
            if (value === 'rennrad') {
                state.login.password = value
            }
        },
        initialiseStore(state) {
            if (localStorage.getItem('password')) {
              state.login.password = 'rennrad'
            }
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
        },
        updatePersonal (context, value) {
            context.commit('updatePersonal', value)
        },
        updateKalkulierteKosten (context, value) {
            context.commit('updateKalkulierteKosten', value)
        },
        updatePassword (context, value) {
            context.commit('updatePassword', value)
        }
    },
    getters: {
        jahr: (state) => state.form.jahr,
        extraEinnahmen: (state) => state.calculateResults.extraEinnahmen,
        wartungsvertraege: (state) => state.calculateResults.wartungsvertraege,
        personal: (state) => state.calculateResults.personal,
        kalkulierteKosten: (state) => state.kalkulierteKosten.kalkulierteKosten,
        password: (state) => state.login.password
    },
    modules: {}

})