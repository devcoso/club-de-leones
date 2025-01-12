import { formatDateWithHours } from '../../utils/formatDate'

import { Tag } from 'primereact/tag';
import { Link } from 'react-router-dom';

function EventCard({event}) {

    const fechaInicio = new Date(event.start_date)
    const fechaFin = new Date(event.end_date)
    const fechaLimite = new Date(event.sign_up_deadline)
    const isValidSignUp = new Date() < fechaLimite

    return (
        <div className='bg-white shadow-lg p-5 rounded-md space-y-3'>
        <h3 className='font-bold text-primary text-2xl'>{event.name}</h3>
            <p className='text-secondary text-gray-700'>{event.description}</p>
            <div className='flex gap-2 items-center'>
                <Tag className="text-center font-bold my-2 " style={{background: 'linear-gradient(-225deg,#3a6b99 0%,#23609a 48%,#175794 100%)'}}>{event.branch.name}</Tag>
                <Tag className="text-center font-bold my-2 " style={{background: 'linear-gradient(-225deg,#df0101 0%,#a80000 48%,#a00202 100%)'}}>{event.type.name}</Tag>
            </div>
            <p className={`font-semibold ${isValidSignUp ? 'text-green-700' : 'line-through text-red-500'}`}> <i className="pi pi-fw pi-pencil"></i> Hasta {formatDateWithHours(fechaLimite)}</p>
            <p className='text-gray-700 font-semibold'> <i className="pi pi-fw pi-users"></i> {event.max_participants} cupos</p>
            <p className='text-gray-700 font-semibold'> <i className="pi pi-fw pi-user"></i> De {event.min_age} a {event.max_age} años</p>
            <p className='text-gray-700 font-semibold'> <i className="pi pi-fw pi-calendar-clock"></i> {formatDateWithHours(fechaInicio)} - {formatDateWithHours(fechaFin)}</p>
            <p className='text-gray-700 font-semibold'> <i className="pi pi-fw pi-map-marker"></i> {event.branch.location}</p>
            <p className='text-gray-800 font-bold text-right'>{event.sign_up_fee > 0 ? `$${event.sign_up_fee} MXN` : 'Gratis'}</p>
            <Link to={`/dashboard/event/${event.id}`} className='bg-primary text-center text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-primary-dark block w-full md:w-1/2 lg:w-1/3 min-w-12 '>Ver más</Link>
        </div>
    )
}

export default EventCard
