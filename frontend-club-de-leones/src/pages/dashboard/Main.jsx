import { main } from "../../services/users"

import { useState } from "react";

import { useLoaderData, useOutletContext } from "react-router-dom";

import EventCard from "../../components/dashboard/EventCard";
import Branch from "../../components/dashboard/Branch";

import { Carousel } from 'primereact/carousel';

export async function loader() {
  const response = await main()
  if(response.status === 200) {
    return response.data
  }
  throw new Error('Error al cargar los datos');
}

function Main() {

  const data = useLoaderData()
  const {user} = useOutletContext()

  const [myEvents] = useState(data.my_events)
  const [branchEvents] = useState(data.branch_events)
  const [branch] = useState(data.branch)

  const sessionItemTemplate = (session) => {

    //Recortar la campos
    if(session.event.name.length > 12) {
      session.event.name = session.event.name.substring(0, 12
      ) + '...'
    }
    if(session.event.description.length > 12) {
      session.event.description = session.event.description.substring(0, 12) + '...'
    } 
    
    return (
      <div className=" m-2 text-center py-5 px-3 w-full">
        <EventCard event={session.event} isShort={true}/>
      </div>
    )
  };
  const eventItemTemplate = (event) => {

    //Recortar la campos
    if(event.name.length > 12) {
      event.name = event.name.substring(0, 12
      ) + '...'
    }
    if(event.description.length > 12) {
      event.description = event.description.substring(0, 12) + '...'
    } 
    
    return (
      <div className=" m-2 text-center py-5 px-3 w-full">
        <EventCard event={event} isShort={true}/>
      </div>
    )
  };

  return (
    <div>
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl my-5'>Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg md:my-12 w-full xl:w-4/5 m-auto p-5 space-y-10">
        <p>¡Hola <span className='font-bold text-primary text-lg'> 
          {user.name}
        </span>!</p>
        <h2 className='text-primary text-3xl font-bold my-4'>Mis últimos eventos</h2>
        <div className="md:block hidden">
          <Carousel value={myEvents} numVisible={3} numScroll={3} itemTemplate={sessionItemTemplate} className="bg-gray-100" />
        </div> 
        <div className="md:hidden block">
          {myEvents.map((session) => (
            <div key={`session-${session.id}`} className=" m-2 text-center py-5 px-3 w-full">
              <EventCard event={session.event} isShort={true}/>
            </div>
          ))}
        </div> 
        <h2 className='text-primary text-3xl font-bold my-4'>Mi sede</h2>
        <Branch branch={branch} isYourBranch={false}/>
        <h4 className='text-primary text-xl font-semibold my-4'>Eventos de mi sede</h4>
        <div className="md:block hidden">
          <Carousel value={branchEvents} numVisible={3} numScroll={3} itemTemplate={eventItemTemplate} className="bg-gray-100" />
        </div> 
        <div className="md:hidden block">
          {branchEvents.map((event) => (
            <div key={`event-${event.id}`} className=" m-2 text-center py-5 px-3 w-full">
              <EventCard event={event} isShort={true}/>
            </div>
          ))}
        </div> 
      </div>
    </div>
  )
}

export default Main
