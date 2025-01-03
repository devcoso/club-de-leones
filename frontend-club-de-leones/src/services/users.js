export async function getAll() {
    try {
        const usersUrl = import.meta.env.VITE_API_URL + '/admin/users'
        const branchesUrl = import.meta.env.VITE_API_URL + '/branch'

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
            })
        ])
        const data = await respuesta
        const data1 = await data[0].json()
        const data2 = await data[1].json()
        return {
            status: data[0].status == 200 && data[1].status == 200 ? 200 : 500,
            data: {
                users: data1?.users,
                branches: data2?.branches
            }
        }
    } catch (error) {
        console.log(error);
        return {status: 500, data: {errors: ['Error al conectar con el servidor']}}
    }
}

export async function get(id) {
    try {
        const url = import.meta.env.VITE_API_URL + `/admin/users/${id}`
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