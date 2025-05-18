<template>
  <div class="profile-form">
        <p id="error-message">Invalid Credentials. Please try again</p>
        <div class="profile-form-clientid">
            <label for="clientid">Client ID:</label>
            <input type="text" class="clientid" name="clientid" id="clientid" value="157212706">
        </div>

        <div class="profile-form-password">
            <label for="password">Password: </label>
            <input type="password" class="password" name="password" id="password" value="aadesh19">
        </div>

        <div class="profile-form-otp" id="profile-form-otp">
            <label for="otp">OTP: </label>
            <input type="text" class="otp" name="otp" id="otp">
        </div>

        <button class="otp-button" @click="getOTP" id="otp-button">Get OTP</button>

        <button class="login-button" @click="login" id="login-button">Login</button>
            
    </div>
</template>


<script setup>
    import { ref } from 'vue';
    import axiosRequest from '../../axios_api';

    let tokenId = ""

    async function getOTP(){
        const clientId = document.getElementById("clientid").value;
        const password = document.getElementById("password").value;
        const params = {
            clientid: clientId,
            password: password
        }
        const response = await axiosRequest.post("/otp", {params: params})
        
        console.log(response.data);

        if("error" in response.data){
            let errorMessage = document.getElementById("error-message");
            errorMessage.style.display = "block";
        }else{
            let otp = document.getElementById("profile-form-otp");
            otp.style.display = "block";

            let otpButton = document.getElementById("otp-button");
            otpButton.style.display = "none";

            let loginButton = document.getElementById("login-button");
            loginButton.style.display = "block";

            tokenId = response.data.tokenID;
        }
        // console.log(response.status)
    }

    async function login(){
        const otp = document.getElementById("otp").value;

        const response = await axiosRequest.post("/login", {"otp": otp, "tokenId": tokenId});

    }


</script>


<style scoped>
    .profile-form-otp{
        display: none;
    }

    .login-button{
        display: none;
    }

    #error-message{
        display: none;
        color: red
    }
</style>
