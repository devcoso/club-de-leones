import { logout } from '../../services/auth'
import { setTshirtSize as setTshirtSizeUser } from '../../services/users'

import { useState } from 'react'

import { Link, useOutletContext } from 'react-router-dom'

import { Avatar } from 'primereact/avatar'
import { Tag } from 'primereact/tag'
import { Dropdown } from 'primereact/dropdown'

function Perfil() {

  const { user } = useOutletContext()
  
   const [tshirtSizes] = useState(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
   const [tshirtSize, setTshirtSize] = useState(user.tshirt_size);


   const getSeverityTShirt = (type) => {
    switch (type) {
        case 'XS':
            return 'warning';
        case 'S':
            return 'info';
        case 'M':
            return 'success';
        case 'L':
            return 'warning';
        case 'XL':
            return 'danger';
        case 'XXL':
            return 'danger';
    }
  };

  const logoutButton = () => {
      logout()
      localStorage.removeItem('token')
  }

  const handleSetTshirtSize = async (e) => {
    const response = await setTshirtSizeUser(user.id, e.target.value)
    if(response.status === 200) {
      setTshirtSize(e.target.value)
    }
  }
    
  const tshirtItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverityTShirt(option)} className='text-sm' />;
  }; 

  return (
    <div >
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl my-5'>Perfil</h1>
      <div className="flex flex-col items-center justify-center md:w-1/2 m-auto bg-white shadow-md rounded-lg p-4 md:my-12">
        {/* hacer mi propio avatar */}
        <Avatar label={user.name.charAt(0)} size="xlarge" shape="circle" className="my-2" />
        <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-bold  my-2">{user.name} {user.paternal_last_name} {user.maternal_last_name}</h2>
        <p className="text-center text-xl lg:text-2xl font-bold text-primary my-2">{user.type}</p>
        <Tag className="text-center text-xl lg:text-2xl font-bold my-2 " style={{background: 'linear-gradient(-225deg,#3a6b99 0%,#23609a 48%,#175794 100%)'}}>{user.branch ? user.branch.name : 'Sin Sede'}</Tag>
        <p className="text-center text-lg lg:text-xl my-2">Correo: <span className='font-bold'>{user.email}</span></p>
        <p className="text-center text-lg lg:text-xl my-2">Teléfono: <span className='font-bold'>{user.phone_number.slice(0, 2)}-{user.phone_number.slice(2, 6)}-{user.phone_number.slice(6)}</span></p>
        <p className="text-center text-lg lg:text-xl my-2">Fecha de Nacimiento: <span className='font-bold'>{user.birthdate}</span></p>
        <p className="text-center text-lg lg:text-xl my-2">Sexo: <span className='font-bold'>{user.sex_name}</span></p>
        <p className="text-center text-lg lg:text-xl my-2">Talla de Camisa: <span className='font-bold'>
            <Dropdown value={tshirtSize} options={tshirtSizes} onChange={handleSetTshirtSize} itemTemplate={tshirtItemTemplate} className='text-sm'  style={{ width: '7rem'}} /></span></p>
        <Link to={'/'} onClick={logoutButton} className="w-full text-ce bg-red-700 py-3 my-10 text-white text-center hover:bg-red-900 max-w-96 mx-auto block font-bold rounded-md shadow-md">Cerrar Sesión</Link>
      </div>
    </div>
  )
}

export default Perfil
