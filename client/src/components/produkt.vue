<template>
  <div>
    <li>
      <h3
        v-if="this.$store.getters.extraEinnahmen.length && this.$store.getters.wartungsvertraege.length && this.$store.getters.personal.length && this.$store.getters.kalkulierteKosten.length"
      >{{ produkt.name }} : {{ this.$store.getters.wartungsvertraege[0][produkt.name] + this.$store.getters.extraEinnahmen[0][produkt.name] - this.$store.getters.personal[0][produkt.name] * 1.13 - this.$store.getters.kalkulierteKosten[0][produkt.name] - this.$store.getters.kalkulierteKosten[1][produkt.name] - this.$store.getters.kalkulierteKosten[2][produkt.name] - this.$store.getters.kalkulierteKosten[3][produkt.name]}}</h3>

      <jahreskennzahlItem v-bind:name="produkt.name" v-bind:calculate-results="calculateResults"></jahreskennzahlItem>
    </li>
  </div>
  
</template>

<script>
import jahreskennzahlItem from "./jahreskennzahl.vue";
import api from "../api.js";
//import {store} from "../store/index.js";

export default {
  name: "produktItem",
  props: {
    produkt: Object,
    calculateResults: Object,
  },
  data() {
    return {};
  },
  components: {
    jahreskennzahlItem,
  },
  computed: {
    /* jahr() { //hier wird das jahr der jahreskennzahl vom store geholt
            return this.$store.getters.jahr
        } */
  },
  methods: {
    async reload() {
      //so functions schreiben ist shorthand
      try {
        const response = await api.get("/produkte");
        this.produkteList = response.data;
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    jahr() {},
  },
  mounted() {
    this.reload();
    //this.$store.dispatch('updateJahr', this.jahrCurrent) //beim mounten wird das jahr aus current jahr in den store geschrieben.
  },
};
</script>

<style scoped>
ul {
  color: blue;
  padding-left: 0;

  align-items: left;
  list-style: none;
}
</style>
