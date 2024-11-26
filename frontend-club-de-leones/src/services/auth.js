
export async function register(datos){
    try {
        const url = import.meta.env.VITE_API_URL + '/auth/register'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const data = await respuesta.json()
        return {
            status: respuesta.status,
            data
        }
    } catch (error) {
        console.log(error);
        return {error: true, message: 'Error al conectar con el servidor'}
    }
}