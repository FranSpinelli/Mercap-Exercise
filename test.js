const assert = require("chai").assert;
const llamadas = require("./Llamadas");
const errores = require("./Errores");
const {  Sabado } = require("./DiasDeLaSemana");
const { MomentoDeInicioDeLlamada } = require("./MomentoDeInicioDeLlamada");
const { LlamadaInternacional, LlamadaLocal, LlamadaNacional } = require("./Llamadas");
const { Brazil, CABA, Uruguay} = require("./lugaresConServicioTelefonico")

describe('MomentoDeInicioDeLlamadaTest', function() {

    beforeEach(() => {});
  
    //Se testea los errores de esta manera ya que la forma propuesta por la libreria no me estaba funcionando
    //correctamente debido a un falso positivo, y no queria perder tiempo investigando eso.
    it('un momento de inicio de llamada solo acepta una hora que sea un nro entero', 
    () => {
        try{
            new MomentoDeInicioDeLlamada(12.5, 10, new Sabado())
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "Los datos provistos para representar el inicio de la llamada no son validos")
        }
    });

    it('un momento de inicio de llamada solo acepta una hora que sea un nro que este en el rango 0-23', 
    () => {
        try{
            new MomentoDeInicioDeLlamada(24, 10, new Sabado())
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "Los datos provistos para representar el inicio de la llamada no son validos")
        }
    });

    it('un momento de inicio de llamada solo acepta que una cantidad de minutos que sea un nro que este en el rango 0-59', 
    () => {
        try{
            new MomentoDeInicioDeLlamada(21, 60, new Sabado())
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "Los datos provistos para representar el inicio de la llamada no son validos")
        }
    });

    it('un momento de inicio de llamada solo acepta una hora que sea un nro entero', 
    () => {
        try{
            new MomentoDeInicioDeLlamada(21, 10.5, new Sabado())
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "Los datos provistos para representar el inicio de la llamada no son validos")
        }
    });
});


describe('Llamada Test', function() {

    beforeEach(() => {});
  
    it('una llamada tiene una hora, minuto y dia de la semana de inicio', () => {
        let dia = new Sabado()
        let una_llamada = new llamadas.LlamadaLocal(new MomentoDeInicioDeLlamada(21,10,dia), 12)
        assert.equal(una_llamada.diaEnQueSeRealizoLaLlamada, dia)
        assert.equal(una_llamada.minutoDeInicioDeLlamada, 10)
        assert.equal(una_llamada.horaDeInicioDeLlamada, 21)
    });

    it('una llamada tiene una duracion en minutos', () => {
        let una_llamada = new llamadas.LlamadaLocal(new MomentoDeInicioDeLlamada(21,10,new Sabado()), 20)
        assert.equal(una_llamada.duracionEnMinutos, 20)
    });

    it('una llamada solo acepta que su duracion en minutos sea un nro entero', 
    () => {
        try{
            let momentoDeInicio = new MomentoDeInicioDeLlamada(21, 10, new Sabado())
            new LlamadaLocal(momentoDeInicio, 20.5)
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "la duración en minutos de una llamada debe ser un numero entero")
        }
    });

    it('una Llamada internacional solo acepta paises con servicio telefonico como lugar al que llama', 
    () => {
        try{
            let momentoDeInicio = new MomentoDeInicioDeLlamada(21, 10, new Sabado())
            new LlamadaInternacional(momentoDeInicio, 20.5, new CABA())
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "la llamada internacional solo acepta paises como lugares al que se llama")
        }
    });

    it('una Llamada nacional solo acepta localidades con servicio telefonico como lugar al que llama', 
    () => {
        try{
            let momentoDeInicio = new MomentoDeInicioDeLlamada(21, 10, new Sabado())
            new LlamadaNacional(momentoDeInicio, 20, new Uruguay())
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "la llamada nacional solo acepta localidades como lugares al que se llama")
        }
    });

    it('una llamada nacional sabe retornar su valor', () => {
        let momentoDeInicio = new MomentoDeInicioDeLlamada(21, 10, new Sabado())
        let llamada = new LlamadaNacional(momentoDeInicio, 10, new CABA())
        assert.equal(llamada.valorDeLaLlamada, 1);
    })

    it('una llamada internacional sabe retornar su valor', () => {
        let momentoDeInicio = new MomentoDeInicioDeLlamada(21, 10, new Sabado())
        let llamada = new LlamadaInternacional(momentoDeInicio, 20, new Uruguay())
        assert.equal(llamada.valorDeLaLlamada, 6);
    })
});