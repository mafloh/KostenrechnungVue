<template>
   <div>
        <li v-if="name === produkt_id"> <!-- v-if: name und produkt_id(props die mit v-bind(doppelpunkt ist shorthand) vom produkte.vue kommt) -->
        {{ jahreskennzahl.produkt_id }} 
          {{ jahreskennzahl.jahr }} 
    </li>
    </div>
</template>

<script>
export default {
    name: 'jahreskennzahlItem',
    props: {
        jahreskennzahl: Object,
        name: String,
        produkt_id: String
    }
}
</script>