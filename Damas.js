casillas = [];let cont = 0
class Damas{
    constructor(){
        this.casillaInvalidaAnterior = null;
        this.casillaValidaAnterior = null;
        this.arriba = ""; // tipo ficha que esta arriba del tablero
        this.abajo = ""; // tipo ficha que esta abajov del tablero
        this.movimiento = new Movimiento();
        this.movIA = new MovimientoIA();
        this.inicializarTablero();
        this.isPausa = false;
        this.turno = "blanca";
        document.getElementById("turno").innerHTML = this.turno;
        this.tiempo();

        /*
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                casillas[i][j].quitarFicha();
            }
        }
        /*
        casillas[6][6].setFicha("blancaDama");
        casillas[4][6].setFicha("blancaDama");
        casillas[3][3].setFicha("blancaDama");
        casillas[2][2].setFicha("rojaDama");
        casillas[1][1].setFicha("rojaPeon");
        casillas[6][4].setFicha("blancaPeon");*/
         
        //this.movIA.ejecutarMov(casillas, this.arriba, this.abajo, this.turno)
        /*
        this.arriba="blanca";this.abajo= "roja";
        casillas[0][4].setFicha("rojaDama"); casillas[5][5].setFicha("rojaDama"); 
        casillas[7][1].setFicha("rojaDama"); //casillas[4][4].setFicha("rojaDama"); 
        casillas[6][2].setFicha("blancaPeon");   
        casillas[2][6].setFicha("blancaPeon");  casillas[5][1].setFicha("blancaPeon");    
        casillas[3][3].setFicha("blancaPeon");  
        casillas[3][1].setFicha("blancaPeon");  */
        
        /*casillas[7][5].setFicha("rojaDama");
        casillas[2][6].setFicha("blancaPeon"); 
        casillas[3][3].setFicha("blancaPeon"); 
        casillas[3][1].setFicha("blancaPeon"); casillas[3][5].setFicha("blancaPeon"); casillas[5][5].setFicha("blancaPeon"); 
        casillas[5][3].setFicha("blancaPeon"); //casillas[4][2].setFicha("blancaPeon"); 
        casillas[7][1].setFicha("blancaPeon"); 
        casillas[1][1].setFicha("blancaPeon");casillas[6][2].setFicha("rojaDama");  */
        
        /*
        casillas[3][3].setFicha("blancaPeon"); 
        casillas[4][2].setFicha("rojaPeon"); 
        casillas[6][2].setFicha("rojaPeon"); 
        casillas[4][4].setFicha("rojaPeon");
        casillas[6][4].setFicha("rojaPeon");*/
        
        /*casillas[7][3].setFicha("rojaPeon"); 
        casillas[6][2].setFicha("blancaPeon");
        casillas[4][2].setFicha("blancaPeon"); 
        casillas[6][4].setFicha("blancaPeon"); 
        casillas[4][4].setFicha("blancaPeon"); 
        casillas[4][6].setFicha("blancaPeon"); 
        casillas[2][6].setFicha("blancaPeon");  
        //casillas[2][2].setFicha("blancaPeon"); 
        //casillas[2][4].setFicha("blancaPeon"); */
        let c = this.movimiento.CasillasValidas(casillas, this.arriba, this.abajo);
        if(c != null){
            casillas = c;
        }
        else{
            document.getElementsById("rendirse").click();
        }
        this.eventos();
    }
    

    // TODO: Las cosas que se repiten a una función, cuando hace Copy/Paste MAL!!!!!!!!!
    initCasilla(casillas, fichas, i, j, par, ale, ele) {
        if ((par && j % 2 == 0) || (!par && j % 2 != 0)) {
            if (ale == 0) {
                casillas[i][j] = new Casilla(fichas[ele], new Ficha("rojaPeon"));
                casillas[i][j].ele.style.backgroundImage = casillas[i][j].ficha.url;
                casillas[i][j].ele.style.backgroundColor = ColorBack.casillaBasica;
            } else {
                casillas[i][j] = new Casilla(fichas[ele], new Ficha("blancaPeon"));
                casillas[i][j].ele.style.backgroundImage = casillas[i][j].ficha.url;
                casillas[i][j].ele.style.backgroundColor = ColorBack.casillaBasica;
            }
        } else {
            casillas[i][j] = new Casilla(fichas[ele], new Ficha(null));
            casillas[i][j].ele.style.backgroundColor = "saddlebrown";
        }
    }

