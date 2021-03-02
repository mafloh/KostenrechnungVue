<template>
  <div>
    
    <b-table striped hover :items="calculateResults"></b-table>
    * Summe beinhaltet Abzug von 199.920 € Gemeinkosten pro Jahr, basierend auf 2019.
    <br><br>
    
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "jahreskennzahlItem",
  data() {
    return {
      calculateResults: [{
          kostenLeistung: 2019,
          terraWeb: '',
          terraSchüler: '',
          terraIndividual: '',
          sonstige: '',
          Summe: '',
        },
        {
          kostenLeistung: 'extraEinnahmen',
          terraWeb: 80944,
          terraSchüler: 41700,
          terraIndividual: 78110,
          sonstige: 7691,
          Summe: 80944+41700+78110+7691 ,
        },
        {
          kostenLeistung: 'personal',
          terraWeb: -134703,
          terraSchüler: 143321,
          terraIndividual: 130388,
          sonstige: 0,
          Summe: 408412,
        },
        {
          kostenLeistung: 'wartungsvertraege',
          terraWeb: 96053,
          terraSchüler: 77133,
          terraIndividual: 122387,
          sonstige: 0,
          Summe: 295573,
        },
        {
          kostenLeistung: 'Summe*',
          terraWeb: -14957,
          terraSchüler: 67615,
          terraIndividual: 39725,
          sonstige: 7691,
          Summe: -122297+ '*',
        },
        {
          kostenLeistung: '',
          terraWeb: '',
          terraSchüler: '',
          terraIndividual: '',
          sonstige: '',
          Summe: '',
        },
        ],
      loadingExtraEinnahmen: false,
      kostenleistungenAlle: ["extraEinnahmen", "personal", "wartungsvertraege"],
      gewinnTerraWeb: 0,
      gewinnTerraSchueler: 0,
      gewinnTerraIndividual: 0,
      gewinnSonstige: 0,
      gewinnSumme: 0,
      

      kalkulierteKostenList: [],
      bFormOptionsKalkulierteKosten: [
        "Gemeinkosten",
        "Serverkosten",
        "Nebenkosten",
        "Vertriebskosten",
      ],
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
        this.pushToTableArray(i);
        this.gewinnTerraWeb = 0;
        this.gewinnTerraSchueler = 0;
        this.gewinnTerraIndividual = 0;
        this.gewinnSonstige = 0;
        this.gewinnSumme = 0;
        for (let j = 0; j < this.kostenleistungenAlle.length; j++) {
          await this.loadCalculateResults(i, this.kostenleistungenAlle[j]);
        }

        this.pushToTableArray(
          "Summe*",
          this.gewinnTerraWeb,
          this.gewinnTerraSchueler,
          this.gewinnTerraIndividual,
          this.gewinnSonstige,
          this.gewinnSumme
        );
        this.pushToTableArray();
      }
    },
    async loadCalculateResults(year, kostenleistung) {
      try {
        const response = await api.get(
          `/calculateresults?jahr=${year}&kostenleistung=${kostenleistung}`
        );
        this.pushToTableArray(
          response.data[0].kostenLeistung,
          response.data[0].terraWeb,
          response.data[0].terraSchüler,
          response.data[0].terraIndividual,
          response.data[0].sonstige
        );
        this.accumulateGewinnForYear(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    },
    accumulateGewinnForYear(responseObjectFromApi) {
      if (responseObjectFromApi.kostenLeistung == "personal") {
        this.gewinnTerraWeb -= responseObjectFromApi.terraWeb - 66640; //TODO: hardcoded gemeinkosten, very bad
        this.gewinnTerraSchueler -= responseObjectFromApi.terraSchüler - 66640;
        this.gewinnTerraIndividual -=
          responseObjectFromApi.terraIndividual - 66640;
        this.gewinnSonstige -= responseObjectFromApi.sonstige;
        this.gewinnSumme =
          -this.gewinnTerraWeb -
          this.gewinnTerraSchueler -
          this.gewinnTerraIndividual -
          this.gewinnSonstige;
      } else {
        this.gewinnTerraWeb += responseObjectFromApi.terraWeb - 66640;
        this.gewinnTerraSchueler += responseObjectFromApi.terraSchüler - 66640;
        this.gewinnTerraIndividual +=
          responseObjectFromApi.terraIndividual - 66640;
        this.gewinnSonstige += responseObjectFromApi.sonstige;
        this.gewinnSumme =
          this.gewinnTerraWeb +
          this.gewinnTerraSchueler +
          this.gewinnTerraIndividual +
          this.gewinnSonstige;
      }
    },
    pushGewinnToArray() {},
    pushToTableArray(one, two, three, four, five) {
      if (one == "personal") {
        two *= -1;
        three *= -1;
        four *= -1;
        five *= -1;
      }
      let object = {
        kostenLeistung: one,
        terraWeb: two,
        terraSchüler: three,
        terraIndividual: four,
        sonstige: five,
        Summe:
          two + three + four + five
            ? (two + three + four + five).toLocaleString("de")
            : "",
      };
      this.calculateResults.push(object);
    },
    async loadKalkulierteKostenFromApi() {
      try {
        for (let i = 0; i < this.bFormOptionsKalkulierteKosten.length; i++) {
          const response = await api.get(
            `/kalkulierteKosten/newest?namekosten=${this.bFormOptionsKalkulierteKosten[i]}`
          );
          this.kalkulierteKostenList.push(response.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.loadCalculateResultsForSeveralYears();
    this.loadKalkulierteKostenFromApi();
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
