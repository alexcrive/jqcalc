$(document).ready(function(){

let	imgPath = $('.img-product img');
let	colorButton = $('#colorSelector .colorItem');

//color changing
colorButton.click(function() {
	let imgChange = $(this).attr('data-img-path');

	imgPath.fadeOut(300, function(){
		imgPath.attr('src', imgChange);
		imgPath.fadeIn(300);
	});
});

let productCountHolder = $('.product-count');
let productDeliveryHolder = $('.product-delivery');
let productPriceHolder = $('#productPrice');
let productPriceHolderUSD = $('#productPriceUSD');

// summ the result in rub
function priceCalc() {
	productNumbers = $('input[name=productCount]:checked', '#formCalc').val();
	productDelivers = $('input[name=delivery]:checked', '#formCalc').val();
	productNumbers = parseInt(productNumbers);
	productDelivers = parseInt(productDelivers);

	productPrice = parseInt(productPrice);
	productPrice = productNumbers +  productDelivers;

	productPriceHolder.text(spaceEveryThree(productPrice) + ' рублей');

};
// add  text for delivery
function deliveryText() {
	productDelivery = $('input[name=delivery]:checked + label', '#formCalc').text();
	productDeliveryHolder.text(productDelivery);
};
// add  text for count
function countText() {
	productCount = $('input[name=productCount]:checked + label', '#formCalc').text();
	productCountHolder.text(productCount);
};

// USD to RUB
let USDtoRub;

$.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function(data) {
    //$('#USD').text(data.Valute.USD.Value.toFixed(2));
    USDtoRub = data.Valute.USD.Value.toFixed(0);
	CalcUSDtoRub();
});
// rub / usd
function CalcUSDtoRub() {
	let priceUSD = productPrice / USDtoRub;
	productPriceHolderUSD.text(spaceEveryThree(priceUSD.toFixed(0)) + ' $')
}

//count with changing
priceCalc();
countText();
deliveryText();
CalcUSDtoRub();
$('#formCalc input').change(function(){
	priceCalc();
	countText();
	deliveryText();
	CalcUSDtoRub();
});





//func for spacing between every 3 sym
function spaceEveryThree(num) {
    var n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
}

});