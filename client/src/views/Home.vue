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

<style>
body {
    font-size: 3rem;    
    color: red;
}
  
.table th {
    font-size: 12px;
}
.form-control {
    font-size: 12px;
}
</style>

