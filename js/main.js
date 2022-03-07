import * as HTML_Elements from "./html-elements.js";
import * as Clases from "./clases.js";

const pulsador_orange = new HTML_Elements.Pulsador("pul-orange", "orange");
const pulsador_blue = new HTML_Elements.Pulsador("pul-blue", "blue");
const pulsador_red = new HTML_Elements.Pulsador("pul-red", "red");
const pulsador_green = new HTML_Elements.Pulsador("pul-green", "green");

const panel = new HTML_Elements.Div("panel");

const pulsadores = [];
const secuencia = [];
var secuenciaPulsada = [];
var tiempo = 1000;

pulsadores.push(pulsador_orange);
pulsadores.push(pulsador_blue);
pulsadores.push(pulsador_green);
pulsadores.push(pulsador_red);

const actualizarMostrarSecuencia = function(string) {
	panel.escribir(string);
}

const tocarPulsador = async function (pulsador) {

	pulsador.tocar();
	await Clases.Reloj.esperar(tiempo);
	pulsador.apagar();
	await Clases.Reloj.esperar(100);
	return true;
}

const iluminarPulsador = async function (pulsador) {

	pulsador.iluminar();
	await Clases.Reloj.esperar(tiempo);
	pulsador.apagar();
	await Clases.Reloj.esperar(100);
	return true;
}

const ajustarTiempoPulsadores = function() {
	pulsadores.forEach((pulsador) => {
		pulsador.ajustarTiempo();
	})
}

const obtenerSiguienteSecuencia = function() {
	secuencia.push(Math.floor(Math.random() * 4));
}

const reducirTiempoPulsadores = function() {
	pulsadores.forEach((pulsador) => {
		pulsador.reducirTiempo();
	})
}

const reducirTemporizador = function() {
	if (tiempo >= 500)
		tiempo -= 100;
}

const iluminarSecuencia = async function () {

	actualizarMostrarSecuencia(secuencia.length);

	for (var i = 0; i < secuencia.length; i++) {
		await iluminarPulsador(pulsadores[secuencia[i]]);
	}
}

const pulsar = async function(pulsador, indice) {

	secuenciaPulsada.push(indice);

	deshabilitarPulsadores();
	await tocarPulsador(pulsador);

	if (comprobarSecuencia())
		if (secuencia.length > secuenciaPulsada.length)
			habilitarPulsadores();
		else
		{
			// Algo...
			await Clases.Reloj.esperar(2000);
			ajustarTiempoPulsadores();
			secuenciaPulsada = []
			jugar();
		}
	else
	{
		//algo...
	}
}

const habilitarPulsadores = function() {

	pulsadores.forEach((pulsador) => {
		pulsador.addClass("pulsadorHabilitado");
		pulsador.addEvent();
	})
}

const deshabilitarPulsadores = function() {
	pulsadores.forEach((pulsador) => {
		pulsador.removeClass("pulsadorHabilitado");
		pulsador.deleteEvent();
	})
}

const inicializarPulsadores = function() {

	pulsador_orange.asignarEvent("click", () => { pulsar(pulsador_orange, 0) });
	pulsador_blue.asignarEvent("click", () => { pulsar(pulsador_blue, 1) });
	pulsador_green.asignarEvent("click", () => { pulsar(pulsador_green, 2) });
	pulsador_red.asignarEvent("click", () => { pulsar(pulsador_red, 3) });
}

const comprobarSecuencia = function() {
	for (var i = 0; i < secuenciaPulsada.length; i++) {
		if (secuencia[i] !== secuenciaPulsada[i])
			throw new Error("Fin del juego!!!");
	}

	return true;
}

const jugar = async function() {

	obtenerSiguienteSecuencia();

	await iluminarSecuencia();

	reducirTiempoPulsadores();

	reducirTemporizador();

	habilitarPulsadores();
}

inicializarPulsadores();

jugar();