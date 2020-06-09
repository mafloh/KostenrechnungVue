<template>
    <div>
      
      
      <h2>Extra Einnahmen</h2>

 

      <div>
  <b-button v-b-modal.modal-1>Launch demo modal</b-button>

  <b-modal id="modal-1" title="BootstrapVue">
    <p class="my-4">Hello from modal!</p>
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
            <b-btn variant="info" @click.prevent="showEditEntry = true">Edit</b-btn>
          </b-th>
        </b-tr>
        <b-tr>
          <b-th v-for="(field, index) in fields" :key="index">
            <b-form-input v-if="field.key === 'preis'" v-model="newExtraEinnahme[field.key]" type="number"></b-form-input>
            <b-form-datepicker v-else-if="field.key === 'datumAbgeschlossen'" v-model="newExtraEinnahme[field.key]"></b-form-datepicker>
            <b-form-input v-else :placeholder="field.key"  v-model="newExtraEinnahme[field.key]"></b-form-input>
          </b-th>
          <b-th>
            <b-btn variant="success" @click.prevent="submit">Submit</b-btn>
          </b-th>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    {{ editExtraEinnahmen }}
  </div>
  
</template>

<script>
  import api from '../api.js'
  //import editExtraEinnahmen from './editExtraEinnahmen.vue'

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
        showEditEntry: false
        
      }
    },
    methods: {
      reload () {
        api
          .get('/extraEinnahmen')
          .then(response => (this.extraEinnahmenList = response.data))
          .catch(error => console.log(error)) 
      },
      async submit() {
        const res = await api.post(`/extraeinnahmen`, this.newExtraEinnahme);
        if (res.status === 200) this.reload();
      },
      async removeItem(id) {
        const res = await api.delete(`/extraeinnahmen/${id}`);
        if (res.status === 200) this.reload();
      }
    },
    mounted () {
      this.reload()
    },
    components: {
      //editExtraEinnahmen
    }
  }
</script>