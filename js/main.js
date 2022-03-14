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
const menuJuegoModernoSPLASH = new HTML_Elements.Div("menuJuegoModernoSPLASH", false);
const menuJuegoModerno = new HTML_Elements.Div("menuJuegoModerno", false);
const menuPerderVida = new HTML_Elements.Div("menuPerderVida", false);
const menuDerrotaM = new HTML_Elements.Div("menuDerrotaM", false);
const menuLevelUP = new HTML_Elements.Div("menuLevelUP", false);
const menuLevelDOWN = new HTML_Elements.Div("menuLevelDOWN", false);
const menuSuccessSCORE = new HTML_Elements.Div("menuSuccessSCORE", false);

const numSecuenciaPantalla = new HTML_Elements.Div("numSecuenciaPantalla", false);
const numRecord = new HTML_Elements.Div("numRecord", false);
const banPulsar = new HTML_Elements.Div("banPulsar", false);

const numScore = new HTML_Elements.Div("numScore", false);
const numScoreRecord = new HTML_Elements.Div("numScoreRecord", false);
const banPulsarM = new HTML_Elements.Div("banPulsarM", false);
const infoLives = new HTML_Elements.Div("infoLives", false);
const infoNivel = new HTML_Elements.Div("infoNivel", false);
const barraExperiencia = new HTML_Elements.BarraProgreso("barraExperiencia", 33);

const infoSuccessSCORE = new HTML_Elements.Div("infoSuccessSCORE", false);
const lbldataSCORE = new HTML_Elements.Div("lbldataSCORE", false);
const lbldataRONDA = new HTML_Elements.Div("lbldataRONDA", false);
const lbldataBONUS = new HTML_Elements.Div("lbldataBONUS", false);
const lbldataTOTAL = new HTML_Elements.Div("lbldataTOTAL", false);

const infoSuccessEXPERIENCIA = new HTML_Elements.Div("infoSuccessEXPERIENCIA", false);
const barraExperienciaSUCCESS = new HTML_Elements.BarraProgreso("barraExperienciaSUCCESS", 91);
const lblInfoNivelActual = new HTML_Elements.Div("lblInfoNivelActual", false);
const lblDataActExp = new HTML_Elements.Div("lblDataActExp", false);
const lblDataSigExp = new HTML_Elements.Div("lblDataSigExp", false);

const numSecuenciaFin = new HTML_Elements.Div("numSecuenciaFin", false);
const newRecord = new HTML_Elements.Div("newRecord", false);

const numScoreFin = new HTML_Elements.Div("numScoreFin", false);
const newRecordM = new HTML_Elements.Div("newRecordM", false);

const menuSeleccionSeleccionado = new HTML_Elements.Div("menuSeleccionSeleccionado", false);

const pulsadores = [];
var secuencia = [];
const modoDeJuego = ["CLASICO", "MODERNO", "PUNTAJES", "OPCIONES", "APAGAR"];
var modoDeJuegoSeleccionado = 0;
var secuenciaPulsada = [];
var tiempoDefault = 700;
var tiempo = 700;
var estado_de_juego = "apagado";
var record = 5; // PROVISORIO

var scoreActual = 0;
var scoreRecord = 1000; // PROVISORIO
var nivel = 3;
var experiencia = 5;
var experienciaLevelUP = [2, 3, 6, false];
var vidas = 3;
var bajoNivel = false;
var nuevoLargo = 0;

var mostrarScore = {
	scoreActual : 0,
	ronda : 0,
	scoreBonus : 0,
	scoreTotal : 0
}

var mostrarExp = {
	expActual : 0,
	expFaltante : 0,
	extTtotal : 0,
	subidaNivel : false
}

const nueva_animacion = new Clases.CreadorAnimaciones();

pulsadores.push(pulsador_orange);
pulsadores.push(pulsador_blue);
pulsadores.push(pulsador_green);
pulsadores.push(pulsador_red);

