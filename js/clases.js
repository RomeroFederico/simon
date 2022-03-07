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