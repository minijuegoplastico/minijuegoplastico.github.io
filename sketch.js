//TP3 Minijuego 
//Gómez Castellanos Jacqueline DNI 96.126.226
//link publicación youtube: https://www.youtube.com/watch?v=jUNayrDGWHU
// https://minijuegoplastico.github.io/
//Cátedra David Bedoian
//Universidad Nacional de las Artes
//para jugar usar adws
// Variables para escenas
let escena =1;//*** *debe estar 1 
let playa, fondo; // imagen playa y mar

//fuente
let fuente;
let fuente2; 

//variables imagenes de fondo de cada escena
let escenaPrimera, segundaEscena, terceraEscena, quintaEscena;
// Variables para el juego de zombie
let posX, posY;//posicion zombie
let zombi;
//imagenesbotellas
let imagenesBotellas=[];
let botellas; // lista de todas las botellas creadas
let iniciobotellas; // inicio cantidad botellas
let puntajeTotal; // puntaje total del jugador
let intervaloProduccion;
let velocidadBotella; 
let enPausa;
//variables escena 5
let pulpoX, pulpoY;//posicion pulpo
let pulpo;
//distancia zombie y ovnipulpo
let distanciax; 
let distanciay; 

// Sonidos
let colisionSonido, fondoSonido;
let muteButton; // Definimos muteButton globalmente
//cambio estado personaje cuando salga variables de ubicacion aumente a la coordenas al pulpo

