const errores = require("./Errores");

class Llamada {
   
    constructor(unMomentoDeInicio, unaDuracionEnMinutos){
        if (this.constructor === Llamada) {
            throw new Error("Can't instantiate abstract class!");
        }else if (Number.isInteger(unaDuracionEnMinutos)){
            this._momentoDeInicio = unMomentoDeInicio;
            this._duracionEnMinutos = unaDuracionEnMinutos;
        }else{
            throw new errores.ValorInvalido("la duración en minutos de una llamada debe ser un numero entero")
        }
    }

    get horaDeInicioDeLlamada(){return this._momentoDeInicio.horaDeInicio}
    get minutoDeInicioDeLlamada(){return this._momentoDeInicio.cantidadDeMinutosAlIniciarLlamada}
    get diaEnQueSeRealizoLaLlamada(){return this._momentoDeInicio.diaDeLaSemana}
    get duracionEnMinutos(){return this._duracionEnMinutos}
}

class LlamadaLocal extends Llamada {
    constructor(unMomentoDeinicio, unaDuracionEnMinutos){
        super(unMomentoDeinicio, unaDuracionEnMinutos);
    }
}

class LlamadaNacional extends Llamada {
    constructor(unMomentoDeinicio, unaDuracionEnMinutos, unaLocalidadALaQueSeLlama){
        if(esLugarValidoAlQueSeLlama(unaLocalidadALaQueSeLlama, "LocalidadConServicioTelefonico")){
            super(unMomentoDeinicio, unaDuracionEnMinutos);
            this._localidadALaQueSeLlama = unaLocalidadALaQueSeLlama;
        }else{
            throw new errores.ValorInvalido("la llamada nacional solo acepta localidades como lugares al que se llama")
        }
    }

    get valorDeLaLlamada(){return this._duracionEnMinutos * this._localidadALaQueSeLlama.valorMinutoDeLlamadaEnLugar}
}

class LlamadaInternacional extends Llamada {
    constructor(unMomentoDeinicio, unaDuracionEnMinutos, unPaisAlQueSeLlama){
        if(esLugarValidoAlQueSeLlama(unPaisAlQueSeLlama, "PaisConServicioTelefonico")){
            super(unMomentoDeinicio, unaDuracionEnMinutos);
            this._paisAlQueSellama = unPaisAlQueSeLlama;
        }else{
            throw new errores.ValorInvalido("la llamada internacional solo acepta paises como lugares al que se llama")
        }
    }

    get valorDeLaLlamada(){return this._duracionEnMinutos * this._paisAlQueSellama.valorMinutoDeLlamadaEnLugar}
}

function esLugarValidoAlQueSeLlama(unLugarAlQueSeLlama, unLugarAlQueSeEspereLQueLlame){
   return Object.getPrototypeOf(Object.getPrototypeOf(unLugarAlQueSeLlama)).constructor.name === unLugarAlQueSeEspereLQueLlame;
}

module.exports = {
    Llamada : Llamada,
    LlamadaLocal : LlamadaLocal,
    LlamadaInternacional : LlamadaInternacional,
    LlamadaNacional : LlamadaNacional 
}
