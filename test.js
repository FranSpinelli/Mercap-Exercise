const assert = require("chai").assert;
const llamadas = require("./Llamadas");
const errores = require("./Errores");
const {  Sabado, Lunes, Viernes, Domingo, Martes, Miercoles } = require("./DiasDeLaSemana");
const { PersonalizedTime } = require("./PersonalizedTime");
const { LlamadaInternacional, LlamadaLocal, LlamadaNacional } = require("./Llamadas");
const { Brazil, CABA, Uruguay, Quilmes} = require("./lugaresConServicioTelefonico")
const {SistemaDeFacturacion} = require("./Usuario");

describe('MomentoDeInicioDeLlamadaTest', function() {
  
    //Se testea los errores de esta manera ya que la forma propuesta por la libreria no me estaba funcionando
    //correctamente debido a un falso positivo, y no queria perder tiempo investigando eso.
    it('un momento de inicio de llamada solo acepta una hora que sea un nro entero', 
    () => {
        try{
            new PersonalizedTime(12.5, 10, new Sabado())
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "Los datos provistos para representar el inicio de la llamada no son validos")
        }
    });

    it('un momento de inicio de llamada solo acepta una hora que sea un nro que este en el rango 0-23', 
    () => {
        try{
            new PersonalizedTime(24, 10, new Sabado())
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "Los datos provistos para representar el inicio de la llamada no son validos")
        }
    });

    it('un momento de inicio de llamada solo acepta que una cantidad de minutos que sea un nro que este en el rango 0-59', 
    () => {
        try{
            new PersonalizedTime(21, 60, new Sabado())
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "Los datos provistos para representar el inicio de la llamada no son validos")
        }
    });

    it('un momento de inicio de llamada solo acepta una hora que sea un nro entero', 
    () => {
        try{
            new PersonalizedTime(21, 10.5, new Sabado())
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "Los datos provistos para representar el inicio de la llamada no son validos")
        }
    });
});


