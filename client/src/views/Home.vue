<template>
    <div> 
<h3 style="text-align: center; padding: 0 0 7px 0">Kostenrechnung ab 2020</h3>

        <jahreskennzahl-neu></jahreskennzahl-neu>
        <jahreskennzahl></jahreskennzahl>
        <extraEinnahmen></extraEinnahmen>
        <personal></personal>
        <wartungsvertraege></wartungsvertraege>
        
    </div>
</template>

<script>

import extraEinnahmen from '../components/extraEinnahmen.vue'
import wartungsvertraege from '../components/wartungsvertraege.vue'
import personal from '../components/personal.vue'
import jahreskennzahlNeu from '../components/jahreskennzahlNeu.vue'
import jahreskennzahl from '../components/jahreskennzahl.vue'

export default {
    name: "home",
    components: {  
        extraEinnahmen,
        wartungsvertraege,
        personal,
        jahreskennzahlNeu,
        jahreskennzahl
    }
}
</script>

<style lang="css">

  

</style>

