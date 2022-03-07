import * as HTML_Elements from "./html-elements.js";
import * as Clases from "./clases.js";

const pulsador_orange = new HTML_Elements.Pulsador("pul-orange", "orange");
const pulsador_blue = new HTML_Elements.Pulsador("pul-blue", "blue");
const pulsador_red = new HTML_Elements.Pulsador("pul-red", "red");
const pulsador_green = new HTML_Elements.Pulsador("pul-green", "green");

const panel = new HTML_Elements.Div("panel");

const pulsadores = [];
const secuencia = [];
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
	
	var aux = 1;

	do {

		actualizarMostrarSecuencia(aux);

		for (var i = 0; i < secuencia.length; i++) {
			await iluminarPulsador(pulsadores[secuencia[i]]);
		}

		reducirTiempoPulsadores();

		reducirTemporizador();

		obtenerSiguienteSecuencia();

		aux++;

	} while (aux <= 10);

	console.log("fin de las secuencias");
}

const pulsar = async function(pulsador) {

	deshabilitarPulsadores();
	await tocarPulsador(pulsador);
	habilitarPulsadores();
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

	pulsadores.forEach((pulsador) => {
		pulsador.asignarEvent("click", () => { pulsar(pulsador); });
	})
}

// inicializarPulsadores();
// habilitarPulsadores();

obtenerSiguienteSecuencia();
iluminarSecuencia();