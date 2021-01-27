<template>
    <div> 
<h3 style="text-align: center; padding: 0 0 7px 0">Kostenrechnung</h3>
        <jahreskennzahl-neu></jahreskennzahl-neu>
        
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

export default {
    name: "home",
    components: {  
        extraEinnahmen,
        wartungsvertraege,
        personal,
        jahreskennzahlNeu
    }
}
</script>

<style lang="css">

  

</style>

