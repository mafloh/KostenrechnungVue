<template>
    <div>
        <h1>Alle Produkte anzeigen</h1>
        <form @submit ="neueKontobewegung">
            <textarea @change="setForm"></textarea>
            <button type="submit"></button>
        </form>
    </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
    methods: {
        ...mapMutations(["setForm"]),
        neueKontobewegung (event) {
            event.preventDefault()
          console.log("event", event)    
        }
    }    
}
</script>

<style scoped>

</style>
