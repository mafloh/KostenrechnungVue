<template>
  <div>
    <h2>Personal</h2>
    <div>
      <!-- <b-button v-b-modal.modal-personal>Launch demo modal</b-button> -->

      <b-modal
        id="modal-personal"
        size="xl"
        title="BootstrapVue"
        area-hidden="false"
        @ok="updateItem(personalItem._id, personalItem)"
      >
        <p class="my-4">
          <b-table-simple>
            <b-tr>
              <b-th v-for="(field, index) in fields" :key="index">{{field.key}}</b-th>
            </b-tr>
            <b-tr>
              <b-th v-for="(field, index) in fields" :key="index">
                <b-form-input
                  v-if="field.key === 'lohnGesamtProMonat'"
                  v-model="personalItem[field.key]"
                  type="number"
                ></b-form-input>
                <b-form-input
                  v-else-if="field.key === 'prozentWeb'"
                  v-model="personalItem[field.key]"
                  type="number"
                ></b-form-input>
                <b-form-input
                  v-else-if="field.key === 'prozentSchueler'"
                  v-model="personalItem[field.key]"
                  type="number"
                ></b-form-input>
                <b-form-input
                  v-else-if="field.key === 'prozentIndividual'"
                  v-model="personalItem[field.key]"
                  type="number"
                ></b-form-input>
                <b-form-datepicker
                  v-else-if="field.key === 'abDatum'"
                  v-model="personalItem[field.key]"
                ></b-form-datepicker>
                <b-form-datepicker
                  v-else-if="field.key === 'bisDatum'"
                  v-model="personalItem[field.key]"
                ></b-form-datepicker>
                <b-form-input v-else :placeholder="field.key" v-model="personalItem[field.key]"></b-form-input>
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
          <b-th></b-th>
        </b-tr>
      </b-thead>

      <b-tbody>
        <b-tr v-for="(data, index) in personalList" :key="index">
          <b-th  v-for="(field, index) in fields" :key="index">
            <span
              v-if="data[field.key] && field.key === 'abDatum'"
            >{{ new Date(data[field.key]).toLocaleDateString() }}</span>
            <span
              v-else-if="data[field.key] && field.key === 'bisDatum'"
            >{{ new Date(data[field.key]).toLocaleDateString() }}</span>
            <span v-else>{{data[field.key]}}</span>
          </b-th>

          <b-th>
            <b-btn
              v-b-modal.modal-personal
              variant="info"
              :key="index"
              @click.prevent="loadItem(data._id)"
               size="sm"
            >Edit</b-btn>
          </b-th>
        </b-tr>

        <b-tr>
          <b-th v-for="(field, index) in fields" :key="index">
            <b-form-input
              v-if="field.key === 'lohnGesamtProMonat'"
              v-model="newPersonal[field.key]"
              type="number"
            ></b-form-input>
            <b-form-input
              v-else-if="field.key === 'prozentWeb'"
              v-model="newPersonal[field.key]"
              type="number"
            ></b-form-input>
            <b-form-input
              v-else-if="field.key === 'prozentSchueler'"
              v-model="newPersonal[field.key]"
              type="number"
            ></b-form-input>
            <b-form-input
              v-else-if="field.key === 'prozentIndividual'"
              v-model="newPersonal[field.key]"
              type="number"
            ></b-form-input>
            <b-form-datepicker
              v-else-if="field.key === 'abDatum'"
              v-model="newPersonal[field.key]"
            ></b-form-datepicker>
            <b-form-datepicker
              v-else-if="field.key === 'bisDatum'"
              v-model="newPersonal[field.key]"
            ></b-form-datepicker>
            <b-form-input v-else :placeholder="field.key" v-model="newPersonal[field.key]"></b-form-input>
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
import api from "../api.js"

