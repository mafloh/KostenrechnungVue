<template>
    <div> 

        <produkte-jahresueberblick></produkte-jahresueberblick>
        <extraEinnahmen></extraEinnahmen>
        
    </div>
</template>

<script>
import produkteJahresueberblick from '../components/produkteJahresueberblick.vue'
import extraEinnahmen from '../components/extraEinnahmen.vue'
export default {
    name: "home",
    components: {  
        produkteJahresueberblick,
        extraEinnahmen
    }
}
</script>