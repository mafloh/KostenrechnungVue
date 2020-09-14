<template>
    <div>
    <h2>Wartungsverträge Terra Schüler</h2>

    <b-modal id="wartungsvertraege-terra-schueler" size="xl" title="BootstrapVue" area-hidden="false" @ok="updateItem(wartungsvertraegeItem._id, wartungsvertraegeItem)">
 
    <p class="my-4">
      <b-table-simple>
        <b-tr>
          <b-th v-for="(field, index) in fieldsTerraSchueler" :key="index">
              {{field.key}}
          </b-th>
        </b-tr>
        <b-tr>
            <b-th v-for="(field, index) in fieldsTerraSchueler" :key="index">
              <b-form-input v-if="field.key === 'preis'" v-model="wartungsvertraegeItem[field.key]" type="number"></b-form-input>
              <b-form-datepicker v-else-if="field.key === 'datumAbgeschlossen'" v-model="wartungsvertraegeItem[field.key]"></b-form-datepicker>
              <b-form-select v-else-if="field.key === 'produkt'" v-model="wartungsvertraegeItem[field.key]" :options="produkteListBFormOptions" ></b-form-select>
              <b-form-input v-else :placeholder="field.key"  v-model="wartungsvertraegeItem[field.key]"></b-form-input>
            </b-th>
        </b-tr>
      </b-table-simple>
 
    </p>
  </b-modal>
   
    <b-table-simple striped hover>
        <b-thead>
            <b-tr>
                <b-th v-for="(field, index) in fieldsTerraSchueler" :key="index">{{field.key}}</b-th>
                <b-th></b-th>
            </b-tr>
        </b-thead>
        <b-tbody>
            <b-tr v-for="item in wartungsvertraegeListTerraSchueler" :key="item._id">

                <b-th v-for="(field, index) in fieldsTerraSchueler" :key="index">
                    <span v-if="item[field.key] && field.key === 'start'">
                    {{ new Date(item[field.key]).toLocaleDateString() }}
                     </span>
                    <span v-else>{{item[field.key]}}</span>
                </b-th>

                <b-th>
                    <b-btn v-b-modal.wartungsvertraege-terra-schueler variant="info" :key="index" @click.prevent="loadItem(item._id)">Edit</b-btn>
                </b-th>

            </b-tr>

            <b-tr>
                <b-th v-for="(field, index) in fieldsTerraSchueler" :key="index">
                    <b-form-datepicker v-if="field.key === 'start'" v-model="newWartungsvertrag[field.key]"></b-form-datepicker>
                    <b-form-select v-else-if="field.key === 'fixOderGeplant'" v-model="newWartungsvertrag[field.key]" :options="['fix', 'geplant']"></b-form-select>
                    <b-form-select v-else-if="field.key === 'produkt'" v-model="newWartungsvertrag[field.key]" :options="produkteListBFormOptions" ></b-form-select>
                    <b-form-input v-else :placeholder="field.key" v-model="newWartungsvertrag[field.key]"></b-form-input>
                </b-th>

                <b-th>
                    <b-btn variant="success" @click.prevent="submit">Submit</b-btn>
                </b-th>
            </b-tr>
        </b-tbody>
    </b-table-simple>

     <h2>Wartungsverträge Terra Individual</h2>

    <b-modal id="wartungsvertraege-terra-individual" size="xl" title="BootstrapVue" area-hidden="false" @ok="updateItem(wartungsvertraegeItem._id, wartungsvertraegeItem)">
 
    <p class="my-4">
      <b-table-simple>
        <b-tr>
          <b-th v-for="(field, index) in fieldsTerraIndividual" :key="index">
              {{field.key}}
          </b-th>
        </b-tr>
        <b-tr>
            <b-th v-for="(field, index) in fieldsTerraIndividual" :key="index">
              <b-form-input v-if="field.key === 'preis'" v-model="wartungsvertraegeItem[field.key]" type="number"></b-form-input>
              <b-form-datepicker v-else-if="field.key === 'datumAbgeschlossen'" v-model="wartungsvertraegeItem[field.key]"></b-form-datepicker>
              <b-form-select v-else-if="field.key === 'produkt'" v-model="wartungsvertraegeItem[field.key]" :options="produkteListBFormOptions" ></b-form-select>
              <b-form-input v-else :placeholder="field.key"  v-model="wartungsvertraegeItem[field.key]"></b-form-input>
            </b-th>
        </b-tr>
      </b-table-simple>
 
    </p>
  </b-modal>
   
    <b-table-simple striped hover>
        <b-thead>
            <b-tr>
                <b-th v-for="(field, index) in fieldsTerraIndividual" :key="index">{{field.key}}</b-th>
                <b-th></b-th>
            </b-tr>
        </b-thead>
        <b-tbody>
            <b-tr v-for="item in wartungsvertraegeListTerraIndividual" :key="item._id">

                <b-th v-for="(field, index) in fieldsTerraIndividual" :key="index">
                    <span v-if="item[field.key] && field.key === 'start'">
                    {{ new Date(item[field.key]).toLocaleDateString() }}
                     </span>
                    <span v-else>{{item[field.key]}}</span>
                </b-th>

                <b-th>
                    <b-btn v-b-modal.wartungsvertraege-terra-individual variant="info" :key="index" @click.prevent="loadItem(item._id)">Edit</b-btn>
                </b-th>

            </b-tr>

            <b-tr>
                <b-th v-for="(field, index) in fieldsTerraIndividual" :key="index">
                    <b-form-datepicker v-if="field.key === 'start'" v-model="newWartungsvertrag[field.key]"></b-form-datepicker>
                    <b-form-select v-else-if="field.key === 'fixOderGeplant'" v-model="newWartungsvertrag[field.key]" :options="['fix', 'geplant']"></b-form-select>
                    <b-form-select v-else-if="field.key === 'produkt'" v-model="newWartungsvertrag[field.key]" :options="produkteListBFormOptions" ></b-form-select>
                    <b-form-input v-else :placeholder="field.key" v-model="newWartungsvertrag[field.key]"></b-form-input>
                </b-th>

                <b-th>
                    <b-btn variant="success" @click.prevent="submit">Submit</b-btn>
                </b-th>
            </b-tr>
        </b-tbody>
    </b-table-simple>

    <h2>Wartungsverträge Terra Web</h2>

    <b-modal id="wartungsvertraege-terra-web" size="xl" title="BootstrapVue" area-hidden="false" @ok="updateItem(wartungsvertraegeItem._id, wartungsvertraegeItem)">
 
    <p class="my-4">
      <b-table-simple>
        <b-tr>
          <b-th v-for="(field, index) in fieldsTerraWeb" :key="index">
              {{field.key}}
          </b-th>
        </b-tr>
        <b-tr>
            <b-th v-for="(field, index) in fieldsTerraWeb" :key="index">
              <b-form-input v-if="field.key === 'preis'" v-model="wartungsvertraegeItem[field.key]" type="number"></b-form-input>
              <b-form-datepicker v-else-if="field.key === 'datumAbgeschlossen'" v-model="wartungsvertraegeItem[field.key]"></b-form-datepicker>
              <b-form-select v-else-if="field.key === 'produkt'" v-model="wartungsvertraegeItem[field.key]" :options="produkteListBFormOptions" ></b-form-select>
              <b-form-input v-else :placeholder="field.key"  v-model="wartungsvertraegeItem[field.key]"></b-form-input>
            </b-th>
        </b-tr>
      </b-table-simple>
 
    </p>
  </b-modal>
   
    <b-table-simple striped hover>
        <b-thead>
            <b-tr>
                <b-th v-for="(field, index) in fieldsTerraWeb" :key="index">{{field.key}}</b-th>
                <b-th></b-th>
            </b-tr>
        </b-thead>
        <b-tbody>
            <b-tr v-for="item in wartungsvertraegeListTerraWeb" :key="item._id">

                <b-th v-for="(field, index) in fieldsTerraWeb" :key="index">
                    <span v-if="item[field.key] && field.key === 'start'">
                    {{ new Date(item[field.key]).toLocaleDateString() }}
                     </span>
                    <span v-else>{{item[field.key]}}</span>
                </b-th>

                <b-th>
                    <b-btn v-b-modal.wartungsvertraege-terra-web variant="info" :key="index" @click.prevent="loadItem(item._id)">Edit</b-btn>
                </b-th>

            </b-tr>

            <b-tr>
                <b-th v-for="(field, index) in fieldsTerraWeb" :key="index">
                    <b-form-datepicker v-if="field.key === 'start'" v-model="newWartungsvertrag[field.key]"></b-form-datepicker>
                    <b-form-select v-else-if="field.key === 'fixOderGeplant'" v-model="newWartungsvertrag[field.key]" :options="['fix', 'geplant']"></b-form-select>
                    <b-form-select v-else-if="field.key === 'produkt'" v-model="newWartungsvertrag[field.key]" :options="produkteListBFormOptions" ></b-form-select>
                    <b-form-input v-else :placeholder="field.key" v-model="newWartungsvertrag[field.key]"></b-form-input>
                </b-th>

                <b-th>
                    <b-btn variant="success" @click.prevent="submit">Submit</b-btn>
                </b-th>
            </b-tr>
        </b-tbody>
    </b-table-simple>

    </div>

    
