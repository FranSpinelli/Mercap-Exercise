var dollarsToCents = require('dollars-to-cents')

class Centavo{
    constructor(unaCantidadDeCentavos){
        this._cantidadDeCentavos = unaCantidadDeCentavos
    }

    get cantidadDeCentavos(){return dollarsToCents(this._cantidadDeCentavos)}

    sumar(otroCentavo){
        //otroCentavo :: Centavo

        this._cantidadDeCentavos += otroCentavo._cantidadDeCentavos
        return this
    }
}

module.exports = {
    Centavo : Centavo
}