export async function getAllUsers() {
    try {
        const url = import.meta.env.VITE_API_URL + '/trainer/users/members'
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
        return {status: 500, data: {errors: ['Error al conectar con el servidor']}}
    }
}

export async function addStudent(id, title) {
    try {
        const url = import.meta.env.VITE_API_URL + `/trainer/add-student/${id}`
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({title})
        })
        const data = await respuesta.json()
        return {
            status: respuesta.status,
            data
        }
    } catch (error) {
        console.log(error);
        return {status: 500, data: {errors: ['Error al conectar con el servidor']}}
    }
}

export async function updateStudent(id, title) {
    try {
        const url = import.meta.env.VITE_API_URL + `/trainer/edit-title/${id}`
        const respuesta = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({title})
        })
        const data = await respuesta.json()
        return {
            status: respuesta.status,
            data
        }
    } catch (error) {
        console.log(error);
        return {status: 500, data: {errors: ['Error al conectar con el servidor']}}
    }
}

export async function removeStudent(id) {
    try {
        const url = import.meta.env.VITE_API_URL + `/trainer/remove-student/${id}`
        const respuesta = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
        })
        const data = await respuesta.json()
        return {
            status: respuesta.status,
            data
        }
    } catch (error) {
        console.log(error);
        return {status: 500, data: {errors: ['Error al conectar con el servidor']}}
    }
}