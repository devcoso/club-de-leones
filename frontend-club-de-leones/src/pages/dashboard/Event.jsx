import { getEvent } from '../../services/event'
import { sign_up, sign_off } from '../../services/session';

import { useState, useRef } from 'react'

import { redirect, useLoaderData, useOutletContext } from 'react-router-dom'

import LoaderPage from '../../pages/LoaderPage'

import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';

export async function loader({params}) {
  const response = await getEvent(params.id)
  if(response.status !== 200) {
      return redirect('/dashboard/events')
  }
  return response.data.event
}

function Event() {

  const [event, setEvent] = useState(useLoaderData())

  const [participate, setParticipate] = useState(event.participate)

  const toast = useRef(null)

  const {user} = useOutletContext()

  const age = Math.abs(new Date(new Date() - new Date(user.birthdate)).getUTCFullYear() - 1970)

  const fechaInicio = new Date(event.start_date)
  const fechaFin = new Date(event.end_date)
  const fechaLimite = new Date(event.sign_up_deadline)
  const validParticipants = event.participants < event.max_participants
  const validSignUpDeadline = fechaLimite > new Date()
  const validAge = event.min_age <= age && event.max_age >= age
  const isValidSignUp = validParticipants && validSignUpDeadline && validAge
    

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

  const handleParticipate = async () => {
    setIsLoading(true)
    if(participate) {
      const response = await sign_off(event.id)
      if(response.status === 200) {
        setEvent({...event, participants: event.participants - 1})
        setParticipate(false)
        toast.current.show({severity:'success', summary: 'Inscripción cancelada', detail: response.data.message, life: 3000});
      } else toast.current.show({severity:'error', summary: 'Error', detail: response.data.message, life: 3000});
    } else {
      const response = await sign_up(event.id)
      if(response.status === 200) {
        setEvent({...event, participants: event.participants + 1})
        setParticipate(true)
        toast.current.show({severity:'success', summary: 'Inscripción exitosa', detail: response.data.message, life: 3000});
      } else toast.current.show({severity:'error', summary: 'Error', detail: response.data.message, life: 3000});
      
    }
    setIsLoading(false)
  }

  const [isLoading, setIsLoading] = useState(false)

  return (
    
    <>
      <Toast ref={toast} />
      {isLoading ? <LoaderPage /> :(
      <div className='w-full md:w-4/5 lg:w-3/4 mx-auto bg-white shadow-md rounded my-6 py-5 px-2 md:px-5 space-y-5'>
        <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl'>{event.name}</h1>
        <div className='flex gap-2 items-center justify-end'>
            <Tag className="text-center  md:text-lg my-2 " style={{background: 'linear-gradient(-225deg,#3a6b99 0%,#23609a 48%,#175794 100%)'}}>{event.branch.name}</Tag>
            <Tag className="text-center  md:text-lg my-2 " style={{background: 'linear-gradient(-225deg,#df0101 0%,#a80000 48%,#a00202 100%)'}}>{event.type.name}</Tag>
        </div>
        <p className='text-secondary text-justify text-gray-700'>{event.description}</p>
        <p className={`font-semibold ${validSignUpDeadline ? 'text-green-700' : 'line-through text-red-500'}`}> <i className="pi pi-fw pi-pencil"></i> Hasta {formatDateWithHours(fechaLimite)}</p>
        <p className={`font-semibold ${validParticipants ? 'text-green-700' : 'line-through text-red-500'}`}> <i className="pi pi-fw pi-users"></i> {event.max_participants} cupos</p>
        <p className="text-gray-700 font-semibold"> <i className="pi pi-fw pi-users"></i> {event.participants} inscritos</p>
        <p className={`font-semibold ${validAge ? 'text-green-700' : 'line-through text-red-500'}`}> <i className="pi pi-fw pi-user"></i> De {event.min_age} a {event.max_age} años</p>
        <p className='text-gray-700 font-semibold'> <i className="pi pi-fw pi-calendar-clock"></i> {formatDateWithHours(fechaInicio)} - {formatDateWithHours(fechaFin)}</p>
        <p className='text-gray-700 font-semibold'> <i className="pi pi-fw pi-map-marker"></i> {event.branch.location}</p>
        <div className='flex flex-col items-end gap-1'>
          <p className='text-gray-800 font-bold text-xl uppercase text-right'>{event.sign_up_fee > 0 ? `$${event.sign_up_fee} MXN` : 'Gratis'}</p>
          <Button onClick={handleParticipate} disabled={!isValidSignUp} tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} tooltip={event.sign_up_fee > 0 && 'La inscripición se paga el día del evento'} className={` text-white font-bold py-2 px-20 rounded-md shadow-md  ${participate ? 'bg-red-600 hover:bg-red-800' :'bg-primary hover:bg-primary-dark'}`} style={{padding:"0.5rem 3rem 0.5rem 3rem"}}>{participate ? 'Cancelar Inscripción' :'Inscribirme'}</Button>
        </div>
      </div>
      )}
    </>
  )
}

export default Event
