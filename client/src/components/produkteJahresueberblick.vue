<template>
    <div id="produktJahresueberblick">
        
        
    <ul>
        <produkt-item
            v-for="item in produktList"
            v-bind:produkt="item"
            v-bind:key="item._id"
        ></produkt-item>
    </ul>

    
    <div class="inputJahr">
            <input v-model="jahr"  style="text-align:right">
    </div>
    <hr>
    </div>

</template>

<script>
import produktItem from './produkt.vue'
import axios from 'axios'



export default {
    name: 'produktJahresueberblick',
    watch: { // watch schaut ob sich etwas ändert. die im watcher funktion läuft mit zwei parametern: 1. action, 2. getter.
        jahr() {
            this.$store.dispatch('updateJahr', this.jahr) //das ergebnis dieser funktion wird gewatched
        }
    },
    components: {
        produktItem,
        //jahreskennzahlItem
    },
    beforeDestroy() {
        this.unwatch() // anscheinend ist unwatch wichtig bei watch, damit der watcher gestopped wird https://dev.to/viniciuskneves/watch-for-vuex-state-changes-2mgj 
    },
    props: {
        
    },
    data () {
        return {
            produktList: null, //Eine Variable wird angelegt, damit axios etwas in die variable schreiben kann und es mit v-for angezeigt werden kann.
        }
    },
    mounted () {
        axios
            .get('http://localhost:5000/api/produkte')
            .then(response => (this.produktList = response.data))
            .catch(error => console.log(error))
/*         .then(response => (this.produktList = response.data))
        .then(response => (this.jahreskennzahlItem = response.data)) */
    },
    computed: {
        jahr: { //hier wird die jahr variable computed, damit es im axios request genutzt werden kann.
            get () {
                return this.$store.state.form.jahr
            },
            set (value) {
                this.$store.commit('updateJahr', value)
            }
        }

    },
    methods: {
        reload: function () {
        //this.jahreskennzahl = this.reloadArray(this.jahreskennzahl)
            
            
        let produkte = 'http://localhost:5000/api/produkte'
        let jahreskennzahlen = `http://localhost:5000/api/jahreskennzahlen?jahr=${this.$store.getters.jahr}`

        const requestProdukte = axios.get(produkte)
        const requestJahreskennzahlen = axios.get(jahreskennzahlen)
        
        axios.all([requestProdukte, requestJahreskennzahlen])
        .then(axios.spread((...responses) => {
            this.produktList = responses[0].data
            this.jahreskennzahlList = responses[1].data
        }
        )).catch(error => console.log(error))
        }
    }
}
</script>

<style scoped>
ul {
    color: green;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: left;
    position:relative;
    vertical-align: top;
    list-style: none;
    padding-left: 0;
}
.inputJahr {
    margin-bottom: 10px;
    text-align: right;
    width: 100%;
    
    
}
#produktJahresueberblick {
    margin: 0 30px;
    
}
</style>