    inicializarTablero(){ 

        var ale = Math.random()*2; // numero aleatorio entre 0 y 2
        ale = Math.floor(ale); 
        if(ale == 0){
            this.arriba = "roja";
            this.abajo = "blanca";
        }
        else{
            this.arriba = "blanca";
            this.abajo = "roja";
        }
        //console.log(this.abajo)

        let fichas = document.getElementsByClassName("b");
        let ele = 0;
        let par = true;
        casillas = [];
        for(let i = 0 ;i < 3 ;i++){
            casillas[i] = [];
            for(let j = 0 ;j < 8; j++){
                this.initCasilla(casillas, fichas, i, j, par, ale, ele);
                ele++;
            }
            par = !par;
        }
        for(let i = 3 ;i < 5 ;i++){
            casillas[i] = [];
            for(let j = 0 ;j < 8; j++){
                if(par == true){
                    if(j % 2 == 0){
                        casillas[i][j] = new Casilla(fichas[ele], new Ficha(null));
                        casillas[i][j].ele.style.backgroundColor = ColorBack.casillaBasica;
                    }
                    else{
                        casillas[i][j] = new Casilla(fichas[ele], new Ficha(null));
                        casillas[i][j].ele.style.backgroundColor = "saddlebrown";
                    }
                }
                else{
                    if(j % 2 != 0){
                        casillas[i][j] = new Casilla(fichas[ele], new Ficha(null));
                        casillas[i][j].ele.style.backgroundColor = ColorBack.casillaBasica;
                    }
                    else{
                        casillas[i][j] = new Casilla(fichas[ele], new Ficha(null));
                        casillas[i][j].ele.style.backgroundColor = "saddlebrown";
                    }
                }
                ele++;
            }
            par = !par;
        }
        for(let i = 5 ;i < 8 ;i++){
            casillas[i] = [];
            for(let j = 0 ;j < 8; j++){
                this.initCasilla(casillas, fichas, i, j, par, !ale, ele);
                ele++;
            }
            par = !par;
            
        }
        
        this.contarFichas();

        let c = this.movimiento.CasillasValidas(casillas, this.arriba, this.abajo);
        if(c != null){
            casillas = c;
        }
        else{
            this.rendirse();
        }
    }

    eventos(){  // metodo para manejar los eventos del tablero
        this.reiniciar(); 
        this.pausar();
        this.rendirse();
        this.clickCasillas();
        
    }

