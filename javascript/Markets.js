
// API KEY: 2I470YNU6UNHFZZ6

var apiKey = "2I470YNU6UNHFZZ6";

function addStock(stock){
    portfolio.push(stock);
}

function enableCorsAccess(){
    var HttpRequest = new XMLHttpRequest();
    const proxyurl = "https://cors-anywhere.herokuapp.com//";
    const url = "http://d.yimg.com/autoc.finance.yahoo.com/autoc"; 
    HttpRequest.open("GET",url);
    HttpRequest.send();
    var data = JSON.parse(HttpRequest.responseText);
        console.log(data);
    
}

function getDailyStockData(symbol) {
	var HttpRequest = new XMLHttpRequest();
	HttpRequest.open("GET","https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+symbol+"&apikey="+apiKey, true);
	HttpRequest.send();
	HttpRequest.onreadystatechange = function(){
		onReadyState(this, symbol,"daily");
	}
}

function onReadyState(HttpRequest,symbol,type){
	if (HttpRequest.readyState == 4 && HttpRequest.status == 200){
    	var data = JSON.parse(HttpRequest.responseText);
    	console.log(data);
    	if(type == "daily"){
            var timeSeriesKey = Object.keys(data)[1];
            var timeSeries = data[timeSeriesKey];
            var timeKey = Object.keys(timeSeries)[0];
            console.log(timeSeries[timeKey]);
    		var marketOpen = parseFloat(timeSeries[timeKey]["1. open"]).toFixed(2);
    		var dailyHigh = parseFloat(timeSeries[timeKey]["2. high"]).toFixed(2);
    		var dailyLow = parseFloat(timeSeries[timeKey]["3. low"]).toFixed(2);
    		var dailyClose = parseFloat(timeSeries[timeKey]["4. close"]).toFixed(2);
    		var dailyChange = parseFloat(dailyClose - marketOpen).toFixed(2);
    		var newStock = new Stock(symbol, "company", marketOpen, dailyHigh, dailyLow, dailyClose, dailyChange);
    		console.log(newStock);
    		addStock(newStock);
    	}
        else if(type == "lookup"){

        }
    }
}


function searchStocks(){
    if (event.keyCode == 13) {
        var symbol = document.getElementById("searchBar").value;
        console.log("Search Symbol: " + symbol);
        symbolLookup(symbol);
    }
}

function symbolLookup(symbol){
    var HttpRequest = new XMLHttpRequest();
    HttpRequest.open("GET","http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=yhoo&region=1&lang=en&callback=YAHOO.Finance.SymbolSuggest.ssCallback");
    HttpRequest.send();
    HttpRequest.onreadystatechange = function(){
        onReadyState(this, symbol,"lookup");
    }
}

$(document).ready(function(){
    enableCorsAccess();
    //getDailyStockData("MSFT");
});