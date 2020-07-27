<template>
  <div id="produktJahresueberblick" >
    <ul > 
      <produkt-item
        v-for="item in produktList"
        v-bind:produkt="item"
        v-bind:key="item._id"
        :calculate-results="calculateResultsApi"
      ></produkt-item>
    </ul>

    <div class="inputJahr">
      <input v-model="jahr" style="text-align:right" >
    </div>
    <hr />
  </div>
</template>

<script>
import produktItem from "./produkt.vue"
//import jahreskennzahlItem from "./jahreskennzahl.vue";
import axios from "axios";
//import api from "../api.js";
//import {store} from '../store/index.js'

export default {
  name: "produktJahresueberblick",
  watch: {
    // watch schaut ob sich etwas ändert. die im watcher funktion läuft mit zwei parametern: 1. action, 2. getter.
    jahr() {
      //debouncing
        if (this.timeoutId) { //wenn timeoutId vorhanden ist, dann wird der timeout time zurückgesetzt und die timoutId auf null gesetzt. 
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        this.timeoutId = setTimeout(async () => { // setTimeout evaluiert das ergebnis der funktion nach xxx millisekunden. d.h. this.reload() wird dann aufgerufen. 
            await this.reload() //das ergebnis dieser funktion wird gewatched, wenn es sich ändern dann wird jahr upgedated mit this.reload()
        }, 300);    
    
      this.$store.dispatch("updateJahr", this.jahr); //das ergebnis dieser funktion wird gewatched
    }
  },
  components: {
    produktItem,
    //jahreskennzahlItem
  },
  beforeDestroy() {
    this.unwatch(); // anscheinend ist unwatch wichtig bei watch, damit der watcher gestopped wird https://dev.to/viniciuskneves/watch-for-vuex-state-changes-2mgj
  },
  props: {},
  data() {
    return {
      produktList: null, //Eine Variable wird angelegt, damit axios etwas in die variable schreiben kann und es mit v-for angezeigt werden kann.
      calculateResultsApi: null,
      jahrCurrent: new Date().getFullYear(),
      timeoutId: null //fürs debouncing bei der eingabe des jahres
    };
  },
  mounted() {
    //load current year into store
    this.$store.dispatch("updateJahr", this.jahrCurrent);

    axios
      .get("http://localhost:5000/api/produkte")
      .then(response => (this.produktList = response.data))
      .catch(error => console.log(error));
    /*         .then(response => (this.produktList = response.data))
        .then(response => (this.jahreskennzahlItem = response.data)) */

    this.reload();
  },
  computed: {
    jahr: {
      //hier wird die jahr variable computed, damit es im axios request genutzt werden kann.
      get() {
        return this.$store.state.form.jahr;
      },
      set(value) {
        this.$store.commit("updateJahr", value);
      }
    }
  },
  methods: {
    reload: function() {
      //load extraEinnahmenResults
      //const nr = jahr;
      //const jahr = "jahr";
      //let jahrX = this.$store.state.form;
      //let jahrY = this.$store.getters;
      //console.log(this.jahr, this.$store.getters.jahr);
      //this.calculateResultsApi = {}


      /* api
        .get(`/calculateResults?kostenleistung=extraEinnahmen&jahr=${this.$store.getters.jahr}`) //?jahr=${this.jahr}&kostenLeistung=extraEinnahmen`)
        .then(response => {
          this.calculateResultsApi.extraEinnahmen = response.data[0]
        })
        .catch(error => console.log(error))
      api
      .get(`/calculateResults?kostenleistung=wartungsvertraege&jahr=${this.$store.getters.jahr}`) //?jahr=${this.jahr}&kostenLeistung=extraEinnahmen`)
      .then(response => {
        this.calculateResultsApi.wartungsvertraege = response.data[0];
      })
        .catch(error => console.log(error)); */




      let extraEinnahmen = `http://localhost:5000/api/calculateResults?kostenleistung=extraEinnahmen&jahr=${this.$store.getters.jahr}`
      let wartungsvertraege = `http://localhost:5000/api/calculateResults?kostenleistung=wartungsvertraege&jahr=${this.$store.getters.jahr}`

      const requestExtraEinnahmen = axios.get(extraEinnahmen);
      const requestWartungsvertraege = axios.get(wartungsvertraege);

      axios
        .all([requestExtraEinnahmen, requestWartungsvertraege])
        .then(
          axios.spread((...responses) => {
            this.calculateResultsApi = {}
            this.calculateResultsApi.extraEinnahmen = responses[0].data
            this.calculateResultsApi.wartungsvertraege= responses[1].data
            //console.log(this.calculateResultsApi)
          })
        )
        .catch(error => console.log(error))

      
      //console.log(this.extraEinnahmenResultsApi)

      //this.jahreskennzahl = this.reloadArray(this.jahreskennzahl)

      /* let produkte = "http://localhost:5000/api/produkte";
      let jahreskennzahlen = `http://localhost:5000/api/jahreskennzahlen?jahr=${this.$store.getters.jahr}`;

      const requestProdukte = axios.get(produkte);
      const requestJahreskennzahlen = axios.get(jahreskennzahlen);

      axios
        .all([requestProdukte, requestJahreskennzahlen])
        .then(
          axios.spread((...responses) => {
            this.produktList = responses[0].data
            this.jahreskennzahlList = responses[1].data
          })
        )
        .catch(error => console.log(error)) */
    },
    test() {
      console.log("updateprodukte")
    }
  }
};
</script>

<style scoped>
ul {
  color: green;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: left;
  position: relative;
  vertical-align: top;
  list-style: none;
  padding-left: 0;
}
.inputJahr {
  margin-bottom: 10px;
  text-align: right;
  width: 100%;
}
#produktJahresueberblick {
  margin: 0 30px;
}
</style>