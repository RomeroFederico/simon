import * as HTML_Elements from "./html-elements.js";
import * as Clases from "./clases.js";

const pulsador_orange = new HTML_Elements.Pulsador("pul-orange", "orange");
const pulsador_blue = new HTML_Elements.Pulsador("pul-blue", "blue");
const pulsador_red = new HTML_Elements.Pulsador("pul-red", "red");
const pulsador_green = new HTML_Elements.Pulsador("pul-green", "green");

const flecha_izq = new HTML_Elements.BotonIcono("flecha_izq");
const flecha_der = new HTML_Elements.BotonIcono("flecha_der");
const btn_aceptar = new HTML_Elements.BotonIcono("btn_aceptar");

// const panel = new HTML_Elements.Div("panel");

const menuCargando = new HTML_Elements.Div("menuCargando"); 
const menuSeleccion = new HTML_Elements.Div("menuSeleccion"); 

const pulsadores = [];
const secuencia = [];
var secuenciaPulsada = [];
var tiempo = 1000;
var estado_de_juego = "apagado";

pulsadores.push(pulsador_orange);
pulsadores.push(pulsador_blue);
pulsadores.push(pulsador_green);
pulsadores.push(pulsador_red);

const actualizarMostrarSecuencia = function(string) {
	//panel.escribir(string);
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

const mover = function(direccion) {

}

const aceptar = function() {
	estado_de_juego = "apagado";
	ajustarse_al_estado();
}

const apagarPulsadores = async function() {

	for (var i = 0; i < pulsadores.length; i++) {
		pulsadores[i].apagar();
	}
	await Clases.Reloj.esperar(100);

	return true;
}

const encenderPulsadores = async function() {
	
	for (var i = 0; i < pulsadores.length; i++) {
		pulsadores[i].ajustarTiempo();
		pulsadores[i].iluminar();
	}

	await Clases.Reloj.esperar(1000);
	await apagarPulsadores();

	return true;
}

const inicializarElementos = function() {

	pulsador_orange.asignarEvent("click", () => { pulsar(pulsador_orange, 0) });
	pulsador_blue.asignarEvent("click", () => { pulsar(pulsador_blue, 1) });
	pulsador_green.asignarEvent("click", () => { pulsar(pulsador_green, 2) });
	pulsador_red.asignarEvent("click", () => { pulsar(pulsador_red, 3) });

	flecha_izq.asignarEvent("click", () => { mover("izq"); });
	flecha_der.asignarEvent("click", () => { mover("der"); });
	btn_aceptar.asignarEvent("click", aceptar);

	flecha_izq.addEvent();
	flecha_der.addEvent();
	btn_aceptar.addEvent();
}

const comprobarSecuencia = function() {
	for (var i = 0; i < secuenciaPulsada.length; i++) {
		if (secuencia[i] !== secuenciaPulsada[i])
			throw new Error("Fin del juego!!!");
	}

	return true;
}

const ajustarse_al_estado = function() {
	switch(estado_de_juego) {
		case ("apagado"):
			// DESACTIVAR TODOS LOS BOTONES EXCEPTO BTN_ACEPTAR, APAGAR PANTALLA.
			switch_apagado();
			break;
		case ("cargando"):
			// HABILITAR CARGANDO, DESACTIVO TODO LO DEMAS.
			switch_cargando();
			break;
		case ("menuSeleccion"):
			// HABILITAR MENU SELECCION, DESACTIVO PULSADORES, HABILITO PANEL FRONTAL.
			switch_menu_seleccion();
			break;
		default:
	}
}

const switch_apagado = function() {

	console.log("Apagando...");

	apagarPulsadores();
	deshabilitarPulsadores();

	flecha_der.desactivar();
	flecha_izq.desactivar();
	btn_aceptar.desactivar();

	console.log("Apagando");
}

const switch_cargando = async function() {

	console.log("Cargando...");

	apagarPulsadores();
	deshabilitarPulsadores();

	flecha_der.desactivar();
	flecha_izq.desactivar();
	btn_aceptar.desactivar();

	menuCargando.mostrar();

	await Clases.Reloj.esperar(2000);

	menuCargando.ocultar();

	console.log("Carga completa");

	estado_de_juego = "menuSeleccion";

	ajustarse_al_estado();
}

const switch_menu_seleccion = function() {

	console.log("mostrando: menu seleccion");

	apagarPulsadores();
	deshabilitarPulsadores();

	flecha_der.activar();
	flecha_izq.activar();
	btn_aceptar.activar();

	menuSeleccion.mostrar();
}

const jugar = async function() {

	obtenerSiguienteSecuencia();

	await iluminarSecuencia();

	reducirTiempoPulsadores();

	reducirTemporizador();

	habilitarPulsadores();
}

inicializarElementos();

//jugar();

estado_de_juego = "cargando";
ajustarse_al_estado();