import { Button } from 'primereact/button'
import { formatDateWithHours } from '../../utils/formatDate'

import React from 'react'

function Session({session}) {
    const fechaInscripcion = formatDateWithHours(new Date(session.created_at))
    const fechaParticipacion = session.participated_at ? formatDateWithHours(new Date(session.participated_at)) : 'No has participado'    
    const duracion = session.duration ? `${session.duration}` : 'No se ha registrado la duración'

  return (
    <div className='flex flex-col gap-4'>
        <h4 className='text-primary text-center font-bold text-xl'>Tu participación</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'> 
            <div className='flex flex-col gap-2 justify-center items-center text-white bg-primary p-7 rounded shadow-lg'>
                <i className="pi pi-fw pi-calendar text-4xl"></i>
                <span className='font-bold'>Fecha de inscripción</span>
                <span>{fechaInscripcion}</span>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center text-white bg-primary p-7 rounded shadow-lg'>
                <i className="pi pi-fw pi-calendar text-4xl"></i>
                <span className='font-bold'>Fecha de participación</span>
                <span>{fechaParticipacion}</span>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center text-white bg-primary p-7 rounded shadow-lg'>
                <i className="pi pi-fw pi-clock text-4xl"></i>
                <span className='font-bold'>Duración</span>
                <span>{duracion}</span>
            </div>
            <Button disabled={!session.participated_at} className='flex flex-col gap-2 justify-center items-center text-white bg-primary hover:bg-primary-dark p-7 rounded shadow-lg'>    
                    <i className="pi pi-fw pi-file text-4xl"></i>
                    <span className='font-bold'>Diploma de participación</span>
            </Button>
        </div>
    </div>
  )
}

export default Session
