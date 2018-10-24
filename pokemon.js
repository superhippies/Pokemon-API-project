//Poke Stuff
var pokemonData;
var api =  "https://pokeapi.co/api/v2/";
var pokemonAPI= "pokemon";
var pokeNum= ["/1/","/2/","/3/","/4/"];
var typeAPI= "type";
var typeNum = ["/12/","/10/","/11/","/13/","/3/"];
var pokemonSelect;
var randomZip;
var pokeNumber=0;
var pokemonURL;
var pokeName;
var backButton;
var xloc;
var yloc;
var ySpeed;
var canvas;
var writePoke= false;
var clearSky= false;
var clouds= false;
var pokeGrass;
var pokeWater;
var pokeFire;
///Weather Stuff
var weatherData;
var weatherURL="https://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=cf144e877d9f3c867469cb128b66b346";
//Picture Stuff
var pokePath;
var bg;
//Other 
var x=[];
var y=[];
var xSped=[];
var ySped=[];

function preload(){
pokeSea= loadImage("./images/pokesea.png");
pokeDesert= loadImage("./images/desert.png");
pokePath= loadImage("./images/pokepath.png");
pokeBeach= loadImage("./images/pokebeach.png");
pokeCenter= loadImage("./images/pokeCenter.png");
pokeCave= loadImage("./images/pokecave.png");
pokeThunder= loadImage("./images/thunderstorm.png");
pokeTallGrasses= loadImage("./images/pokegrasses.png");
pokeClouds= loadImage("./images/clouds.png");
pokeFog= loadImage("./images/fog.png");
fireType= loadImage("./pokeTypes/firetype.png");
grassType= loadImage("./pokeTypes/grasstype.png");
waterType= loadImage("./pokeTypes/watertype.png");
flyingType= loadImage("./pokeTypes/flying.png");
electricType= loadImage("./pokeTypes/electrictype.png");
loadJSON(weatherURL,gotWeatherData);
}
function setup(){
	xloc= windowWidth/2;
	yloc= 200;
randomZip =random(0,70000);
canvas=createCanvas(windowWidth, windowHeight);
canvas.style("z-index","-1");
canvas.position(0,0);
ySpeed = 2; 
pokeSetup();
}
function pokeSetup(){
backButton=createButton("Back");
backButton.hide();
bg=pokeCenter;
pokemonSelect=createSelect();
pokemonSelect.position(windowWidth/2,10);
pokemonSelect.size(300);
pokemonSelect.option("Pick a Poke");
pokemonSelect.option("Grass");
pokemonSelect.option("Fire");
pokemonSelect.option("Water");
pokemonSelect.option("Electric");
pokemonSelect.option("Flying");
pokemonSelect.changed(changePokemon);
}

function changePokemon(){
	pokemonSelect.hide();
	backButton.show();
	backButton.position(windowWidth/2, 150);
	backButton.mouseClicked(pokeSetup);
	if (pokemonSelect.value()=="Grass"){	
		pokeNumber= typeNum[0];
		writePoke= true;
		pokeGrass = true;
		pokeWater= false;
		pokeFire=false;
		pokeElectric=false;
		pokeFlying=false;
	}if (pokemonSelect.value()=="Fire"){
		pokeNumber= typeNum[1];
		writePoke= true;
		pokeGrass = false;
		pokeWater= false;
		pokeFire=true;
		pokeElectric=false;
		pokeFlying=false;
		//randFire();
	}if (pokemonSelect.value()=="Water"){
		pokeNumber= typeNum[2];
		writePoke= true;
		pokeGrass = false;
		pokeWater= true;
		pokeFire=false;
		pokeElectric=false;
		pokeFlying=false;	
	}if (pokemonSelect.value()=="Electric"){
		pokeNumber= typeNum[3];
		pokeElectric= true;
		pokeGrass = false;
		pokeWater= false;
		pokeFire=false;
		pokeElectric=false;
		pokeFlying=false;
		writePoke= true;
	}if (pokemonSelect.value()=="Flying"){
		pokeNumber= typeNum[4];
		pokeFlying= true;
		pokeGrass = false;
		pokeWater= false;
		pokeFire=false;
		pokeElectric=false;
		pokeFlying=false;
		writePoke=true;
	}
var pokemonURL= api+typeAPI+pokeNumber;
loadJSON(pokemonURL,gotPokemonData);
}