    clickCasillas(){ 
        for(let i = 0; i < 32; i++){
            document.getElementsByClassName("field-w")[i].addEventListener("click", (e) => { 
                e = e.target; 
                if(e.style.backgroundColor == ColorBack.casillaInvalida || e.style.backgroundColor == ColorBack.casillaBasica){  // si se presiona una casilla invalida
                    if(this.casillaInvalidaAnterior){
                        this.casillaInvalidaAnterior.style.backgroundColor = ColorBack.casillaBasica;
                    }
                    e.style.backgroundColor = ColorBack.casillaInvalida;
                    this.casillaInvalidaAnterior = e;
                    if(this.casillaValidaAnterior){
                        this.casillaValidaAnterior.style.backgroundColor = ColorBack.casillaValida;
                    }

                    // restablece el color basico a todas las casillas
                    for(let i = 0; i < 8; i++){
                        for(let j = 0 ; j < 8; j++){
                            if(casillas[i][j].ele.style.backgroundColor == ColorBack.casillaFinal){
                                casillas[i][j].ele.style.backgroundColor = ColorBack.casillaBasica;
                            }
                            if(casillas[i][j].ele.style.backgroundColor == ColorBack.casillaMedia){
                                casillas[i][j].ele.style.backgroundColor = ColorBack.casillaBasica;
                            }
                            if(casillas[i][j].ele.style.backgroundImage == ColorBack.casillaPosibleBlancaDama || casillas[i][j].ele.style.backgroundImage == ColorBack.casillaPosibleRojaDama){
                                casillas[i][j].ele.style.backgroundImage = null;
                            }
                        }
                    }
                }
                if(e.style.backgroundColor == ColorBack.casillaValida || e.style.backgroundColor == ColorBack.casillaInicial){ // si se presiona una casilla que puede realizar movimiento y muestra estos movimientos
                    if(this.casillaValidaAnterior ){
                        if(this.casillaValidaAnterior.style.backgroundColor == ColorBack.casillaInicial){
                            this.casillaValidaAnterior.style.backgroundColor = ColorBack.casillaInicial;    
                        }
                        this.casillaValidaAnterior.style.backgroundColor = ColorBack.casillaValida;
                    }
                    if(this.casillaInvalidaAnterior){
                        this.casillaInvalidaAnterior.style.backgroundColor = ColorBack.casillaBasica;
                    }
                    e.style.backgroundColor = ColorBack.casillaInicial;
                    this.casillaValidaAnterior = e;

                    // posicion de la casilla seleccionada
                    let k = 0;
                    let l = 0;

                    for(let i = 0; i < 8; i++){
                        for(let j = 0 ; j < 8; j++){
                            if(casillas[i][j].ele.style.backgroundColor == ColorBack.casillaInicial){
                                l = i;
                                k = j;
                            }
                            if(casillas[i][j].ele.style.backgroundColor == ColorBack.casillaFinal){
                                casillas[i][j].ele.style.backgroundColor = ColorBack.casillaBasica;
                            }
                            if(casillas[i][j].ele.style.backgroundColor == ColorBack.casillaMedia){
                                casillas[i][j].ele.style.backgroundColor = ColorBack.casillaBasica;
                            }
                            if(casillas[i][j].ele.style.backgroundImage == ColorBack.casillaPosibleBlancaDama || casillas[i][j].ele.style.backgroundImage == ColorBack.casillaPosibleRojaDama){
                                casillas[i][j].ele.style.backgroundImage = null;
                            }
                        }
                    }
                    casillas = this.movimiento.posiblesMovimentos(casillas, l, k, this.arriba, this.abajo);

                    if(casillas[l][k].ficha.rango != "dama"){ // si hay un movimiento que convierta un peon en dama marca esa casilla
                        this.marcarPosiblesDamas(casillas[l][k].ficha.tipo);
                    }
                }
                if(e.style.backgroundColor == ColorBack.casillaFinal){

                    let isTurnoMaquina = false;

                    e.style.backgroundColor = ColorBack.casillaSelect; // para marcar el elemento y poder obtener su posicion

                    // posicion de la casilla donde empieza el movimiento y dondee termina
                    let k = 0;
                    let l = 0;
                    let n = 0;
                    let x = 0; 
                    for(let i = 0; i < 8; i++){
                        for(let j = 0 ; j < 8; j++){
                            if(casillas[i][j].ele.style.backgroundColor == ColorBack.casillaSelect){
                                l = i;
                                k = j;
                            } 
                            if(casillas[i][j].ele.style.backgroundColor == ColorBack.casillaInicial){
                                n = i;
                                x = j;
                            }
                        }
                    }
                    if(casillas[n][x].ficha.rango == "peon"){
                        e.style.backgroundColor = ColorBack.casillaFinal;
                        casillas = this.movimiento.ejecutarMovimientoPeon(casillas, l, k, this.arriba, this.abajo, this.turno);
                        casillas[l][k].setFicha(casillas[n][x].ficha.value);
                        casillas[n][x].quitarFicha();

                        // limpia el tablero de los colores
                        for(let i = 0; i < 32; i++){
                            document.getElementsByClassName("field-w")[i].style.backgroundColor = ColorBack.casillaBasica;
                            if(document.getElementsByClassName("field-w")[i].style.backgroundImage == ColorBack.casillaPosibleBlancaDama || document.getElementsByClassName("field-w")[i] == ColorBack.casillaPosibleRojaDama){
                                document.getElementsByClassName("field-w")[i].style.backgroundImage = null;
                            }
                        }
                        //this.contFichas();
                        
                        this.cambiarRango();
                        this.cambiarTurno();

                        this.jugarIa();

                        let c = this.movimiento.CasillasValidas(casillas, this.arriba, this.abajo);
                        this.casillaInvalidaAnterior = null;
                        this.casillaValidaAnterior = null;
                        if(c != null){
                            casillas = c;
                        }
                        else{ // si es nulo significa que no hay movimiento posible
                            document.getElementById("rendirse").click();
                        }
                        isTurnoMaquina = true;

                        this.contarFichas();
                    }
                    if(casillas[n][x].ficha.rango == "dama"){
                        casillas = this.movimiento.ejecutarMovimientoDama(casillas, n, x , l , k);
                        casillas[l][k].setFicha(casillas[n][x].ficha.value);
                        casillas[n][x].quitarFicha();
                        
                        if(this.movimiento.existeMovDama(casillas, l, k)){ 
                            for(let i = 0; i < 32; i++){
                                document.getElementsByClassName("field-w")[i].style.backgroundColor = ColorBack.casillaBasica;
                                if(document.getElementsByClassName("field-w")[i].style.backgroundImage == ColorBack.casillaPosibleBlancaDama || document.getElementsByClassName("field-w")[i] == ColorBack.casillaPosibleRojaDama){
                                    document.getElementsByClassName("field-w")[i].style.backgroundImage = null;
                                }
                            }
                            casillas[l][k].ele.style.backgroundColor = ColorBack.casillaInicial;
                            casillas = this.movimiento.posiblesMovimentos(casillas, l, k, this.arriba, this.abajo);
                            
                            this.cambiarRango();
                            this.contarFichas();
                            this.casillaInvalidaAnterior = null;
                            this.casillaValidaAnterior = null;
                        }
                        else{
                            for(let i = 0; i < 32; i++){
                                document.getElementsByClassName("field-w")[i].style.backgroundColor = ColorBack.casillaBasica;
                                if(document.getElementsByClassName("field-w")[i].style.backgroundImage == ColorBack.casillaPosibleBlancaDama || document.getElementsByClassName("field-w")[i] == ColorBack.casillaPosibleRojaDama){
                                    document.getElementsByClassName("field-w")[i].style.backgroundImage = null;
                                }
                            }
                            //this.contFichas();
                            
                            this.cambiarRango();
                            this.cambiarTurno();
    
                            this.jugarIa();
                            
                            let c = this.movimiento.CasillasValidas(casillas, this.arriba, this.abajo);
                            this.casillaInvalidaAnterior = null;
                            this.casillaValidaAnterior = null;
                            if(c != null){
                                casillas = c;
                            }
                            else{ // si es nulo significa que no hay movimiento posible
                                document.getElementById("rendirse").click();
                            }
                            isTurnoMaquina = true;
                            this.contarFichas();
                        }
                    }
 
                }
                
            });
        }
    }

