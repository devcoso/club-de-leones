import { useLoaderData } from "react-router-dom";
import { adminHome } from "../../services/users";

import { useState } from 'react';

import { Chart } from 'primereact/chart';


export async function loader() {
  const response = await adminHome()
  return response
}

function Home() {
  const { data } = useLoaderData()

  const userDataChart = {
    labels: ['Miembros', 'Administradores', 'Entrenadores'],
    datasets: [
      {
        data: [data.total_members, data.total_admins, data.total_trainers],
        backgroundColor: [
          '#3b82f6',
          '#EF4444',
          '#f97316' 
        ],
        hoverBackgroundColor: [
          '#196df5',
          '#ee2525',
          '#f86700'
        ]
      }]
  };

  const chartOptions = {
    responsive: true
  };

  return (
    <div className="my-12 space-y-12 mx-2 md:mx-5">
      <h1 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl'>Inicio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="bg-white shadow-lg rounded-md p-4 flex flex-col justify-between items-center min-h-96 md:col-span-2 lg:col-span-3">
          <h3 className="text-center font-bold text-primary text-xl md:text-2xl lg:text-3xl">Usuarios</h3>
          <Chart type="doughnut" data={userDataChart} options={chartOptions} className="w-full md:w-1/2 lg:w-1/3"/>
          <p className="text-center font-semibold text-gray-800 text-base md:text-lg lg:text-xl">
            {data.total_admins + data.total_members + data.total_trainers} usuarios
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-md p-4 flex flex-col justify-between items-center min-h-96">
          <h3 className="text-center font-bold text-primary text-xl md:text-2xl lg:text-3xl">Sedes</h3>
          <p className="text-center font-semibold text-gray-800 text-6xl md:text-8xl lg:text-9xl">
            {data.total_branches} 
          </p>
          <p className="text-center font-semibold text-gray-800 text-lg md:text-xl lg:text-2xl">
            Total de sedes
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-md p-4 flex flex-col justify-between items-center min-h-96 h-full">
          <h3 className="text-center font-bold text-primary text-xl md:text-2xl lg:text-3xl">Eventos</h3>
          <p className="text-center font-semibold text-gray-800 text-6xl md:text-8xl lg:text-9xl">
            {data.total_event_types} 
          </p>
          <p className="text-center font-semibold text-gray-800 text-lg md:text-xl lg:text-2xl">
            Total de tipos de eventos
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-md p-4 flex flex-col justify-between items-center min-h-96 h-full">
          <h3 className="text-center font-bold text-primary text-xl md:text-2xl lg:text-3xl">Eventos</h3>
          <p className="text-center font-semibold text-gray-800 text-6xl md:text-8xl lg:text-9xl">
            {data.total_events} 
          </p>
          <p className="text-center font-semibold text-gray-800 text-lg md:text-xl lg:text-2xl">
            Total de eventos
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-md p-4 flex flex-col justify-between items-center min-h-96 lg:col-span-3">
          <h3 className="text-center font-bold text-primary text-xl md:text-2xl lg:text-3xl">Participaciones</h3>
          <p className="text-center font-semibold text-gray-800 text-6xl md:text-8xl lg:text-9xl">
            {data.total_sessions} 
          </p>
          <p className="text-center font-semibold text-gray-800 text-lg md:text-xl lg:text-2xl">
            Total de participaciones
          </p>
        </div>
        
      </div>
      

       

    </div>
  )
}

export default Home