</template>

<script>
import api from '../api.js'

export default {
    data () {
        return {
            fields: [
                {key: 'produkt', sortable: true, produkt: 'allgemein'},
                {key: 'kunde', sortable: true, produkt: 'allgemein'},
                {key: 'start', sortable: true, produkt: 'allgemein'},
                {key: 'fixOderGeplant', sortable: true, produkt: 'allgemein'},
                {key: 'proMonat', sortable: false, produkt: 'allgemein'},
                {key: 'einmaligeZahlung', sortable: false, produkt: 'allgemein'},
                {key: 'jahreswartung', sortable: false, produkt: 'allgemein'},
                {key: 'idLexware', sortable: false, produkt: 'allgemein'},
                {key: 'ASP', sortable: false, produkt: 'allgemein'},
                {key: 'info', sortable: false, produkt: 'allgemein'},
                {key: 'individualKaufAnwendung', sortable: false, produkt: 'terraIndividual'},
                {key: 'individualStrassendatenProMonat', sortable: false, produkt: 'terraIndividual'},
                {key: 'schuelerASPKDO', sortable: false, produkt: 'terraSchueler'},
                {key: 'schuelerEigenerServer', sortable: false, produkt: 'terraSchueler'},
                {key: 'schulerStart4Punkt0', sortable: false, produkt: 'terraSchueler'}
            ],
            wartungsvertraegeList: null,
            newWartungsvertrag : {},
            produkteList: [],
            wartungsvertraegeItem: {},
            index: 0
        }
    },
    computed: {
      produkteListBFormOptions () {
          let result = this.produkteList.map(a => a.name)
          return result
      },
      fieldsTerraSchueler () {
          if ( this.fields === null ) {
              return null
          }
          let result = this.fields.filter( item => {
              if (item.produkt === 'allgemein' || item.produkt === 'terraSchueler') {
                  return true
              }})
          return result
      },
      fieldsTerraIndividual () {
          if ( this.fields === null ) {
              return null
          }
          let result = this.fields.filter( item => {
              if (item.produkt === 'allgemein' || item.produkt === 'terraIndividual') {
                  return true
              }})
          return result
      },
      fieldsTerraWeb () {
          if ( this.fields === null ) {
              return null
          }
          let result = this.fields.filter( item => {
              if (item.produkt === 'allgemein' || item.produkt === 'terraWeb') {
                  return true
              }})
          return result
      },
      wartungsvertraegeListTerraSchueler () {
          if ( this.wartungsvertraegeList === null ) {
              return null
          }
          let result = this.wartungsvertraegeList.filter( item => item.produkt === 'terraSchüler')
          return result
      },
      wartungsvertraegeListTerraIndividual () {
          if ( this.wartungsvertraegeList === null ) {
              return null
          }
          let result = this.wartungsvertraegeList.filter( item => item.produkt === 'terraIndividual')
          return result
      },
      wartungsvertraegeListTerraWeb () {
          if ( this.wartungsvertraegeList === null ) {
              return null
          }
          let result = this.wartungsvertraegeList.filter( item => item.produkt === 'terraWeb')
          return result
      }
    },
    methods: {
        async reload () {
            try {
                const response = await api
                    .get('/wartungsvertraege')
                this.wartungsvertraegeList = response.data
                this.submitCalculateResultToStore(response.data)
            } catch(err) {
                console.log(err)
            }
        },
        async submit() {
            const res = await api.post(`/wartungsvertraege`, this.newWartungsvertrag)
            if (res.status === 200) await this.reload()
            this.submitCalculateResult()
            
        },
        async updateItem(id, itemToUpdate) {
            const res = await api.put(`/wartungsvertraege/${id}`, itemToUpdate)
            if (res.status === 200) {
                await this.reload()
            }
            this.submitCalculateResult()
        },
      async loadItem(id) {
        const res = await api.get(`/wartungsvertraege/ID/${id}`)
        this.wartungsvertraegeItem = res.data
      },
      submitCalculateResult() {
        const total =  this.totalWartungsvertraege (this.wartungsvertraegeList)
        const totalCurrentYear = total.filter(item => item.jahr === this.$store.getters.jahr)
        this.$store.dispatch("updateWartungsvertraege", totalCurrentYear)
        total.forEach(async (item) => {
          const res = api.post(`/calculateResults`, item);
          if (res.status === 200) await this.reload();
        })
        //this.$emit('updateprodukte')
        //console.log("updateprodukte")
      },
      submitCalculateResultToStore(array) {
        const total = this.totalWartungsvertraege(array)
        const totalCurrentYear = total.filter(item => item.jahr === this.$store.getters.jahr)
        //console.log(totalCurrentYear)
        this.$store.dispatch("updateWartungsvertraege", totalCurrentYear)
        
        
      },
      totalWartungsvertraege () {
        if (!this.wartungsvertraegeList) {return 0}
        
        //Formats date of the array of objects to YYYY.
        let wartungsvertraegeListYear = this.wartungsvertraegeList.map(obj => {
          const container = {}
          container['jahr'] = new Date(obj['start']).getFullYear()
          container['monat'] = new Date(obj['start']).getMonth()
          container['proMonat'] = obj['proMonat'] ? obj['proMonat'] : 0
          container['einmaligeZahlung'] = obj['einmaligeZahlung'] ? obj['einmaligeZahlung'] : 0
          container['jahreswartung'] = obj['jahreswartung'] ? obj['jahreswartung'] : 0
          container['fixOderGeplant'] = obj['fixOderGeplant']
          container['produkt'] = obj['produkt']
          container['individualStrassendatenProMonat'] = obj['individualStrassendatenProMonat'] ? obj['individualStrassendatenProMonat'] : 0
          return container
        })

        //Create an object out of produktList
        let produkteListNull = {}
        this.produkteList.map( (item) => {
          produkteListNull[item.name] = 0
        })

        //Create Object which sums grouped by year and product
        const currentYear = new Date().getFullYear() //current year for using in reduce
        
        let summedByYear = wartungsvertraegeListYear.reduce((accumulator, object) => {
            if (object.fixOderGeplant === 'fix') {
                let i = 0
                for ( i=object.jahr; i <= currentYear; i++) {
                
                    if (!accumulator.some((item) => item.jahr === i )) {
                        accumulator.push({ jahr: i, kostenLeistung: 'wartungsvertraege', ...produkteListNull })
                }} 

                accumulator.forEach((item) => {
                        if (item.jahr === object.jahr ) {
                            item[object.produkt] = item[object.produkt] +  (12 - object.monat) * (object.proMonat + object.individualStrassendatenProMonat) + object.jahreswartung + object.einmaligeZahlung
                        } if (item.jahr > object.jahr) {
                            item[object.produkt] = item [object.produkt] + 12 * (object.proMonat + object.individualStrassendatenProMonat) + object.jahreswartung
                        }
                    }) 
                return accumulator
          
        } else {
                return accumulator
        }}, [])
        //console.log(summedByYear)
        return summedByYear
        
        //Promise.resolve('Success') //necessary??
      } 
    },
    async mounted () {
        api
          .get('/produkte')
          .then(response => (this.produkteList = response.data))
          .catch(error => console.log(error)),
       await this.reload ()
    }
}
</script>

<style scoped>

</style>