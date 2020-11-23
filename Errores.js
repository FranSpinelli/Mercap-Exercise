class ValorInvalido extends Error{
    constructor(msg){
        super(msg);
        this.name = "ValorInvalido";
    }
}

module.exports = {
    ValorInvalido : ValorInvalido
}