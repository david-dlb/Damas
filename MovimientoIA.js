var mx = [-1, -1, 1, 1];
var my = [-1, 1, 1, -1];

class Mat{
    constructor(ficha){
        this.ficha = ficha;
        if(ficha.value != null){
            this.ocupado = true;
        }
        else{
            this.ocupado = false;
        }
        this.color = ColorBack.casillaBasica;
    }
    quitarFicha(){
        this.ficha = new Ficha(null);
        this.ocupado = false;
        this.color = ColorBack.casillaBasica;
    }
    setFicha(value){
        this.ficha = new Ficha(value);
        if(this.ficha.value != null){
            this.ocupado = true;
        }
    }
    setColor(color){
        this.color = color;
    }
}
class Nodo{
    constructor(mat){
        this.listaHijos = [];
        this.value = 0;
        this.mat = mat;
        this.choise = 0;
    }
}
class MovimientoIA{
    constructor(){
        this.arriba = "";
        this.abajo = "";
        this.damaComera = false;
        this.matAux = []; // matriz donde se guarda la solucion final a ejecutar por la IA
        this.newState = []; // arreglo donde se guarda los nuevos posibles movimientos de cada nodo
        // variables alpha y beta para la poda 
        this.alpha = -100000;
        this.beta = 100000;
        this.tree = [];
        this.nodo = 0;
    }

