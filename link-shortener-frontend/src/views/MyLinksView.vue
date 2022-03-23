<template>
  <div class="lg:col-span-9 py-6 px-4 sm:p-6 lg:pb-8">

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md mt-4">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="code in shortCodes">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex flex-col lg:flex-row flex-col-reverse lg:items-center lg:justify-between">
              <div class="flex items-baseline cursor-pointer"
                   @click="copyToClipboard('https://' + code.domain.name + '/' + code.code); animateCopy($event)">
                <p class="text-sm">{{ code.domain.name }} /</p>
                <p class="text-sm font-medium text-sky-600 ml-1">{{ code.code }}</p>
                <p class="text-[9px] text-gray-400 ml-2 hidden lg:block">click to copy</p>
              </div>
              <div class="ml-0 lg:ml-2 mb-2 lg:mb-0 flex-shrink-0 flex">
                <p
                    :class="{'bg-green-100 text-green-800': code.domain.available, 'bg-red-100 text-red-800': !code.domain.available}"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  <span v-if="code.domain.available">Active</span>
                  <span v-if="!code.domain.available">Disabled</span>
                </p>
                <p
                    v-if="code.domain.premium"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ml-2 bg-violet-200 text-violet-900">
                  <span>Premium</span>
                </p>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  <!-- Heroicon name: solid/users -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                  </svg>
                  {{ code.domain.name }}
                </p>
                <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <!-- Heroicon name: solid/location-marker -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                  <a :href="code.redirect_to" target="_blank"
                     class="border-b border-gray-700 border-dotted hover:border-transparent truncate">{{
                      code.redirect_to
                    }}</a>
                </p>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <!-- Heroicon name: solid/calendar -->
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"/>
                </svg>
                <p>
                  Created on
                  <time datetime="2020-01-14">{{
                      (new Date(code.date_created)).getDay() + '.' + (new Date(code.date_created)).getMonth() + '.' + (new Date(code.date_created)).getFullYear()
                    }}
                  </time>
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div
        v-if="draftMode"
        class="bg-white shadow sm:rounded-md mt-4">
      <div class="px-4 py-4 sm:px-6">

        <div>
          <label for="combobox" class="block text-sm font-medium text-gray-700 sr-only">Choose domain</label>
          <div class="relative mt-1" @click="domainSelectOpen = !domainSelectOpen">
            <input id="combobox" type="text" :value="selectedDomain?.name"
                   class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                   role="combobox" aria-controls="options" aria-expanded="false" autocomplete="off" disabled>
            <button type="button"
                    class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <!-- Heroicon name: solid/selector -->
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                   fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"/>
              </svg>
            </button>

            <ul v-if="domainSelectOpen"
                class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                id="options" role="listbox">

              <li
                  v-for="domain in domains"
                  @click="selectedDomain = domain"
                  class="hover:text-white hover:bg-sky-600 relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                  id="option-0" role="option"
                  tabindex="-1">
                <div class="flex items-center">

                  <span :class="{'bg-pruple-400': domain.premium, 'bg-blue-400': !domain.premium}"
                        class="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-purple-400" aria-hidden="true"></span>
                  <!-- Selected: "font-semibold" -->
                  <span :class="selectedDomain?.id === domain.id" class="ml-3 truncate">
            {{ domain.name }}
            <span class="sr-only" v-if="domain.premium"> is premium</span>
          </span>
                </div>

                <!--
                  Checkmark, only display for selected option.

                  Active: "text-white", Not Active: "text-sky-600"
                -->
                <span v-if="selectedDomain?.id === domain.id"
                      :class="{'text-white': selectedDomain?.id === domain.id, 'text-sky-600': selectedDomain?.id !== domain.id}"
                      class="absolute inset-y-0 right-0 flex items-center pr-4">
          <!-- Heroicon name: solid/check -->
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
               aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"/>
          </svg>
        </span>
              </li>

            </ul>
          </div>
        </div>


        <div>
          <label for="redirect_to" class="block text-sm font-medium text-gray-700 sr-only">Redirect Link</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
            </div>
            <input type="text" name="redirect_to" id="redirect_to" v-model="redirectTo"
                   class="focus:ring-sky-500 focus:border-sky-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                   placeholder="https://google.com">
          </div>
        </div>

        <button @click="save()" type="button"
                class="mt-2 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
          Save
        </button>

      </div>
    </div>

    <button v-if="!draftMode" @click="draftMode = !draftMode" type="button"
            class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg py-3 mt-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24"
           stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span class="mt-2 block text-sm font-medium text-gray-500"> Create a new shortlink </span>
    </button>

  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
let shortCodes = ref([])
let domains = ref([])

let draftMode = ref(false);
let domainSelectOpen = ref(false);
let selectedDomain = ref();
let redirectTo = ref("");

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
};

const animateCopy = (e) => {
  e.target.classList.add('animate-pulse');
  setTimeout(() => {
    e.target.classList.remove('animate-pulse');
  }, 1000);
};

const save = () => {
  let code = "";
  directus.users.me.read().then(me => {
    code = me.id.split('-')[2] + me.id.split('-')[3]
    code += SparkMD5.hash(new Date().valueOf() + "").substring(0, 6)

    directus.items('short_codes').createOne({
      domain: selectedDomain.value.id,
      redirect_to: redirectTo.value,
      code
    }).then(res => {
      console.log(res)
      res.domain = selectedDomain.value;
      res.domain.available = true;
      shortCodes.value.push(res)
      draftMode.value = false;
      selectedDomain.value = undefined;
      redirectTo.value = "";
    })
  })
}

onMounted(() => {
  directus.graphql.items('{short_codes {id, domain { id, name, available, premium }, code, redirect_to, date_created}}').then(res => {
    shortCodes.value = res.data.short_codes
  })

  directus.graphql.items('{Domains (filter: { available: { _eq: true} }, sort: ["-premium", "name"]) {id, name, premium}}').then(res => {
    domains.value = res.data.Domains
  })
});
</script>

<style scoped>


</style>

