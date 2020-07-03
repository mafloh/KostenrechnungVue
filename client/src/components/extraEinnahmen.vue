<template>
    <div>
      
      
      <h2>Extra Einnahmen</h2>

feat: The new feature you're adding to a particular application
fix: A bug fix
style: Feature and updates related to styling
refactor: Refactoring a specific section of the codebase
test: Everything related to testing
docs: Everything related to documentation
chore: Regular code maintenance.

<br>
{{ totalExtraEinnahmen }}
{{ newExtraEinnahme }}



 

      <div>
  <!-- <b-button v-b-modal.modal-lg>Launch demo modal</b-button> -->

  <b-modal id="modal-lg" size="lg" title="BootstrapVue" aria-hidden="false" @ok="updateItem(extraEinnahmenItem._id, extraEinnahmenItem)">
  
    <p class="my-4">
      <b-table-simple>
        <b-tr>
          <b-th v-for="(field, index) in fields" :key="index">
              {{field.key}}
          </b-th>
        </b-tr>
        <b-tr>
            <b-th v-for="(field, index) in fields" :key="index">
              <b-form-input v-if="field.key === 'preis'" v-model="extraEinnahmenItem[field.key]" type="number"></b-form-input>
              <b-form-datepicker v-else-if="field.key === 'datumAbgeschlossen'" v-model="extraEinnahmenItem[field.key]"></b-form-datepicker>
              <b-form-select v-else-if="field.key === 'produkt'" v-model="extraEinnahmenItem[field.key]" :options="produkteListBFormOptions" ></b-form-select>
              <b-form-input v-else :placeholder="field.key"  v-model="extraEinnahmenItem[field.key]"></b-form-input>
            </b-th>
        </b-tr>
      </b-table-simple>
 
    </p>
  </b-modal>
</div>

    
    <b-table-simple striped hover>
      <b-thead>
        <b-tr>
          <b-th v-for="(field, index) in fields" :key="index">{{field.key}}</b-th>
          <b-th>Actions</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(data, index) in extraEinnahmenList" :key="index">
          <b-th v-for="(field, index) in fields" :key="index">
            <span v-if="data[field.key] && field.key === 'datumAbgeschlossen'">
              {{ new Date(data[field.key]).toLocaleDateString() }}
            </span>
            <span v-else>{{data[field.key]}}</span>
          </b-th>
          <b-th>
            <b-btn variant="danger" @click.prevent="removeItem(data._id)">Delete</b-btn>
          </b-th>
          <b-th>
            <b-btn v-b-modal.modal-lg variant="info" :key="index" @click.prevent="loadItem(data._id)">Edit</b-btn>
          </b-th>
        </b-tr>
        <b-tr>
          <b-th v-for="(field, index) in fields" :key="index">
            <b-form-input v-if="field.key === 'preis'" v-model="newExtraEinnahme[field.key]" type="number"></b-form-input>
            <b-form-datepicker v-else-if="field.key === 'datumAbgeschlossen'" v-model="newExtraEinnahme[field.key]"></b-form-datepicker>        
            <b-form-select v-else-if="field.key === 'produkt'" v-model="newExtraEinnahme[field.key]" :options="produkteListBFormOptions" ></b-form-select>
            <b-form-input v-else :placeholder="field.key"  v-model="newExtraEinnahme[field.key]"></b-form-input>
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
    name: 'extraEinnahmen',
    data() {
      return {
        sortBy: 'age',
        sortDesc: false,
        fields: [
          { key: 'kunde', sortable: true },
          { key: 'beschreibung', sortable: false },
          { key: 'idLexware', sortable: false },
          { key: 'produkt', sortable: true },
          { key: 'status', sortable: false },
          { key: 'datumAbgeschlossen', sortable: true },
          { key: 'preis', sortable: true },
          { key: 'verantwortlich', sortable: true },
        ],
        extraEinnahmenList: null,
        newExtraEinnahme: {},
        editEntryId: null,
        extraEinnahmenItem: {},
        produkteList: [],
        calculateExtraEinnahmen: []
        
      }
    },
    computed: {
      produkteListBFormOptions () {
          let result = this.produkteList.map(a => a.name)
          return result
      },
      totalExtraEinnahmen () {
        if (!this.extraEinnahmenList) {return 0}

        //Formats date of the array of objects to YYYY.
        let extraEinnahmenListYear = this.extraEinnahmenList.map(obj => {
          const container = {}
          container['jahr'] = new Date(obj['datumAbgeschlossen']).getFullYear()
          container['preis'] = obj['preis']
          container['produkt'] = obj['produkt']
          return container
        })

        //Create an object out of produktList
        let produkteListNull = {}
        this.produkteList.map( (item) => {
          produkteListNull[item.name] = 0
        })
          
        //Create Object which sums grouped by year and product
        let summedByYear = extraEinnahmenListYear.reduce((accumulator, object) => {
          
          if (!accumulator.some((item) => item.jahr === object.jahr )) {
            accumulator.push({ jahr: object.jahr, ...produkteListNull })
          } 
          accumulator.forEach((item) => {
              if (item.jahr === object.jahr /*&& Object.prototype.hasOwnProperty.call(item, object.produkt)*/) {
                item[object.produkt] = item[object.produkt] + object.preis
              }
            })
          return accumulator
        }, [])
        
        return summedByYear
        
      }
      
      
    },
    methods: {
      reload () {
        api
          .get('/extraEinnahmen')
          .then(response => {
            (this.extraEinnahmenList = response.data)
            })
          .catch(error => console.log(error)) 
        

      },
      async submit() {
        const res = await api.post(`/extraeinnahmen`, this.newExtraEinnahme);
        if (res.status === 200) this.reload();
        this.submitCalculateResult()
      },
      async removeItem(id) {
        const res = await api.delete(`/extraeinnahmen/${id}`);
        if (res.status === 200) {
          this.reload() 
          alert(`Eintrag mit ID ${id} wurde gelöscht.`);
        }
        this.submitCalculateResult()
      },
      async loadItem(id) {
        const res = await api.get(`/extraeinnahmen/ID/${id}`)
        this.extraEinnahmenItem = res.data
      },
      async updateItem(id, ItemToUpdate) {
        const res = await api.put(`/extraeinnahmen/${id}`, ItemToUpdate)
        if (res.status === 200) this.reload();
        this.submitCalculateResult()
        
      },
      async submitCalculateResult() {
        const res = await api.post(`/calculateResults`, this.totalExtraEinnahmen);
        if (res.status === 200) this.reload();
      } 
    },
    mounted () {
      this.reload(),
      api
          .get('/produkte')
          .then(response => (this.produkteList = response.data))
          .catch(error => console.log(error)),
      api
          .get('/calculateResults')
          .then(response => (this.calculateExtraEinnahmen = response.data))
          .catch(error => console.log(error))
      
    },
    components: {
      //editExtraEinnahmen
    }
  }
</script>

<style scoped>

 
</style>