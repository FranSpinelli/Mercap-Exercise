const {Centavo} = require("./Centavo");
const { LlamadaLocal } = require("./Llamadas");

class SistemaDeFacturacion{

    constructor(unMontoDeFacturacion){
        this._llamadasLocalesRealizadasNoIncluidasEnFactura = [];
        this._llamadasNacionalesEInternacionalesRealizadasNoIncluidasEnFactura = [];
        this._facturasGeneradas = [];
        this._montoFijoDeFacturacion = new Centavo (unMontoDeFacturacion);
    }

    registrarLlamadaLocal(unaHoraDeinicio, unaDuracion){
        let llamada = new LlamadaLocal(unaHoraDeinicio, unaDuracion)
        this._llamadasLocalesRealizadasNoIncluidasEnFactura.push(llamada)
        return llamada
    }

    registrarLlamadaNacional(unaHoraDeinicio, unaDuracion, unaLocalidad){
        let llamada = new LlamadaLocal(unaHoraDeinicio, unaDuracion, unaLocalidad)
        this._llamadasNacionalesEInternacionalesRealizadasNoIncluidasEnFactura.push(llamada)
        return llamada
    }

    registrarLlamadaInternacional(unaHoraDeinicio, unaDuracion, unPais){
        let llamada = new LlamadaLocal(unaHoraDeinicio, unaDuracion, unPais)
        this._llamadasNacionalesEInternacionalesRealizadasNoIncluidasEnFactura.push(llamada)
        return llamada
    }

    generarFactura(){
        let montoTotalLlamadasLocales =  this._llamadasLocalesRealizadasNoIncluidasEnFactura.reduce(
            (acumulador, llamada) => { 
                return acumulador.sumar(llamada.valorDeLaLlamada)}, new Centavo(0)
        )

        let montoTotalLlamadasNacEInternac = 
        this._llamadasNacionalesEInternacionalesRealizadasNoIncluidasEnFactura.reduce(
            (acumulador, llamada) => {
                return acumulador.sumar(llamada.valorDeLaLlamada)}, new Centavo(0)
        )
        console.log(montoTotalLlamadasNacEInternac)
        this._llamadasLocalesRealizadasNoIncluidasEnFactura = []
        this._llamadasNacionalesEInternacionalesRealizadasNoIncluidasEnFactura = []

        let nuevaFactura = new Factura(this._montoFijoDeFacturacion, 
            montoTotalLlamadasLocales, 
            montoTotalLlamadasNacEInternac
        )

        this._facturasGeneradas.push(nuevaFactura)
        return nuevaFactura;
    }
}

class Factura{
    constructor(unMontoFijo, unSubTotalDeLlamadasLocales, unSubtotalLlamadasNacEInternac){
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