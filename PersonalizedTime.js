const errores = require("./Errores");

class PersonalizedTime {

    constructor(unaHoraDeInicio, unaCantidadDeMinutos, unDiaDeLaSemana){
        //_horaDeInicio :: entero
        //unaCantidadDeMinutos :: entero
        //unDiaDeLaSemana :: DiaDeLaSemana

        if (this.esUnaHoraValida(unaHoraDeInicio) && this.esUnaCantidadDeMinutosValida(unaCantidadDeMinutos)){
            this._horaDeInicio = unaHoraDeInicio;
            this._cantidadDeMinutosAlIniciar = unaCantidadDeMinutos;
            this._diaDeLaSemana = unDiaDeLaSemana;
        }else{
            throw new errores.ValorInvalido("Los datos provistos para representar el inicio de la llamada no son validos")
        }
    }

    get hora(){return this._horaDeInicio;}
    get minutos(){return this._cantidadDeMinutosAlIniciar}
    get diaDeLaSemana(){return this._diaDeLaSemana;}

    esUnaHoraValida(unaHoraDeInicio){
        //unaHoraDeInicio :: entero
        return Number.isInteger(unaHoraDeInicio) && unaHoraDeInicio >= 0 && unaHoraDeInicio <= 23
    }

    esUnaCantidadDeMinutosValida(unaCantidadDeMinutos){
        //unaCantidadDeMinutos :: entero
        
        return Number.isInteger(unaCantidadDeMinutos) && unaCantidadDeMinutos >= 0 && unaCantidadDeMinutos <= 59
    }
}

module.exports = {
    PersonalizedTime : PersonalizedTime
}