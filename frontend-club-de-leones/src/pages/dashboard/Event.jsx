import { getEvent } from '../../services/event'

import { useState, useEffect } from 'react'

import { useLoaderData } from 'react-router-dom'

export async function loader({params}) {
  const response = await getEvent(params.id)
  if(response.status !== 200) {
      return null
  }
  return response.data.event
}

function Event() {

  const [event] = useState(useLoaderData())

  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl my-5'>{event?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 md:mx-20 md:my-12">
      </div>
    </div>
  )
}

export default Event
