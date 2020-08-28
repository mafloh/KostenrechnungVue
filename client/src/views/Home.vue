<template>
    <div> 

        <produkte-jahresueberblick></produkte-jahresueberblick>
        <personal></personal>
        <extraEinnahmen></extraEinnahmen>
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