    quitarFicha(mat, i, j){
        mat[i][j].ficha = new Ficha(null);
        mat[i][j].ocupado = false; 
        mat[i][j].color = ColorBack.casillaBasica;
        return mat;
    }
    setFicha(mat, i, j, value){
        mat[i][j].ficha = new Ficha(value);//console.log(i+" "+j+" "+value)
        if(mat[i][j].ficha.value != null){
            mat[i][j].ocupado = true;
        }
        return mat;
    }
    swap(mat, i, j, l ,k){ //console.log(mat)
        this.setFicha(mat, i, j, mat[l][k].ficha.value);
        this.quitarFicha(mat, l, k);
        return mat;
    }
    clearMatColor(mat){
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                mat[i][j].setColor(ColorBack.casillaBasica);
            }
        }
        return mat;
    }
    isGanador(mat, turno){
        let blanca = false;
        let roja = false;

        
        if(this.CasillasValidas(JSON.parse(JSON.stringify(mat)), this.arriba, this.abajo, turno) == null){ // si no hay posibles movimientos
            return turno == "blanca" ? "roja" : "blanca";
        }

        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                switch(mat[i][j].ficha.tipo){
                    case "blanca" : blanca = true;
                        break;
                    case "roja" : roja = true;
                        break;
                }
            }
        }
        if(!blanca || !roja){
            return !blanca ? "roja" : "blanca"
        }
        return null;
    }

    ejecutarMov(casillas, arriba, abajo, turno){
        this.arriba = arriba;
        this.abajo = abajo;
        this.maquinaTurno = turno; // nesesario para la funcion de evaluacion

        let mat = [];
        for(let i = 0; i < 8; i++){
            mat[i] = []
            for(let j = 0; j < 8; j++){
                mat[i][j] = new Mat(new Ficha(casillas[i][j].ficha.value))
                mat[i][j].setColor(casillas[i][j].ele.style.backgroundColor);
            }
        }this.cont = -1;

        this.nodo = 0;
        this.tree = [];
        this.choise = 0;

        let nodo = new Nodo(JSON.parse(JSON.stringify(mat))); // metodo para copiar un objeto a otro
        this.tree.push(nodo);//console.log(this.tree)
        //console.log(nodo)
        mat = this.CasillasValidas(JSON.parse(JSON.stringify(this.tree[0].mat)), this.arriba, this.abajo, turno)
        if(mat == null){ // si no hay posibles movimientos
            return false;
        }
        this.matAux = [];
        
        this.recursion(0, true, turno);//console.log(this.cont)
        
        console.log(this.cont)
       // this.matAux = JSON.parse(JSON.stringify(this.tree[this.tree[0].listaHijos[this.choise]]));console.log(this.matAux)
        //console.log(this.matAux)
        //this.matAux = this.setColorBasico(JSON.parse(JSON.stringify(this.matAux)))
        
        // copia el movimiento final de la IA a las casillas
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(this.matAux[i][j].color != "saddlebrown"){
                    casillas[i][j].quitarFicha();
                    casillas[i][j].setFicha(this.matAux[i][j].ficha.value);//console.log(casillas[i][j].ficha.value)
                }
            }
        }//console.log(this.matAux);console.log(casillas)
        return true;
    }

    recorrerDamaObligado(mat, l, k, i, j, turno){
        let x = l;
        let y = k;
        while(l + 2*i >= 0 && l + 2*i < 8 && k + 2*j >= 0 && k + 2*j < 8){
            if(mat[l+i][k+j].ocupado && mat[l+i][k+j].ficha.tipo == turno){
                break;
            }
            if(mat[l+i][k+j].ocupado && mat[l+2*i][k+2*j].ocupado){
                break;
            }
            if(mat[l+i][k+j].ocupado && mat[l+i][k+j].ficha.tipo != turno && mat[l+2*i][k+2*j].ocupado == false){
                mat[x][y].color = ColorBack.casillaValida;
                return true;
                
            }
            l+=i;
            k+=j;
        }       
        return false; 
    }

    ComerObligado(mat, arriba, abajo, turno){  
        
        let obligado = false;
        this.damaComera = false; // si ay dama que tiene q comer obligado

        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(mat[i][j].ocupado){
                    if(mat[i][j].ficha.tipo == turno){
                        if(mat[i][j].ficha.rango == "dama"){
                            let damaObligado = false;
                            for(let k = 0; k < 4; k++){
                                if(this.recorrerDamaObligado(JSON.parse(JSON.stringify(mat)), i, j, mx[k], my[k], turno)){//console.log(i+" "+j + "  "+ (i+mx[k]+" "+(j+my[k])))
                                    obligado = true;
                                    damaObligado = true;
                                    mat[i][j].color = ColorBack.casillaValida;
                                }
                            }
                            
                            if(damaObligado){
                                this.damaComera = true; // si la dama tiene que comer 
                            }
                            
                        }
                        else{
                            if(arriba == mat[i][j].ficha.tipo){
                                if(i + 2 >= 0 && i + 2 < 8 && j + 2 >= 0 && j + 2 < 8 && mat[i+1][j+1].ocupado && mat[i+1][j+1].ficha.tipo != turno && mat[i+2][j+2].ocupado == false){
                                    mat[i][j].color = ColorBack.casillaValida;
                                    obligado = true;
                                }
                                if(i + 2 >= 0 && i + 2 < 8 && j - 2 >= 0 && j - 2 < 8 && mat[i+1][j-1].ocupado && mat[i+1][j-1].ficha.tipo != turno && mat[i+2][j-2].ocupado == false){
                                    mat[i][j].color = ColorBack.casillaValida;
                                    obligado = true;
                                }
                                
                            }
                            if(abajo == mat[i][j].ficha.tipo){
                                if(i - 2 >= 0 && i - 2 < 8 && j - 2 >= 0 && j - 2 < 8 && mat[i-1][j-1].ocupado && mat[i-1][j-1].ficha.tipo != turno && mat[i-2][j-2].ocupado == false){
                                    mat[i][j].color = ColorBack.casillaValida;
                                    obligado = true;
                                }
                                if(i - 2 >= 0 && i - 2 < 8 && j + 2 >= 0 && j + 2 < 8 && mat[i-1][j+1].ocupado && mat[i-1][j+1].ficha.tipo != turno && mat[i-2][j+2].ocupado == false){
                                    mat[i][j].color = ColorBack.casillaValida;
                                    obligado = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        if(obligado){
            return mat;
        }
        else{
            return null;
        }
    }

    CasillasValidas(mat, arriba, abajo, turno){ 
        
        let isValido = false; // si hay alguna casilla valida
        let c = this.ComerObligado(JSON.parse(JSON.stringify(mat)), arriba, abajo, turno);
        if(c != null){//console.log(this.damaComera)
            return c;
        }
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8;j++){
                if(mat[i][j].ocupado){
                    if(mat[i][j].ficha.tipo == turno){
                        if(mat[i][j].ficha.rango == "dama"){
                            if(i + 1 < 8 && i + 1 >= 0 && j + 1 < 8 && j + 1 >= 0 && (mat[i+1][j+1].ocupado == false) ){
                                mat[i][j].color = ColorBack.casillaValida;
                                isValido = true;
                            }
                            if(i + 1 < 8 && i + 1 >= 0 && j - 1 < 8 && j - 1 >= 0 && (mat[i+1][j-1].ocupado == false) ){
                                mat[i][j].color = ColorBack.casillaValida;
                                isValido = true;
                            }
                            if(i - 1 < 8 && i - 1 >= 0 && j - 1 < 8 && j - 1 >= 0 && (mat[i-1][j-1].ocupado == false) ){
                                mat[i][j].color = ColorBack.casillaValida;
                                isValido = true;
                            }
                            if(i - 1 < 8 && i - 1 >= 0 && j + 1 < 8 && j + 1 >= 0 && (mat[i-1][j+1].ocupado == false) ){
                                mat[i][j].color = ColorBack.casillaValida;
                                isValido = true;
                            }
                        } 
                        else{
                            if(arriba == mat[i][j].ficha.tipo){
                                if(i + 1 < 8 && i + 1 >= 0 && j + 1 < 8 && j + 1 >= 0 && (mat[i+1][j+1].ocupado == false) ){
                                    isValido = true;
                                    mat[i][j].color = ColorBack.casillaValida;
                                }
                                if(i + 1 < 8 && i + 1 >= 0 && j - 1 < 8 && j - 1 >= 0 && (mat[i+1][j-1].ocupado == false) ){
                                    isValido = true;
                                    mat[i][j].color = ColorBack.casillaValida;
                                }
                            }
                            if(abajo == mat[i][j].ficha.tipo){
                                if(i - 1 < 8 && i - 1 >= 0 && j - 1 < 8 && j - 1 >= 0 && (mat[i-1][j-1].ocupado == false) ){
                                    isValido = true;
                                    mat[i][j].color = ColorBack.casillaValida;
                                }
                                if(i - 1 < 8 && i - 1 >= 0 && j + 1 < 8 && j + 1 >= 0 && (mat[i-1][j+1].ocupado == false) ){
                                    isValido = true;
                                    mat[i][j].color = ColorBack.casillaValida;
                                }
                            }
                        }
                    }
                }
            }
        }
        if(isValido == false){
            return null;
        }
        return mat;
    }

    posiblesMovimentos(mat, arriba, abajo, turno){ 
        let list = [];
        for(let l = 0; l < 8; l++){
            for(let k = 0; k < 8; k++){
                if(mat[l][k].color == ColorBack.casillaValida){
                    if(mat[l][k].ficha.rango == "dama"){ // si es una dama
                        //console.log("dama")
                        this.posMovDama(JSON.parse(JSON.stringify(mat)), l, k, turno);
                    }
                    else{ // si es un peon
                        let obligadoComer = false;
                        if(arriba == mat[l][k].ficha.tipo){
                            //tener que comer
                            if(l + 2 >= 0 && l + 2 < 8 && k + 2 >= 0 && k + 2 < 8 && mat[l+1][k+1].ocupado && mat[l+1][k+1].ficha.tipo != turno & mat[l+2][k+2].ocupado == false){
                                mat = this.swap(JSON.parse(JSON.stringify(mat)), l+2, k+2, l, k);
                                let value = mat[l+1][k+1].ficha.value;
                                mat = this.quitarFicha(JSON.parse(JSON.stringify(mat)), l+1, k+1);
                                mat = this.movimientosMultiplesPeon(JSON.parse(JSON.stringify(mat)), l + 2, k + 2, arriba, abajo, arriba, turno);
                                mat = this.swap(JSON.parse(JSON.stringify(mat)), l, k, l+2, k+2)
                                mat = this.setFicha(JSON.parse(JSON.stringify(mat)), l+1, k+1, value);
                                obligadoComer = true;
                            }
                            if(l + 2 >= 0 && l + 2 < 8 && k - 2 >= 0 && k - 2 < 8 && mat[l+1][k-1].ocupado && mat[l+1][k-1].ficha.tipo != turno & mat[l+2][k-2].ocupado == false){
                                mat = this.swap(JSON.parse(JSON.stringify(mat)), l+2, k-2, l, k)
                                let value = mat[l+1][k-1].ficha.value;
                                mat = this.quitarFicha(JSON.parse(JSON.stringify(mat)), l+1, k-1);
                                this.movimientosMultiplesPeon(JSON.parse(JSON.stringify(mat)), l + 2, k - 2, arriba, abajo, arriba, turno);
                                mat = this.swap(JSON.parse(JSON.stringify(mat)), l, k, l+1, k-1)
                                mat = this.setFicha(JSON.parse(JSON.stringify(mat)), l+1, k-1, value);
                                obligadoComer = true;
                            }
                            if(!obligadoComer){//sin tener que comer
                                if(l + 1 < 8 && l + 1 >= 0 && k + 1 < 8 && k + 1 >= 0 && (mat[l+1][k+1].ocupado == false) ){
                                    mat = this.swap(JSON.parse(JSON.stringify(mat)), l+1, k+1, l, k)
                                    this.newState.push(JSON.parse(JSON.stringify(mat)));
                                    mat = this.swap(JSON.parse(JSON.stringify(mat)), l, k, l+1, k+1)
                                }
                                if(l + 1 < 8 && l + 1 >= 0 && k - 1 < 8 && k - 1 >= 0 && (mat[l+1][k-1].ocupado == false) ){
                                    mat = this.swap(JSON.parse(JSON.stringify(mat)), l+1, k-1, l, k)
                                    this.newState.push(JSON.parse(JSON.stringify(mat)));
                                    mat = this.swap(JSON.parse(JSON.stringify(mat)), l, k, l+1, k-1)
                                } 
                            }
                        }
                        if(abajo == mat[l][k].ficha.tipo){
                            //  tiene que comer
                            if(l - 2 >= 0 && l - 2 < 8 && k - 2 >= 0 && k - 2 < 8 && mat[l-1][k-1].ocupado && mat[l-1][k-1].ficha.tipo != turno & mat[l-2][k-2].ocupado == false){
                                mat = this.swap(JSON.parse(JSON.stringify(mat)), l-2, k-2, l, k)
                                let value = mat[l-1][k-1].ficha.value;
                                mat = this.quitarFicha(JSON.parse(JSON.stringify(mat)), l-1, k-1);
                                mat = this.movimientosMultiplesPeon(JSON.parse(JSON.stringify(mat)), l - 2, k - 2, arriba, abajo, abajo, turno);
                                mat = this.swap(mat, l, k, l-2, k-2);
                                mat = this.setFicha(JSON.parse(JSON.stringify(mat)), l-1, k-1, value);
                                obligadoComer = true;
                            }
                            if(l - 2 >= 0 && l - 2 < 8 && k + 2 >= 0 && k + 2 < 8 && mat[l-1][k+1].ocupado && mat[l-1][k+1].ficha.tipo != turno & mat[l-2][k+2].ocupado == false){
                                mat = this.swap(JSON.parse(JSON.stringify(mat)), l-2, k+2, l, k)
                                let value = mat[l-1][k+1].ficha.value;
                                mat = this.quitarFicha(JSON.parse(JSON.stringify(mat)), l-1, k+1);
                                mat = this.movimientosMultiplesPeon(JSON.parse(JSON.stringify(mat)), l - 2, k + 2, arriba, abajo, abajo, turno);
                                mat = this.swap(JSON.parse(JSON.stringify(mat)), l, k, l-1, k+1);
                                mat = this.setFicha(JSON.parse(JSON.stringify(mat)), l-1, k+1, value);
                                obligadoComer = true;
                            }
                
                            if(!obligadoComer){
                                //  no come
                                if(l - 1 < 8 && l - 1 >= 0 && k - 1 < 8 && k - 1 >= 0 && (mat[l-1][k-1].ocupado == false) ){
                                    mat = this.swap(JSON.parse(JSON.stringify(mat)), l-1, k-1, l, k)
                                    this.newState.push(JSON.parse(JSON.stringify(mat)));
                                    mat = this.swap(JSON.parse(JSON.stringify(mat)), l, k, l-1, k-1);
                                }
                                if(l - 1 < 8 && l -  1 >= 0 && k + 1 < 8 && k + 1 >= 0 && (mat[l-1][k+1].ocupado == false) ){
                                    mat = this.swap(JSON.parse(JSON.stringify(mat)), l-1, k+1, l, k)
                                    this.newState.push(JSON.parse(JSON.stringify(mat)));
                                    mat = this.swap(JSON.parse(JSON.stringify(mat)), l, k, l-1, k+1)
                                } 
                            }
                        }
                    }
                }
            }
        }
        
        
        return mat;
    }

    movimientosMultiplesPeon(mat, l, k, arriba, abajo, direccion, turno){
        if(arriba == direccion){
            let mk = false;
            if(l + 2 >= 0 && l + 2 < 8 && k + 2 >= 0 && k + 2 < 8 && mat[l+1][k+1].ocupado && mat[l+1][k+1].ficha.tipo != turno & mat[l+2][k+2].ocupado == false){
                mat = this.swap(JSON.parse(JSON.stringify(mat)), l+2, k+2, l, k);
                let value = mat[l+1][k+1].ficha.value;
                mat = this.quitarFicha(JSON.parse(JSON.stringify(mat)), l+1, k+1);
                mat = this.movimientosMultiplesPeon(JSON.parse(JSON.stringify(mat)), l + 2, k + 2, arriba, abajo, arriba);
                mat = this.swap(JSON.parse(JSON.stringify(mat)), l, k, l+2, k+2)
                mat = this.setFicha(JSON.parse(JSON.stringify(mat)), l+1, k+1, value);
                mk  = true;
            }
            if(l + 2 >= 0 && l + 2 < 8 && k - 2 >= 0 && k - 2 < 8 && mat[l+1][k-1].ocupado && mat[l+1][k-1].ficha.tipo != turno & mat[l+2][k-2].ocupado == false){
                mat = this.swap(JSON.parse(JSON.stringify(mat)), l+2, k-2, l, k)
                let value = mat[l+1][k-1].ficha.value;
                mat = this.quitarFicha(JSON.parse(JSON.stringify(mat)), l+1, k-1);
                this.movimientosMultiplesPeon(JSON.parse(JSON.stringify(mat)), l + 2, k - 2, arriba, abajo, arriba);
                mat = this.swap(JSON.parse(JSON.stringify(mat)), l, k, l+2, k-2)
                mat = this.setFicha(JSON.parse(JSON.stringify(mat)), l+1, k-1, value);
                mk = true;
            }
            if(!mk){
                this.newState.push(JSON.parse(JSON.stringify(mat)));//console.log(l+" "+k);console.log(mat)
            }
        }
        if(abajo == direccion){
            let mk = false;
            if(l - 2 >= 0 && l - 2 < 8 && k - 2 >= 0 && k - 2 < 8 && mat[l-1][k-1].ocupado && mat[l-1][k-1].ficha.tipo != turno & mat[l-2][k-2].ocupado == false){
                mat = this.swap(JSON.parse(JSON.stringify(mat)), l-2, k-2, l, k)
                let value = mat[l-1][k-1].ficha.value;
                mat = this.quitarFicha(JSON.parse(JSON.stringify(mat)), l-1, k-1);
                mat = this.movimientosMultiplesPeon(JSON.parse(JSON.stringify(mat)), l - 2, k - 2, arriba, abajo, abajo);
                mat = this.swap(JSON.parse(JSON.stringify(mat)), l, k, l-2, k-2);
                mat = this.setFicha(JSON.parse(JSON.stringify(mat)), l-1, k-1, value);
                mk = true;
            }
            if(l - 2 >= 0 && l - 2 < 8 && k + 2 >= 0 && k + 2 < 8 && mat[l-1][k+1].ocupado && mat[l-1][k+1].ficha.tipo != turno & mat[l-2][k+2].ocupado == false){
                mat = this.swap(JSON.parse(JSON.stringify(mat)), l-2, k+2, l, k)
                let value = mat[l-1][k+1].ficha.value;
                mat = this.quitarFicha(JSON.parse(JSON.stringify(mat)), l-1, k+1);
                mat = this.movimientosMultiplesPeon(JSON.parse(JSON.stringify(mat)), l - 2, k + 2, arriba, abajo, abajo);
                mat = this.swap(JSON.parse(JSON.stringify(mat)), l, k, l-2, k+2)
                mat = this.setFicha(JSON.parse(JSON.stringify(mat)), l-1, k+1, value);
                mk = true;
            }
            if(!mk){//console.log(mat)
                this.newState.push(JSON.parse(JSON.stringify(mat)));
            }
        }   
        return mat;
    }

    recorrerPosMovDama(mat, l, k, i, j, turno){
        // coordenadas donde inicia
        let x = l;
        let y = k; 
        let damaObligado = false; // si encontro una primero ficha que comer
        let mk = false; // si encontro ya tiene una ficha q comer y tiene otro mas adelante q comer
        let arr = []; // arreglo con las posiciones donde encontro otra ficha que comer
        
        while(l + i >= 0 && l + i < 8 && k + j >= 0 && k + j < 8){ 
            if(mat[l+i][k+j].ocupado && mat[l+i][k+j].ficha.tipo == turno){ // si hay una ficha del mismo tipo
                break;
            }
            if(mat[l][k].ocupado && mat[l][k].ficha.tipo != turno & mat[l+i][k+j].ocupado == true){  // si hay dos fichas consecutivas
                break;
            }
            if(!mat[l+i][k+j].ocupado){
                mat[l+i][k+j].color = ColorBack.casillaFinal;

                // comprueba si despues de haber comido una ficha puede comer a los lados
                if(damaObligado && this.comprobarPosibleMovMultDama(JSON.parse(JSON.stringify(mat)), l + i, k + j, i, -j, turno)){//alert(l+" "+k) 
                    mat = this.swap(JSON.parse(JSON.stringify(mat)), l + i, k + j, x, y);     
                    this.recorrerPosMovDama(JSON.parse(JSON.stringify(mat)), l + i, k + j, i, -j, turno);                
                    mat = this.swap(JSON.parse(JSON.stringify(mat)), x, y, l + i, k + j);
                    let g = l;
                    let h = k;
                    arr.push([l+i, k+j])
                    while(g != x && h != y){  // encontro un nuevo camino por el que tiene que comer y marca lo recorrido hasta el momento
                        mat[g][h].color = ColorBack.casillaMedia;
                        g-=i;
                        h-=j;
                    } 
                    mk = true;
                }
                if(damaObligado && this.comprobarPosibleMovMultDama(JSON.parse(JSON.stringify(mat)), l + i, k + j, -i, j, turno)){//alert(l+" "+k)
                    mat = this.swap(JSON.parse(JSON.stringify(mat)), l + i, k + j, x, y);      
                    this.recorrerPosMovDama(JSON.parse(JSON.stringify(mat)), l + i, k + j, -i, j, turno);                
                    mat = this.swap(JSON.parse(JSON.stringify(mat)), x, y, l + i, k + j);
                    let g = l;
                    let h = k;
                    arr.push([l+i, k+j])
                    while(g != x && h != y){  
                        mat[g][h].color = ColorBack.casillaMedia;
                        g-=i;
                        h-=j;
                    } 
                    mk = true;
                }
                if(damaObligado && this.comprobarPosibleMovMultDama(JSON.parse(JSON.stringify(mat)), l + i, k + j, -i, -j, turno)){//alert(l+" "+k)
                    mat = this.swap(JSON.parse(JSON.stringify(mat)), l + i, k + j, x, y);      console.log(1)
                    this.recorrerPosMovDama(JSON.parse(JSON.stringify(mat)), l + i, k + j -i, -j, turno);               
                    mat = this.swap(JSON.parse(JSON.stringify(mat)), x, y, l + i, k + j);
                    let g = l;
                    let h = k;
                    arr.push([l+i, k+j])
                    while(g != x && h != y){  
                        mat[g][h].color = ColorBack.casillaMedia;
                        g-=i;
                        h-=j;
                    } 
                    mk = true;
                }
            }
            if(l + 2*i >= 0 && l + 2*i < 8 && k + 2*j >= 0 && k + 2*j < 8 && mat[l+i][k+j].ocupado && mat[l+i][k+j].ficha.tipo != turno & mat[l+2*i][k+2*j].ocupado == false){ // si puede comer
                mat[l+i][k+j].color = ColorBack.casillaMedia;
                
                // comer esa ficha
                mat = this.quitarFicha(JSON.parse(JSON.stringify(mat)), l+i, k+j);

                let g = l;//console.log((l+i+" "+(k+j)))
                let h = k;
                damaObligado = true;
                while(g != x && h != y){ // vira a donde empezo conviertiendo el color en casillaMedia
                    mat[g][h].color = ColorBack.casillaMedia;
                    g-=i;
                    h-=j;
                }
                mk = false; 
            }
            l+=i;
            k+=j;
        }
        //console.log(l+" "+k)
        if(mk){
            while(mat[l-i][k-j].color != ColorBack.casillaMedia){
                mat[l][k].color = ColorBack.casillaBasica;
                l-=i;
                k-=j;
            }
        }
        if(damaObligado && !mk){ // si en linea recta ay ficha para comer y esta es la ultima
            /*this.swap(JSON.parse(JSON.stringify(mat)), l, k, x, y)
            this.quitarFicha(JSON.parse(JSON.stringify(mat)), x, y)
            while(l!= x && k != y){
                this.quitarFicha(JSON.parse(JSON.stringify(mat)), l, k)
                l-=i;
                k-=j;
            }
            this.newState.push(JSON.parse(JSON.stringify(mat)));*/
            //console.log(l+" "+k)
            
            //console.log(l+" "+k)
            while(x != l && y != k){
                if(mat[l][k].color == ColorBack.casillaFinal){
                    mat[l][k].color = ColorBack.casillaBasica;
                    mat = this.swap(JSON.parse(JSON.stringify(mat)), l, k, x, y);
                    this.newState.push(JSON.parse(JSON.stringify(mat)));
                    mat = this.swap(JSON.parse(JSON.stringify(mat)), x, y, l, k);   
                }        
                l-=i;
                k-=j;
            }//console.log("final "+l+" "+k+" origen "+x+" "+y+" "+this.newState.length)
        }
        if(this.damaComera && !damaObligado){
            let g = l;
            let h = k;
            while(g != x && h != y){
                mat[g][h].color = ColorBack.casillaBasica;
                g-=i;
                h-=j;
            }
        }
        if(!this.damaComera && !damaObligado){ // si no ay ficha para comer
            for(let n = 0; n < 8; n++){
                for(let m = 0; m < 8; m++){
                    if(mat[n][m].color == ColorBack.casillaFinal){
                        mat[n][m].color = ColorBack.casillaBasica;
                        mat = this.swap(JSON.parse(JSON.stringify(mat)), n, m, x, y);
                        this.newState.push(JSON.parse(JSON.stringify(mat)));
                        mat = this.swap(JSON.parse(JSON.stringify(mat)), x, y, n, m)
                    }
                }
            }
        }
        return arr;
    }
  
    // realiza el posible movimiento de la dama paso a paso
    posMovDama(mat, l, k, turno){ 
        let arr = [];
        for(let i = 0; i < 4; i++){
            let arr = this.recorrerPosMovDama(JSON.parse(JSON.stringify(mat)), l, k, mx[i], my[i], turno);
            for(let a = 0; a < arr.length; a++){
                mat[arr[a][0]][arr[a][1]].color = ColorBack.casillaFinal;//console.log(arr[a][0]+" "+arr[a][1])
            }
        }
        
    }

    comprobarPosibleMovMultDama(mat, l, k, i, j, turno){ // i - j pueden tomar valores de 1 o -1 indicando en que direccion se esta moviendo 
        let mk = false;//console.log(turno)
        
        while(l + i >= 0 && l + i < 8 && k + j >= 0 && k + j < 8){
            if(mat[l+i][k+j].ocupado && mat[l+i][k+j].ficha.tipo == turno){
                break;
            }
            if(mat[l][k].ocupado && mat[l][k].ficha.tipo != turno & mat[l+i][k+j].ocupado == true){ 
                break;
            }
            if(l + 2*i >= 0 && l + 2*i < 8 && k + 2*j >= 0 && k + 2*j < 8 && mat[l+i][k+j].ocupado && mat[l+i][k+j].ficha.tipo != turno & mat[l+2*i][k+2*j].ocupado == false){
                mk = true;
            }
            l+=i;
            k+=j;
        }
        //if(l == 7 && k == 3)console.log(l+" "+k+" "+i+" "+j+" "+mk)
        return mk;
    }


    recursion(profundidad, turnoMaquina, turno){ // algoritmo recursivo que recorre el arbol de busqueda
        //console.log(this.nodo)
        let winner = this.isGanador(JSON.parse(JSON.stringify(this.tree[this.nodo].mat)), turno);
        this.cont++;
        if(winner){//console.log(winner)
            this.tree[this.nodo].value = winner == "blanca" ? -1000 : 1000;
            return;
        }
        if(profundidad == 3){ // si has llegado a la maxima profundidad del arbol returna
            this.tree[this.nodo].value = this.funcionEvaluacion(JSON.parse(JSON.stringify(this.tree[this.nodo].mat)), turno);
            return;
        }//console.log(nodo.mat)
        //console.log(this.tree[this.nodo].value)
        let padre = this.nodo;
        //console.log(this.tree)
        // genera los nuevos movimientos
        let mat = this.CasillasValidas(JSON.parse(JSON.stringify(this.tree[this.nodo].mat)), this.arriba, this.abajo, turno);//console.log(mat)
        if(!mat)return;
        this.newState = [];
        mat = this.posiblesMovimentos(JSON.parse(JSON.stringify(mat)), this.arriba, this.abajo, turno);//console.log(p+" "+this.newState.length)
        let newMov = JSON.parse(JSON.stringify(this.newState)); // guarda los nuevos movimientos localmente
        
        // aleatorizar el arreglo de nuevos movimientos para asegurar que no se haga la misma eleccion
        if(newMov.length > 2){
            for(let i = 0; i < newMov.length; i++){
                let rand = Math.round(Math.random() * newMov.length-1);
                if(rand < 0)continue;//console.log(rand+" "+newMov.length)
                let aux = JSON.parse(JSON.stringify(newMov[i]));
                newMov[i] = JSON.parse(JSON.stringify(newMov[rand]));
                newMov[rand] = JSON.parse(JSON.stringify(aux));
            }
        }

        // evaluacion del nodo
        let ma = -10000, mi = 10000; // ma para un nodo MAX y mi para un nodo MIN
        let ale = Math.round(Math.random()) == 0 ? true : false;let nodoAux;
        // manda la recursion a cada nuevo nodo
        for(let i = 0; i < newMov.length; i++){
            newMov[i] = this.marcarPosiblesDamas(JSON.parse(JSON.stringify(newMov[i])));//console.log(p);
            newMov[i] = this.setColorBasico(JSON.parse(JSON.stringify(newMov[i])));//console.log(this.newState[i])

            let aux = new Nodo(JSON.parse(JSON.stringify(newMov[i])));
            aux.value = this.funcionEvaluacion(JSON.parse(JSON.stringify(newMov[i])), turno);//console.log(p+" "+aux.value)
            this.nodo++;
            this.tree[this.nodo] = JSON.parse(JSON.stringify(aux));
            this.tree[padre].listaHijos.push(this.nodo);
            this.recursion(profundidad + 1, !turnoMaquina, turno == "blanca" ?  "roja" : "blanca");
            if(turnoMaquina){
                if(ma < this.tree[this.nodo].value || (ma == this.tree[this.nodo].value && ale)){
                    ma = this.tree[this.nodo].value;
                    nodoAux = JSON.parse(JSON.stringify(this.tree[this.tree[padre].listaHijos[this.tree[padre].listaHijos.length - 1]].mat));
                    //this.choise = this.tree[this.tree[padre].listaHijos[this.tree[padre].listaHijos.length - 1]];
                }
            }
            else{
                if(mi > this.tree[this.nodo].value || (mi == this.tree[this.nodo].value && ale)){
                    mi = this.tree[this.nodo].value;
                    nodoAux = JSON.parse(JSON.stringify(this.tree[this.tree[padre].listaHijos[this.tree[padre].listaHijos.length - 1]].mat));
                    //this.choise = this.tree[this.tree[padre].listaHijos[this.tree[padre].listaHijos.length - 1]];
                }
            }
            ale = !ale;this.tree[padre].value = turnoMaquina == true ? ma : mi;//console.log(nodo.value)
        }
        this.matAux = JSON.parse(JSON.stringify(nodoAux));
        /*
        // evaluacion del nodo
        let ma = -10000, mi = 10000; // ma para un nodo MAX y mi para un nodo MIN
        let ale = Math.round(Math.random()) == 0 ? true : false;
        for(let i = 0; i < nodo.listaHijos.length; i++){
            if(turnoMaquina){
                if(ma < nodo.listaHijos[i].value || (ma == nodo.listaHijos[i].value && ale)){
                    ma = nodo.listaHijos[i].value;
                    this.matAux = JSON.parse(JSON.stringify(nodo.listaHijos[i].mat));
                }
            }
            else{
                if(mi > nodo.listaHijos[i].value || (mi == nodo.listaHijos[i].value && ale)){
                    mi = nodo.listaHijos[i].value;
                    this.matAux = JSON.parse(JSON.stringify(nodo.listaHijos[i].mat));
                }
            }
            ale = !ale;
        }
        nodo.value = turnoMaquina == true ? ma : mi;//console.log(nodo.value)
        */         
        //console.log(nodo.value)
    }

    funcionEvaluacion(mat, turno){ // funcion heuristica de evaluacion de un nodo
        let rojaPeon = 0;
        let blancaPeon = 0;
        let rojaDama = 0;
        let blancaDama = 0;
        /*
        let rojaValida = 0;
        let rojaBasica = 0;
        let blancaValida = 0;
        let blancaBasica = 0;
        mat = this.CasillasValidas(JSON.parse(JSON.stringify(mat)), this.arriba, this.abajo, turno);*/

        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                switch(mat[i][j].ficha.value){
                    case "blancaPeon" : blancaPeon++;
                        break;
                    case "rojaPeon" : rojaPeon++;
                        break;
                    case "rojaDama" : rojaDama++;
                        break;
                    case "blancaDama" : blancaDama++;
                        break;
                }
            }
        }
        
        if(this.maquinaTurno == "blanca"){
            return (3*blancaDama + blancaPeon) - (3*rojaDama + rojaPeon);
        }
        else{
            return (3*rojaDama + rojaPeon) - (3*blancaDama + blancaPeon);
        }/*
        if(this.maquinaTurno == "blanca"){
            return (250 * blancaDama) + (100 * blancaPeon) + ((-250) * rojaDama) + (-100 * rojaPeon) + (5 * blancaBasica) + (-5 * rojaBasica) + (2 * blancaValida) + (-2 * rojaValida);
        }
        else{
            return (-250 * blancaDama) + (-100 * blancaPeon) + (250 * rojaDama) + (100 * rojaPeon) + (-5 * blancaBasica) + (5 * rojaBasica) + (-2 * blancaValida) + (2 * rojaValida);
        }*/
    }

    setColorBasico(mat){
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(mat[i][j].color != "saddlebrown")mat[i][j].color = ColorBack.casillaBasica;//console.log(1)
            }
        }
        return mat;
    }

    marcarPosiblesDamas(mat){  // se encarga de marcar las casillas donde es posible convertirse en dama
        for(let i = 0; i < 8; i++){
            if(mat[0][i].ocupado != false && mat[0][i].ficha.rango == "peon" && mat[0][i].ficha.tipo != this.arriba ){//console.log(mat[0][i].ficha)
                mat = this.setFicha(JSON.parse(JSON.stringify(mat)), 0, i, mat[0][i].ficha.tipo + "Dama");
            }
            if(mat[7][i].ocupado != false && mat[7][i].ficha.rango == "peon" && mat[7][i].ficha.tipo != this.abajo){//console.log(mat[7][i].ficha)
                mat = this.setFicha(JSON.parse(JSON.stringify(mat)), 7, i, mat[7][i].ficha.tipo + "Dama");
            }
        } 
        return mat;
    }
}