
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
        return {status: 500, message: ['Error al conectar con el servidor']}
    }
}


export async function login(datos){
    try {
        const url = import.meta.env.VITE_API_URL + '/auth/login'
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
        return {status: 500, data: 'Error al conectar con el servidor'}
    }
}

export async function logout(){
    try {
        const token = localStorage.getItem('token') ?? null;
        if (!token) {
            return {status: 406, data: 'No hay token'}
        }
        const url = import.meta.env.VITE_API_URL + '/auth/logout'
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
        })
        const data = await respuesta.json()
        return {
            status: respuesta.status,
            data
        }
    }
    catch (error) {
        console.log(error);
        return {error: 500, data: 'Error al conectar con el servidor'}
    }
}

export async function forgotPassword(params) {
    try {
        const url = import.meta.env.VITE_API_URL + '/auth/forgot-password'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        const data = await respuesta.json()
        return {
            status: respuesta.status,
            data
        }
    }
    catch (error) {
        console.log(error);
        return {error: 500, data: 'Error al conectar con el servidor'}
    }
}


export async function resetPassword(params) {
    try {
        const url = import.meta.env.VITE_API_URL + '/auth/reset-password'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        const data = await respuesta.json()
        return {
            status: respuesta.status,
            data
        }
    }
    catch (error) {
        console.log(error);
        return {error: 500, data: 'Error al conectar con el servidor'}
    }
}

export async function me(){
    try {
        const token = localStorage.getItem('token') ?? null;
        if (!token) {
            return {status: 406, data: 'No hay token'}
        }
        const url = import.meta.env.VITE_API_URL + '/auth/me'
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
        })
        const data = await respuesta.json()
        return {
            status: respuesta.status,
            data
        }
    }
    catch (error) {
        console.log(error);
        return {error: 500, data: 'Error al conectar con el servidor'}
    }
}