<template>
  <div>
    <b-table striped hover :items="calculateResults"></b-table>

    testtestsetse
    <li
      v-if="
        this.$store.getters.extraEinnahmen.length &&
          this.$store.getters.wartungsvertraege.length &&
          this.$store.getters.personal.length &&
          this.$store.getters.kalkulierteKosten.length
      "
    >
      <ul class="leistungen">
        Wartungsverträge:
        {{
          this.$store.getters.wartungsvertraege[0][name]
        }}
      </ul>
      <ul class="leistungen">
        Extra Einnahmen:
        {{
          this.$store.getters.extraEinnahmen[0][name]
        }}
      </ul>
      <ul class="kosten">
        Personal (+ 13%):
        {{
          this.$store.getters.personal[0][name] * 1.13
        }}
      </ul>
      <ul>
        <br />
      </ul>
      <ul class="annotation">
        Basierend auf 2019 kalkuliert:
      </ul>
      <ul class="kosten" v-for="item in itemsKalkulierteKosten" :key="item._id">
        {{
          item.nameKosten + ": " + item[name]
        }}
      </ul>
    </li>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "jahreskennzahlItem",
  data() {
    return {
      calculateResults: [],
      loadingExtraEinnahmen: false,
      kostenleistungenAlle: ["extraEinnahmen", "personal", "wartungsvertraege"],
    };
  },
  computed: {
    jahr: {
      //hier wird die jahr variable computed, damit es im axios request genutzt werden kann.
      get() {
        return new Date().getFullYear();
      },
    },
    itemsKalkulierteKosten: {
      get() {
        return this.$store.getters.kalkulierteKosten;
      },
    },
  },
  props: {
    name: String,
    //calculateResults: Object,
  },
  methods: {
    async loadCalculateResultsForSeveralYears() {
      for (let i = 2020; i < 2022; i++) {
        this.pushToTableArray(i, )
        for (let j = 0; j < this.kostenleistungenAlle.length; j++) {
          await this.loadCalculateResults(i, this.kostenleistungenAlle[j]);
        }
      }
    },
    async loadCalculateResults(year, kostenleistung) {
      try {
        const response = await api.get(
          `/calculateresults?jahr=${year}&kostenleistung=${kostenleistung}`
        );
        this.pushToTableArray(response.data[0].kostenLeistung, response.data[0].terraWeb, response.data[0].terraSchüler, response.data[0].terraIndividual,response.data[0].sonstige )
        
      } catch (err) {
        console.log(err);
      }
    },
    pushToTableArray(one, two, three, four, five) {
        let object = {
          kostenLeistung: one,
          terraWeb: two,
          terraSchüler: three,
          terraIndividual: four,
          sonstige: five,
        }
        this.calculateResults.push(object);
    }
  },
  mounted() {
    this.loadCalculateResultsForSeveralYears();
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
