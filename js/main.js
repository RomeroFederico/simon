import * as HTML_Elements from "./html-elements.js";
import * as Clases from "./clases.js";

const pulsador_orange = new HTML_Elements.Pulsador("pul-orange", "orange");
const pulsador_blue = new HTML_Elements.Pulsador("pul-blue", "blue");
const pulsador_red = new HTML_Elements.Pulsador("pul-red", "red");
const pulsador_green = new HTML_Elements.Pulsador("pul-green", "green");

const flecha_izq = new HTML_Elements.BotonIcono("flecha_izq");
const flecha_der = new HTML_Elements.BotonIcono("flecha_der");
const btn_aceptar = new HTML_Elements.BotonIcono("btn_aceptar");

const menuCargando = new HTML_Elements.Div("menuCargando", false); 
const menuSeleccion = new HTML_Elements.Div("menuSeleccion", false);
const menuJuegoClasico = new HTML_Elements.Div("menuJuegoClasico", false);
const menuJuegoClasicoSPLASH = new HTML_Elements.Div("menuJuegoClasicoSPLASH", false);
const menuSuccess = new HTML_Elements.Div("menuSuccess", false);
const menuDerrota = new HTML_Elements.Div("menuDerrota", false);

const numSecuenciaPantalla = new HTML_Elements.Div("numSecuenciaPantalla", false);
const banPulsar = new HTML_Elements.Div("banPulsar", false);

const menuSeleccionSeleccionado = new HTML_Elements.Div("menuSeleccionSeleccionado", false);

const pulsadores = [];
const secuencia = [];
const modoDeJuego = ["CLASICO", "MODERNO", "PUNTAJES", "OPCIONES", "APAGAR"];
var modoDeJuegoSeleccionado = 0;
var secuenciaPulsada = [];
var tiempo = 700;
var estado_de_juego = "apagado";

pulsadores.push(pulsador_orange);
pulsadores.push(pulsador_blue);
pulsadores.push(pulsador_green);
pulsadores.push(pulsador_red);

const actualizarMostrarSecuencia = function(string) {
	numSecuenciaPantalla.escribir(secuencia.length);
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
	if (modoDeJuego[modoDeJuegoSeleccionado] === "CLASICO")
		if (tiempo >= 300)
		{
			tiempo -= 25;
			console.log("Tiempo reducido : " + tiempo);
		}
	else
		if (tiempo >= 300)
			tiempo -= 200;
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
			estado_de_juego = "success";
			cambiar_pantalla();

			encenderPulsadoresCorrecto(true);	
			await Clases.Reloj.esperar(1000);
			encenderPulsadoresCorrecto(false);

			ajustarTiempoPulsadores();
			secuenciaPulsada = [];

			estado_de_juego = "clasico";
			cambiar_pantalla();

			jugar();
		}
	else
	{
		estado_de_juego = "derrota";
		cambiar_pantalla();
		encenderPulsadoresDerrota(true);
	}
}

const habilitarPulsadores = function() {

	pulsadores.forEach((pulsador) => {
		pulsador.activar();
	})

	banPulsar.ocultar();
}

const deshabilitarPulsadores = function() {
	pulsadores.forEach((pulsador) => {
		pulsador.desactivar();
	})

	banPulsar.mostrar();
}

const mover = function(direccion) {

	if (direccion === "izq")
		modoDeJuegoSeleccionado = modoDeJuegoSeleccionado === 0 ? modoDeJuego.length - 1 : modoDeJuegoSeleccionado - 1;
	else
		modoDeJuegoSeleccionado = modoDeJuegoSeleccionado === modoDeJuego.length - 1 ? 0 : modoDeJuegoSeleccionado + 1;

	menuSeleccionSeleccionado.escribir(modoDeJuego[modoDeJuegoSeleccionado]);
}

