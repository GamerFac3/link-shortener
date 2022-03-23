<template>
  <div class="lg:col-span-9 py-6 px-4 sm:p-6 lg:pb-8">
    In {{ counter }} Sekunden wirst du zu "{{ redirectUrl }}" weitergeleitet.
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const counter = ref(0);
const redirectUrl = ref("");

onMounted(() => {
  const redirectCode = route.params.redirect[0];

  directus.graphql.items(`{short_codes (filter: { code: { _eq: "${redirectCode}"} }) {redirect_to} }`).then(response => {
    redirectUrl.value = response.data.short_codes[0].redirect_to;

    for(let i = 5; i >= 0; i--) {
      setTimeout(() => {
        counter.value = i;
      }, 1000 * i);
    }

    setTimeout(() => {

      window.location = response.data.short_codes[0].redirect_to;

    }, 5000);
  });



});

</script>

<style scoped>

</style>
