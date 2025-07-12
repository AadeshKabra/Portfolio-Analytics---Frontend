<template>
  <div class="profile-form">

        <h1 id="login-heading">Your Personalized Zerodha Dashboard</h1>

        <div class="login-container" v-if="!isLoggedIn">
            <label>Zerodha Client Id </label>
            <input type="text" class="clientId" id="clientId" placeholder="AC4938">

            <button class="login-button" @click="login" id="login-button">Login</button>
        </div>

        <div v-else="">
            <h2>Functions...</h2>
        </div>
        
            
    </div>
</template>


<script setup>
    import { ref, onMounted } from 'vue';
    import axiosRequest from '../../axios_api';
    import { useStore } from '@/stores/store';

    let isLoggedIn = ref(false);
    const store = useStore();

    async function login(){
        
        let clientId = document.getElementById("clientId").value;
        store.login(clientId);

        const loginUrl = `${axiosRequest.defaults.baseURL}/login?client_id=${clientId}`;
        isLoggedIn = true;

        window.location.href = loginUrl
        
    }

    function checkLogin(){
        const token = localStorage.getItem('accessToken');
        const clientId = localStorage.getItem('clientId');

        if(token && clientId){
            isLoggedIn = true;
        }else{
            isLoggedIn = false;
        }
    }
    
    onMounted(() => {
        checkLogin();
    })



</script>


<style scoped>
    .login-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #login-heading{
        text-align: center;
    }
</style>
