export async function sign_up($id){
    try {
        const url = import.meta.env.VITE_API_URL + `/events/${$id}/sign-up`
        const respuesta = await fetch(url, {
            method: 'POST',
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
        return {status: 500, data: {message: 'Error al conectar con el servidor'}}
    }
}

export async function sign_off($id){
    try {
        const url = import.meta.env.VITE_API_URL + `/events/${$id}/sign-off`
        const respuesta = await fetch(url, {
            method: 'POST',
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
        return {status: 500, data: {message: 'Error al conectar con el servidor'}}
    }
}

export async function update($id, $data){
    try {
        const url = import.meta.env.VITE_API_URL + `/events/sessions/${$id}`
        const respuesta = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify($data)
        })
        const data = await respuesta.json()
        return {
            status: respuesta.status,
            data
        }
    } catch (error) {
        console.log(error);
        return {status: 500, data: {message: 'Error al conectar con el servidor'}}
    }
}

export async function getAllSessionsByEvent($id){
    try {
        const url = import.meta.env.VITE_API_URL + `/events/${$id}/sessions`
        const respuesta = await fetch(url, {
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
    }
    catch (error) {
        console.log(error);
        return {status: 500, data: {message: 'Error al conectar con el servidor'}}
    }
}