function preload() {
  // Cargar imágenes
  playa = loadImage("imagenes/abajo1.png");
  fondo = loadImage("imagenes/fondo.png");
  escenaPrimera = loadImage("imagenes/zombiescena1.png");
  segundaEscena = loadImage("imagenes/zombiescena2.png");
  terceraEscena = loadImage("imagenes/fondo.png");
  quintaEscena = loadImage("imagenes/scene5.png");
  zombi = loadImage("imagenes/zzzombie.png");
 imagenesBotellas[0] = loadImage("imagenes/botella1.png");
 imagenesBotellas[1] = loadImage("imagenes/botella2.png");
 imagenesBotellas[2]= loadImage("imagenes/botella3.png");
  pulpo = loadImage("imagenes/pulpo.png");
  //cargar fuente
  fuente=loadFont("fuentes/Fiftiesmovies.ttf");
  fuente2=loadFont("fuentes/Mangiola.ttf");
  // Cargar sonidos
  colisionSonido = loadSound("sonidos/boing.ogg", function() {
    colisionSonido.setVolume(0.1); // Ajustar el volumen de la colisión
    colisionSonido.pause(); // empieza pausado
  });

  fondoSonido = loadSound("sonidos/sonidobajo.ogg", function() {
    fondoSonido.setVolume(0.3); // Volumen más bajo para no distraer
    fondoSonido.pause(); // empieza pausadopaus
      });
}
function setup() {
  //inicio funciones
  createCanvas(400, 400);
  windowResized(); // Llamamos a windowResized para ajustar la ventana desde el inicio

 //inicializamos variables
  intervaloProduccion = 100 //creacion cada 10 fotogramas y va cambiando
  velocidadBotella = -0.1;
  puntajeTotal=0;
  iniciobotellas = 3;
  botellas = []; // creamos arreglo vacio
  enPausa=false; 
 
  
  // Inicializar posición del zombie
  posX = 100;
  posY = 300;
  //iniciar posicion del pulpo
  pulpoX= 50;
  pulpoY= 100;

  // inicializa Fabrica -Crear botellas para el juego
  //ubicacionbotellas
  for (let i = 0; i < iniciobotellas; i++) {
    botellas.push(new Botella(random(0, 400), random(200, 400))); // agregamos botellas iniciales
  }
}
function draw() {
  drawescena(); // Llamar a la función para manejar las escenas y el juego

//por cada vuelta del draw aumenta 1 ,numero de  fotogramas 
//aceleracion de produccion de botellas. 
velocidadBotella-=0.000001;
//!significa !no esta en pause 
//estructura condicional 
if (frameCount%intervaloProduccion==0 && !enPausa){

  botellas.push(new Botella(random(0, 400), random(200, 400)));
  if (intervaloProduccion>2)
    intervaloProduccion--
}
push();
  resetMatrix();//resetear coordenadas que son los traslate, rotate y scale
  textAlign(LEFT,CENTER);
  fill(0);
  //text(int(mouseX) + " / " + int(mouseY), mouseX, mouseY)
  pop();
}//cierra draw
function drawescena() {
  background(220);

  if (escena == 1) {
    image(escenaPrimera, 0, 0, 400, 400);
  push();
  translate (width/2, height/2);
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  fill(89, 34,2);
  textSize(20);

//Titulojuego
fill(89,34,2);
noStroke();
rect (-0,-70 , 300, 40);
textSize(30);
fill(255, 155, 0);
textFont(fuente);
text("ZOMBI EN EL FIN", -0, -70);

//Quieres Jugar
fill(89,34,2);
rect (0, -20, 90, 20);
textSize(10);
fill(242, 164, 19);
text("JUGAR", 0, -20);
//
push();
//fill(89,34,2);
//rect (-0, 20, 250, 30);
fill(89,34,2);
textSize(15);
textFont(fuente2);
text("A-Derecha, D-Izquierda, W-Arriba, S-Abajo", -0, 12);
pop();
//boton si
fill(255-frameCount%155, 100, 100+frameCount%155); //aumenta uno por un fotograma rojo va cambiando
noStroke();
rect (-30, 50, 40, 20);
textSize(15);
fill(89,34,2);
text("SI", -30, 50);
//boton no
fill(255-frameCount%155, 100, 100+frameCount%155); //aumenta uno por un fotograma rojo va cambiando
noStroke();
rect (30, 50, 40, 20);
textSize(15);
fill(89,34,2);
  text("NO", 30, 50);
//Boton creditos 
fill(255-frameCount%155, 100, 100+frameCount%155); //aumenta uno por un fotograma rojo va cambiando
noStroke();
rect (0, 100, 70, 20);
textSize(15);
fill(89,34,2);
text("Créditos", 0, 100); 
pop();

 } else if (escena == 2) {
  image(segundaEscena, 0, 0, 400, 400);
  translate (width/2, height/2);//se mueve x, y a 0,0 mitad de la pantalla 
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  textFont(fuente);
//texto el mundo produce
  fill(89,34,2);
  noStroke();
  rect (-0, -70, 280, 100);
  textSize(15);
  fill(52, 166, 191);
  text("En la tierra se produce\n \n430 millones de tonelada métricas\n\n de plástico al año.", -0, -70);
fill(255-frameCount%155, 100, 100+frameCount%155); //aumenta uno por un fotograma rojo va cambiando
noStroke();
rect (-0, 40, 90, 25);
textSize(15);
fill(89,34,2);
text("REGRESAR", -0, 40);

 //nOmbre
 fill(89,34,2);
  noStroke();
  rect (-0, 100, 250, 20);
  textSize(15);
  
  fill(52, 166, 191);
  text("Gómez Castellanos Jacqueline", 0, 100);
 //////////////////////////
 //Dibuja escena 3
 //////////////////////
  }  if (escena == 3) {
    // Mostrar imagen de la tercera escena
    image(terceraEscena, 0, 0, 400, 400);

    // Agregar el juego del zombie en la escena 3----
    //una colision siempre es un if pasa algo... 
    jugarZombie();
  } else if (escena == 4) {
    image(fondo, 0, 0, 400, 400);
   if(dist(pulpoX, pulpoY, posX, posY)> 10){
   
    image (pulpo, pulpoX-20, pulpoY-15);
    image(zombi,posX, posY);
    posX -= distanciax/200;
    posY -= distanciay/200;
  }
//xxx aca aca boton insertar regresar 
translate (width/2, height/2);
rectMode(CENTER);
textAlign(CENTER,CENTER);
textFont(fuente);
fill(89,34,2);
noStroke(); // holaaaaaaaaaa
rect (10, 150, 90, 25);
textSize(15);
fill(255-frameCount%155, 100, 100+frameCount%155); //aumenta uno por un fotograma rojo va cambiando
text("REGRESAR", 10, 150);
  }
  else if (escena == 5) {
    image(quintaEscena, 0, 0, 400, 400);
   //boton regresar 
translate (width/2, height/2);
rectMode(CENTER);
textAlign(CENTER,CENTER);
textFont(fuente);
fill(255-frameCount%155, 100, 100+frameCount%155); //aumenta uno por un fotograma rojo va cambiando
noStroke();
rect (10, 150, 90, 25);
textSize(15);
fill(89,34,2);
text("REGRESAR", 10, 150);
  }
}
// Función del juego del zombie
function jugarZombie() {
  // Fondo y suelo del juego
  background(fondo);
  image(playa, 0, 200, 400, 200); // Suelo (200 de alto)
  
  // Dibujar y mover botellas ciclo for que recorre todas las botellas 
  for (let i = 0; i < botellas.length; i++) {
    botellas[i].dibujar();
    if (!enPausa){
        
    //movimiento aleatorio de las botellas izquierda derecha random. 
    //y-0,1 velocidad para arriba  random velocidad xrandom y velocidad y

    botellas[i].mover(random(-1, 1), velocidadBotella);

    ////////////////
    //////////////colision botella mar y penalizacion 
      /////////////////
let botellaColisionada= false; 
    //Penalización si la botella se va más arriba de y = 200
    if (botellas[i].y < 200) {
      puntajeTotal -= 50; // Penalización
      botellaColisionada=true; 
    }

    // Colisión entre zombie y botella
    // botella esta entre y=200 y y=400
    if (!botellaColisionada && dist(posX, posY, botellas[i].x, botellas[i].y) < 40) {
      textSize(12);
      fill(0);
      if (botellas[i].y < 300) {
        puntajeTotal += 10;//sumar += suma a la variable. 
        text("+10", botellas[i].x, botellas[i].y - 10);
      } else if (botellas[i].y < 350) {
        puntajeTotal += 20;
        text("+20", botellas[i].x, botellas[i].y - 10);

      } else if (botellas[i].y  < 390) {
        puntajeTotal += 30;
  text("+30", botellas[i].x, botellas[i].y - 10);
      }
      
      botellaColisionada=true; 

      // Reproducir sonido de colisión
      colisionSonido.play();
      }
if (botellaColisionada)
   {
    botellas.splice(i, 1);//splice extraer retira botella con bandera del array
    //mutabilidad (alteracion array) solo en caso que haya pasado de y_200 o colisionado con zombie
    i--// en el ciclo for ++ y para corregir efecto splice que altero posiciones dentro del arreglo- 
  }
} // cierra !enPausa
}// cierra el for <<<<======= !!!! HOLAAAA


image(zombi, posX, posY);

  // Movimiento del zombie
  if (keyIsDown(65)) { // 'A'
    posX -= 2;
  }
  if (keyIsDown(68)) { // 'D'
    posX += 2;
  }
  if (keyIsDown(87)) { // 'W'
    posY -= 2;
  }
  if (keyIsDown(83)) { // 'S'
    posY += 2;
  }
  // Colisiones de bordes
  if (posX < -10) {
    posX = 390;
  }
  if (posX > 390) {
    posX = -10;
  }
  if (posY > 380) {
    posY = 380;
  }
  if (posY < 165) {
    posY = 165;
  }
  //en caso que llego a los puntos donde puede terminar juego (100)

  if(puntajeTotal>=100)//***cambiar estaba en 100  0 200 */
 { 
enPausa=true;
 
  push();
    //image(pulpo, pulpoX, pulpoY);
    translate (width/2, height/2);
    rectMode(CENTER);
    textAlign(CENTER,CENTER);

fill(193, 100, 162); 
noStroke();
rect (0, 0, 100, 40);
textSize(10);
fill(89,34,2);
text("¿Quisieras salir?", 0, 0);


  fill(255-frameCount%155, 100, 100+frameCount%155); //aumenta uno por un fotograma rojo va cambiando
noStroke();
rect (-30, 50, 40, 20);
textSize(10);
fill(89,34,2);
  text("SI", -30, 50);
 
  fill(255-frameCount%155, 100, 100+frameCount%155); //aumenta uno por un fotograma rojo va cambiando
  noStroke();
  rect (30, 50, 40, 20);
  textSize(10);
  fill(89,34,2);
    text("NO", 30, 50);
    //noLoop();
pop();
  }

// Mostrar puntaje total
textAlign(CENTER,CENTER);
rectMode(CENTER);
textSize(15);
textFont(fuente);
fill(89,34,2);
text("Puntaje total: " + puntajeTotal, 200,20);
   
//text(mouseX + " " + mouseY, mouseX,  mouseY)
}// cierra draw
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//colisiones botones escenas 
 function mousePressed(){
//////
// SI EL CLICK ES EN LA PORTADA
///////
if (escena==1) {

  //colision boton si
  if (mouseX>-150 && mouseX<187 && mouseY>240 && mouseY<258) {
    escena =3;
    fondoSonido.loop();
    setup();
  }

  //colision boton no 
 if (mouseX>210 && mouseX<248 && mouseY>240 && mouseY<258) {
 escena=5;
  
  }

  //colision Creditos
  if (mouseX>163 && mouseX<231 && mouseY>288 && mouseY<307) {
    escena =2;
  }
} // cierra escena 1
      


//////
// ESCENA 2
///////
// SI CLICK ES EN CREDITOS
else if(escena==2) {
  
  //boton regresar
  if (mouseX>155 && mouseX<243 && mouseY>227 && mouseY<251) {
    escena=1;
  }
}


// SI CLICK ES EN JUEGO Y ESTA EN PAUSA
else if (escena == 3 && enPausa) {
  
  if (mouseX>150 && mouseX<187 && mouseY>240 && mouseY<254) {
    escena=4;
    //calcular distancia zombie pulpo 

    distanciax = posX-pulpoX;
    distanciay = posY-pulpoY;
  }
  if (mouseX>210 && mouseX<248 && mouseY>240 && mouseY<259) {
    enPausa=false;
    puntajeTotal = 0;
    
}
}
  
else if (escena==4) {
  //boton regresar
if (mouseX>164 && mouseX<252 && mouseY>338 && mouseY<360) {
 escena=1;

   }

}
else if (escena==5) {
    //boton regresar
 if (mouseX>165 && mouseX<251 && mouseY>340 && mouseY<360) {
   escena=1;
     }
  }
 }
