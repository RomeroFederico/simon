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

		this.styleSheet.sheet.deleteRule(indice);
	}

	agregarAnimacion(elemento, nombre_animacion) {

		var animacion = this.getAnimacion(nombre_animacion);

		console.log(animacion);

		var cadena = animacion.nombre;
		cadena += ' ' + animacion.duracion;
		cadena += animacion.infinita;

		elemento.style.animation = cadena;

		if (animacion.delay !== 0)
			elemento.style.animationDelay = animacion.delay;

		if (animacion.fill_mode !== "none")
			elemento.style.animationFillMode = animacion.fill_mode;
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
		this.duracionAnimacion = 1500;
		this.infinitaAnimacion = false;
		this.delayAnimacion = 500;
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

	get fill_mode() {
		return this.fill_modeAnimacion
	}

	set fill_modeAnimacion(valor) {
		this.fill_modeAnimacion = valor;
	}
}