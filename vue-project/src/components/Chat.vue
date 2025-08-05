<template>
    <div v-if="store.loggedIn == false">
        <div>
        <h2>Please Login First!</h2>
        </div>
    </div>
    
    <div v-else>
        <h2 class="heading">Chat</h2>
        <div class="chat-container">
            <div class="chat-box">
                <div class="bot-message message">
                    <p>Welcome, how may I help you?</p>
                </div>
                <div class="user-message message">
                    <p>Hello</p>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Enter your message">
                <button class="send-button">Send</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useStore } from '@/stores/store';
import { onMounted } from 'vue';
import axiosRequest from '../../axios_api';

const store = useStore();

onMounted(() => {
    const response = axiosRequest.get("/generateDB");
})

</script>


<style scoped>
.heading{
    text-align: center;
}

.chat-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: burlywood;
    max-width: 900px;
    width: 90%;
    margin: 20px auto;
    padding: 1em;
    border-radius: 10px;
    box-sizing: border-box;
}

.chat-box{
    display: flex;
    flex-direction: column;
    width: 100%;
}

.bot-message{
    text-align: left;
    background-color: #FFFFFF;
    padding: 1em;
    margin-bottom: 10px;
    border-radius: 10px;
    align-self: flex-start;
    max-width: 80%;
    width: max-content;
}

.user-message{
    text-align: left;
    background-color: #FFFFFF;
    padding: 1em;
    margin-bottom: 10px;
    border-radius: 10px;
    align-self: flex-end;
    max-width: 80%;
    width: max-content;
}

.chat-input{
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    gap: 1em;
}

.chat-input input{
    width: 100%;
    padding: 1em;
    border-radius: 10px;
    box-sizing: border-box;
}

.send-button{
    font-size: 14px;
    border-radius: 10px;
    padding: 1em;
}
.send-button:hover{
    cursor: pointer;
}
</style>