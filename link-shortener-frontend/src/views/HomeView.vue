<template>
  <form class="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
    <div class="py-6 px-4 sm:p-6 lg:pb-8">
      <div>
        <h2 class="text-lg leading-6 font-medium text-gray-900">Profile</h2>
        <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what
          you share.</p>
      </div>

      <div class="mt-6 flex flex-col lg:flex-row">
        <div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
          <p class="text-sm font-medium text-gray-700" aria-hidden="true">Photo</p>
          <div class="mt-1 lg:hidden">
            <div class="flex items-center">
              <div class="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                   aria-hidden="true">
                <img v-if="editUser.avatar" class="rounded-full h-full w-full"
                     :src="'http://localhost:8055/assets/' + editUser.avatar"
                     alt="">
              </div>
              <div class="ml-5 rounded-md shadow-sm">
                <div
                    class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                  <label for="mobile-editUser-photo"
                         class="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none">
                    <span>Change</span>
                    <span class="sr-only"> editUser photo</span>
                  </label>
                  <input id="mobile-editUser-photo" name="editUser-photo" type="file"
                         class="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md">
                </div>
              </div>
            </div>
          </div>

          <div class="hidden relative rounded-full overflow-hidden lg:block">
            <img v-if="editUser.avatar" class="relative rounded-full w-40 h-40"
                 :src="'http://localhost:8055/assets/' + editUser.avatar"
                 alt="">
            <label for="desktop-editUser-photo"
                   class="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100">
              <span>Change</span>
              <span class="sr-only"> editUser photo</span>
              <input type="file" id="desktop-editUser-photo" name="editUser-photo"
                     class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md">
            </label>
          </div>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-6">
          <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
          <input v-model="editUser.first_name" type="text" name="first-name" id="first-name"
                 autocomplete="given-name"
                 class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
        </div>

        <div class="col-span-12 sm:col-span-6">
          <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
          <input v-model="editUser.last_name" type="text" name="last-name" id="last-name"
                 autocomplete="family-name"
                 class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
        </div>

        <div class="col-span-12 ">
          <label for="email" class="block text-sm font-medium text-gray-700">E-Mail Adress</label>
          <input v-model="editUser.email" type="email" name="email" id="email" autocomplete="email"
                 class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
        </div>
      </div>
    </div>

    <!-- Privacy section -->
    <div class="pt-6 divide-y divide-gray-200">
      <div class="px-4 sm:px-6">
        <div>
          <h2 class="text-lg leading-6 font-medium text-gray-900">Privacy</h2>
          <p class="mt-1 text-sm text-gray-500">Configure your privacy settings</p>
        </div>
        <ul role="list" class="mt-2 divide-y divide-gray-200">
          <li class="py-4 flex items-center justify-between">
            <div class="flex flex-col">
              <p class="text-sm font-medium text-gray-900" id="privacy-option-1-label">Email Notification</p>
              <p class="text-sm text-gray-500" id="privacy-option-1-description">Allow Notifications via Email</p>
            </div>
            <button
                @click="editUser.email_notifications = !editUser.email_notifications"
                type="button"
                :class="{'bg-teal-500': editUser.email_notifications ?? false, 'bg-gray-200': !editUser.email_notifications ?? true}"
                class="ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                role="switch" :aria-checked="editUser.email_notifications ?? false" aria-labelledby="privacy-option-1-label"
                aria-describedby="privacy-option-1-description">
              <span aria-hidden="true"
                    :class="{'translate-x-5': editUser.email_notifications ?? false, 'translate-x-0': !editUser.email_notifications ?? true}"
                    class="inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
            </button>
          </li>
        </ul>

      </div>
      <div class="mt-4 py-4 px-4 flex justify-end items-center sm:px-6">
        <span class="text-sm text-gray-400" v-if="isDirty">You have unsaved changes!</span>
        <button @click="save()" type="button"
                class="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
          Save
        </button>
      </div>
    </div>
  </form>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";

let editUser = ref({});
let user = ref({});
let isDirty = ref(false);

watch(editUser, (to, from) => {
  Object.entries(to).toString() !== Object.entries(user.value).toString() ? isDirty.value = true : isDirty.value = false;
}, {
  deep: true
});

onMounted(() => {
  directus.users.me.read().then((me) => {
    editUser.value = JSON.parse(JSON.stringify(me));
    user.value = JSON.parse(JSON.stringify(me));
  })
})

const save = () => {
  directus.users.me.update({
    first_name: editUser.value.first_name,
    last_name: editUser.value.last_name,
    email: editUser.value.email,
    email_notifications: editUser.value.email_notifications
  }).then((_) => {
    editUser.value = _;
    user.value = _;
  })
}
</script>
