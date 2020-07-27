<template>
    <div>
        <h2>Personal</h2>
    <b-modal id="modal-personal" size="xl" title="Personal Eintrag ändern" area-hidden="false" @ok="updateItem(personalItem._id, personalItem)"></b-modal>

        

    </div>
</template>

<script>
import api from '../api.js'

export default {
    name: 'personal',
    data() {
        return {
            personalList: null,
            newPersonal: {},
            personalItem: {}
        }
    },
    methods: {
        async updateItem(id, ItemToUpdate) {
            const res = await api.put(`/extraeinnahmen/ID/${id}`)
            if (res.status === 200) {
                await this.reload()
                this.submitCalculateResults()
            }
        },
        submitCalculateResults() {

        }
    }
}
</script>