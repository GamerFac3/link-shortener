<template>
  <nav
      class="bg-transparent relative z-10 border-b border-teal-500 border-opacity-25 lg:bg-transparent lg:border-none">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="relative h-16 flex items-center justify-between lg:border-b lg:border-sky-800">
        <div class="px-2 flex items-center lg:px-0">
          <div class="flex-shrink-0">
            <img class="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-teal-400.svg"
                 alt="Workflow">
          </div>
          <div class="hidden lg:block lg:ml-6 lg:space-x-4">
            <div class="flex">
              <router-link to="/"
                           :class="{'bg-black bg-opacity-25': route.name !== 'faq', 'hover:bg-sky-800': route.name === 'faq'}"
                           class="rounded-md py-2 px-3 text-sm font-medium text-white">Dashboard
              </router-link>
              <router-link to="/faq"
                           :class="{'bg-black bg-opacity-25': route.name === 'faq', 'hover:bg-sky-800': route.name !== 'faq'}"
                           class="rounded-md py-2 px-3 text-sm font-medium text-white">FAQ
              </router-link>

            </div>
          </div>
        </div>

        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <button
                  @click="mobileMenuIsOpen = !mobileMenuIsOpen"
                  type="button"
                  class="p-2 rounded-md inline-flex items-center justify-center text-sky-200 hover:text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>

            <svg :class="{'block': !mobileMenuIsOpen, 'hidden': mobileMenuIsOpen}" class="flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>

            <svg :class="{'block': mobileMenuIsOpen, 'hidden': !mobileMenuIsOpen}" class="flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="hidden lg:block lg:ml-4">
          <div class="flex items-center">
            <button type="button"
                    class="flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:outline-none focus:bg-sky-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-white">
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: outline/bell -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
            </button>

            <!-- Profile dropdown -->
            <div class="relative flex-shrink-0 ml-4">
              <div>
                <button
                        @click="userMenuIsOpen = !userMenuIsOpen"
                        type="button"
                        class="rounded-full flex text-sm text-white focus:outline-none focus:bg-sky-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-white"
                        id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <img class="rounded-full h-8 w-8"
                       src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80"
                       alt="">
                </button>
              </div>

              <Transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
              >
                <div v-show="userMenuIsOpen"
                     class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                     role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <!-- Active: "bg-gray-100", Not Active: "" -->
                  <a href="#" class="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabindex="-1"
                     id="user-menu-item-0">Your Profile</a>

                  <a href="#" class="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabindex="-1"
                     id="user-menu-item-1">Settings</a>

                  <button @click="logout()" class="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-show="mobileMenuIsOpen" class="bg-sky-900 lg:hidden" id="mobile-menu">
      <div class="pt-2 pb-3 px-2 space-y-1">
        <router-link to="/"
                     :class="{'bg-black bg-opacity-25': route.name !== 'faq', 'hover:bg-sky-800': route.name === 'faq'}"
                     class="bg-opacity-25 block rounded-md py-2 px-3 text-base font-medium text-white">Dashboard
        </router-link>
        <router-link to="/faq"
                     :class="{'bg-black bg-opacity-25': route.name === 'faq', 'hover:bg-sky-800': route.name !== 'faq'}"
                     class="block rounded-md py-2 px-3 text-base font-medium text-white">FAQ
        </router-link>
      </div>
      <div class="pt-4 pb-3 border-t border-sky-800">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img class="rounded-full h-10 w-10"
                 src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80"
                 alt="">
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">{{ user.first_name ?? '' }}</div>
            <div class="text-sm font-medium text-sky-200">{{ user.email ?? '' }}</div>
          </div>
          <button type="button"
                  class="ml-auto flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:outline-none focus:bg-sky-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-white">
            <span class="sr-only">View notifications</span>
            <!-- Heroicon name: outline/bell -->
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
          </button>
        </div>
        <div class="mt-3 px-2">
          <a href="#" class="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:text-white hover:bg-sky-800">Your Profile</a>

          <a href="#" class="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:text-white hover:bg-sky-800">Settings</a>

          <a @click.prevent="logout()" class="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:text-white hover:bg-sky-800">Sign out</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";

let route = useRoute();
let router = useRouter();

let user = ref({});

directus.users.me.read().then(me => {
  user.value = me;
}).catch(() => {
    router.push('/login');
});

let mobileMenuIsOpen = ref(false);
let userMenuIsOpen = ref(false);

const logout = () => {
  directus.auth.logout();
  router.push('/login');
};
</script>
