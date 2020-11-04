<template>
    <div> 
        <div v-if="this.$store.getters.password === '' ">
            <input v-model="input" placeholder="Bitte Passwort eingeben">
            <button @click="submit()">ok</button>

        </div>

        <div v-if="this.$store.getters.password === 'rennrad' ">
<h3 style="text-align: center; padding: 0 0 7px 0">Kostenrechnung 2020</h3>
        <produkte-jahresueberblick></produkte-jahresueberblick>
        
        <extraEinnahmen></extraEinnahmen>
        <br><hr /><hr /><br>
        <personal></personal>
         <br><hr /><hr /><br>
        <wartungsvertraege></wartungsvertraege>
        </div>
    </div>
</template>

<script>
import produkteJahresueberblick from '../components/produkteJahresueberblick.vue'
import extraEinnahmen from '../components/extraEinnahmen.vue'
import wartungsvertraege from '../components/wartungsvertraege.vue'
import personal from '../components/personal.vue'

export default {
    name: "home",
    components: {  
        produkteJahresueberblick,
        extraEinnahmen,
        wartungsvertraege,
        personal
    },
    data () {
        return {
            input: ''
        }
    },
    methods: {
        submit () { this.$store.dispatch("updatePassword", this.input) }
    }
}
</script>

<style lang="css">

  

</style>

