<?php 
include('simple_html_dom.php');

try{
	$myPortfolioPage = file_get_html('../html/MyPortfolio.html');
	echo $myPortfolioPage;
	$portfolioTable = $myPortfolioPage->find('div[id=portfolioTableDiv]');
	echo $portfolioTable[0];
}
catch (Exception $e) 
{ 
    print "Error: " . $e->getMessage() . "\r\n";
} 

?> 