const calcularPuntaje = function() {
	mostrarScore.scoreActual = scoreActual;
	mostrarScore.ronda = secuencia.length;
	mostrarScore.bonus = nivel;
	mostrarScore.scoreBonus = mostrarScore.ronda * mostrarScore.bonus;
	mostrarScore.scoreTotal = mostrarScore.scoreBonus + mostrarScore.scoreActual;

	scoreActual = mostrarScore.scoreTotal;
}

const mostrarPuntaje = function() {
	lbldataSCORE.escribir(mostrarScore.scoreActual);
	lbldataRONDA.escribir(mostrarScore.ronda);
	lbldataBONUS.escribir("x" + mostrarScore.bonus);
	lbldataTOTAL.escribir(mostrarScore.scoreTotal);

	infoSuccessSCORE.mostrar();
}

const ocultarPuntaje = function() {
	infoSuccessSCORE.ocultar();
}

const calcularExperiencia = function() {

	mostrarExp.subidaNivel = false;

	if (nivel === 4)
	{
		experiencia = 0;
		mostrarExp.expActual = experiencia;
		mostrarExp.expFaltante = '---';
		mostrarExp.expTotal = 0;
	}
	else
	{
		mostrarExp.expActual = experiencia;
		experiencia++;
		mostrarExp.expFaltante = experienciaLevelUP[nivel - 1] - experiencia;
		if (mostrarExp.expFaltante === 0)
		{
			mostrarExp.expTotal = 0;
			mostrarExp.expFaltante = 0;
			nivel++;
			experiencia = 0;
			mostrarExp.subidaNivel = true;
		}
		else
			mostrarExp.expTotal = experiencia;
	}
}

const mostrarExperiencia = function() {
	lblInfoNivelActual.escribir("LVL" + nivel);
	lblDataActExp.escribir(mostrarExp.expTotal);
	lblDataSigExp.escribir(mostrarExp.expFaltante);

	infoSuccessEXPERIENCIA.mostrar();
}

const animarBarraExp = function() {

	if (nivel === 4 && mostrarExp.subidaNivel === false)
	{
		return;
	}

	if (mostrarExp.subidaNivel)
		nuevoLargo = 0;
	else 
		nuevoLargo = Math.round(mostrarExp.expTotal * 91 / experienciaLevelUP[nivel - 1]);

	nueva_animacion.borrarAnimacion("animacion-progreso");

	nueva_animacion.crearAnimacionDinamica("animacion-progreso", "border-left-width: " + nuevoLargo + "px;");
	nueva_animacion.agregarAnimacion(barraExperienciaSUCCESS, "animacion-progreso");
}

const actualizarMostrarSecuencia = function(string) {
	if (string === undefined)
		numSecuenciaPantalla.escribir(secuencia.length);
	else
		numSecuenciaPantalla.escribir(string);
}

const actualizarScore = function(string) {
	if (string === undefined)
			numScore.escribir(scoreActual);
		else
			numScore.escribir(0);
}

const actualizarRecord = function() {
	if (secuencia.length >= record)
		numRecord.escribir(secuencia.length);
	else
		numRecord.escribir(record);
}

const actualizarScoreRecord = function() {
	if (scoreActual >= scoreRecord)
		numScoreRecord.escribir(scoreActual);
	else
		numScoreRecord.escribir(scoreRecord);
}

const actualizarBarraExperiencia = function(barra) {
	barra.actualizar(experiencia, experienciaLevelUP[nivel - 1]);
}

const actualizarLives = function(barra) {
	infoLives.escribir("x" + vidas);
}

const actualizarNivel = function(barra) {
	infoNivel.escribir("LVL " + nivel);
}

const reducirNivel = function() {
	if (nivel !== 1)
	{
		nivel--;
		bajoNivel = true;
	}

	experiencia = 0;
}

