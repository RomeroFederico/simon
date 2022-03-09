export class ElementoHTML {
	constructor(id) {
		this.elemento = document.getElementById(id);
		this.id = id;
		this.eventoAsignado = undefined;
		this.cursorInicial = this.elemento.style.cursor;
		this.valorDefecto = this.elemento.value;
		this.activado = false;
	}

	get valor() {
		return this.elemento.value;
	}

	set valor(valor) {
		this.elemento.value = valor;
	}

	get event() {
		return this.eventoAsignado.ev;
	}

	get cbAsignado() {
		return this.eventoAsignado.cb;
	}

	get style() {
		return this.elemento.style;
	}

	get tieneEvento() {
		if (this.eventoAsignado !== undefined)
			return true;
		return false;
	}

	set largo(width) {
		this.width = width;
	}

	get largo() {
		return this.width;
	}

	setCursorDefault() {
		this.elemento.style.cursor = "default"
	}

	volverAlValorInicial () {
		this.valor = this.valorDefecto;
	}

	activar() {

		if (!(this.activado)) {

			this.elemento.disabled = false;
			this.elemento.style.cursor = this.cursorInicial;

			if (this.tieneEvento)
				this.addEvent();

			this.activado = true;
		}
	}

	desactivar() {

		if (this.activado) {

			this.elemento.disabled = true;
			this.setCursorDefault();

			if (this.tieneEvento)
				this.deleteEvent();

			this.activado = false;
		}
	}

	asignarEvent(evento, cb) {
		this.eventoAsignado = { ev : evento, cb : cb };
	}

	addEvent() {
		this.elemento.addEventListener(this.event, this.cbAsignado);
	}

	deleteEvent() {
		this.elemento.removeEventListener(this.event, this.cbAsignado);
	}

	addAnimacion (animacion, agregar) {
		if (agregar)
			this.elemento.classList.add(animacion);
		else
			this.elemento.classList.remove(animacion);
	}

	addClass (clase) {
		this.elemento.classList.add(clase);
	}

	removeClass (clase) {
		this.elemento.classList.remove(clase);
	}
}

export class Div extends ElementoHTML {

	constructor(id, visible) {
		super(id);
		this.visible = visible;
	}

	get valor() {
		return this.elemento.innerHTML;
	}

	escribir (html_string) {
		this.elemento.innerHTML = html_string;
	}

	borrar() {
		this.elemento.innerHTML = "";
	}

	volverAlValorInicial () {
		this.borrar();
	}

	mostrar = function() {
		if (!(this.visible))
		{
			this.elemento.classList.remove("noMostrar");
			this.visible = true;
		}
	}

	ocultar = function() {
		if (this.visible)
		{
			this.elemento.classList.add("noMostrar");
			this.visible = false;
		}
	}
}

export class Boton extends ElementoHTML {

	desactivar() {
		if (this.activado) {
			super.desactivar();
			this.elemento.classList.add("btnDesactivado");
		}
	}

	activar() {
		if (!(this.activado)) {
			super.activar()
			this.elemento.classList.remove("btnDesactivado");
		}
	}
}

export class BotonIcono extends ElementoHTML {

	desactivar() {
		if (this.activado) {
			super.desactivar();
			this.elemento.classList.remove("btnFrontal");
		}
	}

	activar() {
		if (!(this.activado)) {
			super.activar();
			this.elemento.classList.add("btnFrontal");
		}
	}
}

export class Pulsador extends ElementoHTML {

	constructor(id, colorAsociado)
	{
		super(id);
		this.colorAsociado = colorAsociado;
		this.duracionDefault = 1000;
		this.duracion = 1000;
		this.apagado = true;
	}

	get animacionAsignada() {
		return "animacion-" + this.colorAsociado;
	}

	get duracion_de_la_animacion() {
		return this.style["animationDuration"];
	}

	set duracion_de_la_animacion(valor) {
		this.style["animationDuration"] = valor.toString() + "ms";
	}

	activar() {

		if (!(this.activado))
		{
			super.activar();
			this.addClass("pulsadorHabilitado");
		}
	}

	desactivar() {

		if (this.activado)
		{
			super.desactivar();
			this.removeClass("pulsadorHabilitado");
		}
	}

	ajustarTiempo() {
		this.duracion_de_la_animacion = this.duracion;
	}

	reducirTiempo() {
		if (this.duracion > 500)
			this.duracion -= 100;

		this.ajustarTiempo();
	}

	tocar() {
		this.duracion_de_la_animacion = this.duracionDefault;
		this.iluminar();
	}

	iluminar() {

		if (this.apagado) {

			if (this.duracion_de_la_animacion === "")
				this.duracion_de_la_animacion = this.duracion;

			this.elemento.classList.remove("apagado");

			Pulsador.ejecutar_animacion(this, this.animacionAsignada, true);

			this.apagado = false;
		}
	}

	apagar() {

		if (!(this.apagado)) {

			Pulsador.ejecutar_animacion(this, this.animacionAsignada, false);
			this.elemento.classList.add("apagado");

			this.apagado = true;
		}
	}

	static ejecutar_animacion(elemento, animacion, agregar) {
		setTimeout(elemento.addAnimacion(animacion, agregar));
	}
}