    jugarIa(){
        if(!this.movIA.ejecutarMov(casillas, this.arriba, this.abajo, this.turno)){
            return;
        }
        this.cambiarRango();
        this.cambiarTurno();
        
        this.contarFichas();
    }

    reiniciar(){ // acciones a ejecutar cuando se presione el boton de reinicio
        document.getElementById("reinicio").addEventListener("click", () => {
            for(let i = 0; i < 32; i++){
                document.getElementsByClassName("field-w")[i].style.backgroundImage = null;
            }
            this.turno = "blanca";
            document.getElementById("turno").innerHTML = this.turno;
            this.inicializarTablero();
            this.contTiempo = -1;
            this.isPausa = false;
            this.casillaValidaAnterior = null;
            this.casillaInvalidaAnterior = null;
            document.getElementById("pausa").src="images/pausa.png";
            document.getElementById("pausa").style.display = "block";
            document.getElementById("ganador").style.display = "none";
            document.getElementById("div-pausa").style.display = "none";
            
        });
        
    }

    pausar(){
        document.getElementById("pausa").addEventListener("click", () => {
            document.getElementById("pausa").src= "images/" + (this.isPausa ? "pausa.png" : "play.png");
            document.getElementById("div-pausa").style.display = this.isPausa ? "none" : "block";
            this.isPausa = !this.isPausa;
        });
        
    }

    rendirse(){
        document.getElementById("rendirse").addEventListener("click", () => {
            this.isPausa = true;
            let ganador = document.getElementById("ganador");
            ganador.style.display = "block";
            let gana = this.turno == "blanca" ? "roja" : "blanca";
            ganador.innerHTML="<h2>Las " + this.turno + "s han perdido el ganador son las " + gana + "s</h2>";

            document.getElementById("pausa").style.display = "none";
            document.getElementById("div-pausa").style.display = "block";
        });
    }