export default {
  name: "personal",
  data() {
    return {
      fields: [
        { key: "name", sortable: true },
        { key: "funktion", sortable: true },
        { key: "abDatum", sortable: false },
        { key: "bisDatum", sortable: true },
        { key: "lohnGesamtProMonat", sortable: false },
        { key: "prozentWeb", sortable: false },
        { key: "prozentSchueler", sortable: false },
        { key: "prozentIndividual", sortable: false },
      ],
      personalList: null,
      newPersonal: {},
      personalItem: {},
      produkteList: [],
    };
  },
  computed: {},
  methods: {
    async reload() {
      try {
        const response = await api.get("/personal")
        this.personalList = response.data
        this.submitCalculateResultToStore(response.data)
      } catch (err) {
        console.log(err);
      }
    },
    async submit() {
      const res = await api.post(`/personal`, this.newPersonal)
      if (res.status === 200) await this.reload()
      this.submitCalculateResult();
    },
    async removeItem(id) {
      const res = await api.delete(`/personal/${id}`);
      if (res.status === 200) {
        alert(`Eintrag mit ID ${id} wurde gelöscht.`);
        await this.reload();
        this.submitCalculateResult();
      }
    },
    async loadItem(id) {
      const res = await api.get(`/personal/ID/${id}`);
      this.personalItem = res.data;
    },
    async updateItem(id, ItemToUpdate) {
      const res = await api.put(`/personal/${id}`, ItemToUpdate);
      if (res.status === 200) {
        await this.reload();
        this.submitCalculateResult();
      }
      //this.submitCalculateResult()
      //setTimeout(() => this.submitCalculateResult(), 2000)
    },
    submitCalculateResult() {
      const total = this.totalPersonal(this.personalList)
      //console.log(this.personalList)
      const totalCurrentYear = total.filter(
        (item) => item.jahr === this.$store.getters.jahr
      )
      this.$store.dispatch("updatePersonal", totalCurrentYear)
      total.forEach(async (item) => {
        const res = api.post(`/calculateResults`, item)
        if (res.status === 200) await this.reload()
      })
    },
    
    async submitCalculateResultToStore(array) {
      const response = await api.get("/personal");
      this.personalList = response.data;
      const total = this.totalPersonal(array)
      const totalCurrentYear = total.filter(item => item.jahr === this.$store.getters.jahr)
      this.$store.dispatch("updatePersonal", totalCurrentYear)
    },
    totalPersonal (personalListObject) {
        if (!personalListObject) {return 0}
        //ok: console.log(personalListObject)
        
        //Formats date of the array of objects to YYYY.
        let personalListYear = personalListObject.map(obj => {
          const container = {}
          container['jahrStart'] = new Date(obj['abDatum']).getFullYear()
          container['jahrStop'] = new Date(obj['bisDatum']).getFullYear()
          container['monatStart'] = new Date(obj['abDatum']).getMonth()
          container['monatStop'] = new Date(obj['bisDatum']).getMonth()
          container['lohnGesamtProMonat'] = obj['lohnGesamtProMonat'] ? obj['lohnGesamtProMonat'] : 0
          container['terraWeb'] = obj['prozentWeb'] ? obj['prozentWeb'] : 0
          container['terraSchüler'] = obj['prozentSchueler'] ? obj['prozentSchueler'] : 0
          container['terraIndividual'] = obj['prozentIndividual'] ? obj['prozentIndividual'] : 0
          container['sonstige'] = 0
          return container
        })
         
        //Create an object out of produktList
        let produkteListNull = {}
        this.produkteList.map( (item) => {
          produkteListNull[item.name] = 0
        })

        //Create Object which sums grouped by year and product
        //const currentYear = new Date().getFullYear() //current year for using in reduce
        
        let summedByYear = personalListYear.reduce((accumulator, object) => {
          let i = 0
          for ( i=object.jahrStart; i <= object.jahrStop; i++) {
              if (!accumulator.some((item) => item.jahr === i )) {
                  accumulator.push({ jahr: i, kostenLeistung: 'personal', ...produkteListNull })
          }} 
          accumulator.forEach((item) => {
             if (item.jahr === object.jahrStart && !(item.jahr === object.jahrStop)  ) {
              let j = 0
              for (j = 0 ; j < this.produkteList.length; j ++) {
                item[this.produkteList[j].name] = item[this.produkteList[j].name] +  (12 - object.monatStart) * object.lohnGesamtProMonat * object[this.produkteList[j].name] * 0.01
              }
            }  if (item.jahr > object.jahrStart  && item.jahr < object.jahrStop ) {
                let j = 0
                for (j = 0 ; j < this.produkteList.length; j ++) {
                  item[this.produkteList[j].name] = item[this.produkteList[j].name] +  12 * object.lohnGesamtProMonat * object[this.produkteList[j].name] * 0.01
              }
            }   if (item.jahr === object.jahrStop && !(item.jahr === object.jahrStart) ) {
                let j = 0
                for (j = 0 ; j < this.produkteList.length; j ++) {
                  item[this.produkteList[j].name] = item[this.produkteList[j].name] +  (object.monatStop + 1) * object.lohnGesamtProMonat * object[this.produkteList[j].name] * 0.01
                }
              } if (item.jahr === object.jahrStop && item.jahr === object.jahrStart ) {
                let j = 0
                for (j = 0 ; j < this.produkteList.length; j ++) {
                  item[this.produkteList[j].name] = item[this.produkteList[j].name] +  (object.monatStop - object.monatStart + 1) * object.lohnGesamtProMonat * object[this.produkteList[j].name] * 0.01
                }
              } 
          }) 
          return accumulator
          
        }, [])
        return summedByYear
        
        //Promise.resolve('Success') //necessary??
      }
  },
  async mounted() {
    api
      .get("/produkte")
      .then((response) => (this.produkteList = response.data))
      .catch((error) => console.log(error)),
      await this.reload();
  },
};
</script>