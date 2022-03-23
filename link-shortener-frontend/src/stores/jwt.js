import { defineStore } from 'pinia'

export const useJWTStore = defineStore('jwtStore', {
    state: () => {
        return {
            access_token: "",
            expires: 0,
            refresh_token: "",
        }
    }
})
