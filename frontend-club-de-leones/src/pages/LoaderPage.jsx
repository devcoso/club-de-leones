import logo from '../assets/logo.png'

function LoaderPage({fullscreen = true}) {
  return (
    <div className={`flex items-center flex-col justify-center ${fullscreen ? 'h-screen' : 'h-full'}`}>
        <img src={logo} alt='logo' className='w-5/6 m-auto my-0 max-w-72'/>
        <i className="pi pi-spin pi-spinner text-primary font-bold" style={{ fontSize: '3rem' }}></i>
        <p className='text-primary'>Por favor, espera mientras preparamos todo para ti.</p>
    </div>
  )
}

export default LoaderPage
