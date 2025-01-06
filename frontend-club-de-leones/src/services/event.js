export async function getAll() {
    try {
        const usersUrl = import.meta.env.VITE_API_URL + '/events'
        const branchesUrl = import.meta.env.VITE_API_URL + '/branch'
        const typesUrl = import.meta.env.VITE_API_URL + '/event-type'
        const trainersUrl = import.meta.env.VITE_API_URL + '/admin/users/trainers'

        const respuesta = Promise.all([
            fetch(usersUrl, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            }),
            fetch(branchesUrl, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            }),
            fetch(typesUrl, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            }),
            fetch(trainersUrl, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            })
        ])
        const data = await respuesta
        const data1 = await data[0].json()
        const data2 = await data[1].json()
        const data3 = await data[2].json()
        const data4 = await data[3].json()
        return {
            status: data[0].status == 200 && data[1].status == 200 && data[2].status && data[3].status == 200 ? 200 : 500,
            data: {
                events: data1?.events,
                branches: data2?.branches,
                types: data3?.categories,
                trainers: data4?.trainers
            }
        }
    } catch (error) {
        console.log(error);
        return {status: 500, data: {errors: ['Error al conectar con el servidor']}}
    }
}

export async function getEvent(id) {
    try {
        const url = import.meta.env.VITE_API_URL + `/events/${id}`
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

export async function getEvents() {
    try {
        const url = import.meta.env.VITE_API_URL + '/events'
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

export async function create(body) {
    try {
        const url = import.meta.env.VITE_API_URL + '/admin/events'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
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

export async function update(id, body) {
    try {
        const url = import.meta.env.VITE_API_URL + `/admin/events/${id}`
        const respuesta = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
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

export async function remove(id) {
    try {
        const url = import.meta.env.VITE_API_URL + `/admin/events/${id}`
        const respuesta = await fetch(url, {
            method: 'DELETE',
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