<template>
  <h1 class="heading">Get your Holdings</h1>

  <div class="container-wrapper">
    <div class="holdings" v-if="store.loggedIn">
      <h2 class="heading">Portfolio - Holdings</h2>
      <div v-for="holding in holdings.data">
        <div class="stock-card">
          <p class="stock-name">{{ holding.tradingsymbol }}</p>
          <div class="stock-details">
            <div class="stock-details-1">
              <p>Exchange: {{ holding.exchange }}</p>
              <p>Quantity: {{ holding.average_price }}</p>
            </div>
            <div class="stock-details-2">
              <p>P&L: {{ holding.pnl.toFixed(2) }}</p>
              <p>Daily Change: {{ holding.day_change.toFixed(2) }}</p>
              <p>Daily Change % : {{ holding.day_change_percentage.toFixed(2) }}</p>
            </div>
          </div>
        </div>
        <!-- <p>{{ holding }}</p> -->
      </div>
    </div>

    <div class="stock-data">
      <h2>More Info...</h2>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '@/stores/store'
import axiosRequest from '../../axios_api'

const store = useStore()
const holdings = ref([])
console.log(store.loggedIn)

onMounted(async () => {
  if (store.loggedIn) {
    const response = await axiosRequest.get('/holdings')
    holdings.value = response.data.holdings
    console.log(holdings.value)
  }

//   let sampleStock = holdings.value[0].tradingsymbol;
//   const response = await axiosRequest.get("/stock_news", {params: {stock: sampleStock}})
//   console.log(response.data);


})
</script>


<style scoped>
.container-wrapper{
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 1rem;
    padding: 1rem;
    box-sizing: border-box;
}

.holdings {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1rem;
  width: 50%;
}

.stock-data{
    width: 50%;
}

.stock-card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.stock-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stock-details-1,
.stock-details-2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
