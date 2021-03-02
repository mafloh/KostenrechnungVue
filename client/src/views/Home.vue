<template>
  <div>
    <div v-if="this.$store.getters.password === ''">
      <input v-model="input" placeholder="Bitte Passwort eingeben" />
      <button @click="submit()">ok</button>
    </div>
    <div v-if="this.$store.getters.password === 'rennrad'">
      <h3 style="text-align: center; padding: 0 0 7px 0">
        Kostenrechnung ab 2020
      </h3>

      <jahreskennzahl-neu></jahreskennzahl-neu>
      <jahreskennzahl></jahreskennzahl>

      <produkte-jahresueberblick></produkte-jahresueberblick>

      <extraEinnahmen></extraEinnahmen>
      <br />
      <hr />
      <hr />
      <br />
      <personal></personal>
      <br />
      <hr />
      <hr />
      <br />
      <wartungsvertraege></wartungsvertraege>
    </div>
  </div>
</template>

<script>
import extraEinnahmen from "../components/extraEinnahmen.vue";
import wartungsvertraege from "../components/wartungsvertraege.vue";
import personal from "../components/personal.vue";
import jahreskennzahlNeu from "../components/jahreskennzahlNeu.vue";
import jahreskennzahl from "../components/jahreskennzahl.vue";

export default {
  name: "home",
  components: {
    extraEinnahmen,
    wartungsvertraege,
    personal,
    jahreskennzahlNeu,
    jahreskennzahl,
  },
  data() {
    return {
      input: "",
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
