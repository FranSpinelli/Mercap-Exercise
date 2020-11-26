class DiaDeLaSemana{

    constructor(unValorDeLlamada){
        //unValorDeLlamada :: entero

        if (this.constructor === DiaDeLaSemana) {
            throw new Error("Can't instantiate abstract class!");
        }else{
            this._valorMinutoDeLlamada = unValorDeLlamada;
        }
    }

    indicarComoCalcularValorDeLlamada(){
        throw new Error('Cannot call abstract method')
    }

}

class DiaNoHabil extends DiaDeLaSemana{
    constructor(unValorDeLlamada){
        //unValorDeLaLlamada :: entero
        super(unValorDeLlamada)
    }

    indicarComoCalcularValorDeLlamada(unaLlamada, cantidadDeMinutosPorCobrarDeLaLlamada, valorDeLaLlamadaYaCobrado){
        //unaLlamada :: llamada
        //cantidadDeMinutosPorCobrarDeLaLlamad :: entero
        // valorDeLaLlamadaYaCobrado :: entero


        return unaLlamada.calcularValorDeLlamadaRealizadaDuranteDiaNoHabil(this._valorMinutoDeLlamada,
            cantidadDeMinutosPorCobrarDeLaLlamada, valorDeLaLlamadaYaCobrado)
    }
}

class DiaHabil extends DiaDeLaSemana{
    constructor(unValorDeLlamada){
        //unValorDeLaLlamada :: entero
        super(unValorDeLlamada)
    }

    indicarComoCalcularValorDeLlamada(unaLlamada, cantidadDeMinutosPorCobrarDeLaLlamada, valorDeLaLlamadaYaCobrado,
        horaDeInicio = unaLlamada.horaDeInicio, minutoDeInicio = unaLlamada.minutoDeInicio){
        
        //unaLlamada :: llamada
        //cantidadDeMinutosPorCobrarDeLaLlamad :: entero
        // valorDeLaLlamadaYaCobrado :: entero
        //horaDeInicio :: entero
        //minutoDeInicio :: entero
        
        return unaLlamada.calcularValorDeLlamadaRealizadaDuranteDiaHabil(cantidadDeMinutosPorCobrarDeLaLlamada, valorDeLaLlamadaYaCobrado, 
            horaDeInicio, minutoDeInicio)
    }
}

class Lunes extends DiaHabil{
    constructor(){
        super(undefined)
    }

    getDiaSiguiente(){
        return new Martes()
    }
}
class Martes extends DiaHabil{
    constructor(){
        super(undefined)
    }

    getDiaSiguiente(){
        return new Miercoles()
    }
}
class Miercoles extends DiaHabil{
    constructor(){
        super(undefined)
    }

    getDiaSiguiente(){
        return new Jueves()
    }
}
class Jueves extends DiaHabil{
    constructor(){
        super(undefined)
    }

    getDiaSiguiente(){
        return new Viernes()
    }
}
class Viernes extends DiaHabil{
    constructor(){
        super(undefined)
    }

    getDiaSiguiente(){
        return new Sabado()
    }
}
class Sabado extends DiaNoHabil{
    constructor(){
        super(0.10)
    }

    getDiaSiguiente(){
        return new Domingo()
    }
}
class Domingo extends DiaNoHabil{
    constructor(){
        super(0.10)
    }

    getDiaSiguiente(){
        return new Lunes()
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