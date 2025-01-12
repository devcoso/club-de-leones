import { getAll } from '../services/branch'
import { me } from '../services/auth'

import logo from '../assets/logo.png'
import header from '../assets/header.png'

import { useLoaderData } from 'react-router-dom'

import { Link } from 'react-router-dom'

import Branch from '../components/dashboard/Branch'

export async function loader() {
  const promises = Promise.all([getAll(), me()])
  const [branches, user] = await promises
  if(branches.status !== 200) {
    throw new Error('Problemas con el servidor')
  }
  else if(user.status !== 200) {
    return { branches: branches.data.branches, user: null }
  }
  else {
    return { branches: branches.data.branches, user: user.data }
  }
}

function Home() {

  const { branches, user } = useLoaderData()

  return (
    <div className='space-y-12'>
      <div className='flex flex-col items-center gap-5 relative h-screen md:h-auto'>
        <img src={header} alt='header' className='w-full absolute object-cover object-center -z-10 h-full'/>
        <div className='flex flex-col items-center gap-5 p-10 bg-black bg-opacity-70 shadow-lg w-full h-full justify-center'>
          <img src={logo} alt='logo' className='w-5/6 mr-2 my-0 max-w-72'/>
          <h1 className="text-6xl text-white text-center font-bold">Club de Leones</h1>
          <h3 className=' text-center font-bold text-gray-200 text-lg'>Sistema de Información de Eventos</h3>
          {user ? (
            <div className='flex flex-col items-center gap-2'>
              <h3 className='text-white text-lg font-bold'>Bienvenido, {user.name}</h3>
              <Link to='/dashboard' className='bg-primary text-white px-5 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors'>Ir al dashboard</Link>
            </div>
          ) : (
            <div className='flex flex-col md:flex-row items-center gap-5'>
              <Link to='/auth' className='bg-primary text-white px-5 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors'>Iniciar sesión</Link>
              <Link to='/auht/register' className='bg-primary text-white px-5 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors'>Registrarse</Link>
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col items-center gap-5 p-5 text-gray-700 text-justify w-full md:w-3/4 mx-auto'>
        <h3 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl my-5'>¿Qué es el sistema de información de eventos del club de leones?</h3>
        <p className='text-lg'>El Sistema de Información de Eventos del Club de Leones es una plataforma integral diseñada para facilitar la gestión y participación en eventos organizados por las diferentes sedes del Club de Leones en la Ciudad de México. Este sistema permite a los miembros acceder a una amplia variedad de funcionalidades que enriquecen su experiencia y fomentan la interacción dentro de la comunidad.</p>
        <ol class="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <li class="flex flex-col gap-2 items-center justify-center bg-primary text-white p-5 rounded-lg">
            <i className='pi pi-pencil text-2xl'></i> 
            <span class="font-semibold">Inscripción en eventos</span>  
            <p>Los miembros pueden registrarse fácilmente en eventos como eventos deportivos, actividades recreativas y clases especiales.</p>
          </li>
          <li class="flex flex-col gap-2 items-center justify-center bg-gray-100 text-primary p-5 rounded-lg"> 
            <i className='pi pi-clock text-2xl'></i>
            <span class="font-semibold">Monitoreo de eventos en tiempo real</span>  
            <p>La plataforma permite seguir el desarrollo de los eventos en vivo con actualizaciones de horarios y tus resultados.</p>
          </li>
          <li class="flex flex-col gap-2 items-center justify-center bg-primary text-white p-5 rounded-lg"> 
            <i className='pi pi-search text-2xl'></i>
            <span class="font-semibold">Consulta de resultados históricos</span>  
            <p>Los usuarios tienen acceso a los resultados de eventos pasadas para análisis de desempeño y reconocimiento de logros.</p>
          </li>
          <li class="flex flex-col gap-2 items-center justify-center bg-gray-100 text-primary p-5 rounded-lg"> 
            <i className='pi pi-users text-2xl'></i>
            <span class="font-semibold">Información de contacto de entrenadores</span>  
            <p>Un directorio completo permite a los miembros conectarse con sus entrenadores de las sedes del Club de Leones en la Ciudad de México.</p>
          </li>
          <li class="flex flex-col gap-2 items-center justify-center bg-primary text-white p-5 rounded-lg">
            <i className='pi pi-bell text-2xl'></i>
            <span class="font-semibold">Noticias y actualizaciones</span>
            <p>Los miembros pueden mantenerse al tanto de las últimas noticias y actualizaciones sobre eventos y actividades del Club de Leones.</p>
          </li>
          <li class="flex flex-col gap-2 items-center justify-center bg-gray-100 text-primary p-5 rounded-lg"> 
            <i className='pi pi-file text-2xl'></i>
            <span class="font-semibold">Diplomas y reconocimientos</span>  
            <p>Los participantes pueden descargar certificados de participación como prueba de su involucramiento en las actividades.</p>
          </li>
          <li class="flex flex-col gap-2 items-center justify-center bg-primary text-white p-5 rounded-lg"> 
            <i className='pi pi-calendar text-2xl'></i>
            <span class="font-semibold">Programación de eventos futuras</span>  
            <p>Un calendario interactivo detalla fechas, horarios y sedes de los próximos eventos, ayudando a planificar la participación.</p>
          </li>
          <li class="flex flex-col gap-2 items-center justify-center bg-gray-100 text-primary p-5 rounded-lg"> 
            <i className='pi pi-phone text-2xl'></i>
            <span class="font-semibold">Información de contacto de sedes</span>  
            <p>Un directorio completo permite a los miembros conectarse con las diferentes sedes del Club de Leones en la Ciudad de México.</p>
          </li>
        </ol>
      </div>
      <div className='bg-gray-100 p-10'>
        <h3 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl py-5'>Participa en nuestros eventos</h3>
        <div className='flex flex-col items-center gap-5 p-5 text-gray-700 text-justify w-full md:w-3/4 mx-auto'>
          <p className='text-lg'>Para formar parte de los eventos organizados por el Club de Leones en la Ciudad de México, es fundamental registrarte en nuestra plataforma oficial. Este registro es el primer paso para acceder a una experiencia completa que conecta a los miembros del club con actividades significativas y enriquecedoras. Una vez que hayas creado tu cuenta, tendrás a tu disposición un entorno diseñado para simplificar tu participación en los eventos y maximizar tu interacción con la comunidad.</p>
          <p className='text-lg'>Gracias a esta herramienta, participar en las actividades del Club de Leones no solo será más sencillo, sino también más organizado y accesible. Únete a nuestra plataforma, explora las oportunidades que ofrecemos y contribuye al fortalecimiento de una comunidad comprometida con el bienestar social y el desarrollo personal.</p>
          {user ? (
            <Link to='/dashboard/events' className='bg-primary text-white px-5 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors'>Ir a eventos</Link>
          ) : (
            <>
              <p className='text-lg'>¿Ya tienes una cuenta? ¡Inicia sesión y comienza a disfrutar de todos los beneficios que el Club de Leones tiene para ti!</p>
              <Link to='/auth' className='bg-primary text-white px-5 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors'>Iniciar sesión</Link>
              <p className='text-lg'>¿Aún no tienes una cuenta? ¡Regístrate ahora y comienza a disfrutar de todos los beneficios que el Club de Leones tiene para ti!</p>
              <Link to='/auth/register' className='bg-primary text-white px-5 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors'>Registrarse</Link>
            </>   
          )    
          }
          </div>
      </div>
      <div>
        <h3 className='text-center font-bold text-primary text-3xl md:text-4xl lg:text-5xl my-5'>Conoce nuestras sedes</h3>
        {branches?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 md:mx-20 md:my-12">
            {branches.map(branch => <Branch branch={branch} isYourBranch={user && branch.id == user.branch_id} key={branch.id}/>)}
          </div>
        ) : (
          <div className="flex justify-center items-center my-32">
            <p className='text-primary text-2xl font-bold'>No hay sedes registradas</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