describe('Llamada Test', function() {
  
    it('una llamada tiene una hora, minuto y dia de la semana de inicio', () => {
        let dia = new Sabado()
        let una_llamada = new llamadas.LlamadaLocal(new PersonalizedTime(21,10,dia), 12)
        assert.equal(una_llamada.diaEnQueSeRealizoLaLlamada, dia)
        assert.equal(una_llamada.minutoDeInicioDeLlamada, 10)
        assert.equal(una_llamada.horaDeInicioDeLlamada, 21)
    });

    it('una llamada tiene una duracion en minutos', () => {
        let una_llamada = new llamadas.LlamadaLocal(new PersonalizedTime(21,10,new Sabado()), 20)
        assert.equal(una_llamada.duracionEnMinutos, 20)
    });

    it('una llamada solo acepta que su duracion en minutos sea un nro entero', 
    () => {
        try{
            let momentoDeInicio = new PersonalizedTime(21, 10, new Sabado())
            new LlamadaLocal(momentoDeInicio, 20.5)
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "la duración en minutos de una llamada debe ser un numero entero")
        }
    });

    it('una Llamada internacional solo acepta paises con servicio telefonico como lugar al que llama', 
    () => {
        try{
            let momentoDeInicio = new PersonalizedTime(21, 10, new Sabado())
            new LlamadaInternacional(momentoDeInicio, 20.5, new CABA())
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "la llamada internacional solo acepta paises como lugares al que se llama")
        }
    });

    it('una Llamada nacional solo acepta localidades con servicio telefonico como lugar al que llama', 
    () => {
        try{
            let momentoDeInicio = new PersonalizedTime(21, 10, new Sabado())
            new LlamadaNacional(momentoDeInicio, 20, new Uruguay())
            assert.equal("no falló en el constructor", "lo hago fallar")
        }catch(error){
            assert.equal(error.message, "la llamada nacional solo acepta localidades como lugares al que se llama")
        }
    });

    it('una llamada nacional sabe retornar su valor', () => {
        let momentoDeInicio = new PersonalizedTime(21, 10, new Sabado())
        let llamada = new LlamadaNacional(momentoDeInicio, 10, new CABA())
        assert.equal(llamada.valorDeLaLlamada.cantidadDeCentavos, 100);
    })

    it('una llamada internacional sabe retornar su valor', () => {
        let momentoDeInicio = new PersonalizedTime(21, 10, new Sabado())
        let llamada = new LlamadaInternacional(momentoDeInicio, 20, new Uruguay())
        assert.equal(llamada.valorDeLaLlamada.cantidadDeCentavos, 600);
    })

    it('una llamada local realizada durante dia no habil sabe retornar su valor', () => {
        let momentoDeInicio = new PersonalizedTime(21, 10, new Sabado())
        let llamada = new LlamadaLocal(momentoDeInicio, 40)
        assert.equal(llamada.valorDeLaLlamada.cantidadDeCentavos, 400);
    })

    it('una llamada local realizada durante un dia habil en hora pico sabe retornar su valor', () => {
        let momentoDeInicio = new PersonalizedTime(10, 00, new Lunes())
        let llamada = new LlamadaLocal(momentoDeInicio, 2)
        assert.equal(llamada.valorDeLaLlamada.cantidadDeCentavos, 40);
    })

    it('una llamada local realizada durante un dia habil en hora no pico sabe retornar su valor', () => {
        let momentoDeInicio = new PersonalizedTime(21, 00, new Lunes())
        let llamada = new LlamadaLocal(momentoDeInicio, 2)
        assert.equal(llamada.valorDeLaLlamada.cantidadDeCentavos, 20);
    })

    it('una llamada local realizada durante un dia habil que arranca en hora no pico y termina en hora pico sabe retornar su valor',
    () => {
        let momentoDeInicio = new PersonalizedTime(7, 59, new Lunes())
        let llamada = new LlamadaLocal(momentoDeInicio, 2)
        assert.equal(llamada.valorDeLaLlamada.cantidadDeCentavos, 30);
    })

    it('una llamada local realizada durante un dia habil que arranca en hora pico y termina en hora no pico sabe retornar su valor',
    () => {
        let momentoDeInicio = new PersonalizedTime(19, 59, new Lunes())
        let llamada = new LlamadaLocal(momentoDeInicio, 3)
        assert.equal(llamada.valorDeLaLlamada.cantidadDeCentavos, 40);
    })

    it('una llamada local que arranca un dia habil y termina un dia no habil sabe retornar su valor',
    () => {
        let momentoDeInicio = new PersonalizedTime(23, 59, new Viernes())
        let llamada = new LlamadaLocal(momentoDeInicio, 6)
        assert.equal(llamada.valorDeLaLlamada.cantidadDeCentavos, 60);
    })

    it('una llamada local que arranca un dia no habil y termina un dia habil sabe retornar su valor',
    () => {
        let momentoDeInicio = new PersonalizedTime(23, 59, new Domingo())
        let llamada = new LlamadaLocal(momentoDeInicio, 6)
        assert.equal(llamada.valorDeLaLlamada.cantidadDeCentavos, 60);
    })
});

describe('Sistema de facturacion test', function() {
  
    it('un sistema de facturacion puede generar Facturas con un monto fijo y 2 subtotales', 
    () => {
        
        let sistemaDeFacturacion = new SistemaDeFacturacion(1)
        let horario1 = new PersonalizedTime(12,00, new Lunes())
        sistemaDeFacturacion.registrarLlamadaLocal(horario1, 1)

        let horario2 = new PersonalizedTime(21,00, new Martes())
        sistemaDeFacturacion.registrarLlamadaNacional(horario2, 1, new Quilmes())

        let horario3 = new PersonalizedTime(2,00, new Miercoles())
        sistemaDeFacturacion.registrarLlamadaInternacional(horario3, 1, new Uruguay())

        let factura = sistemaDeFacturacion.generarFactura()

        assert.equal(factura.montoFijo.cantidadDeCentavos, 100)
        assert.equal(factura.subtotalLlamadasLocales.cantidadDeCentavos, 20)
        assert.equal(factura.subtotalLlamadasNacionalesEInternacionales.cantidadDeCentavos, 20)
    });
});
