const {Centavo} = require("./Centavo");
const { LlamadaLocal, LlamadaNacional, LlamadaInternacional } = require("./Llamadas");

class SistemaDeFacturacion{

    constructor(unMontoDeFacturacion){
        //montoDeFacturacion :: entero

        this._llamadasLocalesRealizadasNoIncluidasEnFactura = [];
        this._llamadasNacionalesEInternacionalesRealizadasNoIncluidasEnFactura = [];
        this._facturasGeneradas = [];
        this._montoFijoDeFacturacion = new Centavo (unMontoDeFacturacion);
    }

    registrarLlamadaLocal(unaHoraDeinicio, unaDuracion){
        //unaHoraDeInicio :: personalizedTime
        //unaDuracion :: entero

        let llamada = new LlamadaLocal(unaHoraDeinicio, unaDuracion)
        this._llamadasLocalesRealizadasNoIncluidasEnFactura.push(llamada)
        return llamada
    }

    registrarLlamadaNacional(unaHoraDeinicio, unaDuracion, unaLocalidad){
        //unaHoraDeInicio :: personalizedDate
        //unaDuracion :: entero
        //unaLocalidad :: localidadConServicioTelefonico

        let llamada = new LlamadaNacional(unaHoraDeinicio, unaDuracion, unaLocalidad)
        this._llamadasNacionalesEInternacionalesRealizadasNoIncluidasEnFactura.push(llamada)
        return llamada
    }

    registrarLlamadaInternacional(unaHoraDeinicio, unaDuracion, unPais){
        //unaHoraDeInicio :: personalizedDate
        //unaDuracion :: entero
        //unapais :: paisConServicioTelefonico

        let llamada = new LlamadaInternacional(unaHoraDeinicio, unaDuracion, unPais)
        this._llamadasNacionalesEInternacionalesRealizadasNoIncluidasEnFactura.push(llamada)
        return llamada
    }

    generarFactura(){
        let montoTotalLlamadasLocales =  this._llamadasLocalesRealizadasNoIncluidasEnFactura.reduce(
            (acumulador, llamada) => { 
                return acumulador + llamada.valorDeLaLlamada}, 0
        )

        let montoTotalLlamadasNacEInternac = 
        this._llamadasNacionalesEInternacionalesRealizadasNoIncluidasEnFactura.reduce(
            (acumulador, llamada) => {
                return acumulador + llamada.valorDeLaLlamada}, 0
        )
        
        this._llamadasLocalesRealizadasNoIncluidasEnFactura = []
        this._llamadasNacionalesEInternacionalesRealizadasNoIncluidasEnFactura = []

        let nuevaFactura = new Factura(this._montoFijoDeFacturacion, 
            new Centavo(montoTotalLlamadasLocales), 
            new Centavo (montoTotalLlamadasNacEInternac)
        )

        this._facturasGeneradas.push(nuevaFactura)
        return nuevaFactura;
    }
}

class Factura{
    constructor(unMontoFijo, unSubTotalDeLlamadasLocales, unSubtotalLlamadasNacEInternac){
        //unMontoFijo :: Centavo
        //unSubTotalDeLlamadasLocales :: Centavo
        //unSubTotalDeLlamadasNacEInternac :: Centavo

        this._montoFijo = unMontoFijo;
        this._subtotalLlamadasLocales = unSubTotalDeLlamadasLocales;
        this._subtotalLlamadasNacionalesEInternac = unSubtotalLlamadasNacEInternac;
    }

    get montoFijo(){return this._montoFijo}
    get subtotalLlamadasLocales(){return this._subtotalLlamadasLocales}
    get subtotalLlamadasNacionalesEInternacionales(){return this._subtotalLlamadasNacionalesEInternac}
}

module.exports = {
    SistemaDeFacturacion : SistemaDeFacturacion
}