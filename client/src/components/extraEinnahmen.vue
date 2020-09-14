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
      <div>
  <!-- <b-button v-b-modal.modal-extra-einnahmen>Launch demo modal</b-button> -->

  <b-modal id="modal-extra-einnahmen" size="xl" title="Extra Einnahme" area-hidden="false" @ok="updateItem(extraEinnahmenItem._id, extraEinnahmenItem)">
  
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

    
    <b-table-simple striped hover >
      <b-thead>
        <b-tr>
          <b-th v-for="(field, index) in fields" :key="index">{{field.key}}</b-th>
          <b-th></b-th>
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
            <b-btn v-b-modal.modal-extra-einnahmen variant="info" :key="index" @click.prevent="loadItem(data._id)">Edit</b-btn>
          </b-th>
        </b-tr>

        <b-tr>
          <b-th v-for="(field, index) in fields" :key="index">
            <b-form-input v-if="field.key === 'preis'" v-model="newExtraEinnahme[field.key]" type="number" @click="submitCalculateResult"></b-form-input>
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
        extraEinnahmenItem: {},
        produkteList: []
      }
    },
    computed: {
      produkteListBFormOptions () {
          let result = this.produkteList.map(a => a.name)
          return result
      }
    },
    methods: {
      async reload () {
        try {
          const response = await api
            .get('/extraEinnahmen')
          this.extraEinnahmenList = response.data
          this.submitCalculateResultToStore(response.data)
        } catch(err) {
          console.log(err)
        }
      },
      async submit() {
        const res = await api.post(`/extraeinnahmen`, this.newExtraEinnahme)
        if (res.status === 200) await this.reload()
        this.submitCalculateResult()
        
      },
      async removeItem(id) {
        const res = await api.delete(`/extraeinnahmen/${id}`)
        if (res.status === 200) {
          alert(`Eintrag mit ID ${id} wurde gelöscht.`)
          await this.reload() 
          this.submitCalculateResult()
        }
        
      },
      async loadItem(id) {
        const res = await api.get(`/extraeinnahmen/ID/${id}`)
        this.extraEinnahmenItem = res.data
      },
      async updateItem(id, ItemToUpdate) {
        const res = await api.put(`/extraeinnahmen/${id}`, ItemToUpdate)
        if (res.status === 200) {
          await this.reload()
          this.submitCalculateResult()
        }
        //this.submitCalculateResult()
        //setTimeout(() => this.submitCalculateResult(), 2000)
        
        
      },
      submitCalculateResult() {
        const total =  this.totalExtraEinnahmen(this.extraEinnahmenList)
        const totalCurrentYear = total.filter(item => item.jahr === this.$store.getters.jahr)
        this.$store.dispatch("updateExtraEinnahmen", totalCurrentYear)
        total.forEach(async (item) => {
          const res = api.post(`/calculateResults`, item);
          if (res.status === 200) await this.reload();
        })
        
      },
      submitCalculateResultToStore(array) {
        const total = this.totalExtraEinnahmen(array)
        const totalCurrentYear = total.filter(item => item.jahr === this.$store.getters.jahr)
        //console.log(totalCurrentYear)
        this.$store.dispatch("updateExtraEinnahmen", totalCurrentYear)
        
        
      },
      totalExtraEinnahmen (extraEinnahmenListObject) {
        if (!this.extraEinnahmenList) {return 0}
        
        //Formats date of the array of objects to YYYY.
        let extraEinnahmenListYear = extraEinnahmenListObject.map(obj => {
          const container = {}
          container['jahr'] = new Date(obj['datumAbgeschlossen']).getFullYear()
          container['preis'] = obj['preis']
          container['produkt'] = obj['produkt']
          return container
        })

        //Create an object out of produktList. This object will be attached in reduce function in accumulator. this way there is never undefined in the product price in the reduce function.
        let produkteListNull = {}
        this.produkteList.map( (item) => {
          produkteListNull[item.name] = 0
        })
          
        //Create Object which sums grouped by year and product
        let summedByYear = extraEinnahmenListYear.reduce((accumulator, object) => { 
          
          if (!accumulator.some((item) => item.jahr === object.jahr )) { //if there is no property in the accumulator which is the same as the year property of the object
            accumulator.push({ jahr: object.jahr, kostenLeistung: 'extraEinnahmen', ...produkteListNull }) //then it will add another object in the accumulator array with year and all products. all producs have price = 0 as default.
         } 
          accumulator.forEach((item) => { //goes through accumulator and will add the price to the correct product.
              if (item.jahr === object.jahr ) {
                item[object.produkt] = item[object.produkt] + object.preis
              }
            })
          return accumulator
        }, [])
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
      await this.reload()
    },
    components: {
      //editExtraEinnahmen
    }
  }
</script>

<style scoped>

 
</style>