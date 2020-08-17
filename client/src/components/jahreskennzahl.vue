<template>
   <div>
      
        <li v-if="this.$store.getters.extraEinnahmen.length && this.$store.getters.wartungsvertraege.length && this.$store.getters.personal.length"> <!-- <li v-if="name === produkt_id"> --> <!-- v-if: name und produkt_id(props die mit v-bind(doppelpunkt ist shorthand) vom produkte.vue kommt) -->
        <ul class="kosten"> Personal: {{ this.$store.getters.personal[0][name] }} </ul>
        <ul class="kosten"> Gemeinkosten:  </ul>
        <ul class="kosten"> Serverkosten:  </ul>
        <ul class="kosten"> Nebenkosten:  </ul>
        <ul class="kosten"> Vertriebskosten:  </ul>
        <ul class="leistungen">Wartungsverträge: {{ this.$store.getters.wartungsvertraege[0][name] }}</ul>
        <ul class="leistungen"  >Extra Einnahmen: {{ this.$store.getters.extraEinnahmen[0][name] }}</ul>
        
    </li>
        <!-- <span
        v-for="value in filterByProdukt(extraEinnahmenResults)"
        :key="value._id"
        
        
        >{{ value }}</span> -->

 
    
    </div>
</template>

<script>
//import api from '../api.js'

export default {
    name: 'jahreskennzahlItem',
    data(){
        return {
            //calculateResults: null
            //extraEinnahmenResultsProdukt: null
            loadingExtraEinnahmen: false,
        }
    },
    computed: {
        jahr: { //hier wird die jahr variable computed, damit es im axios request genutzt werden kann.
            get () {
                return this.$store.state.form.jahr
            }
        }
        
        /* ,
        extraEinnahmenResultsProdukt:  function () {
            const extra = this.extraEinnahmenResults ? this.extraEinnahmenResults.jahr : {}
            return extra
        } */
        
        /* ,
        filterByProdukt() {
            
            //let filteredObject = {}
            const produktFilter = this.name
            let extraEinnahmenResultsFiltered = this.extraEinnahmenResults
            return this.extraEinnahmenResultsFiltered//.produktFilter
            //return filteredObject
        } */
    },
    props: {
        name: String,
        calculateResults: Object
    },
    methods: {
        reload() {
          //console.log(this.calculateResults)
        }
    },
    mounted () {
        this.reload()
       // console.log(this.name)
        
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