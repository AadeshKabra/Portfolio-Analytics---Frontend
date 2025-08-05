<template>
    <div v-if="store.loggedIn == false">
        <div>
            <h2>Please Login First!</h2>
        </div>
    </div>

    <div v-else>
        <div class="research-container" id="research-container">
            <h1>Research about a stock</h1>
            <input type="text" placeholder="Enter stock name: " class="search-stock" id="search-stock" />
            <button type="submit" class="search-button" @click="searchStock">Search</button>
        </div>

        <div class="search-results" id="search-results">
            <div v-for="(item, index) in searches" :key="index" class="search-item" @click="researchStock(item[0])">
                <p><b>{{ item[0] }}</b> {{ item[1] }}</p>
            </div>
        </div>

        <div class="stock-data">
            <h2>{{ stockInfo.shortName }}</h2>
            <p :class="{ collapsed: !expanded }">
                {{ stockInfo.longBusinessSummary }}
            </p>
            <button v-if="isLongText" @click="expanded = !expanded" class="read-more-btn">
                {{ expanded ? "Show less" : "Read more" }}
            </button>
        </div>

        <!-- <div class="stock-price-history">
            <apexchart type="area" height="450" :options="chartOptionsHistory" :series="chartSeriesHistory"></apexchart>
        </div> -->

        <!-- <div>
            <div class="stock-dividends">
                <h3>Dividends</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Dividend</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(entry, index) in stockDividends" :key="index">
                            <td>{{ entry.date }}</td>
                            <td>{{ entry.dividend }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div> -->

        <div>
            <h2 class="chatbot-heading">Chatbot</h2>
            <div class="chatbot-container">
                <div class="chatbot-chatbox">
                    <div class="chatbot-message">
                        <p>Hello, what can I help you about {{ stockName }}</p>
                    </div>
                </div>
                <div class="input-container">
                    <input type="text" placeholder="Enter your query: " class="search-input" id="search-input">
                    <button type="submit" class="search-chatbot-button" @click="sendQuery">Search</button>
                </div>
            </div>
        </div>
        <div class="chatbot-queries">
            <div v-for="index in queries.length" :key="index" class="query-item">
                <h3>{{ queries[index-1] }}</h3>
                <p>{{ answers[index-1] }}</p>
            </div>
        </div>
    </div>



</template>


<script setup>
import axiosRequest from '../../axios_api';
import { ref } from 'vue';
import { useStore } from '@/stores/store';

const store = useStore();

const expanded = ref(false);
const isLongText = ref(false);
const searches = ref([]);
const stockName = ref("");
const stockInfo = ref({});
const stockPrice = ref([]);
const stockDividends = ref([]);
const stockRecommendations = ref("");
const chartSeriesHistory = ref([]);
const chartOptionsHistory = ref({});
const stockDividendsData = ref({});
const queries = ref([]);
const answers = ref([])


// document.getElementById("stock-data").style.display = "none";
// document.getElementById("stock-price-history").style.display = "none";
// document.getElementById("stock-dividends").style.display = "none";


async function searchStock() {
    const stockName = document.getElementById("search-stock").value;
    if (stockName.length >= 3) {
        const response = await axiosRequest.get("/stock-search", { params: { "stock": stockName } });
        // console.log(response.data);

        const searchResults = document.getElementById("search-results");
        searchResults.style.display = "block";
        searches.value = response.data.companyNames;
    } else {
        alert("Please enter a valid stock name with more than 3 characters.")
    }
}

async function researchStock(stock) {
    document.getElementById("research-container").style.display = "none";
    document.getElementById("search-results").style.display = "none";
    // document.getElementById("stock-data").style.display = "block";
    stockName.value = stock;
    const response = await axiosRequest.get("/stock-research", { params: { "stockTicker": stock } });
    console.log(response.data.stockDividends);

    stockInfo.value = response.data.stockInfo;
    stockPrice.value = response.data.stockPrice;

    expanded.value = false;
    isLongText.value = stockInfo.value.longBusinessSummary && stockInfo.value.longBusinessSummary.length > 500;

    let dates = [];
    for (let i = 0; i < stockPrice.value.length; i++) {
        dates.push(stockPrice.value[i][0]);
    }

    let closingPrices = [];
    for (let i = 0; i < stockPrice.value.length; i++) {
        closingPrices.push(stockPrice.value[i][1]);
    }
    chartSeriesHistory.value = [
        {
            name: 'Stock Price History',
            data: stockPrice.value.map(item => ({
                x: item.Date,
                y: parseFloat(item.Close)
            }))
        }
    ]
    chartOptionsHistory.value = {
        chart: {
            id: 'stock-history-chart',
            type: 'area'
        },
        xaxis: {
            type: 'datetime'
        },
        title: {
            text: 'Stock Price History',
            align: 'center'
        },
        stroke: {
            curve: 'straight'
        },
        dataLabels: {
            enabled: false,
        }
    }

    
}

async function sendQuery() {
    let query = document.getElementById("search-input").value;
    const response = await axiosRequest.get("/stock-chatbot-query", { params: { "query": query, "stock": stockName.value } });
    console.log(response.data);
    queries.value.unshift(query);
    answers.value.unshift(response.data.response);
}

</script>


<style scoped>
.research-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.search-stock {
    border-radius: 20px;
    padding: 15px;
    width: 90vh;
    font-size: 24px;
    border: 1px solid #ccc;
    margin-top: 50px;
}

.search-button {
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 18px;
    margin-top: 2em;
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 10px;
    background-color: #00809D;
    color: white;
    border: none;
    cursor: pointer;
}

.search-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    gap: 1em;
    margin-top: 2em;
    margin: 0 auto;
}

.search-item {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 16px 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    width: 60%;
    transition: all 0.2s ease;
    cursor: pointer;
    margin-top: 1em;
}

.search-item:hover {
    background-color: #f1f1f1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.search-item p {
    margin: 0;
    font-size: 18px;
    font-family: 'Segoe UI', sans-serif;
    color: #333;
}

.stock-info p {
    transition: all 0.3s ease;
    white-space: pre-wrap;
    font-size: 16px;
    line-height: 1.5em;
}

.stock-data p.collapsed {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.stock-data {
    text-align: justify;
    width: 80%;
    margin: 2em auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.read-more-btn {
    margin-top: 0px;
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-weight: bold;
    padding: 0;
}

.stock-price-history {
    border: 2px solid red;
}

.chatbot-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90vh;
    margin: 0 auto;
}

.chatbot-heading{
    text-align: center;
    margin-top: 2em;
}

.chatbot-chatbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.search-input{
    width: 70vh;
    font-size: 20px;
    border-radius: 10px;
    padding: 10px;
}

.search-chatbot-button{
    font-size: 20px;
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
    height: 40px;
}

.chatbot-queries{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90vh;
    margin: 0 auto;
}
</style>