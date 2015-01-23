//Variables
var scene;
var timer;
var time;
var vilTime;
var villain;
var hero;
var dirChange;
var hearts;
var hits;
var gameOver;
var chest;
var win;
var floor;
//Songs
var owMP3;
var owOGG;
var victory;
var mario;
//Constantes
var NUMHEARTS = 3;
var MAXTIME = 30;
//Función que se llama en la carga del juego
function init(){
	scene = new Scene();
	scene.setSize(1200,400);
	dirChange = 0;
	hits = 0;
	win = false;
	scene.setBG("black");
	output = document.getElementById("output");
	timer = new Timer();
	hero = new Hero();
	villain = new Villain();
	villain.setPosition(500,200);
	setupHearts();
	//sounds
	owMP3 = new Sound("ow.mp3");
	owOGG = new Sound("ow.ogg");
	victory = new Sound("victory.mp3");
	mario = new Sound("mario.mp3");
	//inicializar game over
	gameOver = new Sprite(scene,"gameOver.jpeg",scene.width,scene.height);
	gameOver.setSpeed(0);
	gameOver.setPosition(scene.width/2,scene.height/2);
	//inicializar cofre
	chest = new Sprite(scene,"chest.PNG",30,30);
	chest.setSpeed(0);
	chest.setPosition(scene.width - 15, scene.height/2);
	//inicializar suelo
	floor = new Sprite(scene,"floor.jpg",scene.width,scene.height);
	floor.setSpeed(0);
	floor.setPosition(scene.width/2,scene.height/2);
	//iniciar escena
	scene.start();
}

//Función que actualiza el canvas
function update(){
	scene.clear();
	checkTime();
	villain.checkDir();
	checkCollisions();
	hero.checkKeys();
	floor.update();
	hero.update();
	villain.update();
	for(i=0; i<NUMHEARTS-hits; i++){
		hearts[i].update();
	}
	chest.update();
	checkGame();
}

//Comprobar colisiones
function checkCollisions(){
	//Comprobar villain vs paredes
	//Derecha
	if(villain.x >= ((scene.width)-((villain.width)/2))){
		//villain.setSpeed(0);
		villain.changeAngleBy(-180);
		villain.changeImgAngleBy(180);
	}
	//Izquierda
	if(villain.x <= (0+((villain.width)/2))){
		//villain.setSpeed(0);
		villain.changeAngleBy(-180);
		villain.changeImgAngleBy(180);
	}
	//Abajo
	if(villain.y >= ((scene.height)-((villain.height)/2))){
		//villain.setSpeed(0);
		villain.changeAngleBy(-180);
		villain.changeImgAngleBy(180);
	}
	//Arriba
	if(villain.y <= (0+((villain.height)/2))){
		//villain.setSpeed(0);
		villain.changeAngleBy(-180);
		villain.changeImgAngleBy(180);
	}
	//Fin comprobacion villain vs paredes

	//Comprobar colisiones entre sprites
	if(hero.distanceTo(villain) <= 40){
		owMP3.play();
		owOGG.play();
		hits = hits + 1;
		hero.setPosition(hero.width,200);
	}

	//Comprobar colision con cofre
	if (hero.distanceTo(chest) <= 25) {
		victory.play();
		win=true;
	}
}

//Comprobar si game over
function checkGame(){
	if(hits==3 || time >= MAXTIME){		
		//alert('GAME OVER');
		mario.play();
		scene.clear();
		gameOver.update();
		scene.stop();
	}
	if(win){
		score = ((MAXTIME - time) * 1000).toFixed(0);
		scene.stop();
		alert('YOU WIN! \n' + 'Score: ' + score);
	}
}

//Comprobar tiempo
function checkTime(){
	vilTime = (Math.floor(timer.getElapsedTime()) % 3);
	time = (timer.getElapsedTime()).toFixed(2);
	output.innerHTML = "Time: " + time;
}

//Play again
function restart() {
	document.location.href = "";
}

//Constructor de héroe
function Hero(){
	tHero = new Sprite(scene, "hikash.gif", 50, 50);
	tHero.setSpeed(0);
	tHero.checkKeys = function(){ 
	// Al mismo tiempo que se pulsa la tecla 
	//se comprueba que no haya colision con pared.
		if (keysDown[K_LEFT] && this.x >= (0 + this.width/2)) {
			this.changeXby(-5);
		}
		if (keysDown[K_RIGHT] && this.x <= (scene.width - this.width/2)) {
			this.changeXby(5);
		}
		if (keysDown[K_UP] && this.y >= (0 + this.height/2)) {
			this.changeYby(-5);
		}
		if (keysDown[K_DOWN] && this.y <= (scene.height - this.height/2)) {
			this.changeYby(5);
		}
	}
	return tHero;

}

//Constructor de villano
function Villain(){
	tVillain = new Sprite(scene, "saradin.gif", 50, 50);
	tVillain.setSpeed(8);
	//movimiento random
	tVillain.wander = function(){
		newDir = (Math.random() * 4);
		newDir = (Math.floor(newDir) * 90);
		this.changeAngleBy(newDir);
		this.changeImgAngleBy(-newDir); 
	}
	tVillain.checkDir = function(){
		if(vilTime==0 && dirChange == 0){
			villain.wander();
			dirChange = 1;
		}
		if(vilTime!=0){
			dirChange = 0;
		}
	}
	return tVillain;
}

//Constructor heart
function Heart(){
	tHeart = new Sprite(scene,"heart.png",30,30);

	return tHeart;
}

//Setup de hearts
function setupHearts(){
	hearts = new Array(NUMHEARTS);
	for(i=0; i<NUMHEARTS; i++){
		hearts[i] = new Heart();
		hearts[i].setSpeed(0);
		hearts[i].setPosition((scene.width)-(15*(2*i+1)), 15);
	}

}















