<template>
  <div>
    <li
      v-if="this.$store.getters.extraEinnahmen.length && this.$store.getters.wartungsvertraege.length && this.$store.getters.personal.length && this.$store.getters.kalkulierteKosten.length"
    >
      <!-- <li v-if="name === produkt_id"> -->
      <!-- v-if: name und produkt_id(props die mit v-bind(doppelpunkt ist shorthand) vom produkte.vue kommt) -->
      <ul class="leistungen">Wartungsverträge: {{ formatNumber(this.$store.getters.wartungsvertraege[0][name]) }}</ul>
      <ul class="leistungen">Extra Einnahmen: {{ formatNumber(this.$store.getters.extraEinnahmen[0][name]) }}</ul>
      <ul class="kosten">Personal (+ 13%): {{ formatNumber(this.$store.getters.personal[0][name] * 1.13) }}</ul>
      <ul> <br></ul>
      <ul class="annotation">Basierend auf 2019 kalkuliert:</ul>
      <ul class="kosten" v-for="item in itemsKalkulierteKosten" :key="item._id">
        {{ item.nameKosten + ": " + formatNumber(item[name]) }}
      </ul> 

      
      
      
    </li>

    
    <!-- <span
        v-for="value in filterByProdukt(extraEinnahmenResults)"
        :key="value._id"
        
        
    >{{ value }}</span>-->
  </div>
</template>

<script>
import api from "../api.js"

export default {
  name: "jahreskennzahlItem",
  data() {
    return {
      //calculateResults: null
      //extraEinnahmenResultsProdukt: null
      loadingExtraEinnahmen: false,
    };
  },
  computed: {
    jahr: {
      //hier wird die jahr variable computed, damit es im axios request genutzt werden kann.
      get() {
        return this.$store.state.form.jahr;
      },
    },
    itemsKalkulierteKosten: {
      get() {
        return this.$store.getters.kalkulierteKosten
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
    calculateResults: Object,
  },
  methods: {
    formatNumber (nr) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR'}).format(nr)
    } 
  },
  async mounted() {
    api
      .get("/produkte")
      .then((response) => (this.produkteList = response.data))
      .catch((error) => console.log(error))
  },
};
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
.annotation {
  color: grey;
  font-size: 10px;
}
</style>