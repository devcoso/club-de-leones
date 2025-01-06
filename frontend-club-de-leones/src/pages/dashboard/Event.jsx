import { getEvents } from '../../services/event'

import { useState, useEffect } from 'react'

import { useLoaderData } from 'react-router-dom'

import EventCard from '../../components/dashboard/EventCard'

export async function loader() {
  const response = await getEvents()
  if(response.status !== 200) {
      return null
  }
  return response.data.events
}

function Event() {

  const [events, setEvents] = useState(useLoaderData())

  const [isLoading, setIsLoading] = useState(false)

  handleRefresh = async () => {
    setIsLoading(true)
    const response = await getEvents()
    if(response.status === 200) {
      setEvents(response.data.events)
    }
    setIsLoading(false)
  }

  return (
    <div>
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl my-5'>Sedes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 md:mx-20 md:my-12">
        {events?.length > 0 ? events.map(event => (< EventCard key={event.id} event={event} />)) 
        : (
          <div className="flex justify-center items-center my-32">
            <p className='text-primary text-2xl font-bold'>No hay eventos registrados</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Event
