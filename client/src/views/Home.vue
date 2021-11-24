<template>
  <div>
    <div v-if="this.$store.getters.password === ''">
      <input v-model="input" placeholder="Bitte Passwort eingeben" />
      <button @click="submit()">ok</button>
    </div>
    <div v-if="this.$store.getters.password === 'rennrad'">
      <h3 style="text-align: center; padding: 0 0 7px 0">
        Kostenrechnung ab 2019
      </h3>

      <b-button v-b-toggle.collapse-result class="m-1"
        >Ergebnistabelle ein-/ausblenden</b-button
      >
      <b-collapse id="collapse-result">
        <jahreskennzahl-neu></jahreskennzahl-neu>

        <jahreskennzahl></jahreskennzahl>

        <produkte-jahresueberblick></produkte-jahresueberblick>
      </b-collapse>

      <b-button v-b-toggle.collapse-extra class="m-1">Extra-Einnahmen</b-button>
      <b-button v-b-toggle.collapse-personal class="m-1">Personal</b-button>
      <b-button v-b-toggle.collapse-wartung class="m-1"
        >Wartungsverträge</b-button
      >
      <b-collapse id="collapse-extra">
        <extraEinnahmen></extraEinnahmen>
      </b-collapse>
      <b-collapse id="collapse-personal">
        <personal></personal>
      </b-collapse>
      <b-collapse id="collapse-wartung">
        <wartungsvertraege></wartungsvertraege>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import extraEinnahmen from "../components/extraEinnahmen.vue";
import wartungsvertraege from "../components/wartungsvertraege.vue";
import personal from "../components/personal.vue";
import jahreskennzahlNeu from "../components/jahreskennzahlNeu.vue";
import jahreskennzahl from "../components/jahreskennzahl.vue";
import produkteJahresueberblick from "../components/produkteJahresueberblick.vue";


export default {
  name: "home",
  components: {
    extraEinnahmen,
    wartungsvertraege,
    personal,
    jahreskennzahlNeu,
    jahreskennzahl,
    produkteJahresueberblick
  },
  data() {
    return {
      input: "",
      activeCollapse: [],
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("updatePassword", this.input);
    },
  },
};
</script>

<style lang="css"></style>
