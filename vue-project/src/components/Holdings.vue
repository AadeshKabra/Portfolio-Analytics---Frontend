<template>
  <h1 class="main-heading">Holdings</h1>

  <div class="container-wrapper">
    <div class="holdings" v-if="store.loggedIn">
      <h2 class="heading">Portfolio - Holdings</h2>
      <div v-for="holding in holdings.data" class="holding-wrapper">
        <div class="stock-card" @click="getStockNews(holding)">
          <div class="stock-details">
            <p class="stock-name">{{ holding.tradingsymbol }}</p>
            <p>{{ holding.exchange }}</p>
          </div>
          <div class="stock-details">
            <div class="stock-details-1">
              <p>QTY: {{ holding.quantity }}</p>
              <p>Avg. Price: {{ holding.average_price }}</p>
              <p class="profit-loss">P&L: {{ holding.pnl.toFixed(2) }}</p>
              
            </div>
            <div class="stock-details-2">
              <p class="last-price">LTP: {{ holding.last_price }}</p>
              <p>Daily Change: {{ holding.day_change.toFixed(2) }}</p>
              <p>Daily Change % : {{ holding.day_change_percentage.toFixed(2) }}</p>
            </div>
          </div>
        </div>
        <!-- <p>{{ holding }}</p> -->
      </div>
    </div>

    <div class="stock-data">
      <h2>Market News</h2>
      <div class="news-container" v-if="news.length>0">
        <div class="news-card" v-for="nCard in news">
          <div class="news-card-details">
            <img :src="nCard.thumbnail" alt="News" class="news-thumbnail">
          </div>
          <div class="news-card-details news-content">
            <p>{{ nCard.title }}</p>
            <p>Date: {{ nCard.date.split(",")[0] }}</p>
            <a :href="nCard.link" target="_blank">Know More...</a>
            <a class="news-source">Source: {{ nCard.source.name }}</a>
            <!-- <p>{{ nCard }}</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '@/stores/store'
import axiosRequest from '../../axios_api'

const store = useStore()
const holdings = ref([])
const news = ref([])
console.log(store.loggedIn)

onMounted(async () => {
  if (store.loggedIn) {
    const response = await axiosRequest.get('/holdings')
    holdings.value = response.data.holdings
    console.log(holdings.value);
  }

});


async function getStockNews(holding){
  console.log(holding.tradingsymbol);
  let stock = holding.tradingsymbol;
  const newsResponse = await axiosRequest.get("/stock_news", {params: {"stock": stock}});
  // console.log(newsResponse.data);
  news.value = newsResponse.data.News.slice(0,50);
}


</script>


<style scoped>
.main-heading{
  text-align: center;
}

.container-wrapper{
    display: flex;
    flex-direction: row;
    height: calc(100vh - 2em);
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
  overflow-y: auto;
}

.stock-data{
    width: 50%;
    overflow-y: auto;
}

.stock-card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2em;
  border: 2px solid #FFD700;
  border-radius: 10px;
  margin-top: 1em;
  background-color: white;
  color: #000000;
  
}

.stock-card:hover{
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  transform: translateY(-5px);
}

.holding-wrapper{
  width: 100%;;
}

.stock-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
}

.stock-details-1,
.stock-details-2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5em;
}

.stock-name{
  font-weight: bold;
  font-size: 1.2em;
}

.profit-loss{
  font-weight: bold;
  font-size: 1.2em;
}

.news-card{
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  border: 2px solid #FFD700;
  padding: 1em;
  gap: 1em;
  border-radius: 10px;
  margin-top: 1em;
  background-color: white;
  color: #000000;
}

.news-card:hover{
  cursor: pointer;
}

.news-thumbnail{
  height: 100px;
  width: 100px;
}

.news-source{
  text-align: right;
  margin-top: auto;
  align-self: flex-end;
  margin-left: 2em;
}
</style>
