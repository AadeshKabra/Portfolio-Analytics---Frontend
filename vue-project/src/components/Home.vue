<template>
    <h1 id="login-heading">Your Personalized Zerodha Dashboard</h1>
    <div class="profile-form">

        <div class="login-container" v-if="!isLoggedIn">
            <div class="zerodha-container">
                <label class="zerodha-label">Zerodha Client Id: </label>
                <input type="text" class="clientId" id="clientId" placeholder="AC4938">
            </div>

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
    .profile-form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh; 
    }

    .login-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid #00809D;
        width: 90vh;
        height: 40vh;
    }

    #login-heading{
        text-align: center;
    }

    .zerodha-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
    }

    .clientId{
        margin-left: 15px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #ccc;
        width: 200px;
    }

    .login-button{
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 18px;
        border-radius: 10px;
        background-color: #00809D;
        color: white;
        border: none;
        cursor: pointer;
    }
</style>