const aceptar = function() {
	estado_de_juego = "SPLASHclasico";
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

const encenderPulsadoresDerrota = async function(encender) {
	
	for (var i = 0; i < pulsadores.length; i++) {
		if (encender)
			pulsadores[i].reproducirAnimacion("animacion-derrota");
		else
			pulsadores[i].stopReproducirAnimacion("animacion-derrota");
	}

	return true;
}

const encenderPulsadoresCorrecto = async function(encender) {
	
	for (var i = 0; i < pulsadores.length; i++) {
		if (encender)
			pulsadores[i].reproducirAnimacion("animacion-correcto");
		else
			pulsadores[i].stopReproducirAnimacion("animacion-correcto");
	}

	return true;
}

const inicializarElementos = function() {

	pulsador_orange.asignarEvent("click", () => { pulsar(pulsador_orange, 0) });
	pulsador_blue.asignarEvent("click", () => { pulsar(pulsador_blue, 1) });
	pulsador_green.asignarEvent("click", () => { pulsar(pulsador_green, 2) });
	pulsador_red.asignarEvent("click", () => { pulsar(pulsador_red, 3) });

	pulsador_orange.setCursorDefault();
	pulsador_blue.setCursorDefault();
	pulsador_green.setCursorDefault();
	pulsador_red.setCursorDefault();

	flecha_izq.asignarEvent("click", () => { mover("izq"); });
	flecha_der.asignarEvent("click", () => { mover("der"); });
	btn_aceptar.asignarEvent("click", aceptar);

	flecha_izq.addEvent();
	flecha_der.addEvent();
	btn_aceptar.addEvent();

	flecha_izq.activado = true;
	flecha_der.activado = true;
	btn_aceptar.activado = true;
}

const comprobarSecuencia = function() {
	for (var i = 0; i < secuenciaPulsada.length; i++)
		if (secuencia[i] !== secuenciaPulsada[i])
			return false;

	return true;
}

const ajustarse_al_estado = function() {

	cambiar_pantalla();

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
		case ("SPLASHclasico"):
			switch_modo_clasico_SPLASH();
			break;
		case ("clasico"):
			// HABILITAR PANTALLA MODO CLASICO, DESACTIVO TODOS LOS BOTONES.
			switch_modo_clasico();
			break;
		default:

	}
}

const cambiar_pantalla = function() {

	menuCargando.ocultar();
	menuSeleccion.ocultar();
	menuJuegoClasicoSPLASH.ocultar();
	menuJuegoClasico.ocultar();
	menuSuccess.ocultar();
	menuDerrota.ocultar();

	if (estado_de_juego === "cargando")
		menuCargando.mostrar();

	if (estado_de_juego === "menuSeleccion")
		menuSeleccion.mostrar();

	if (estado_de_juego === "SPLASHclasico")
		menuJuegoClasicoSPLASH.mostrar();

	if (estado_de_juego === "clasico")
		menuJuegoClasico.mostrar();

	if (estado_de_juego === "success")
		menuSuccess.mostrar();

	if(estado_de_juego === "derrota")
		menuDerrota.mostrar();
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

	await Clases.Reloj.esperar(2000);

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
}

const switch_modo_clasico_SPLASH = async function() {

	console.log("mostrando: juego clasico SPLASH");

	apagarPulsadores();
	deshabilitarPulsadores();

	flecha_der.desactivar();
	flecha_izq.desactivar();
	btn_aceptar.desactivar();

	await Clases.Reloj.esperar(1500);

	estado_de_juego = "clasico";

	ajustarse_al_estado();
}

const switch_modo_clasico = async function() {

	console.log("mostrando: juego clasico");

	apagarPulsadores();
	deshabilitarPulsadores();

	flecha_der.desactivar();
	flecha_izq.desactivar();
	btn_aceptar.desactivar();

	await Clases.Reloj.esperar(250);

	jugar();
}

const jugar = async function() {

	banPulsar.mostrar();

	obtenerSiguienteSecuencia();

	await Clases.Reloj.esperar(750);

	await iluminarSecuencia();

	console.log(convertirSecuencia());

	reducirTiempoPulsadores();
	reducirTemporizador();

	//banPulsar.ocultar();

	habilitarPulsadores();
}

function convertirSecuencia() {
	return secuencia.map((elemento) => {
		return pulsadores[elemento].colorAsociado;
	});
}

inicializarElementos();

estado_de_juego = "cargando";
//cambiar_pantalla();

//jugar();

ajustarse_al_estado();