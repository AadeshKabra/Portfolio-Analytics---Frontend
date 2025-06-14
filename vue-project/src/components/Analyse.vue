<template>
  <div v-if="store.loggedIn == false">
    <div>
      <h2>Please Login First!</h2>
    </div>
  </div>
  <div v-else>
    <h2>Analyse your Portfolio</h2>
    <div>
      <apexchart type="bar" height="350" :options="chartOptionsProfit" :series="chartSeriesProfit">
      </apexchart>
    </div>
    <div>
      <div>
        <label for="stockDropdown">Select Stock: </label>
        <select id="stockDropdown" v-model="selectedStock" @change="getStockHistoryPrices">
          <option v-for="stock in holdings" :key="stock.tradingsymbol" :value="stock.tradingsymbol">
            {{ stock.tradingsymbol }}
          </option>
        </select>
      </div>
      <apexchart type="area" height="450" :options="chartOptionsHistory" :series="chartSeriesHistory"></apexchart>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/stores/store'
import { onMounted, ref } from 'vue'
import axiosRequest from '../../axios_api'
// import ApexChart from 'vue3-apexcharts'

const store = useStore();

const holdings = ref([]);
const chartOptionsProfit = ref({});
const chartSeriesProfit = ref([]);

const historyStock = ref("");
const historyDates = ref([]);
const historyPrices = ref([]);
const chartOptionsHistory = ref({});
const chartSeriesHistory = ref([]);
const selectedStock = ref("");

// console.log(store.loggedIn)

onMounted(async () => {
  if (store.loggedIn) {
    const response = await axiosRequest.get('/holdings')

    holdings.value = response.data.holdings.data;
    if (holdings.value.length > 0) {
        formatHoldings();
        pnlChart();

        selectedStock.value = holdings.value[0].tradingsymbol;
        getStockHistoryPrices();
        areaChartHistory();
        // console.log(historyDates);

        pieChartSector();
    }
  }

});

function formatHoldings(){
    for(let i=0; i<holdings.value.length; i++){
        holdings.value[i].pnl = parseFloat(holdings.value[i].pnl).toFixed(2)
    }
}

const pnlChart = () => {
  chartSeriesProfit.value = [
    {
      name: 'Profit',
      data: holdings.value.map((stock) => stock.pnl),
    },
  ]
  
  chartOptionsProfit.value = {
    chart: {
      id: 'pnl-bar-chart',
      type: 'bar'
    },
    xaxis: {
      categories: holdings.value.map((stock) => stock.tradingsymbol),
    },
    title: {
      text: 'Profit per Stock',
      align: 'center',
    },
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#000000"]
      }
    },
  }
}

async function getStockHistoryPrices(){
  historyDates.value = [];
  historyPrices.value = [];
  const historicalData = await axiosRequest.get("/stock_history", {params: {"stock": selectedStock.value}});
  for(let i=0; i<historicalData.data.historicalData.length; i++){
      let date = historicalData.data.historicalData[i][0];
      let price = historicalData.data.historicalData[i][1];
      historyDates.value.push(date);
      historyPrices.value.push(price);
  }
  console.log(historyDates.value);

  areaChartHistory();
}

const areaChartHistory = () => {
  chartSeriesHistory.value = [
    {
      name: 'Stock Price History',
      data: historyPrices.value
    }
  ]

  chartOptionsHistory.value = {
    chart: {
      id: 'stock-history-chart',
      type: 'area'
    },
    xaxis: {
      categories: historyDates.value
    },
    title: {
      text: "Stock Price History",
      align: "center"
    },
    stroke: {
      curve: 'straight'
    },
    dataLabels: {
      enabled: true,
    }
  }

}

async function pieChartSector(){
  const response = await axiosRequest.get("/sector_pie_chart")
  console.log(response.data);
}

</script>

<style scoped>
#stockDropdown{
  font-size: 14px;

}
</style>
