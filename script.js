// tabs
let tabs = $('.tab');
let currentTab = 0;


// slider config
let currentSlide = 1;
let width = 840;
let slideSpeed = 500;

let $slideContainer = $('#slider-holder')
let $slides = $slideContainer.find('li');
let amount = $slides.length-1;

let $indicators = $('#slider-indicator span');
console.log($indicators);



//Showing first tab
showTab(currentTab);



//SLIDER NAVIGATION
$('#slide-next').click(function(){
	currentSlide++;
	if(currentSlide == amount+1){
		currentSlide = 0;
		$slideContainer.animate({'margin-left':'0'}, slideSpeed);
	} else {
		$slideContainer.animate({'margin-left':'-='+width}, slideSpeed);
	}
	sliderIndicators(currentSlide);
	lastSlide(currentSlide);
});

$('#slide-prev').click(function(){
	currentSlide--;
	if(currentSlide < 0){
		currentSlide = amount;
		$slideContainer.animate({'margin-left':-(width*amount)}, slideSpeed);
	} else {
		$slideContainer.animate({'margin-left':'+='+width}, slideSpeed);
	}
	sliderIndicators(currentSlide);
	lastSlide(currentSlide);
});




// FORM NAVIGATION
$('#next').click(function(){
  tabs.eq(currentTab).toggleClass('hidden');
  currentTab += 1;
  showTab(currentTab);
});

$('#back').click(function(){
  tabs.eq(currentTab).toggleClass('hidden');
  currentTab -= 1;
  showTab(currentTab);
});




//FORM VALIDATION
// valid if all fields are filled and any medal selected
function validateForm() {
	var valid = true;
	let fields = $('.form-fields input');
	let checks = $('input[name="vet"]').serializeArray();

	if(checks.length === 0){
		valid = false;
	}
	for (i = 0; i < fields.length; i++) {
		if (fields[i].value == ''){
			valid = false;
		}
	}
	return valid;
}



//FORM SUBMIT
$( '#signUp-form-from' ).submit(function( event ) {
	event.preventDefault();

	//GETTING INPUT VALUES
	var values = {};
	$.each($('#signUp-form-from').serializeArray(), function(i, field) {
		values[field.name] = field.value;
	});
	//====================

	$('#signUp-form-from,#heading,#paydetails').addClass('hidden');
	$('#container').toggleClass('result-bg');
	if(validateForm()){
		$('#result-true').removeClass('hidden');
	} else{
		$('#result-false').removeClass('hidden');
	}
});



//BACK to FORM
$('#retry').click(function(){
	$('#result-false').addClass('hidden');
	$( '#signUp-form-from,#heading' ).removeClass('hidden');
	$('#container').toggleClass('result-bg');

	currentTab = 1;
	showTab(currentTab);
});


// FUNCTIONS
function showTab(n) {
	tabs.eq(n).toggleClass('hidden');
	console.log(n);
	if(n == 0){
		$('#back').addClass('hidden');
		$('#next').text('Skip');
		currentSlide = 0;
		sliderIndicators(currentSlide);
		$slideContainer.css('margin-left','0');
	} else if(n == 3){
		$('#next').addClass('hidden');
		$('#submit').removeClass('hidden');
	} else{
		$('#back,#next').removeClass('hidden');
		$('#next').text('Next');
		$('#submit').addClass('hidden');
	}
}

function sliderIndicators(n){
	$('#slider-indicator span').removeClass('active');
	let currentInd = $('#slider-indicator span').eq(n);
	currentInd.toggleClass('active');
}
function lastSlide(n){
	if(n == amount){
		$('#next').text('Sign Up');
	}
}