function gotWeatherData(data1){
	weatherData=data1;
	//console.log(weatherData);
// 	console.log(weatherData.weather[0].description);
// 	console.log(weatherData.main.temp);
// 	console.log(weatherData.wind.speed); 
}
function gotPokemonData(data2){
	pokemonData=data2;
	console.log(pokemonData);
	 console.log(pokemonData.pokemon.length);
	 for(var j=0; j < 20; j++){
	 	x[j]= random(width);
	 	y[j]= random(height);
	 	xSped[j]= random(-2,2);
	 	ySped[j]= random(-2,2);
	 	
	 		var randPoke = int(random(0, pokemonData.pokemon.length));

			//console.log(pokemonData.pokemon[randPoke].pokemon.name);	 
	 	}
}
// function randFire(){

	
// }
// function weatherCheck(){
// 	if (weatherData.weather[0].description=="clear sky"){
// 		clearSky=true;
// 	}
// 	if (weatherData.weather[0].description== "scattered clouds"){
// 		scatCloud=true;
// 	}
// }
function pokeCheck(){
	if (pokeFire==true && weatherData.weather[0].main == "clear sky"){
		bg=0;
		console.log("pokeCheck!!!"); 
	}
}
function draw(){
background(bg);
console.log(weatherData.weather[0].main);
fill(255);
if (pokemonData){
	
	if (writePoke == true){
	for (var i = 0; i < pokemonData.pokemon.length; i++) {
		var pokeNames = pokemonData.pokemon[i].pokemon.name;
		var weatherType= weatherData.weather[0].main;
		//weatherName=text(weatherType, x[i],y[i]+50);
		pokeName=text(pokeNames,x[i],y[i]+75);
		pokemonWeatherCheck();
		x[i]= xSped[i]+x[i];
		y[i]=ySped[i]+y[i];
		
		if (y[i] >= windowHeight-25 || y[i] <= 25){
			ySped[i]*=-1;
			}
		if (x[i]>=windowWidth-25|| x[i]<=25){
			xSped[i]*=-1;
				}
			}
		}
	}
}
function pokemonWeatherCheck(){
	if (pokeGrass == true){
		grass();
	}
	if(pokeFire == true){
		fire();  
	} 
	if (pokeWater == true){
		water();
	}
	if (pokeElectric== true){
		electric();
	}
	if (pokeFlying== true){
		flying();
	}
}
function grass(){
	if (weatherData.weather[0].main == "clear sky"){
		bg=pokePath;
		for (var i = 0; i < pokemonData.pokemon.length; i++) {
			image(grassType, x[i],y[i],50,50);
		}
	}
		 if(weatherData.weather[0].main == "Rain"){
		bg=pokegrasses
		for (var i = 0; i < pokemonData.pokemon.length; i++) {
			image(grassType, x[i],y[i],50,50);
			}
		}
		else {
			bg = 0;
			text("There are no pokemon in the area",windowWidth/2,windowHeight/2)
		}
	
}
function fire(){
	if (weatherData.weather[0].main == "clear sky"){
		bg=pokeDesert;
		for (var i = 0; i < pokemonData.pokemon.length; i++) {
			image(fireType, x[i],y[i],50,50)	
		} 
	}if(weatherData.weather[0].main == "Rain"){
		bg=pokegrasses
		for (var i = 0; i < pokemonData.pokemon.length; i++) {
			image(fireType, x[i],y[i],50,50);
			}
		}
		else {
			bg = 0;
			text("There are no pokemon in the area",windowWidth/2,windowHeight/2)
		}
	
	
}
function water(){
	if (weatherData.weather[0].main == "clear sky"){
		bg=pokeBeach;
		for (var i = 0; i < pokemonData.pokemon.length; i++) {
			image(waterType, x[i],y[i],50,50)	
		}
	}
		 if(weatherData.weather[0].main == "Rain"){
		bg=pokegrasses
		for (var i = 0; i < pokemonData.pokemon.length; i++) {
			image(grassType, x[i],y[i],50,50);
			}
		}else {
			bg = 0;
			text("There are no pokemon in the area",windowWidth/2,windowHeight/2)
		}
}
function electric(){
if (weatherData.weather[0].main == "Mist"){
		bg=pokeFog;
		for (var i = 0; i < pokemonData.pokemon.length; i++) {
			image(electricType, x[i],y[i],50,50)	
		} 
	}if(weatherData.weather[0].main == "Rain"){
		bg=pokeThunder;
		for (var i = 0; i < pokemonData.pokemon.length; i++) {
			image(electricType, x[i],y[i],50,50);
			}
}else {
			bg = 0;
			text("There are no pokemon in the area",windowWidth/2,windowHeight/2)
		}
}

function flying(){
if (weatherData.weather[0].main == "thunderstorm"){
		bg=pokeThunder;
		for (var i = 0; i < pokemonData.pokemon.length; i++) {
			image(flyingType, x[i],y[i],50,50)	
		}
	} if(weatherData.weather[0].main == "clear sky"){
		bg=pokeClouds;
		for (var i = 0; i < pokemonData.pokemon.length; i++) {
			image(flyingType, x[i],y[i],50,50);
			}
}else {
			bg = 0;
			text("There are no pokemon in the area",windowWidth/2,windowHeight/2)
		}
}
