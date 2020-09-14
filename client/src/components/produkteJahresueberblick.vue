<template>
  <div id="produktJahresueberblick" >
    <hr />
    <ul > 
      <produkt-item
        v-for="item in produktList"
        v-bind:produkt="item"
        v-bind:key="item._id"
        :calculate-results="calculateResultsApi"
      ></produkt-item>
    </ul>



    <b-modal
      id="modal-kalkulierte-kosten"
      size="xl"
      title="Kalkulierte Kosten hinzufügen"
      area-hidden="false"
      @ok="submit()"
    >
    {{newKalkulierteKosten}}
      <b-table-simple striped hover>
        <b-thead>
          <b-tr>
            <b-th v-for="(field, index) in fields" :key="index">{{field.key}}</b-th>
            <b-th></b-th>
          </b-tr>
        </b-thead>

        <b-tbody>
          <b-tr>
            <b-th v-for="(field, index) in fields" :key="index">
              <b-form-select
                v-if="field.key === 'nameKosten'"
                v-model="newKalkulierteKosten[field.key]"
                :options="bFormOptionsKalkulierteKosten"
              ></b-form-select>
              <b-form-input
                v-else-if="field.key === 'terraWeb'"
                v-model="newKalkulierteKosten[field.key]"
                type="number"
              ></b-form-input>
              <b-form-input
                v-else-if="field.key === 'terraSchüler'"
                v-model="newKalkulierteKosten[field.key]"
                type="number"
              ></b-form-input>
              <b-form-input
                v-else-if="field.key === 'terraIndividual'"
                v-model="newKalkulierteKosten[field.key]"
                type="number"
              ></b-form-input>
              <b-form-input
                v-else
                :placeholder="field.key"
                v-model="newKalkulierteKosten[field.key]"
              ></b-form-input>
            </b-th>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-modal>
    <hr />
    
    <div class="inputJahr">
      <!-- <input v-model="jahr" style="text-align:right" > -->

      <b-btn
      v-b-modal.modal-kalkulierte-kosten
      variant="light"
      size="sm"
    >Kalkulierte Kosten ändern</b-btn>
    </div>
    
  </div>
</template>

<script>
import produktItem from "./produkt.vue"
//import jahreskennzahlItem from "./jahreskennzahl.vue";
import axios from "axios"
import api from "../api.js"
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
      timeoutId: null, //fürs debouncing bei der eingabe des jahres
      fields: [
        { key: "nameKosten", sortable: true },
        { key: "terraWeb", sortable: false },
        { key: "terraSchüler", sortable: false },
        { key: "terraIndividual", sortable: false },
        { key: "sonstige", sortable: false },
      ],
      bFormOptionsKalkulierteKosten: [
        "Gemeinkosten",
        "Serverkosten",
        "Nebenkosten",
        "Vertriebskosten",
      ],
      newKalkulierteKosten: {},
      kalkulierteKostenItem: {},
      produkteList: [],
      kalkulierteKostenList: []
    }
  },
  async mounted() {
    //load current year into store
    this.$store.dispatch("updateJahr", this.jahrCurrent);

    axios
      .get("http://localhost:5000/api/produkte")
      .then(response => (this.produktList = response.data))
      .catch(error => console.log(error));
    /*         .then(response => (this.produktList = response.data))
        .then(response => (this.jahreskennzahlItem = response.data)) */

   // this.reload()
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
      /* reload() {
        for (let i = 0; i < this.bFormOptionsKalkulierteKosten.length; i++){
          const response =  api.get(`/kalkulierteKosten/newest?namekosten=${this.bFormOptionsKalkulierteKosten[i]}`)
          console.log(response)
          this.kalkulierteKostenList.push(response.data[0])
        }
        console.log(this.kalkulierteKostenList)
        this.$store.dispatch("updateKalkulierteKosten", this.kalkulierteKostenList)
    }, */
     async reload() {
      try {
        console.log(this.bFormOptionsKalkulierteKosten)
        for (let i = 0; i < this.bFormOptionsKalkulierteKosten.length; i++){
          const response = await api.get(`/kalkulierteKosten/newest?namekosten=${this.bFormOptionsKalkulierteKosten[i]}`)
          console.log(response)
          this.kalkulierteKostenList.push(response.data[0])
        }
        console.log(this.kalkulierteKostenList)
        this.$store.dispatch("updateKalkulierteKosten", this.kalkulierteKostenList)
      } catch (err) {
        console.log(err);
      }
    }, 
    async submit() {
      const res = await api.post(
        `/kalkulierteKosten`,
        this.newKalkulierteKosten
      )
      this.submitKalkulierteKosten()
      if (res.status === 200) await this.reload()
    },
    async removeItem(id) {
      const res = await api.delete(`/kalkulierteKosten/${id}`);
      if (res.status === 200) {
        alert(`Eintrag mit ID ${id} wurde gelöscht.`);
        await this.reload();
        this.submitKalkulierteKosten();
      }
    },
    async loadItem(id) {
      const res = await api.get(`/kalkulierteKosten/ID/${id}`);
      this.kalkulierteKostenItem = res.data;
    },
    async updateItem(id, ItemToUpdate) {
      const res = await api.put(`/kalkulierteKosten/${id}`, ItemToUpdate);
      if (res.status === 200) {
        await this.reload();
        this.submitKalkulierteKosten();
      }
    },
    submitKalkulierteKosten() {
      //const total = this.totalKalkulierteKosten(this.kalkulierteKostenList);
      //console.log(this.kalkulierteKostenList)
      /* const totalCurrentYear = total.filter(
        (item) => item.jahr === this.$store.getters.jahr
      ) */
      this.$store.dispatch("updateKalkulierteKosten", this.kalkulierteKostenList);
     /*  total.forEach(async (item) => {
        const res = api.post(`/kalkulierteKosten`, item);
        if (res.status === 200) await this.reload();
      }) */
    },
    submitKalkulierteKostenToStore(array) {
      const total = this.totalKalkulierteKosten(array);
      const totalCurrentYear = total.filter(
        (item) => item.jahr === this.$store.getters.jahr
      );
      this.$store.dispatch("updateKalkulierteKosten", totalCurrentYear);
    },
    totalKalkulierteKosten(kalkulierteKostenListObject) {
      if (!kalkulierteKostenListObject) {
        return 0;
      }

      //Formats date of the array of objects to YYYY.
      let kalkulierteKostenListYear = kalkulierteKostenListObject.map((obj) => {
        const container = {};
        container["jahr"] = new Date(obj["jahr"]).getFullYear();
        container["nameKosten"] = obj["nameKosten"] ? obj["nameKosten"] : "";
        container["terraWeb"] = obj["prozentWeb"] ? obj["prozentWeb"] : 0;
        container["terraSchüler"] = obj["prozentSchueler"]
          ? obj["prozentSchueler"]
          : 0;
        container["terraIndividual"] = obj["prozentIndividual"]
          ? obj["prozentIndividual"]
          : 0;
        container["sonstige"] = 0;
        return container;
      });
      console.log(kalkulierteKostenListYear)
      return kalkulierteKostenListYear;
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