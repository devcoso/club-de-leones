import { getEvent } from '../../services/event'

import { useState, useEffect } from 'react'

import { useLoaderData, useNavigate } from 'react-router-dom'

import { Tag } from 'primereact/tag';

export async function loader({params}) {
  const response = await getEvent(params.id)
  if(response.status !== 200) {
      return null
  }
  return response.data.event
}

function Event() {

  const navigate = useNavigate();
  const [event] = useState(useLoaderData())

  
  const fechaInicio = new Date(event.start_date)
  const fechaFin = new Date(event.end_date)
  const fechaLimite = new Date(event.sign_up_deadline)
  const isValidSignUp = new Date() < fechaLimite

  const monthDict = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
  ]

  const formatDateWithHours = (fecha) => {
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = monthDict[fecha.getMonth()]
      const año = fecha.getFullYear();
      const horas = String(fecha.getHours()).padStart(2, '0');
      const minutos = String(fecha.getMinutes()).padStart(2, '0');
  
      return `${dia} de ${mes} del ${año} a las ${horas}:${minutos}`;
  };

  useEffect(() => {
    if(!event) navigate('/dashboard')
  }, [event, navigate]) 

  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='w-full md:w-4/5 lg:w-3/4 mx-auto bg-white shadow-md rounded my-6 py-5 px-2 md:px-5 space-y-5'>
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl'>{event.name}</h1>
      <div className='flex gap-2 items-center justify-end'>
          <Tag className="text-center  md:text-lg my-2 " style={{background: 'linear-gradient(-225deg,#3a6b99 0%,#23609a 48%,#175794 100%)'}}>{event.branch.name}</Tag>
          <Tag className="text-center  md:text-lg my-2 " style={{background: 'linear-gradient(-225deg,#df0101 0%,#a80000 48%,#a00202 100%)'}}>{event.type.name}</Tag>
      </div>
      <p className='text-secondary text-justify text-gray-700'>{event.description}</p>
      <p className={`font-semibold ${isValidSignUp ? 'text-green-700' : 'line-through text-red-500'}`}> <i className="pi pi-fw pi-pencil"></i> Hasta {formatDateWithHours(fechaLimite)}</p>
      <p className='text-gray-700 font-semibold'> <i className="pi pi-fw pi-users"></i> {event.max_participants} cupos</p>
      <p className='text-gray-700 font-semibold'> <i className="pi pi-fw pi-user"></i> De {event.min_age} a {event.max_age} años</p>
      <p className='text-gray-700 font-semibold'> <i className="pi pi-fw pi-calendar-clock"></i> {formatDateWithHours(fechaInicio)} - {formatDateWithHours(fechaFin)}</p>
      <p className='text-gray-700 font-semibold'> <i className="pi pi-fw pi-map-marker"></i> {event.branch.location}</p>
      <div className='flex flex-col items-end gap-1'>
        <p className='text-gray-800 font-bold text-xl uppercase text-right'>{event.sign_up_fee > 0 ? `$${event.sign_up_fee} MXN` : 'Gratis'}</p>
        <button className='bg-primary text-center text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-primary-dark block w-full md:w-1/2 lg:w-1/3 min-w-12 '>Inscribirme</button>
      </div>
    </div>
  )
}

export default Event
