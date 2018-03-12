
// API KEY: 2I470YNU6UNHFZZ6

var apiKey = "2I470YNU6UNHFZZ6";
var portfolio = [];

function drawStock(stock){
    var portfolio = document.getElementById("portfolioTable");
    var colummn1 = "<td>"+stock.symbol+"</td>";
    var colummn2 = "<td>"+stock.company+"</td>";
    var colummn3 = "<td>"+stock.marketOpen+"</td>";
    var colummn4 = "<td>"+stock.dailyClose+"</td>";
    var colummn5 = "<td>"+stock.dailyChange+"</td>";
    var newRow = "<tr>" + colummn1 + colummn2 + colummn3 + colummn4 + colummn5 + "</td>";
    portfolio.innerHTML += newRow;
}

function launchMarketsPage(){
	location.assign("../html/Markets.html");
}

function loadPortfolio() {
	for (var i = 0; i < portfolio.length; i++) {
		drawStock(portfolio[i]);
	}
}

$(document).ready(function(){
    loadPortfolio();
});


