<template>
    <div>
      <h2>Extra Einnahmen</h2>
    <!--<b-table 
      striped hover 
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :items="extraEinnahmenList"
      >
    </b-table> -->
    <b-table-simple>
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
        </b-tr>
        <b-tr>
          <b-th v-for="(field, index) in fields" :key="index">
            <b-form-datepicker v-if="field.key === 'datumAbgeschlossen'" v-model="newExtraEinnahme[field.key]"></b-form-datepicker>
            <b-form-input v-else :placeholder="field.key" v-model="newExtraEinnahme[field.key]"></b-form-input>
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
  import api from '../api.js';

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
        newExtraEinnahme: {}
      }
    },
    methods: {
      reload () {
        api
          .get('/extraEinnahmen')
          .then(response => (this.extraEinnahmenList = response.data))
          .catch(error => console.log(error))

          console.log(this.extraEinnahmenList)
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
    }
  }
</script>