class Ficha{
    constructor(value){
        this.value = value;
        switch(value){
            case "blancaPeon" : this.url = 'url("images/BlancaPeon.png")';
                            this.rango = "peon";
                            this.tipo = "blanca";
                break;
            case "rojaPeon" : this.url = 'url("images/RojaPeon.png")';
                            this.rango = "peon";
                            this.tipo = "roja";
                break;
            case "rojaDama" : this.url = 'url("images/RojaDama.png")';
                            this.rango = "dama";
                            this.tipo = "roja";
                break;
            case "blancaDama" : this.url = 'url("images/BlancaDama.png")';
                            this.rango = "dama";
                            this.tipo = "blanca";
                break;
            default : this.url = null; this.tipo = null; this.rango = null;
        }
    }
}