    tiempo(){  // establece el tiempo de juego
        let tiempoJuego = document.getElementById("tiempo");
        this.contTiempo = 0; 
        setInterval(()=>{
            if(this.isPausa == false){
               this.contTiempo++;  
               if(this.contTiempo % 60 < 10){
                tiempoJuego.innerHTML = Math.floor(this.contTiempo/60) + ":" + "0" + this.contTiempo % 60;
                }
                else{
                    tiempoJuego.innerHTML = Math.floor(this.contTiempo / 60) + ":" + this.contTiempo % 60;
                } 
            }
            
        },1000); 
    }

    contarFichas(){
        this.rojaPeon = 0;
        this.blancaPeon = 0;
        this.rojaDama = 0;
        this.blancaDama = 0;

        let fichas = document.getElementsByClassName("field-w");

        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                switch(casillas[i][j].ficha.value){
                    case "blancaPeon" : this.blancaPeon++;
                        break;
                    case "rojaPeon" : this.rojaPeon++;
                        break;
                    case "rojaDama" : this.rojaDama++;
                        break;
                    case "blancaDama" : this.blancaDama++;
                        break;
                }
            }
        }
        this.hayPerdedor();
        document.getElementById("cant-rojas").innerHTML = '<h1>Rojas :</h1> <br> <h2>Peones : ' + this.rojaPeon + '</h2><h2>Damas : ' + this.rojaDama + '</h2>'
        document.getElementById("cant-blancas").innerHTML = '<h1>Blancas :</h1> <br> <h2>Peones : ' + this.blancaPeon + '</h2><h2>Damas : ' + this.blancaDama + '</h2>'
    }

    hayPerdedor(){

        if(this.blancaDama == 0 && this.blancaPeon == 0){
            this.isPausa = true;
            let ganador = document.getElementById("ganador");
            ganador.style.display = "block";
            let gana = this.turno == "blanca" ? "roja" : "blanca";
            ganador.innerHTML="<h2>Las Blancas han perdido el ganador son las Rojas</h2>";
            document.getElementById("pausa").style.display = "none";
            document.getElementById("div-pausa").style.display = "block";
        }
        if(this.rojaDama == 0 && this.rojaPeon == 0){
            this.isPausa = true;
            let ganador = document.getElementById("ganador");
            ganador.style.display = "block";
            let gana = this.turno == "blanca" ? "roja" : "blanca";
            ganador.innerHTML="<h2>Las Rojas han perdido el ganador son las Blancas</h2>";
            document.getElementById("pausa").style.display = "none";
            document.getElementById("div-pausa").style.display = "block";
        }
        
    }
    cambiarTurno(){
        this.turno = this.turno == "blanca" ? "roja" : "blanca";
        document.getElementById("turno").innerHTML = this.turno;
    }
    
    cambiarRango(){ // cambia el rango de peon a dama si se puede
        for(let i = 0; i < 8; i++){
            if(this.arriba != casillas[0][i].ficha.tipo && casillas[0][i].ocupado){
                casillas[0][i].setFicha(casillas[0][i].ficha.tipo + "Dama");
            }
            if(this.abajo != casillas[7][i].ficha.tipo && casillas[7][i].ocupado){
                casillas[7][i].setFicha(casillas[7][i].ficha.tipo + "Dama");
            }
        }
    }

    marcarPosiblesDamas(tipo){  // se encarga de marcar las casillas donde es posible convertirse en dama
        for(let i = 0; i < 8; i++){
            if(casillas[0][i].ele.style.backgroundColor == ColorBack.casillaFinal && tipo != this.arriba ){
                if(tipo == "blanca"){
                    casillas[0][i].ele.style.backgroundImage = ColorBack.casillaPosibleBlancaDama;
                }
                else{
                    casillas[0][i].ele.style.backgroundImage = ColorBack.casillaPosibleRojaDama;
                }
            }
            if(casillas[7][i].ele.style.backgroundColor == ColorBack.casillaFinal && tipo != this.abajo){
                if(tipo == "blanca"){
                    casillas[7][i].ele.style.backgroundImage = ColorBack.casillaPosibleBlancaDama;
                }
                else{
                    casillas[7][i].ele.style.backgroundImage = ColorBack.casillaPosibleRojaDama;
                }
            }
        } 
    }
};


var damas = new Damas();