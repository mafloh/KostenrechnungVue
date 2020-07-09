<template>
<div>
    <li> 
        {{ produkt.name }} 
        
        
        
        <jahreskennzahlItem 
            v-bind:name="produkt.name"
            v-bind:extra-einnahmen-results="extraEinnahmenResults"
            ></jahreskennzahlItem>
        
    </li> 
  
</div>
</template>

<script>
import jahreskennzahlItem from './jahreskennzahl.vue'
import axios from 'axios'
import {store} from "../store/index.js";





export default {
    name: 'produktItem',
    props: {
        produkt: Object,
        extraEinnahmenResults: Object
        
    },
    data () {
        return {
        }
    },
    components: {
        jahreskennzahlItem
    },
    computed: {
        /* jahr() { //hier wird das jahr der jahreskennzahl vom store geholt
            return this.$store.getters.jahr
        } */
    },
    methods: {
        reload () { //so functions schreiben ist shorthand
            //this.jahreskennzahl = this.reloadArray(this.jahreskennzahl)
           
        
        

        let produkte = 'http://localhost:5000/api/produkte'
        let calculateResults = `http://localhost:5000/api/calculateResults?jahr=${this.$store.getters.jahr}`

        const requestProdukte = axios.get(produkte)
        const requestCalculateResults = axios.get(calculateResults)
        
        axios.all([requestProdukte, requestCalculateResults])
        .then(axios.spread((...responses) => {
            this.produktList = responses[0].data
            this.calculateResults = responses[1].data
            
            
        }
        )).catch(error => console.log(error))

        
        
        }
    },
    watch: {
        jahr() {
            
        }
    },
    mounted () {
        this.reload()
        //this.$store.dispatch('updateJahr', this.jahrCurrent) //beim mounten wird das jahr aus current jahr in den store geschrieben.
    }
}
</script>

<style scoped>
ul {
    color:blue;
    padding-left: 0;
    
    align-items: left;
    list-style: none;

    
}



</style>
