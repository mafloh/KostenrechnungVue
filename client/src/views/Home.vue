<template>
    <div> 

        <produkte-jahresueberblick></produkte-jahresueberblick>
        <extraEinnahmen></extraEinnahmen>
        <wartungsvertraege></wartungsvertraege>
        
    </div>
</template>

<script>
import produkteJahresueberblick from '../components/produkteJahresueberblick.vue'
import extraEinnahmen from '../components/extraEinnahmen.vue'
import wartungsvertraege from '../components/wartungsvertraege.vue'
export default {
    name: "home",
    components: {  
        produkteJahresueberblick,
        extraEinnahmen,
        wartungsvertraege
    }
}
</script>