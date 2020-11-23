class DiaDeLaSemana{

    constructor(unValorDeLlamada){
        if (this.constructor === DiaDeLaSemana) {
            throw new Error("Can't instantiate abstract class!");
        }else{
            this._valorDeLlamada = unValorDeLlamada;
        }
    }

    get valorDeLlamada(){return this._valorDeLlamada;}
}

class Lunes extends DiaDeLaSemana{
    constructor(){
        super(undefined)
    }
}
class Martes extends DiaDeLaSemana{
    constructor(){
        super(undefined)
    }
}
class Miercoles extends DiaDeLaSemana{
    constructor(){
        super(undefined)
    }
}
class Jueves extends DiaDeLaSemana{
    constructor(){
        super(undefined)
    }
}
class Viernes extends DiaDeLaSemana{
    constructor(){
        super(undefined)
    }
}
class Sabado extends DiaDeLaSemana{
    constructor(){
        super(0.10)
    }
}
class Domingo extends DiaDeLaSemana{
    constructor(){
        super(0.10)
    }
}

module.exports = {
    Lunes : Lunes,
    Martes : Martes,
    Miercoles : Miercoles,
    Jueves : Jueves,
    Viernes : Viernes,
    Sabado : Sabado,
    Domingo : Domingo
}