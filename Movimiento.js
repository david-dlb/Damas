var mx = [-1, -1, 1, 1];
var my = [-1, 1, 1, -1];
class Movimiento{
    constructor(){
        this.damaComera = false; // booleano para saber si la dama tiene que comer
        this.casillas = [];
    }

    // metodo para recorrer las damas en busca de si debe comer obligado generalizando el progreso para todas las direcciones
    recorrerDamaObligado(l, k, i, j, turno){
        let x = l;
        let y = k;
        while(l + 2*i >= 0 && l + 2*i < 8 && k + 2*j >= 0 && k + 2*j < 8){
            if(casillas[l+i][k+j].ocupado && casillas[l+i][k+j].ficha.tipo == turno){
                break;
            }
            if(casillas[l+i][k+j].ocupado && casillas[l+2*i][k+2*j].ocupado){
                break;
            }
            if(casillas[l+i][k+j].ocupado && casillas[l+i][k+j].ficha.tipo != turno && casillas[l+2*i][k+2*j].ocupado == false){
                casillas[x][y].ele.style.backgroundColor = ColorBack.casillaValida;
                return true;
                
            }
            l+=i;
            k+=j;
        }       
        return false; 
    }

    // para saber si ay que comer obligado
    ComerObligado(casillas, arriba, abajo){ 
        let turno = document.getElementById("turno").innerHTML;
        
        let obligado = false;
        this.damaComera = false; // si ay dama que tiene q comer obligado

        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8;j++){
                if(casillas[i][j].ocupado){
                    if(casillas[i][j].ficha.tipo == turno){
                        if(casillas[i][j].ficha.rango == "dama"){
                            let damaObligado = false;
                            for(let k = 0; k < 4; k++){
                                if(this.recorrerDamaObligado(i, j, mx[k], my[k], turno)){//console.log(i+" "+j + "  "+ (i+mx[k]+" "+(j+my[k])))
                                    obligado = true;
                                    damaObligado = true;
                                }
                            }
                            
                            if(damaObligado){
                                this.damaComera = true; // si la dama tiene que comer 
                            }
                            
                        }
                        else{
                            if(arriba == casillas[i][j].ficha.tipo){
                                if(i + 2 >= 0 && i + 2 < 8 && j + 2 >= 0 && j + 2 < 8 && casillas[i+1][j+1].ocupado && casillas[i+1][j+1].ficha.tipo != turno && casillas[i+2][j+2].ocupado == false){
                                    casillas[i][j].ele.style.backgroundColor = ColorBack.casillaValida;
                                    obligado = true;
                                }
                                if(i +2 >= 0 && i + 2 < 8 && j - 2 >= 0 && j - 2 < 8 && casillas[i+1][j-1].ocupado && casillas[i+1][j-1].ficha.tipo != turno && casillas[i+2][j-2].ocupado == false){
                                    casillas[i][j].ele.style.backgroundColor = ColorBack.casillaValida;
                                    obligado = true;
                                }
                                
                            }
                            if(abajo == casillas[i][j].ficha.tipo){
                                if(i - 2 >= 0 && i - 2 < 8 && j - 2 >= 0 && j - 2 < 8 && casillas[i-1][j-1].ocupado && casillas[i-1][j-1].ficha.tipo != turno && casillas[i-2][j-2].ocupado == false){
                                    casillas[i][j].ele.style.backgroundColor = ColorBack.casillaValida;
                                    obligado = true;
                                }
                                if(i - 2 >= 0 && i - 2 < 8 && j + 2 >= 0 && j + 2 < 8 && casillas[i-1][j+1].ocupado && casillas[i-1][j+1].ficha.tipo != turno && casillas[i-2][j+2].ocupado == false){
                                    casillas[i][j].ele.style.backgroundColor = ColorBack.casillaValida;
                                    obligado = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        if(obligado){
            return casillas;
        }
        else{
            return null;
        }
    }
    CasillasValidas(casillas, arriba, abajo){
        let turno = document.getElementById("turno").innerHTML;
        
        let isValido = false;
        let c = this.ComerObligado(casillas, arriba, abajo);
        if(c != null){//console.log(this.damaComera)
            return casillas;
        }
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8;j++){
                if(casillas[i][j].ocupado){
                    if(casillas[i][j].ficha.tipo == turno){
                        if(casillas[i][j].ficha.rango == "dama"){
                            if(i + 1 < 8 && i + 1 >= 0 && j + 1 < 8 && j + 1 >= 0 && (casillas[i+1][j+1].ocupado == false) ){
                                casillas[i][j].ele.style.backgroundColor = ColorBack.casillaValida;
                                isValido = true;
                            }
                            if(i + 1 < 8 && i + 1 >= 0 && j - 1 < 8 && j - 1 >= 0 && (casillas[i+1][j-1].ocupado == false) ){
                                casillas[i][j].ele.style.backgroundColor = ColorBack.casillaValida;
                                isValido = true;
                            }
                            if(i - 1 < 8 && i - 1 >= 0 && j - 1 < 8 && j - 1 >= 0 && (casillas[i-1][j-1].ocupado == false) ){
                                casillas[i][j].ele.style.backgroundColor = ColorBack.casillaValida;
                                isValido = true;
                            }
                            if(i - 1 < 8 && i - 1 >= 0 && j + 1 < 8 && j + 1 >= 0 && (casillas[i-1][j+1].ocupado == false) ){
                                casillas[i][j].ele.style.backgroundColor = ColorBack.casillaValida;
                                isValido = true;
                            }
                        } 
                        else{
                            if(arriba == casillas[i][j].ficha.tipo){
                                if(i + 1 < 8 && i + 1 >= 0 && j + 1 < 8 && j + 1 >= 0 && (casillas[i+1][j+1].ocupado == false) ){
                                    isValido = true;
                                    casillas[i][j].ele.style.backgroundColor = ColorBack.casillaValida;
                                }
                                if(i + 1 < 8 && i + 1 >= 0 && j - 1 < 8 && j - 1 >= 0 && (casillas[i+1][j-1].ocupado == false) ){
                                    isValido = true;
                                    casillas[i][j].ele.style.backgroundColor = ColorBack.casillaValida;
                                }
                            }
                            if(abajo == casillas[i][j].ficha.tipo){
                                if(i - 1 < 8 && i - 1 >= 0 && j - 1 < 8 && j - 1 >= 0 && (casillas[i-1][j-1].ocupado == false) ){
                                    isValido = true;
                                    casillas[i][j].ele.style.backgroundColor = ColorBack.casillaValida;
                                }
                                if(i - 1 < 8 && i - 1 >= 0 && j + 1 < 8 && j + 1 >= 0 && (casillas[i-1][j+1].ocupado == false) ){
                                    isValido = true;
                                    casillas[i][j].ele.style.backgroundColor = ColorBack.casillaValida;
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
        return (casillas);
    }

    // halla los posibles movimientos del tablero
    posiblesMovimentos(casillas, l, k, arriba, abajo){
        let turno = document.getElementById("turno").innerHTML;
        let obligadoComer = false;
        
        if(casillas[l][k].ficha.rango == "dama"){ // si es una dama
            this.posMovDama(casillas, l, k);
        }
        else{ // si es un peon
            if(arriba == casillas[l][k].ficha.tipo){
                //tener que comer
                if(l + 2 >= 0 && l + 2 < 8 && k + 2 >= 0 && k + 2 < 8 && casillas[l+1][k+1].ocupado && casillas[l+1][k+1].ficha.tipo != turno & casillas[l+2][k+2].ocupado == false){
                    casillas[l+1][k+1].ele.style.backgroundColor = ColorBack.casillaMedia;
                    casillas[l+2][k+2].ele.style.backgroundColor = ColorBack.casillaFinal;
                    casillas = this.movimientosMultiplesPeon(casillas, l + 2, k + 2, arriba, abajo, arriba);
                    obligadoComer = true;
                }
                if(l + 2 >= 0 && l + 2 < 8 && k - 2 >= 0 && k - 2 < 8 && casillas[l+1][k-1].ocupado && casillas[l+1][k-1].ficha.tipo != turno & casillas[l+2][k-2].ocupado == false){
                    casillas[l+1][k-1].ele.style.backgroundColor = ColorBack.casillaMedia;
                    casillas[l+2][k-2].ele.style.backgroundColor = ColorBack.casillaFinal;
                    casillas = this.movimientosMultiplesPeon(casillas, l + 2, k - 2, arriba, abajo, arriba);
                    obligadoComer = true;
                }
    
                if(!obligadoComer){//sin tener que comer
    
                    if(l + 1 < 8 && l + 1 >= 0 && k + 1 < 8 && k + 1 >= 0 && (casillas[l+1][k+1].ocupado == false) ){
                        casillas[l+1][k+1].ele.style.backgroundColor = ColorBack.casillaFinal;
                    }
                    if(l + 1 < 8 && l + 1 >= 0 && k - 1 < 8 && k - 1 >= 0 && (casillas[l+1][k-1].ocupado == false) ){
                        casillas[l+1][k-1].ele.style.backgroundColor = ColorBack.casillaFinal;
                    } 
                }
            }
            if(abajo == casillas[l][k].ficha.tipo){
    
                //  tiene que comer
                if(l - 2 >= 0 && l - 2 < 8 && k - 2 >= 0 && k - 2 < 8 && casillas[l-1][k-1].ocupado && casillas[l-1][k-1].ficha.tipo != turno & casillas[l-2][k-2].ocupado == false){
                    casillas[l-1][k-1].ele.style.backgroundColor = ColorBack.casillaMedia;
                    casillas[l-2][k-2].ele.style.backgroundColor = ColorBack.casillaFinal;
                    casillas = this.movimientosMultiplesPeon(casillas, l - 2, k - 2, arriba, abajo, abajo);
                    obligadoComer = true;
                }
                if(l - 2 >= 0 && l - 2 < 8 && k + 2 >= 0 && k + 2 < 8 && casillas[l-1][k+1].ocupado && casillas[l-1][k+1].ficha.tipo != turno & casillas[l-2][k+2].ocupado == false){
                    casillas[l-1][k+1].ele.style.backgroundColor = ColorBack.casillaMedia;
                    casillas[l-2][k+2].ele.style.backgroundColor = ColorBack.casillaFinal;
                    casillas = this.movimientosMultiplesPeon(casillas, l - 2, k + 2, arriba, abajo, abajo);
                    obligadoComer = true;
                }
    
                if(!obligadoComer){
                    //  no come
                    if(l - 1 < 8 && l - 1 >= 0 && k - 1 < 8 && k - 1 >= 0 && (casillas[l-1][k-1].ocupado == false) ){
                        casillas[l-1][k-1].ele.style.backgroundColor = ColorBack.casillaFinal; 
                    }
                    if(l - 1 < 8 && l - 1 >= 0 && k + 1 < 8 && k + 1 >= 0 && (casillas[l-1][k+1].ocupado == false) ){
                        casillas[l-1][k+1].ele.style.backgroundColor = ColorBack.casillaFinal; 
                    } 
                }
            }
        }
        
        return (casillas);
    }

    movimientosMultiplesPeon(casillas, l, k, arriba, abajo, direccion){
        let turno = document.getElementById("turno").innerHTML;
        if(arriba == direccion){
            if(l + 2 >= 0 && l + 2 < 8 && k + 2 >= 0 && k + 2 < 8 && casillas[l+1][k+1].ocupado && casillas[l+1][k+1].ficha.tipo != turno & casillas[l+2][k+2].ocupado == false){
                casillas[l][k].ele.style.backgroundColor = ColorBack.casillaMedia;
                casillas[l+1][k+1].ele.style.backgroundColor = ColorBack.casillaMedia;
                casillas[l+2][k+2].ele.style.backgroundColor = ColorBack.casillaFinal;
                casillas = this.movimientosMultiplesPeon(casillas, l + 2, k + 2, arriba, abajo, direccion);
            }
            if(l + 2 >= 0 && l + 2 < 8 && k - 2 >= 0 && k - 2 < 8 && casillas[l+1][k-1].ocupado && casillas[l+1][k-1].ficha.tipo != turno & casillas[l+2][k-2].ocupado == false){
                casillas[l][k].ele.style.backgroundColor = ColorBack.casillaMedia;
                casillas[l+1][k-1].ele.style.backgroundColor = ColorBack.casillaMedia;
                casillas[l+2][k-2].ele.style.backgroundColor = ColorBack.casillaFinal;
                casillas = this.movimientosMultiplesPeon(casillas, l + 2, k - 2, arriba, abajo, direccion);
            }
        }
        if(abajo == direccion){

            if(l - 2 >= 0 && l - 2 < 8 && k - 2 >= 0 && k - 2 < 8 && casillas[l-1][k-1].ocupado && casillas[l-1][k-1].ficha.tipo != turno & casillas[l-2][k-2].ocupado == false){
                casillas[l][k].ele.style.backgroundColor = ColorBack.casillaMedia;
                casillas[l-1][k-1].ele.style.backgroundColor = ColorBack.casillaMedia;
                casillas[l-2][k-2].ele.style.backgroundColor = ColorBack.casillaFinal;
                casillas = this.movimientosMultiplesPeon(casillas, l - 2, k - 2, arriba, abajo, direccion);
            }
            if(l - 2 >= 0 && l - 2 < 8 && k + 2 >= 0 && k + 2 < 8 && casillas[l-1][k+1].ocupado && casillas[l-1][k+1].ficha.tipo != turno & casillas[l-2][k+2].ocupado == false){
                casillas[l][k].ele.style.backgroundColor = ColorBack.casillaMedia;
                casillas[l-1][k+1].ele.style.backgroundColor = ColorBack.casillaMedia;
                casillas[l-2][k+2].ele.style.backgroundColor = ColorBack.casillaFinal;
                casillas = this.movimientosMultiplesPeon(casillas, l - 2, k + 2, arriba , abajo, direccion);
            }
        }   
        return casillas;
    }

    // ayuda al PosMovDama generalizando el proceso para todas las direcciones
    recorrerPosMovDama(casillas, l, k, i, j, turno){
        // coordenadas donde inicia
        let x = l;
        let y = k;

        let damaObligado = false; // si encontro una primero ficha que comer
        let mk = false; // si encontro ya tiene una ficha q comer y no tiene otro mas adelante a los lados q comer
        let arr = []; // arreglo con las posiciones donde encontro otra ficha que comer
        
        while(l + i >= 0 && l + i < 8 && k + j >= 0 && k + j < 8){ 
            if(casillas[l+i][k+j].ocupado && casillas[l+i][k+j].ficha.tipo == turno){ // si hay una ficha del mismo tipo
                break;
            }
            if(casillas[l][k].ocupado && casillas[l][k].ficha.tipo != turno & casillas[l+i][k+j].ocupado == true){  // si hay dos fichas consecutivas
                break;
            }
            if(!casillas[l+i][k+j].ocupado){
                casillas[l+i][k+j].ele.style.backgroundColor = ColorBack.casillaFinal;

                // comprueba si despues de haber comido una ficha puede comer a los lados
                if(damaObligado && this.comprobarPosibleMovMultDama(casillas, l + i, k + j, i, -j)){//alert(l+" "+k) 
                    let g = l;
                    let h = k;
                    arr.push([l+i, k+j])
                    while(g != x && h != y){  // encontro un nuevo camino por el que tiene que comer y marca lo recorrido hasta el momento
                        casillas[g][h].ele.style.backgroundColor = ColorBack.casillaMedia;
                        g-=i;
                        h-=j;
                    } 
                    mk = true;
                }
                if(damaObligado && this.comprobarPosibleMovMultDama(casillas, l + i, k + j, -i, j)){//alert(l+" "+k) 
                    let g = l;
                    let h = k;
                    arr.push([l+i, k+j])
                    while(g != x && h != y){  
                        casillas[g][h].ele.style.backgroundColor = ColorBack.casillaMedia;
                        g-=i;
                        h-=j;
                    } 
                    mk = true;
                }
            }
            if(l + 2*i >= 0 && l + 2*i < 8 && k + 2*j >= 0 && k + 2*j < 8 && casillas[l+i][k+j].ocupado && casillas[l+i][k+j].ficha.tipo != turno & casillas[l+2*i][k+2*j].ocupado == false){ // si puede comer
                casillas[l+i][k+j].ele.style.backgroundColor = ColorBack.casillaMedia;
                let g = l;//console.log((l+i+" "+(k+j)))
                let h = k;
                damaObligado = true;
                while(g != x && h != y){ // vira a donde empezo conviertiendo el color en casillaMedia
                    casillas[g][h].ele.style.backgroundColor = ColorBack.casillaMedia;
                    g-=i;
                    h-=j;
                }
                mk = false;
            }
            l+=i;
            k+=j;
        }
        if(mk){
            while(casillas[l-i][k-j].ele.style.backgroundColor != ColorBack.casillaMedia){
                casillas[l][k].ele.style.backgroundColor = ColorBack.casillaBasica;
                l-=i;
                k-=j;
            }
        }
        if(this.damaComera && !damaObligado){
            let g = l;
            let h = k;
            while(g != x && h != y){
                casillas[g][h].ele.style.backgroundColor = ColorBack.casillaBasica;
                g-=i;
                h-=j;
            }
        }
        return arr;
    }

    // realiza el posible movimiento de la dama paso a paso
    posMovDama(casillas, l, k){
        let turno = document.getElementById("turno").innerHTML;
        let arr = [];
        for(let i = 0; i < 4; i++){
            let arr = this.recorrerPosMovDama(casillas, l, k, mx[i], my[i], turno);
            for(let a = 0; a < arr.length; a++){
                casillas[arr[a][0]][arr[a][1]].ele.style.backgroundColor = ColorBack.casillaFinal;//console.log(arr[a][0]+" "+arr[a][1])
            }
        }
        
    }

    
    // ayuda al comprobarPosibleMovMultDama generalizando el proceso para todas las direcciones
    recorrerComprobarPosibleMovMultDama(casillas, l, k, i, j, turno){
        let mk = false;
        while(l + i >= 0 && l + i < 8 && k + j >= 0 && k + j < 8){
            if(casillas[l+i][k+j].ocupado && casillas[l+i][k+j].ficha.tipo == turno){
                break;
            }
            if(casillas[l][k].ocupado && casillas[l][k].ficha.tipo != turno & casillas[l+i][k+j].ocupado == true){ 
                break;
            }
            if(l + 2*i >= 0 && l + 2*i < 8 && k + 2*j >= 0 && k + 2*j < 8 && casillas[l+i][k+j].ocupado && casillas[l+i][k+j].ficha.tipo != turno & casillas[l+2*i][k+2*j].ocupado == false){
                mk = true;
            }
            l+=i;
            k+=j;
        }
        return mk;
    }
    comprobarPosibleMovMultDama(casillas, l, k, i, j){ // i - j pueden tomar valores de 1 o -1 indicando en que direccion se esta moviendo
        let turno = document.getElementById("turno").innerHTML;
        let mk = false;
        while(l + i >= 0 && l + i < 8 && k + j >= 0 && k + j < 8){
            if(casillas[l+i][k+j].ocupado && casillas[l+i][k+j].ficha.tipo == turno){
                break;
            }
            if(casillas[l][k].ocupado && casillas[l][k].ficha.tipo != turno & casillas[l+i][k+j].ocupado == true){ 
                break;
            }
            if(l + 2*i >= 0 && l + 2*i < 8 && k + 2*j >= 0 && k + 2*j < 8 && casillas[l+i][k+j].ocupado && casillas[l+i][k+j].ficha.tipo != turno & casillas[l+2*i][k+2*j].ocupado == false){
                mk = true;
            }
            l+=i;
            k+=j;
        }
        return mk;
    }

    existeMovDama(casillas, l, k){
        if(!this.damaComera){
            return false;
        }
        for(let i = 0; i < 4; i++){
            if(this.comprobarPosibleMovMultDama(casillas, l, k, mx[i], my[i])){
                return true;
            }
        }
        return false;
    }

    ejecutarMovimientoPeon(casillas, l, k, arriba, abajo, direccion){
        //casillas[l][k].quitarFicha();

        if(abajo == direccion){
            
            if(l + 1 >= 0 && l + 1 < 8 && k + 1 >= 0 && k + 1 < 8 && casillas[l+1][k+1].ele.style.backgroundColor == ColorBack.casillaMedia){
                
                casillas[l+1][k+1].quitarFicha();
                casillas = this.ejecutarMovimientoPeon(casillas, l + 1, k + 1, arriba, abajo, direccion);
            }
            else{
                if(l + 1 >= 0 && l + 1 < 8 && k - 1 >= 0 && k - 1 < 8 && casillas[l+1][k-1].ele.style.backgroundColor == ColorBack.casillaMedia){
                    
                    casillas[l+1][k-1].quitarFicha();
                    casillas = this.ejecutarMovimientoPeon(casillas, l + 1, k - 1, arriba, abajo, direccion);
                }
            }
            
        }
        if(arriba == direccion){

            if(l - 1 >= 0 && l - 1 < 8 && k - 1 >= 0 && k - 1 < 8 && casillas[l-1][k-1].ele.style.backgroundColor == ColorBack.casillaMedia){
                
                casillas[l-1][k-1].quitarFicha();
                casillas = this.ejecutarMovimientoPeon(casillas, l - 1, k - 1, arriba, abajo, direccion);
            }
            else{
                if(l - 1 >= 0 && l - 1 < 8 && k + 1 >= 0 && k + 1 < 8 && casillas[l-1][k+1].ele.style.backgroundColor == ColorBack.casillaMedia){
                    
                    casillas[l-1][k+1].quitarFicha();
                    casillas = this.ejecutarMovimientoPeon(casillas, l - 1, k + 1, arriba , abajo, direccion);
                }
            }
        }   
        return casillas;
    }

    // ayuda al ejecutarMovimientoDama generalizando el proceso para todas las direcciones
    recorrerEjecutarMovimientoDama(casillas, l, k, i, j){
        if(l + i < 8 && l + i >= 0 && k + j < 8 && k + j >= 0 && (casillas[l+i][k+j].ele.style.backgroundColor == ColorBack.casillaFinal || casillas[l+i][k+j].ele.style.backgroundColor == ColorBack.casillaMedia || casillas[l+i][k+j].ele.style.backgroundColor == ColorBack.casillaSelect) ){
            
            while(l + i >= 0 && l + i < 8 && k + j >= 0 && k + j < 8 && casillas[l+i][k+j].ele.style.backgroundColor != ColorBack.casillaSelect && casillas[l+i][k+j].ele.style.backgroundColor != ColorBack.casillaBasica){
                l+=i;
                k+=j;
            }
            try {
                if(casillas[l+i][k+j].ele.style.backgroundColor == ColorBack.casillaSelect){
                    while(casillas[l][k].ele.style.backgroundColor != ColorBack.casillaInicial){
                        casillas[l][k].quitarFicha();
                        l-=i;
                        k-=j;
                    }
                }//console.log(l+" "+k)
            } catch (error) {
                
            }
            
        }
    }
    ejecutarMovimientoDama(casillas, n , x){ 
        let l = n;
        let k = x;
        if(casillas[l][k].ele.style.backgroundColor == ColorBack.casillaSelect){ 
            return casillas;
        }
        for(let i = 0; i < 4; i++){
            this.recorrerEjecutarMovimientoDama(casillas, l, k, mx[i], my[i]);
        }
        return casillas;
    }

}