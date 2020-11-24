const {Centavo} = require("./Centavo");
const errores = require("./Errores");

class Llamada {
   
    constructor(unMomentoDeInicio, unaDuracionEnMinutos){
        //unMomentoDeInicio :: personalizedDate
        //unaDuracion :: entero

        if (this.constructor === Llamada) {
            throw new Error("Can't instantiate abstract class!");
        }else if (Number.isInteger(unaDuracionEnMinutos)){
            this._momentoDeInicio = unMomentoDeInicio;
            this._duracionEnMinutos = unaDuracionEnMinutos;
        }else{
            throw new errores.ValorInvalido("la duración en minutos de una llamada debe ser un numero entero")
        }
    }

    get horaDeInicioDeLlamada(){return this._momentoDeInicio.hora}
    get minutoDeInicioDeLlamada(){return this._momentoDeInicio.minutos}
    get diaEnQueSeRealizoLaLlamada(){return this._momentoDeInicio.diaDeLaSemana}
    get duracionEnMinutos(){return this._duracionEnMinutos}

    get valorDeLaLlamada(){
        throw new Error('Cannot call abstract method')
    };
}

class LlamadaLocal extends Llamada {
    constructor(unMomentoDeinicio, unaDuracionEnMinutos){
        //unMomentoDeInicio :: personalizedDate
        //unaDuracion :: entero

        super(unMomentoDeinicio, unaDuracionEnMinutos);
        this._calculadorDeValor = new CalculadorDeValor();
    }

    get valorDeLaLlamada(){
        let valorFinal = this._momentoDeInicio.diaDeLaSemana.indicarComoCalcularValorDeLlamada(this)
        return new Centavo(valorFinal)
    }

    calcularValorDeLlamadaRealizadaDuranteDiaNoHabil(valorDelMinutoDeLlamada, 
        cantidadDeMinutosPorCobrarDeLaLlamada = this._duracionEnMinutos,
        valorDeLaLlamadaYaCobrado = 0){
        //valorDelMinutoDeLlamada = entero
        //cantidadDeMinutosPorCobrarDeLaLlamada = entero
        //valorDeLaLlamadaYaCobrado = entero

        let funcionCobradora = (valorActual) => {return valorActual + valorDelMinutoDeLlamada;} 

        return this._calculadorDeValor.calcularValorDeLlamadaAPartirDeDatos(cantidadDeMinutosPorCobrarDeLaLlamada, valorDeLaLlamadaYaCobrado,
        this._momentoDeInicio.hora, this._momentoDeInicio.minutos, funcionCobradora, this)
    }

    calcularValorDeLlamadaRealizadaDuranteDiaHabil(cantidadDeMinutosPorCobrarDeLaLlamada = this._duracionEnMinutos,
        valorDeLaLlamadaYaCobrado = 0,
        horaDeInicioDeLaLlamada = this._momentoDeInicio.hora,
        minutoDeInicioDeLaLlamada = this._momentoDeInicio.minutos){
        //horaDeInicioDeLaLlamada = entero
        //minutoDeInicioDeLaLlamada = entero
        //cantidadDeMinutosPorCobrarDeLaLlamada = entero
        //valorDeLaLlamadaYaCobrado = entero

        let funcionCobradora = (valorActual, horaQueSeCobra) => { 
            if(horaQueSeCobra >= 8 && horaQueSeCobra < 20){
                return valorActual += 0.20;
            }else{
                return valorActual += 0.10;
            }
        }
        
        return this._calculadorDeValor.calcularValorDeLlamadaAPartirDeDatos(cantidadDeMinutosPorCobrarDeLaLlamada, valorDeLaLlamadaYaCobrado,
            horaDeInicioDeLaLlamada, minutoDeInicioDeLaLlamada, funcionCobradora, this)   
    }
}

class LlamadaNacional extends Llamada {
    constructor(unMomentoDeinicio, unaDuracionEnMinutos, unaLocalidadALaQueSeLlama){
        //unMomentoDeInicio :: personalizedDate
        //unaDuracionEnMinutos :: entero
        //unaLocalidadALaQueSeLlama :: localidadConServicioTelefopnico

        if(esLugarValidoAlQueSeLlama(unaLocalidadALaQueSeLlama, "LocalidadConServicioTelefonico")){
            super(unMomentoDeinicio, unaDuracionEnMinutos);
            this._localidadALaQueSeLlama = unaLocalidadALaQueSeLlama;
        }else{
            throw new errores.ValorInvalido("la llamada nacional solo acepta localidades como lugares al que se llama")
        }
    }

    get valorDeLaLlamada(){
        let valorFinal = this._duracionEnMinutos * this._localidadALaQueSeLlama.valorMinutoDeLlamadaEnLugar
        return new Centavo(valorFinal)
    }
}

class LlamadaInternacional extends Llamada {
    constructor(unMomentoDeinicio, unaDuracionEnMinutos, unPaisAlQueSeLlama){
        //unMomentoDeInicio :: personalizedDate
        //unaDuracionEnMinutos :: entero
        //unaLocalidadALaQueSeLlama :: localidadConServicioTelefopnico

        if(esLugarValidoAlQueSeLlama(unPaisAlQueSeLlama, "PaisConServicioTelefonico")){
            super(unMomentoDeinicio, unaDuracionEnMinutos);
            this._paisAlQueSellama = unPaisAlQueSeLlama;
        }else{
            throw new errores.ValorInvalido("la llamada internacional solo acepta paises como lugares al que se llama")
        }
    }

    get valorDeLaLlamada(){
        let valorFinal = this._duracionEnMinutos * this._paisAlQueSellama.valorMinutoDeLlamadaEnLugar
        return new Centavo(valorFinal)
    }
}

//funcion para chequear que sea un lugar valido, antes de instanciar la clase
function esLugarValidoAlQueSeLlama(unLugarAlQueSeLlama, unLugarAlQueSeEspereLQueLlame){
   //unLugarAlQueSeLlama :: LugarConServicioTelefonico
   // unLugarAlQueSeEspereLQueLlame :: String
   return Object.getPrototypeOf(Object.getPrototypeOf(unLugarAlQueSeLlama)).constructor.name === unLugarAlQueSeEspereLQueLlame;
}

class CalculadorDeValor{
    //esta tiene como unico proposito sacarle la tarea del calculo del valor a la llamadaLocal, ya que este calculo es considerado complejo
    calcularValorDeLlamadaAPartirDeDatos(cantidadDeMinutosPorCobrarDeLaLlamada, valorDeLaLlamadaYaCobrado, horaDeInicio, minutoDeInicio,
        funcionCobradora,unaLlamada){
        //horaDeInicioa :: entero
        //minutoDeInicio :: entero
        //cantidadDeMinutosPorCobrarDeLaLlamada :: entero
        //valorDeLaLlamadaYaCobrado :: entero
        //unaLlamada :: llamada
        //funcionCobradora :: arrow function
            
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
