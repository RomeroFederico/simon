export class Reloj {

	static async esperar(tiempo) {

		let promise = new Promise(
		(resolve, reject) => {
			setTimeout(() => resolve({ exito : true}), tiempo)
		});

		let resultado = await promise;

		if (!(resultado.exito))
			throw new Error("Error Desconocido!!!");
		else
		{
			return true;
		}
	}
}

export class CreadorAnimaciones {

	constructor() {
		this.styleSheet = null;
		this.animaciones = [];
	}

	getAnimacion(nombre_animacion) {
		return this.animaciones.find((animacion) => {
			return animacion.nombre === nombre_animacion;
		});
	}

	borrarAnimacion(nombre_animacion) {
		var indice = this.animaciones.findIndex((animacion) => {
			return animacion.nombre === nombre_animacion;
		});

		if (indice !== -1)
			this.styleSheet.sheet.deleteRule(indice);
	}

	agregarAnimacion(elemento, nombre_animacion) {

		var animacion = this.getAnimacion(nombre_animacion);

		console.log(animacion);

		var cadena = animacion.nombre;
		cadena += ' ' + animacion.duracion;
		cadena += animacion.infinita? 'infinite' : '';

		elemento.style.animation = cadena;

		if (animacion.delay !== 0)
			elemento.style.animationDelay = animacion.delay;

		if (animacion.fillModeAnimacion !== "none")
			elemento.style.animationFillMode = animacion.fillModeAnimacion;
	}

	crearAnimacionDinamica(nombre, estilos) {
		
		if (!this.styleSheet) {
  			
  			this.styleSheet = document.createElement('style');
  			this.styleSheet.type = 'text/css';
  			document.head.appendChild(this.styleSheet);
		}

		this.styleSheet.sheet.insertRule(`@keyframes ${nombre} { to {${estilos}} }`,
		this.styleSheet.length );

		this.animaciones.push(new Animacion(nombre));
	}
}

export class Animacion {

	constructor(nombre) {
		this.nombreAnimacion = nombre;
		this.duracionAnimacion = '750ms';
		this.infinitaAnimacion = false;
		this.delayAnimacion = '250ms';
		this.fill_modeAnimacion = "forwards";
	}

	get nombre() {
		return this.nombreAnimacion;
	}

	set nombre(nuevo) {
		this.nombreAnimacion = nuevo;
	}

	get duracion() {
		return this.duracionAnimacion;
	}

	set duracion(valor) {
		this.duracionAnimacion = valor + "ms";
	}

	get infinita() {
		return this.infinitaAnimacion;
	}

	set infinita(nuevo) {
		this.infinitaAnimacion = nuevo;
	}

	get delay() {
		return this.delayAnimacion;
	}

	set delay(valor) {
		this.delayAnimacion = valor + "ms";
	}

	get fillModeAnimacion() {
		return this.fill_modeAnimacion
	}

	set fillModeAnimacion(valor) {
		this.fill_modeAnimacion = valor;
	}
}