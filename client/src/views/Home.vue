<template>
    <div> 
<h3 style="text-align: center; padding: 0 0 7px 0">Terraplan Kostenrechnung 2020</h3>
        <produkte-jahresueberblick></produkte-jahresueberblick>
        <extraEinnahmen></extraEinnahmen>
        <personal></personal>
        <wartungsvertraege></wartungsvertraege>
        
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
    }
}
</script>

<style lang="css">

  

</style>