// fabrica de botellas Clase Botella para el juego
class Botella {
  constructor(cX, cY) {
    this.x = cX; //posicion de la botella 
    this.y = cY;
    this.img = imagenesBotellas[ floor(random(imagenesBotellas.length))];
  }

  dibujar() {
    image(this.img, this.x, this.y, 20, 40);
  }

  mover(mX, mY) {
    this.x += mX;
    this.y += mY;
  }//mx random y my -0.1
}

// Ajustar tamaño de la ventana
function windowResized() {
  let pag = document.getElementsByTagName("body")[0];
  let cnv = document.getElementById("defaultCanvas0");
  
  let mrg = 3;

  pag.style.backgroundColor = "rgb(242, 211, 119)";
  
  pag.style.overflow = "hidden";
  pag.style.display = "flex";
  pag.style.justifyContent = "center";
  pag.style.alignItems = "center";
  pag.style.height = "100svh";
 
  if (windowWidth * height > windowHeight * width) {
    cnv.style.height = (100 - mrg * 2) + "svh";
    cnv.style.width = ((100 - mrg * 2) / height) * width + "svh";
  } else {
    cnv.style.width = (100 - mrg * 2) + "vw";
    cnv.style.height = ((100 - mrg * 2) / width) * height + "vw";
  }

}

