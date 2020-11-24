var dollarsToCents = require('dollars-to-cents')

class Centavo{
    constructor(unaCantidadDeCentavos){
        this._cantidadDeCentavos = unaCantidadDeCentavos
    }

    get cantidadDeCentavos(){return dollarsToCents(this._cantidadDeCentavos)}
}

module.exports = {
    Centavo : Centavo
}