const escribirMensajeGameOver = function() {

	if (modoDeJuegoSeleccionado === 0) {

		numSecuenciaFin.escribir("max secuencia: " + secuencia.length);
		if (secuencia.length >= record)
			newRecord.mostrar();
	}
	else {

		numScoreFin.escribir("score: " + scoreActual);
		if (scoreActual >= scoreRecord)
			newRecordM.mostrar();
	}
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

const ajustarTiempoPulsadoresDefault = function() {
	pulsadores.forEach((pulsador) => {
		pulsador.ajustarTiempoDefault();
	})
}

const obtenerSiguienteSecuencia = function() {
	secuencia.push(Math.floor(Math.random() * 4));
}

const calcularTiempoAReducir = function() {

	var valor = 0;

	switch (nivel) { 
		case 1:
			valor = 700;
			break;
		case 2:
			valor = 500;
			break;
		case 3:
			valor = 300;
			break;
		case 4:
			valor = 100;
			break;
		default:
			valor = 0;
	}

	return valor;
}

const reducirTiempoPulsadores = function() {

	if (modoDeJuegoSeleccionado === 0)
		pulsadores.forEach((pulsador) => {
			pulsador.reducirTiempo();
		})
	else if (modoDeJuegoSeleccionado === 1)
		pulsadores.forEach((pulsador) => {
			pulsador.ajustarTiempoModerno(calcularTiempoAReducir());
		})
}

const reducirTemporizador = function() {
	if (modoDeJuego[modoDeJuegoSeleccionado] === "CLASICO")
	{
		if (tiempo >= 300)
		{
			tiempo -= 25;
			console.log("Tiempo reducido : " + tiempo);
		}
	}
	else
	{
		tiempo = calcularTiempoAReducir();
	}
}

const iluminarSecuencia = async function () {

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
		else if (modoDeJuegoSeleccionado === 0)
			continuarPartida();
		else
			continuarPartidaModerno();
	else if (modoDeJuegoSeleccionado === 0)
		finDeLaPartida();
	else
		if (vidas === 1)
			finDeLaPartidaModerno();
		else
			perderUnaVida();
}

const continuarPartida = async function() {

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

const finDeLaPartida = async function() {

	estado_de_juego = "derrota";
	cambiar_pantalla();

	escribirMensajeGameOver();

	encenderPulsadoresDerrota(true);
	await Clases.Reloj.esperar(3000);
	encenderPulsadoresDerrota(false);

	ajustarTiempoPulsadoresDefault();
	tiempo = tiempoDefault;

	secuencia = [];
	secuenciaPulsada = [];

	newRecord.ocultar();

	actualizarMostrarSecuencia(1);

	estado_de_juego = "menuSeleccion";
	ajustarse_al_estado();
}

const continuarPartidaModerno = async function() {

	estado_de_juego = "success";
	cambiar_pantalla();

	encenderPulsadoresCorrecto(true);	
	await Clases.Reloj.esperar(1000);

	estado_de_juego = "mostrarPuntajePartida";

	calcularPuntaje();
	mostrarPuntaje();
	actualizarBarraExperiencia(barraExperienciaSUCCESS);

	cambiar_pantalla();
	
	await Clases.Reloj.esperar(1000);
	
	ocultarPuntaje();

	calcularExperiencia()
	mostrarExperiencia();

	animarBarraExp();

	await Clases.Reloj.esperar(1000);
	encenderPulsadoresCorrecto(false);

	infoSuccessSCORE.ocultar();
	infoSuccessEXPERIENCIA.ocultar();

	barraExperienciaSUCCESS.actualizar(nuevoLargo, 91);

	ajustarTiempoPulsadores();
	secuenciaPulsada = [];

	estado_de_juego = "moderno";
	cambiar_pantalla();

	jugarModerno();
}

const perderUnaVida = async function() {

	estado_de_juego = "perderUnaVida";
	cambiar_pantalla();

	encenderPulsadoresDerrota(true);
	await Clases.Reloj.esperar(1500);

	reducirNivel();

	if (bajoNivel)
	{
		estado_de_juego = "levelDOWN";
		cambiar_pantalla();
		bajoNivel = false;
	}

	await Clases.Reloj.esperar(1500);
	encenderPulsadoresDerrota(false);

	ajustarTiempoPulsadores();
	secuenciaPulsada = [];
	secuencia.pop();
	vidas--;

	estado_de_juego = "moderno";
	cambiar_pantalla();

	jugarModerno();
}

const finDeLaPartidaModerno = async function() {

	estado_de_juego = "derrotaModerno";
	cambiar_pantalla();

	escribirMensajeGameOver();

	encenderPulsadoresDerrota(true);
	await Clases.Reloj.esperar(3000);
	encenderPulsadoresDerrota(false);

	ajustarTiempoPulsadoresDefault();
	tiempo = tiempoDefault;

	secuencia = [];
	secuenciaPulsada = [];

	newRecordM.ocultar();

	actualizarScore(1);

	scoreActual = 0;
	nivel = 1;
	experiencia = 0;
	vidas = 3;

	estado_de_juego = "menuSeleccion";
	ajustarse_al_estado();
}

const habilitarPulsadores = function() {

	pulsadores.forEach((pulsador) => {
		pulsador.activar();
	})

	if (modoDeJuegoSeleccionado === 0)
		banPulsar.ocultar();
	else
		banPulsarM.ocultar();
}

const deshabilitarPulsadores = function() {
	pulsadores.forEach((pulsador) => {
		pulsador.desactivar();
	})

	if (modoDeJuegoSeleccionado === 0)
		banPulsar.mostrar();
	else
		banPulsarM.mostrar();
}

const mover = function(direccion) {

	if (direccion === "izq")
		modoDeJuegoSeleccionado = modoDeJuegoSeleccionado === 0 ? modoDeJuego.length - 1 : modoDeJuegoSeleccionado - 1;
	else
		modoDeJuegoSeleccionado = modoDeJuegoSeleccionado === modoDeJuego.length - 1 ? 0 : modoDeJuegoSeleccionado + 1;

	menuSeleccionSeleccionado.escribir(modoDeJuego[modoDeJuegoSeleccionado]);
}

const aceptar = function() {

	if (estado_de_juego = "menuSeleccion")
		seleccionar_del_menu();
}

const seleccionar_del_menu = function() {

	switch (modoDeJuegoSeleccionado)
	{
		case 0:
			estado_de_juego = "SPLASHclasico";
			break;
		case 1:
			estado_de_juego = "SPLASHmoderno";
			break;
		case 2:

			break;
		case 3:

			break;
		default:
	}

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

	actualizarMostrarSecuencia(1);
	actualizarRecord();
	actualizarScore(1);
	actualizarScoreRecord();

	actualizarBarraExperiencia(barraExperiencia);
	actualizarLives();
	actualizarNivel();
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
		case ("SPLASHmoderno"):
			// HABILITAR PANTALLA MODO MODERNO. DESACTIVO TODOS LOS BOTONES.
			switch_modo_moderno_SPLASH();
			break;
		case ("moderno"):
			// HABILITAR PANTALLA MODO CLASICO, DESACTIVO TODOS LOS BOTONES.
			switch_modo_moderno();
			break;
		default:

	}
}

const cambiar_pantalla = function() {

	menuCargando.ocultar();
	menuSeleccion.ocultar();
	menuJuegoClasicoSPLASH.ocultar();
	menuJuegoModernoSPLASH.ocultar();
	menuJuegoClasico.ocultar();
	menuSuccess.ocultar();
	menuDerrota.ocultar();
	menuJuegoModerno.ocultar();
	menuSuccessSCORE.ocultar();
	menuPerderVida.ocultar();
	menuDerrotaM.ocultar();
	menuLevelUP.ocultar();
	menuLevelDOWN.ocultar();

	if (estado_de_juego === "cargando")
		menuCargando.mostrar();

	if (estado_de_juego === "menuSeleccion")
		menuSeleccion.mostrar();

	if (estado_de_juego === "SPLASHclasico")
		menuJuegoClasicoSPLASH.mostrar();

	if (estado_de_juego === "SPLASHmoderno")
		menuJuegoModernoSPLASH.mostrar();

	if (estado_de_juego === "clasico")
		menuJuegoClasico.mostrar();

	if (estado_de_juego === "success")
		menuSuccess.mostrar();

	if(estado_de_juego === "derrota")
		menuDerrota.mostrar();

	if (estado_de_juego === "moderno")
		menuJuegoModerno.mostrar();

	if (estado_de_juego === "mostrarPuntajePartida")
		menuSuccessSCORE.mostrar();

	if (estado_de_juego === "perderUnaVida")
		menuPerderVida.mostrar();

	if (estado_de_juego === "derrotaModerno")
		menuDerrotaM.mostrar();

	if (estado_de_juego === "levelUP")
		menuLevelUP.mostrar();

	if (estado_de_juego === "levelDOWN")
		menuLevelDOWN.mostrar();
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

const switch_modo_moderno_SPLASH = async function() {
	console.log("mostrando: juego moderno SPLASH");

	apagarPulsadores();
	deshabilitarPulsadores();

	flecha_der.desactivar();
	flecha_izq.desactivar();
	btn_aceptar.desactivar();

	await Clases.Reloj.esperar(1500);

	estado_de_juego = "moderno";

	ajustarse_al_estado();
}

const switch_modo_moderno = async function() {
	console.log("mostrando: juego moderno");

	apagarPulsadores();
	deshabilitarPulsadores();

	flecha_der.desactivar();
	flecha_izq.desactivar();
	btn_aceptar.desactivar();

	await Clases.Reloj.esperar(250);

	jugarModerno();
}

const jugar = async function() {

	banPulsar.mostrar();

	obtenerSiguienteSecuencia();

	actualizarMostrarSecuencia();
	actualizarRecord();

	await Clases.Reloj.esperar(750);

	await iluminarSecuencia();

	console.log(convertirSecuencia());

	reducirTiempoPulsadores();
	reducirTemporizador();

	habilitarPulsadores();
}

const jugarModerno = async function() {

	banPulsarM.mostrar();

	actualizarBarraExperiencia(barraExperiencia);
	actualizarLives();
	actualizarNivel();

	obtenerSiguienteSecuencia();

	actualizarScore();
	actualizarScoreRecord();

	reducirTiempoPulsadores();
	reducirTemporizador();

	await Clases.Reloj.esperar(750);

	await iluminarSecuencia();

	console.log(convertirSecuencia());

	habilitarPulsadores();
}

function convertirSecuencia() {
	return secuencia.map((elemento) => {
		return pulsadores[elemento].colorAsociado;
	});
}

// async function prueba() {
// 	await Clases.Reloj.esperar(500);
// 	nueva_animacion.agregarAnimacion(barraExperienciaSUCCESS, "animacion-progreso");

// 	await Clases.Reloj.esperar(2500);

// 	barraExperienciaSUCCESS.style.borderLeftWidth = "50px";

// 	nueva_animacion.borrarAnimacion("animacion-progreso");

// 	nueva_animacion.crearAnimacionDinamica("animacion-progreso2", "border-left-width: 30px;");
// 	nueva_animacion.agregarAnimacion(barraExperienciaSUCCESS, "animacion-progreso2");

// 	console.log(nueva_animacion);
// }

inicializarElementos();

estado_de_juego = "cargando";
//cambiar_pantalla();

//jugar();

ajustarse_al_estado();

// const barraExperienciaSUCCESS = new HTML_Elements.Div("barraExperienciaSUCCESS", true);
// const nueva_animacion = new Clases.Animacion();

// nueva_animacion.crearAnimacionDinamica("animacion-progreso", "border-left-width: 50px;");

// prueba();

//nueva_animacion.agregarAnimacion(barraExperienciaSUCCESS);