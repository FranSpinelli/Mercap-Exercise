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

    get valorDeLaLlamada(){
        throw new Error('Cannot call abstract method')
    };
}

class LlamadaLocal extends Llamada {
    constructor(unMomentoDeinicio, unaDuracionEnMinutos){
        super(unMomentoDeinicio, unaDuracionEnMinutos);
        this._calculadorDeValor = new CalculadorDeValor();
    }

    get valorDeLaLlamada(){return this._momentoDeInicio.diaDeLaSemana.indicarComoCalcularValorDeLlamada(this)}

    calcularValorDeLlamadaRealizadaDuranteDiaNoHabil(valorDelMinuto, cantidadDeMinutosPorCobrarDeLaLlamada = this._duracionEnMinutos,
        valorDeLaLlamadaYaCobrado= 0){
        
        let funcionCobradora = (valorActual) => {return valorActual + valorDelMinuto;} 

        return this._calculadorDeValor.calcularValorDeLlamadaAPartirDeDatos(cantidadDeMinutosPorCobrarDeLaLlamada, valorDeLaLlamadaYaCobrado,
            this._momentoDeInicio.horaDeInicio, this._momentoDeInicio.cantidadDeMinutosAlIniciarLlamada, funcionCobradora, this)

    }

    calcularValorDeLlamadaRealizadaDuranteDiaHabil(cantidadDeMinutosPorCobrarDeLaLlamada = this._duracionEnMinutos,
        valorDeLaLlamadaYaCobrado = 0,
        horaDeInicio = this._momentoDeInicio.horaDeInicio,
        minutoDeInicio = this._momentoDeInicio.cantidadDeMinutosAlIniciarLlamada){
        
        let funcionCobradora = (valorActual, horaQueSeCobra) => { 
            if(horaQueSeCobra >= 8 && horaQueSeCobra < 20){
                return valorActual += 0.20;
            }else{
                return valorActual += 0.10;
            }
        }
        
        return this._calculadorDeValor.calcularValorDeLlamadaAPartirDeDatos(cantidadDeMinutosPorCobrarDeLaLlamada, valorDeLaLlamadaYaCobrado,
            horaDeInicio, minutoDeInicio, funcionCobradora, this)
    
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

class CalculadorDeValor{
    //esta tiene como unico proposito sacarle la tarea del calculo del valor a la llamadaLocal, ya que este calculo es considerado complejo
    calcularValorDeLlamadaAPartirDeDatos(cantidadDeMinutosPorCobrarDeLaLlamada, valorDeLaLlamadaYaCobrado, horaDeInicio, minutoDeInicio,
        funcionCobradora, unaLlamada){
            
        let horaDesdeLaQueSeCobra = horaDeInicio;
        let minutoDesdeElQueSeCobra = minutoDeInicio;
        let cantidadMinutosPorCobrar = cantidadDeMinutosPorCobrarDeLaLlamada;
        let valorFinalDellamada = valorDeLaLlamadaYaCobrado;
    
        while(cantidadMinutosPorCobrar > 0){
            valorFinalDellamada = funcionCobradora(valorFinalDellamada, horaDesdeLaQueSeCobra)
    
            cantidadMinutosPorCobrar--;
            minutoDesdeElQueSeCobra++;
            if(minutoDesdeElQueSeCobra > 59){
                minutoDesdeElQueSeCobra = 0;
                horaDesdeLaQueSeCobra++;                    if(horaDesdeLaQueSeCobra > 23){
                    let siguienteDia = unaLlamada.diaEnQueSeRealizoLaLlamada.getDiaSiguiente()
                    valorFinalDellamada = siguienteDia.indicarComoCalcularValorDeLlamada(unaLlamada, cantidadMinutosPorCobrar, valorFinalDellamada, 0, 0)
                    break;
                }
            }
        }

        return Number(valorFinalDellamada.toFixed(2))
    }
}
module.exports = {
    Llamada : Llamada,
    LlamadaLocal : LlamadaLocal,
    LlamadaInternacional : LlamadaInternacional,
    LlamadaNacional : LlamadaNacional 
}
