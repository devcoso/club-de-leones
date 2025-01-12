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

export async function assignType(id, type) {
    try {
        const url = import.meta.env.VITE_API_URL + `/admin/users/${id}/assign-type`
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({type})
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


export async function assignBranch(id, branch_id) {
    try {
        const url = import.meta.env.VITE_API_URL + `/admin/users/${id}/assign-branch`
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({branch_id})
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

export async function myMembers() {
    try {
        const url = import.meta.env.VITE_API_URL + '/users/my-members'
        const respuesta = await fetch(url, {
            method: 'GET',
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

export async function setTshirtSize(id, tshirt_size) {
    try {
        const url = import.meta.env.VITE_API_URL + `/users/my-tshirt-size`
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({tshirt_size})
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

export async function adminHome () {
    try {
        const url = import.meta.env.VITE_API_URL + '/admin/home'
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