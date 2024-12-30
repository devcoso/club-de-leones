import logo from '../assets/logo.png'

function Loader() {
  return (
    <div className='flex items-center flex-col justify-center h-screen'>
        <img src={logo} alt='logo' className='w-5/6 m-auto my-0 max-w-72'/>
        <i className="pi pi-spin pi-spinner text-primary font-bold" style={{ fontSize: '3rem' }}></i>
        <p className='text-primary'>Por favor, espera mientras preparamos todo para ti.</p>
    </div>
  )
}

export default Loader
