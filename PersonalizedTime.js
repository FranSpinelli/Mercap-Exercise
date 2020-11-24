const errores = require("./Errores");

class PersonalizedTime {

    constructor(unaHoraDeInicio, unaCantidadDeMinutos, unDiaDeLaSemana){
        if (this.esUnaHoraValida(unaHoraDeInicio) && this.esUnaCantidadDeMinutosValida(unaCantidadDeMinutos)){
            this._horaDeInicio = unaHoraDeInicio;
            this._cantidadDeMinutosAlIniciar = unaCantidadDeMinutos;
            this._diaDeLaSemana = unDiaDeLaSemana;
        }else{
            throw new errores.ValorInvalido("Los datos provistos para representar el inicio de la llamada no son validos")
        }
    }

    get horaDeInicio(){return this._horaDeInicio;}
    get cantidadDeMinutosAlIniciarLlamada(){return this._cantidadDeMinutosAlIniciar}
    get diaDeLaSemana(){return this._diaDeLaSemana;}

    esUnaHoraValida(unaHoraDeInicio){
        return Number.isInteger(unaHoraDeInicio) && unaHoraDeInicio >= 0 && unaHoraDeInicio <= 23
    }

    esUnaCantidadDeMinutosValida(unaCantidadDeMinutos){
        return Number.isInteger(unaCantidadDeMinutos) && unaCantidadDeMinutos >= 0 && unaCantidadDeMinutos <= 59
    }
}

module.exports = {
    PersonalizedTime : PersonalizedTime
}