<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
           alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <form @submit.prevent.once="login()">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
              <div class="mt-1">
                <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
              </div>
            </div>

            <div class="mt-2">
              <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
              <div class="mt-1">
                <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                       required
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
              </div>
            </div>

            <div class="flex items-center justify-between mt-4">
              <div class="text-sm">
                <a href="#" class="font-medium text-sky-600 hover:text-sky-500"> Forgot your password? </a>
              </div>
            </div>

            <div>
              <button type="submit"
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500"> Or continue with </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button @click.once="login('google')" class="w-full inline-flex">
                <span class="sr-only">Sign in with Google</span>
                <img src="/assets/btn_google_signin_dark_normal_web.png" class="-mt-1" alt="Login with google">
              </button>
            </div>

            <div>
              <button @click.once="login('github')"
                      class="w-full inline-flex py-2 bg-[#333] text-white text-sm shadow-2xl shadow-[#333]">
                <span class="sr-only">Sign in with GitHub</span>
                <svg class="w-5 h-5 text-white ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clip-rule="evenodd"/>
                </svg>
                <span class="ml-2">Sign in with Github</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>
import {useJWTStore} from "../stores/jwt";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {maintainLogin} from "../domain/directus";

let router = useRouter();
let route = useRoute();
let email = ref('');
let password = ref('');

onMounted(() => {
  if (route.query.code) {
    window.location = "http://localhost:8055" + route.fullPath;
    fetch("http://localhost:8055" + route.fullPath).then(res => {
      if (res.ok) {
        res.json().then(data => {
          console.log(data);
        });
      }
    });
  }
});

let login = (provider = "") => {

  if (provider === "") {
    directus.auth.login({
      email: email.value,
      password: password.value
    }).then(res => {
      maintainLogin(res.expires);
      router.push("/");
    });

  } else {
    window.location.href = `http://localhost:8055/auth/login/${provider}`;
  }
}

</script>
