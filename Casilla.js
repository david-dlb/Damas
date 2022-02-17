class Casilla{
    constructor(ele, ficha){
        this.ficha = ficha;
        if(ficha.value != null){
            this.ocupado = true;
        }
        else{
            this.ocupado = false;
        }
        this.color = ColorBack.casillaBasica;
        this.ele = ele;
    }
    quitarFicha(){
        this.ficha = new Ficha(null);
        this.ele.style.backgroundImage = null;
        this.ocupado = false;
        this.color = ColorBack.casillaBasica;
    }
    setFicha(value){
        this.ficha = new Ficha(value);
        if(this.ficha.value != null){
            this.ocupado = true;
            this.ele.style.backgroundImage = this.ficha.url;//alert(this.ficha.url)
        }
    }
    setEle(ele){
        this.ele = ele;
    }
}