<template>
    <div class="navbar">
        <h2 class="navbar-options">
            <router-link to="/" class="navbar-route">Portfolio Analytics</router-link>
        </h2>

        <div class="navbar-options holdings">
            <router-link to="/holdings" class="nav-holdings navbar-route">Holdings</router-link>
        </div>

        <div class="navbar-options analyse">
            <router-link to="/analyse" class="nav-analyse navbar-route">Analyse</router-link>
        </div>

    </div>
</template>


<script setup>

</script>


<style scoped>
    .navbar{
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
    }

    .navbar-route{
        text-decoration: none;
        color: #000000;
    }

    .navbar-options{
        margin-left: 1em;
        margin-right: 1em;
    }
</style>
