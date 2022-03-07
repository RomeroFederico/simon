export class ElementoHTML {
	constructor(id) {
		this.elemento = document.getElementById(id);
		this.id = id;
		this.eventoAsignado = undefined;
		this.cursorInicial = this.elemento.style.cursor;
		this.valorDefecto = this.elemento.value;
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

	volverAlValorInicial () {
		this.valor = this.valorDefecto;
	}

	activar() {
		this.elemento.disabled = false;
		this.elemento.style.cursor = this.cursorInicial;

		if (this.tieneEvento)
			this.addEvent();
	}

	desactivar() {
		this.elemento.disabled = true;
		this.elemento.style.cursor = 'default';

		if (this.tieneEvento)
			this.deleteEvent();
	}

	asignarEvent(evento, cb) {
		this.eventoAsignado = { ev : evento, cb : cb };
		this.addEvent();
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
}

export class Div extends ElementoHTML {

	escribir (html_string) {
		this.elemento.innerHTML = html_string;
	}

	borrar() {
		this.elemento.innerHTML = "";
	}

	volverAlValorInicial () {
		this.borrar();
	}
}

export class Boton extends ElementoHTML {

	desactivar() {
		super.desactivar();
		this.elemento.classList.add("btnDesactivado");
	}

	activar() {
		super.activar()
		this.elemento.classList.remove("btnDesactivado");
	}
}

export class Pulsador extends Boton {

	constructor(id, colorAsociado)
	{
		super(id);
		this.colorAsociado = colorAsociado;
	}

	get animacionAsignada() {
		return "animacion-" + this.colorAsociado;
	}

	get tiempo() {
		return Number(this.style["animation-duration"].replace("ms", ""));
	}

	reducirTiempo() {
		this.style["animation-duration"] = (this.tiempo > 700? this.tiempo - 200 : this.tiempo).toString() + "ms !important";
	}

	iluminar() {
		Pulsador.ejecutar_animacion(this, this.animacionAsignada, true);
	}

	apagar() {
		Pulsador.ejecutar_animacion(this, this.animacionAsignada, false);
	}

	static ejecutar_animacion(elemento, animacion, agregar) {
		setTimeout(elemento.addAnimacion(animacion, agregar));
	}
}