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

export class Animacion {

	constructor() {
		this.styleSheet = null;
		this.nombre = "";
	}

	agregarAnimacion(elemento, tiempo_ms, infinita) {
		elemento.style.animation = this.nombre + ' ' + tiempo + 'ms' + (infinita? ' infinite' : '');
	}

	crearAnimacionDinamica(nombre, estilos) {
		
		if (!this.styleSheet) {
  			
  			this.styleSheet = document.createElement('style');
  			this.styleSheet.type = 'text/css';
  			document.head.appendChild(this.styleSheet);
		}

		this.styleSheet.sheet.insertRule(`@keyframes ${nombre} {${estilos}}`,
		this.styleSheet.length );

		this.nombre = nombre;
	}
}