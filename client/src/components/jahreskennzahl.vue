<template>
   <div>
        <li v-if="name === produkt_id"> <!-- v-if: name und produkt_id(props die mit v-bind(doppelpunkt ist shorthand) vom produkte.vue kommt) -->
        <ul class="kosten"> Personal: {{ jahreskennzahl.kosten.personal }} </ul>
        <ul class="kosten"> Gemeinkosten: {{ jahreskennzahl.kosten.gemeinkosten }} </ul>
        <ul class="kosten"> Serverkosten: {{ jahreskennzahl.kosten.serverkosten }} </ul>
        <ul class="kosten"> Nebenkosten: {{ jahreskennzahl.kosten.nebenkosten }} </ul>
        <ul class="kosten"> Vertriebskosten: {{ jahreskennzahl.kosten.vertrieb }} </ul>
        <ul class="leistungen">Wartungsverträge: {{ jahreskennzahl.leistungen.wartungsverträge }}</ul>
        <ul class="leistungen">Extra Einnahmen: {{ jahreskennzahl.leistungen.extraEinnahmen }}</ul>
        
    </li>
    </div>
</template>

<script>
import api from '../api.js'

export default {
    name: 'jahreskennzahlItem',
    data(){
        return {
            calculateResults: null
        }
    },
    props: {
        jahreskennzahl: Object,
        name: String,
        produkt_id: String
    },
    methods: {
        reload() {
            api
            .get('/calculateResults')
            .then(response => {
                (this.calculateResults = response.data)
            })
            .catch(error => console.log(error))
        }
    },
    mounted () {
        this.reload()
    }
}
</script>

<style scoped>
ul {
    padding-left: 0;
}
.kosten {
    color: red;
}
.leistungen {
    color: green;
}
</style>