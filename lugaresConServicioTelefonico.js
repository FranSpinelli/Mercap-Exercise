class LugarConServicioTelefonico{
    
    constructor(unValor){
        if (this.constructor === LugarConServicioTelefonico) {
            throw new Error("Can't instantiate abstract class!");
        }else{
            this._valorDeMinutoDeLlamadaEnElLugar = unValor;
        }
    }

    get valorMinutoDeLlamadaEnLugar(){return this._valorDeMinutoDeLlamadaEnElLugar;}
}

class LocalidadConServicioTelefonico extends LugarConServicioTelefonico{
    constructor(unValor){
        super(unValor)
    }
}

class PaisConServicioTelefonico extends LugarConServicioTelefonico{
    constructor(unValor){
        super(unValor)
    }
}

class CABA extends LocalidadConServicioTelefonico{
    constructor(){
        super(0.10)
    }
}

class Quilmes extends LocalidadConServicioTelefonico{
    constructor(){
        super(0.20)
    }
}

class Uruguay extends PaisConServicioTelefonico{
    constructor(){
        super(0.30)
    }
}

class Brazil extends PaisConServicioTelefonico{
    constructor(){
        super(0.40)
    }
}

module.exports = {
    CABA : CABA,
    Quilmes : Quilmes,
    Uruguay : Uruguay,
    Brazil : Brazil
}