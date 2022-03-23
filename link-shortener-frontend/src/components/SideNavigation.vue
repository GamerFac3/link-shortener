<template>
  <aside class="py-6 lg:col-span-3">
    <nav class="space-y-1">
      <router-link to="/"
         :class="{'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700': route.name === 'home', 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900': route.name !== 'home'}"
         class="group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
         aria-current="page">

        <svg
            :class="{'text-teal-500 group-hover:text-teal-500': route.name === 'home', 'text-gray-400 group-hover:text-gray-500': route.name !== 'home'}"
            class="flex-shrink-0 -ml-1 mr-3 h-6 w-6"
             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="truncate"> Profile </span>
      </router-link>

      <router-link to="/my-links"
         :class="{'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700': route.name === 'my-links', 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900': route.name !== 'my-links'}"
         class="group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
         aria-current="page">

        <svg :class="{'text-teal-500 group-hover:text-teal-500': route.name === 'my-links', 'text-gray-400 group-hover:text-gray-500': route.name !== 'my-links'}"
             class="flex-shrink-0 -ml-1 mr-3 h-6 w-6"
             xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span class="truncate"> My Links </span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import {useRoute} from "vue-router";

let route = useRoute();
</script>

<style scoped>

</style>
