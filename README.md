# Mercap-Exercise
Ejercicio tecnico para Mercap, el cual consiste en la realizacion de un sistema de facturacion basico para operadora telefonica

## Comentarios:
- Se decidió utilizar una node como herramienta ya que si bien no es orientado a objetos, es la herramienta con un tipado dinamicico(como smalltalk) que mas manejo,
- Se pensaron los siguientes casos para las llamadas locales:
- realizar llamadas dentro de hora pico.
- realizar llamadas fuera de hora pico.
- realizar llamadas que arranquen en hora pico y terminen fuera de esta.
- realizar llamadas que arranquen fuera de hora pico y terminen dentro de esta.
- realizar llamadas que arranquen un dia habil y terminen un dia no habil y viceversa.
- no se tuvo presicion a nivel segundos al trabajar con duracion de llamadas y hora de inicio de estas.
- No llegué con el tiempo para poder hacer que una factura pueda ser emitida solamente 1 vez por mes.
- No se llego a implementar que el sistema de facturacion soporte multiples usuarios, solamente soporta 1.
- se le dedico 5 horas en total a la elaboracion del trabajo.

## Posibles mejoras al diseño actual:
- Refactorear jerarquia de la representacion de dias de la semana para que estos no pasen un undefined a su superclase.
- Implementar representaciones para las horas y los minutos asi no son ints pelados.
- Hacer que una factura no retorne su valor en int sino en Centavos, no se habia hecho para facilitar la elaboracion de la factura.
- Se podria refactorear las funciones "calcularValorDeLlamadaRealizadaDuranteDiaNoHabil" y "calcularValorDeLlamadaRealizadaDuranteDiaHabil" de llamada local en 1 sola, abstrayendo la funcion cobradora en el dia de la semana.
- Implementar que la factura solo pueda ser elaborada 1 vez al mes.
- Implementar que el sistema de facturacion soporte multiples usuarios.
