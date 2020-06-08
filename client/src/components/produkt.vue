<template>
<div>
    <li> 
        {{ produkt.name }} 
        
        
        <ul>
        <jahreskennzahl-item
            v-for="item in jahreskennzahlList"
            v-bind:jahreskennzahl="item"
            v-bind:key="item._id"
            :name="produkt.name"
            :produkt_id="item.produkt_id"
        ></jahreskennzahl-item> <!-- :name ist v-bind und gibt name und produkt:id als prop weiter -->
        </ul>
        
    </li> 
   
</div>
</template>

<script>
import jahreskennzahlItem from './jahreskennzahl.vue'
import axios from 'axios'




export default {
    name: 'produktItem',
    props: {
        produkt: Object,
        
    },
    data () {
        return {
            jahreskennzahlList: null,
            timeoutId: null, //fürs debouncing bei der eingabe des jahres
            currentYear: null //variable für das aktuelle jahrs als filter 
        }
    },
    components: {
        jahreskennzahlItem
    },
    computed: {
        jahr() { //hier wird das jahr der jahreskennzahl vom store geholt
            return this.$store.getters.jahr
        },
        jahrCurrent () { // das aktuelle jahr wird als standardfilter gesetzt, dafür wird hier das jahr berechnet.
            return new Date().getFullYear()
        }
    },
    methods: {
        reload () { //so functions schreiben ist shorthand
            //this.jahreskennzahl = this.reloadArray(this.jahreskennzahl)
           
        
        

        let produkte = 'http://localhost:5000/api/produkte'
        let jahreskennzahlen = `http://localhost:5000/api/jahreskennzahlen?jahr=${this.$store.getters.jahr}`

        const requestProdukte = axios.get(produkte)
        const requestJahreskennzahlen = axios.get(jahreskennzahlen)
        
        axios.all([requestProdukte, requestJahreskennzahlen])
        .then(axios.spread((...responses) => {
            this.produktList = responses[0].data
            this.jahreskennzahlList = responses[1].data
            console.log(this.jahreskennzahlList)
        }
        
        )).catch(error => console.log(error))
        }
    },
    watch: {
        jahr() {
            //debouncing
            if (this.timeoutId) { //wenn timeoutId vorhanden ist, dann wird der timeout time zurückgesetzt und die timoutId auf null gesetzt. 
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }
            this.timeoutId = setTimeout(async () => { // setTimeout evaluiert das ergebnis der funktion nach xxx millisekunden. d.h. this.reload() wird dann aufgerufen. 
               await this.reload() //das ergebnis dieser funktion wird gewatched, wenn es sich ändern dann wird jahr upgedated mit this.reload()
            }, 300);
        }
    },
    mounted () {
        this.reload()
        this.$store.dispatch('updateJahr', this.jahrCurrent) //beim mounten wird das jahr aus current jahr in den store geschrieben.
    }
}
</script>

<style scoped>
ul {
    color:blue;
    
    
    align-items: left;
    list-style: none;

    
}



</style>
