import { getEvents } from '../../services/event'

import { useState, useEffect } from 'react'

import { useLoaderData } from 'react-router-dom'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { Checkbox } from 'primereact/checkbox'

import EventCard from '../../components/dashboard/EventCard'
import LoaderPage from '../LoaderPage'

export async function loader() {
  const response = await getEvents()
  if(response.status !== 200) {
      return null
  }
  return response.data.events.reverse()
}

function Events() {

  const [events, setEvents] = useState(useLoaderData())
  const [filteredEvents, setFilteredEvents] = useState(events)

  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [onlyValid, setOnlyValid] = useState(true)

  const handleRefresh = async () => {
    setIsLoading(true)
    const response = await getEvents()
    if(response.status === 200) {
      setEvents(response.data.events)
    }
    setIsLoading(false)
  }

 
  useEffect(() => {
    if(onlyValid) {
      setFilteredEvents(events.filter(event => new Date(event.sign_up_deadline) > new Date() && event.name.toLowerCase().includes(search?.toLowerCase())))
    } else {
      setFilteredEvents(events.filter(event => event.name.toLowerCase().includes(search?.toLowerCase())))
    }
  }, [onlyValid, search])
  
  if(isLoading) return <LoaderPage />
  return (
    <div>
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl my-5'>Eventos</h1>
      <div className='flex flex-col md:flex-row gap-2 justify-between items-center mx-5 md:mx-20 my-5'>
        <div className='flex gap-2 items-center flex-col md:flex-row '> 
          <IconField iconPosition="left">
              <InputIcon className="pi pi-search" />
              <InputText value={search} onChange={e => setSearch(e.target.value)}placeholder="Buscar por título" />
          </IconField>
          <div className='flex items-center gap-2'>
            <Checkbox checked={onlyValid} onChange={e => setOnlyValid(e.checked)} />
            <label className='text-primary font-bold'>Inscripción</label>
          </div>
        </div>
        <Button icon="pi pi-refresh" style={{backgroundColor: ' rgb(35, 96, 154)'}} onClick={handleRefresh} className="p-button-text"  />
      </div>
        {filteredEvents?.length > 0 ?  (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-5 md:mx-20 md:my-12">
            {filteredEvents.map(event =>
              < EventCard key={event.id} event={event} />
            )}
          </div>
        )
        : (
          <div className="flex justify-center items-center my-32">
            <p className='text-primary text-2xl font-bold'>No se encontró ningún evento</p>
          </div>
        )}
    </div>
  )
}

export default Events
