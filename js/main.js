import * as HTML_Elements from "./html-elements.js";
import * as Clases from "./clases.js";

const pulsador_orange = new HTML_Elements.Pulsador("pul-orange", "orange");
const pulsador_blue = new HTML_Elements.Pulsador("pul-blue", "blue");
const pulsador_red = new HTML_Elements.Pulsador("pul-red", "red");
const pulsador_green = new HTML_Elements.Pulsador("pul-green", "green");

const pulsadores = [];
const secuencia = [];
var tiempo = 2500;

pulsadores.push(pulsador_orange);
pulsadores.push(pulsador_blue);
pulsadores.push(pulsador_green);
pulsadores.push(pulsador_red);

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

const iluminarSecuencia = async function () {
	
	var aux = 10;

	do {

		for (var i = 0; i < secuencia.length; i++) {
			await iluminarPulsador(pulsadores[secuencia[i]]);
		}

		reducirTiempoPulsadores();

		tiempo -= 200;

		obtenerSiguienteSecuencia();

		aux--;

		console.log("fin de las secuencia : " + (aux + 1));

	} while (aux > 0);

	console.log("fin de las secuencias");
}

obtenerSiguienteSecuencia();
iluminarSecuencia();