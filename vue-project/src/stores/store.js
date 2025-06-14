import { defineStore } from "pinia";

export const useStore = defineStore("user", {
    state: () => ({
        name: '',
        loggedIn: false,
    }),
    actions: {
        login(name){
            this.name = name;
            this.loggedIn = true;
        }
    },
    getters: {
        welcomeMessage: (state) => `Welcome, ${state.name}`
    },
    persist: {
        storage: sessionStorage
    }
})