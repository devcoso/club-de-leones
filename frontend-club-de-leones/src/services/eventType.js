export async function getAll() {
    try {
        const url = import.meta.env.VITE_API_URL + '/admin/event-type'
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await respuesta.json()
        return {
            status: respuesta.status,
            data
        }
    } catch (error) {
        console.log(error);
        return {status: 500, data: {errors: 'Error al conectar con el servidor'}}
    }
}

export async function create(name = '', description = '') {
    try {
        const url = import.meta.env.VITE_API_URL + '/admin/event-type'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({name, description}),
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
        return {status: 500, data: {errors: 'Error al conectar con el servidor'}}
    }
}

export async function update(id, name = '', description = '') {
    try {
        const url = import.meta.env.VITE_API_URL + `/admin/event-type'/${id}`
        const respuesta = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({name, description}),
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
        return {status: 500, data: {errors: 'Error al conectar con el servidor'}}
    }
}

export async function remove(id) {
    try {
        const url = import.meta.env.VITE_API_URL + `/admin/event-type'/${id}`
        const respuesta = await fetch(url, {
            method: 'DELETE'
        })
        const data = await respuesta.json()
        return {
            status: respuesta.status,
            data
        }
    } catch (error) {
        console.log(error);
        return {status: 500, data: {errors: 'Error al conectar con el servidor'}}
    }
}